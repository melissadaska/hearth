const router = require('express').Router();

//  router definitions
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');

// router.use files
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);



module.exports = router;