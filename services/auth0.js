import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'robinrahman.auth0.com',
      clientID: 'shdV3ApS2rDyOFIQ9xOd2F0eaG4KxR16',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
        }
      });
    });
  };

  setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 * new Date().getTime()
    );

    Cookies.set('user', authResult.idTokenPayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expiresAt', expiresAt);
  };

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    Cookies.remove('user');
    Cookies.remove('jwt');
    Cookies.remove('expiresAt');

    this.auth0.logout({
      returnTo: '',
      clientID: 'shdV3ApS2rDyOFIQ9xOd2F0eaG4KxR16'
    });
  };

  getJWKS = async () => {
    const res = await axios.get(
      'https://robinrahman.auth0.com/.well-known/jwks.json'
    );
    const jwks = res.data;
    return jwks;
  };

  verifyToken = async token => {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });

      if (!decodedToken) return undefined;

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      // Build certificate
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join('\n');
      cert = `-----BEGIN CERTIFICATE-----\n${cert}-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (error) {
          return undefined;
        }
      }
    }
    return undefined;
  };

  clientAuth = async () => {
    const token = Cookies.getJSON('jwt');
    const verifiedToken = await this.verifyToken(token);

    return verifiedToken;
  };

  serverAuth = async req => {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie;

      const splitedCookies = cookies.split(':');

      let tokenCookie;

      splitedCookies.find(c => {
        c.trim()
          .split(' ')
          .find(d => {
            if (d.startsWith('jwt=')) {
              tokenCookie = d.substring(0, d.length - 1);
            }
          });
      });

      if (!tokenCookie) return false;

      const token = tokenCookie.split('=')[1];

      const verifiedToken = await this.verifyToken(token);

      return verifiedToken;
    }

    return undefined;
  };
}

const auth0Client = new Auth0();

export default auth0Client;
