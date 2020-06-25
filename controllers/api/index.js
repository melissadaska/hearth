const router = require('express').Router();

//  router definitions
const commentRoutes = require('./comment-routes');
const groupRoutes = require('./group-routes');
const pictureRoutes = require('./picture-routes');
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');

// router.use files
router.use('/comments', commentRoutes);
router.use('/groups', groupRoutes);
router.use('/pictures', pictureRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;