const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Picture, Post, tblGroup, User, UserGroup } = require('../models');

router.get('/', (req, res) => {
   if (req.session.loggedIn) {
      res.redirect('/');
      return;
   }

   res.render('homepage');
});

module.exports = router;