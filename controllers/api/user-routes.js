const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
   // access User table and pull everything
   User.findAll({
      attributes: { exclude: ['password'] }
   })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// GET /api/users/1
// return one user record
//   future programming to allow comments and posts to be seen and edited
router.get('/:id', (req, res) => {
   User.findOne({
      attributes: { exclude: ['password'] },
      where: {
         id: req.params.id
      },
/*
      // I went ahead and added this section if we need it later
      include: [
         model: Post,
         attribues: ['id', 'title', 'created_at'],
         include: {
            model: Post,
            attributes: ['title']
         }
      ]
*/
   })
      .then(dbUserData => {
         if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
         }
         res.json(dbUserData);
      }) 
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST /api/users
// expects json { "username": "user", "email": "email@gmail.com", "password": "password1" }
router.post('/', (req, res) => {
   User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
   })
      .then(dbUserData => {
         // this will create the cookie and show the new user as being logged in
         // req.session.save(() => {
         //    req.session.user_id = dbUserData.id;
         //    req.session.username = dbUserData.username;
         //    req.session.loggedIn = true;
         // })
         res.json(dbUserData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST /api/login
router.post('/login', (req, res) => {
   //console.log(req.body);
   User.findOne({
      where: {
         email: req.body.email
      }
   })
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address' });
            return;
         }

         const validPassword = dbUserData.checkPassword(req.body.password);

         if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
         }

         // this creates the cookie information for the session
         req.session.save(() => {
            //console.log('USER DATA!!!!', JSON.stringify(dbUserData));
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            console.log('THIS IS AN ENTRY AFTER SESSION STORAGE', JSON.stringify(req.session));
            res.json({ user: dbUserData, message: 'You are logged in' });
         })

      });
});

// POST /api/logout
router.post('/logout', (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
         //res.render('login');         
         res.status(204).end();
      });
   } else {
      //res.render('login');
      res.status(404).end();
   }
});

// PUT /api/users/1
// will be using req.body to fill in the blanks
router.put('/:id', (req, res) => {
   User.update(req.body, {
      individualHooks: true,
      where: {
         id: req.params.id
      }
   })
      .then(dbUserData => {
         if(!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
         }
         res.json(dbUserData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
   User.destroy({
      where: {
         id: req.params.id
      }
   })
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
         }
         res.json(dbUserData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;