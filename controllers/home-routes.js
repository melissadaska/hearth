const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Picture, Post, tblGroup, User, UserGroup } = require('../models');
router.get('/', (req, res) => {
   if (req.session.loggedIn) {

      const sql = `select u.username, g.name, us.user_id, tblgroup_id from usergroup us inner join tblgroup g on us.tblgroup_id = g.id inner join user u on us.user_id = u.id where us.user_id = ${req.session.user_id};`
      sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
         //.then(dbGroupData => res.json(dbGroupData))
         .then(dbGroupData => {
            console.log('\x1b[33m%s\x1b[30m', `Inside THEN: ${JSON.stringify(dbGroupData[0])}`);
            //const groups = dbGroupData.map(group => group.get({ plain: true }));
            const groups = dbGroupData;
            console.log('\x1b[36m%s\x1b[0m', groups);
            res.render('homepage', {
               username: req.session.username,
               user_id: req.session.user_id,
               groups,
               loggedIn: req.session.loggedIn
            })
         })
         .catch(err => {
            console.log(err);
            res.status(500).json(err);
         });
      
      //console.log("%cOUTSIDE THEN" + JSON.stringify(), "yellow");

      // res.render('homepage', { 
      //    loggedIn: true,
      //    groups: [
      //       {
      //          name: 'Terry Thompson'
      //       }
      //    ],
      //    user_id: req.session.user_id
      // });
      return;
   }
   res.render('login');
});

module.exports = router;
