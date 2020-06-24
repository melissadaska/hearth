const router = require('express').Router();
const { Group } = require('../../models');

// GET /api/groups
// display all the groups
router.get('/', (req, res) => {
   Group.findAll()
      .then(dbGroupData => res.json(dbGroupData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

// GET /api/group/1
// retrieve one groups
router.get('/:id', (req, res) => {
   Group.findOne({
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
   Group.create({
      name: req.body.name
   })
      .then(dbGroupData => res.json(dbGroupData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});

// PUT /api/groups/1
// update a group
router.put('/:id', (req, res) => {
   Group.update(req.body, {
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
   Group.destroy({
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