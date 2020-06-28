const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Picture, Post, tblGroup, User, UserGroup } = require('../models');
<<<<<<< HEAD

=======
>>>>>>> 69b419dc0223bb3260d0d6a602faaaf8a60e973e
router.get('/', (req, res) => {
   if (req.session.loggedIn) {
      res.redirect('/');
      return;
   }
<<<<<<< HEAD

   res.render('homepage');
});

module.exports = router;
=======
   res.render('login');
});
module.exports = router;
>>>>>>> 69b419dc0223bb3260d0d6a602faaaf8a60e973e
