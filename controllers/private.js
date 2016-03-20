module.exports = {
  app: (req, res, next) => res.render('app', { userLoggedIn: true, dashboard: true }),
  getProjects: (req, res, next) => res.render('app', { userLoggedIn: true, projects: true })
}