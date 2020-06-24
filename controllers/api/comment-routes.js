const router = require('express').Router();
const { Comment } = require('../../models');


// GET /api/comments
// retrive all comments
router.get('/', (req, res) => {
   Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

// GET /api/comments/1
// retrieve one comment
router.get('/:id', (req, res) => {
   Comment.findOne({
      where: {
         id: req.params.id
      }
   })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

// POST /api/comments
// create a comment
router.post('/', (req, res) => {
//   if (req.session) {
      Comment.create({
         comment_text: req.body.comment_text,
         
         // TURN THIS ON WHEN LOGON WORKS
         //user_id: req.session.user_id
         user_id: req.body.user_id
      })
         .then(dbCommentData => res.json(dbCommentData))
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
//   }
});

// PUT /api/comments/1
// update the comment with body information based on comment id
router.put('/:id', (req, res) => {
   Comment.update(req.body, {
      inddividualHooks: true,
      where: {
         id: req.params.id
      }
   })
      .then(dbCommentData => {
         if (!dbCommentData[0]) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
         }
         res.json(dbCommentData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// DELETE /api/comments/1
router.delete('/:id', (req, res) => {
   Comment.destroy({
      where: {
         id: req.params.id
      }
   })
      .then(dbCommentData => {
         if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
         }
         res.json(dbCommentData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;