const fetch = require('node-fetch');
const { Post } = require('../models');

async function seedPosts() {
   const postData = [
      {
         user_id: 3,
         tblgroup_id: 1,
         title: 'Pictures of group 5!',
         description: 'This album holds the crazy, zany escapades of Group 5 as they try and finish their project on time, despite many setbacks, heartaches, trials and tribulations'
      },
      {
         user_id: 3,
         tblgroup_id: 1,
         title: 'Thompson Family Photos',
         description: 'This album contains my life\'s work of the greatest set of minds and people on the planet'
      },
      {
         user_id: 3,
         tblgroup_id: 1,
         title: 'Incriminating Brent! :-p',
         description: 'Brent got carried away when we finished the MVP portion of the project.  Melissa and I will hold on to these until Brent runs for office'
      }
   ]

   for (var i = 0; i < postData.length; i++) {
      const user_id = postData[i].user_id;
      const tblgroup_id = postData[i].tblgroup_id;
      const title = postData[i].title;
      const description = postData[i].description;

      const response = await fetch('http://localhost:3001/api/posts', {
         method: 'POST',
         body: JSON.stringify({
            user_id,
            tblgroup_id,
            title,
            description
         }),
         headers: { 'Content-Type': 'application/json' }
      });
      // check the response status
      if (response.ok) {
         console.log(`user_id: ${user_id}, tblgroup_id: ${tblgroup_id}, title: ${title}, description: ${description}`);
      } else {
         console.log('The poo hit the fan');
      }
   }
}

module.exports = seedPosts;