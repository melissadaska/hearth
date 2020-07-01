const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Picture, Post, tblGroup, User, UserGroup } = require('../models');
router.get('/', (req, res) => {
   if (req.session.loggedIn) {
      //console.log("AFTER LOGGING IN", JSON.stringify(req.session));
      console.log("\n\nTHIS IS ME TRYING TO SPLIT IT OUT", req.session.user_id);

      res.render('homepage', { 
         loggedIn: true,
         groups: [
            {
               name: 'Terry Thompson'
            }
         ],
         user_id: req.session.user_id
      });
      return;
   }
   res.render('login');
});

module.exports = router;
