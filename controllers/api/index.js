const router = require('express').Router();

//  router definitions
const userRoutes = require('./user-routes');


// router.use files
router.use('/users', userRoutes);




module.exports = router;