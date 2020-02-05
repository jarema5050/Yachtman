const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy(
        '/auth/google', { target: 'http://localhost:3003/' })
  );
};