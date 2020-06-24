const router = require('express').Router();

//  router definitions
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const groupRoutes = require('./group-routes');

// router.use files
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/groups', groupRoutes);



module.exports = router;