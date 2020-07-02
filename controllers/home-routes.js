const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Picture, Post, tblGroup, User, UserGroup } = require('../models');



router.get('/', (req, res) => {
   if (req.session.loggedIn) {
      //req.session.tblgroup_id = 3;
      const sql = `select u.username, g.name, us.user_id, tblgroup_id from usergroup us inner join tblgroup g on us.tblgroup_id = g.id inner join user u on us.user_id = u.id where us.user_id = ${req.session.user_id};`
      sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
         //.then(dbGroupData => res.json(dbGroupData))
         .then(dbGroupData => {
            //console.log('\x1b[33m%s\x1b[30m', `Inside THEN: ${JSON.stringify(dbGroupData[0])}`);
            //const groups = dbGroupData.map(group => group.get({ plain: true }));
            const groups = dbGroupData;
            //console.log('\x1b[36m%s\x1b[0m', groups);
            res.render('homepage', {
            //res.render('post', {
               //tblgroup_id: req.session.tblgroup_id,
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
      return;
   }
   res.render('login');
});

router.get('/posts/:id', (req, res) => {
   //console.log('\x1b[33m%s\x1b[30m', `req.session: ${JSON.stringify(req.session)}`);
   if (req.session.loggedIn) {
      req.session.tblgroup_id = req.params.id;

      tblGroup.findOne({
         where: {
            id: req.params.id
         }
      })
         .then(dbGroupData => {
            const groupName = dbGroupData.name;
            //console.log('\x1b[33m%s\x1b[30m', groupName);
            req.session.groupName = groupName;
         })
         .catch(err => {
            console.log(err);
            res.status(500).json(err);
         });

      Post.findAll({
         where: {
            tblgroup_id: req.params.id,
            user_id: req.session.user_id
         }
      })
         .then(dbPostData => {
            //console.log('\x1b[33m%s\x1b[30m', `Inside THEN: ${JSON.stringify(dbPostData[0])}`);
            const posts = dbPostData.map(post => post.get({ plain: true }));
            //console.log(posts);
            res.render('post', {
               tblgroup_id: req.session.tblgroup_id,
               group_name: req.session.groupName,
               username: req.session.username,
               user_id: req.session.user_id,
               posts,
               loggedIn: req.session.loggedIn
            })
         })
         .catch(err => {
            console.log(err);
            res.status(500).json(err);
         });
      return;
   }
   res.redirect('login');
});

module.exports = router;
