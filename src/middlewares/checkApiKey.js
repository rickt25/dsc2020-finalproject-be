function checkApiKey(req, res, next) {
    if (req.headers['x-api-key'] !== 'DSC2020BACKEND') {
      return res.status(403).json({
        status: false,
        message: 'invalid token!'
      })
    }
    next();
  }
  
  module.exports = checkApiKey;