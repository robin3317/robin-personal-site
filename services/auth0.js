import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

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
          console.log(err);
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

  isAuthenticated = () => {
    const expiresAt = Cookies.getJSON('expiresAt');
    return new Date().getTime() < expiresAt;
  };

  verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp * 1000;
      return decodedToken && new Date().getTime() < expiresAt
        ? decodedToken
        : undefined;
    }
    return undefined;
  }

  clientAuth = () => {
    const token = Cookies.getJSON('jwt');
    const verifiedToken = this.verifyToken(token);

    return verifiedToken;
  };

  serverAuth = req => {
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

      const verifiedToken = this.verifyToken(token);

      return verifiedToken;
    }

    return undefined;
  };
}

const auth0Client = new Auth0();

export default auth0Client;
