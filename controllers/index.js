const routes = require('express').Router();
const userRoutes = require('./api/userRoutes');
const blogRoutes = require('./api/blogRoutes');
const commentRoutes = require('./api/commentRoutes')
const homeRoutes = require('./homeRoutes')

routes.use('/', homeRoutes);
routes.use('/api/user', userRoutes);
routes.use('/api/blog', blogRoutes)
routes.use('/api/comment', commentRoutes)

module.exports = routes;