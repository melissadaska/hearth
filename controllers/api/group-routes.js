const sequelize = require('../../config/connection');
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

// GET /api/groups/user_id/:id
// display all groups associated with user_id
router.get('/users/:id', (req, res) => {
   const sql = `select g.name, us.user_id, tblgroup_id from usergroup us inner join tblgroup g on us.tblgroup_id = g.id where us.user_id = ${req.params.id};`
   sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
      .then(dbGroupData => res.json(dbGroupData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
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
   //console.log(req.body.user_id)
   tblGroup.create({
      name: req.body.name,
      uuid: req.body.uuid
   })
   .then((group) => {
      console.log(group, req.body.user_id);
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
         console.log('********* JUST BEFORE BULK CREATE *********');
         return UserGroup.bulkCreate(userGroupArr);
      } else {
         const userGroupArr = [{
            tblgroup_id: group.id,
            user_id: req.session.user_id
         }];
         return UserGroup.bulkCreate(userGroupArr);
      }
      res.status(200).json(group);
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

         const userGroupArr = [{
            tblgroup_id: dbGroupData.id,
            user_id: req.body.user_id
         }];

         
         UserGroup.bulkCreate(userGroupArr)
            .then(dbGroupInfo => res.status(200).json(dbGroupInfo))
            .catch(err => {
               console.log(err);
               res.status(500).json({ message: 'The user/group combo already exists in the database' });
            }); 
         //res.status(200).json(dbGroupData);
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