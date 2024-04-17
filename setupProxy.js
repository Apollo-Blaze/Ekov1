const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/models',
    createProxyMiddleware({
      target: 'https://teachablemachine.withgoogle.com',
      changeOrigin: true,
    })
  );
};
