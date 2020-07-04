const fetch = require('node-fetch');
const { Group } = require('../models');

async function seedGroups() {
const groupData = [
   {
      name: 'Thompson',
      uuid: '23456',
      user_id: 3
   },
   {
      name: 'Daskalantonakis',
      uuid: '34567',
      user_id: 2
   },
   {
      name: 'Feuerbacher',
      uuid: '45678',
      user_id: 1
   },
   {
      name: 'Coders',
      uuid: '12345',
      user_id: 3
   },
   {
      name: 'Good Guys',
      uuid: '56789',
      user_id: 4
   },
   {
      name: 'Bad Guys',
      uuid: '98765',
      user_id: 8
   },
   {
      name: 'Jedi',
      uuid: '87654',
      user_id: 4
   },
   {
      name: 'Sith',
      uuid: '76543',
      user_id: 8
   },
   {
      name: 'Galactica',
      uuid: '65432',
      user_id: 13
   },
   {
      name: 'Cylon',
      uuid: '54321',
      user_id: 11
   },
   {
      name: 'Skywalker',
      uuid: '43210',
      user_id: 4
   }
]

//const seedGroups = () => Group.bulkCreate(groupData);

   //const name = document.querySelector('input[name="name"]').value;
   //const uuid = document.querySelector('input[name="group_code"]).value;
   //const user_id = req.session.user_id;

   for (var i = 0; i < groupData.length; i++) {
      const name = groupData[i].name;
      const uuid = groupData[i].uuid;
      const user_id = groupData[i].user_id;
   
      //const response =  await fetch('http://localhost:3001/api/groups/test2', {
      const response = await fetch('https://infinite-ocean-27765.herokuapp.com/api/groups/test2', {
         method: 'post',
         body: JSON.stringify({
            name,
            uuid,
            user_id
         }),
         headers: { 'Content-Type': 'application/json'}
      });
       // check the response status
      if (response.ok) {
         console.log(`name: ${name}, user_id: ${user_id} made it in to the database`);
      } else {
         console.log(`The poo hit the fan!`);
      }
   }
}

module.exports = seedGroups;