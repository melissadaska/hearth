const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Picture, Post, tblGroup, User, UserGroup } = require('../models');



router.get('/', (req, res) => {
   if (req.session.loggedIn) {
      //req.session.tblgroup_id = 3;
      const sql = `select u.username, g.name, us.user_id, tblgroup_id from usergroup us inner join tblgroup g on us.tblgroup_id = g.id inner join user u on us.user_id = u.id where us.user_id = ${req.session.user_id} order by us.created_at desc;`
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



router.get('/picture/:id', (req,res)=>{
   if (req.session.loggedIn) {
      
      //console.log("\n\nTHIS IS ME TRYING TO SPLIT IT OUT", req.session.user_id);
      //console.log('post_id', req.session.post_id);
      
      Picture.findAll({
         where: {
            post_id: req.params.id
         },
         order: [
            ['created_at', 'DESC']
         ]
      })
      .then(dbPictureData => {
         if (!dbPictureData) {
            console.log('No pictures found') 
            return;
         }
      
         //console.log(dbPictureData);
         //const pagefeed = dbPostData.map(post => post.get({ plain: true }));
         const pictures = dbPictureData.map(picture => picture.get({plain:true}));
         //console.log (pictures);
         res.render('picture', {loggedIn:req.session.loggedIn,username:req.session.username, post_id:req.params.id, user_id:req.session.user_id, pictures}); 
   
         //console.log (pagefeed);
      })
      .catch(err => {
         console.log(err);
         
      });  
      //find all post with group id of req.params.id
     
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
            tblgroup_id: req.params.id
            //,
            //user_id: req.session.user_id
         },
         order: [
            ['created_at', 'DESC']
         ]
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
