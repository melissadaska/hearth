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



router.get('/picture/:id', (req,res)=>{
   if (req.session.loggedIn) {
      
      //console.log("\n\nTHIS IS ME TRYING TO SPLIT IT OUT", req.session.user_id);
      //console.log('post_id', req.session.post_id);
      
      Picture.findAll({
      where: {
         post_id: req.params.id
      }
      })
      .then(dbPictureData => {
         if (!dbPictureData) {
            console.log('No pictures found') 
            return;
         }
      
         //console.log(dbPictureData);
         //const pagefeed = dbPostData.map(post => post.get({ plain: true }));
         const pictures = dbPictureData.map(picture => picture.get({plain:true}));
         console.log (pictures);
         res.render('picture', {username:req.session.username, post_id:req.params.id, user_id:req.session.user_id, pictures}); 
   
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





module.exports = router;
