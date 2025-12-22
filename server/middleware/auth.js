// Simple auth middleware placeholder
// TODO: Replace this with real authentication (e.g., JWT, sessions)

module.exports = function auth(req, res, next) {
  // Example: if you later add user info to req, you can check it here
  // if (!req.user) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  // For now, just allow all requests to pass through
  next();
};


