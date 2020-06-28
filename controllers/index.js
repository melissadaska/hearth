const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
// const dashboardRoutes = require('./dashboard-routes.js');

const apiRoutes = require('./api');

<<<<<<< HEAD
//router.use('/dashboard', dashboardRoutes);
=======
// router.use('/dashboard', dashboardRoutes);
>>>>>>> 69b419dc0223bb3260d0d6a602faaaf8a60e973e
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
   res.status(404).end();
});

module.exports = router;
