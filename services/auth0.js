import auth0 from 'auth0-js';

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

  setSession = () => {
    //todo: save session
  };

  login = () => {
    this.auth0.authorize();
  };
}

const auth0Client = new Auth0();

export default auth0Client;
