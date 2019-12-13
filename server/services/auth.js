const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestPerMinute: 15,
    jwksUri: 'https://robinrahman.auth0.com/.well-known/jwks.json'
  }),
  audience: 'shdV3ApS2rDyOFIQ9xOd2F0eaG4KxR16',
  issuer: 'https://robinrahman.auth0.com/',
  algorithms: ['RS256']
});
