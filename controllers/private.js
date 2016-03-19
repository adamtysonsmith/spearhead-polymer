module.exports = {
  app: (req, res, next) => res.render('app',   { userLoggedIn: true })
}