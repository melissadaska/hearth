const router = require('express').Router();
const { tblGroup, User, UserGroup } = require('../../models');

// GET /api/groups
// display all the groups
router.get('/', (req, res) => {
   tblGroup.findAll()
      .then(dbGroupData => res.json(dbGroupData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

// GET /api/group/1
// retrieve one groups
router.get('/:id', (req, res) => {
   tblGroup.findOne({
      where: {
         id: req.params.id
      }
   })
      .then(dbGroupData => {
         if (!dbGroupData) {
            res.status(404).json({ message: 'No group data found with this id' });
            return;
         }
         res.json(dbGroupData);
      })
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

// POST /api/groups
// create a group
router.post('/', (req, res) => {
   tblGroup.create({
      name: req.body.name,
      uuid: req.body.uuid
   })
      .then(dbGroupData => res.json(dbGroupData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

router.post('/test2', (req, res) => {
   tblGroup.create({
      name: req.body.name,
      uuid: req.body.uuid
   })
   .then((group) => {
      if (req.body.user_id) {
         const userGroupArr = [{
            tblgroup_id: group.id,
            user_id: req.body.user_id
         }];
         // req.session.save(() => {
         //    req.session.tblgroup_id = group.id;
         //    req.session.user_id = req.session.user_id;
         //    req.session.username = req.session.user_name;
         //    req.session.loggedIn = true;
         // })
         return UserGroup.bulkCreate(userGroupArr);
      }
      res.status(200).json(product);
   })
   .then(userGroupIds => res.status(200).json(userGroupIds))
   .catch(err => {
      console.log(err);
      res.status(400).json(err);
   });
});

// POST
// router.post('/test', (req, res) => {
//    tblGroup.create({
//       name: req.body.name,
//       uuid: req.body.uuid,
//       usergroups: [{
//          UserGroup: {
//             user_id: req.body.user_id
//          }
//       }]
//    },
//    {
//       include: User
//    })
//       .then(dbGroupData => res.json(dbGroupData))
//       .catch(err => {
//          console.log(err);
//          res.status(500).json(err);
//       })
// })

// POST /api/groups/validate
router.post('/validate', (req, res) => {

   tblGroup.findOne({
      where: {
         name: req.body.name
      }
   })
      .then(dbGroupData => {
         if (!dbGroupData) {
            res.status(404).json({ message: 'No user with that email address' });
            return;
         }

         const validUUID = dbGroupData.checkUUID(req.body.uuid);

         if (!validUUID) {
            res.status(400).json({ message: 'Incorrect Group Code' });
            return;
         }

         //res.status(200).json({dbGroupData});

         const userGroupArr = [{
            tblgroup_id: dbGroupData.id,
            user_id: req.body.user_id
         }];


         return UserGroup.bulkCreate(userGroupArr);

         // req.session.save(() => {
         //    req.session.group_id = dbGroupData.id;
         //    req.session.user_id = req.session.user_id.id;
         //    req.session.username = req.session.user_name;
         //    req.session.loggedIn = true;
         // });
      })
      .catch(err => {
         console.log(err);
         res.status(500).json({ message: 'The user group combo already exists in the database'});
      });
});


// PUT /api/groups/1
// update a group
router.put('/:id', (req, res) => {
   tblGroup.update(req.body, {
      where: {
         id: req.params.id
      }
   })
      .then(dbGroupData => {
         if (!dbGroupData[0]) {
            res.status(404).json({ message: 'No group data found with this id' });
            return;
         }
         res.json(dbGroupData);
      })
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

// DELETE /api/groups/1
// delete a group
router.delete('/:id', (req, res) => {
   tblGroup.destroy({
      where: {
         id: req.params.id
      }
   })
      .then(dbGroupData => {
         if (!dbGroupData) {
            res.status(404).json({ message: 'No group data found with this id' });
            return;
         }
         res.json(dbGroupData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;