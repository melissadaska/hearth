const router = require('express').Router();

//  router definitions
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const groupRoutes = require('./group-routes');
const postRoutes = require('./post-routes');

// router.use files
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/groups', groupRoutes);
router.use('/posts', postRoutes);


module.exports = router;