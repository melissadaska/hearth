const router = require('express').Router();
const sequelize = require('../../config/connection');

const { 
   Comment, 
   Group, 
   Post, 
   User } = require('../../models');

// GET /api/posts
// get all the posts
router.get('/', (req, res) => {
   Post.findAll()
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// GET /api/postcomment
// get all postcomments
router.get('/postcomment', (req, res) => {
   Post.findAll({
      attributes: ['id', 'title', 'user_id'],
      include: [
         {         
            model: Comment,
            attributes: [
               'id',
               'comment_text',
               'created_at'
            ],
            include: {
               model: User,
               attributes: ['username']
            }
         },
         {
            model: User,
            attributes: ['username']
         }
      ]
   });
});

// GET /api/posts/1
// get one post
router.get('/:id', (req, res) => {
   Post.findOne({
      where: {
         id: req.params.id
      }
   })
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: 'There were no posts with that id' });
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST /api/posts
// create a new post
router.post('/', (req, res) => {
   Post.create({
      title: req.body.title,
      user_id: req.body.user_id
      // user_id: req.session.user_id
   })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST /api/postcomment
// create a post that contains comments
router.post('/postcomment', (req, res) => {
   Post.create({
      title: req.body.title,
      user_id: req.body.user_id
   })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// PUT /api/posts/1
// update a post
router.put('/:id', (req, res) => {
   Post.update(req.body, {
      where: {
         id: req.params.id
      }
   })
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: "There were no posts with that id" });
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// DELETE /api/posts/1
// delete a post
router.delete('/:id', (req, res) => {
   Post.destroy({
      where: {
         id: req.params.id
      }
   })
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: 'There were no posts with that id' });
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});



module.exports = router;