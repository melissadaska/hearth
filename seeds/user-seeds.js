const fetch = require('node-fetch');
const express = require('express');
const { User } = require('../models');

async function seedUsers() {

const userData = [
   {
      username: 'feuerbacherb',
      password: 'password1',
      email: 'feuerbacherb@gmail.com'
   },
   {
      username: 'daskalantonakism',
      password: 'password1',
      email: 'daskalantonakism@gmail.com'
   },
   {
      username: 'thompsont',
      password: 'password1',
      email: 'thompsont@gmail.com'
   },
   {
      username: 'skywalkerl',
      password: 'password1',
      email: 'skywalkerl@jedi.com'
   },
   {
      username: 'skywalkera',
      password: 'password1',
      email: 'skywalkera@jedi.com'
   },
   {
      username: 'kenobio',
      password: 'password1',
      email: 'kenobio@jedi.com'
   },
   {
      username: 'windum',
      password: 'password1',
      email: 'windum@jedi.com'
   },
   {
      username: 'palpatines',
      password: 'password1',
      email: 'palpatines@sith.com'
   },
   {
      username: 'plagueisd',
      password: 'password1',
      email: 'plagueisd@sith.com'
   },
   {
      username: 'mauld',
      password: 'password1',
      email: 'mauld@sith.com'
   },
   {
      username: 'cavilj',
      password: 'password1',
      email: 'cavilj@cylon.com'
   },
   {
      username: 'leobenc',
      password: 'password1',
      email: 'leobenc@cylon.com'
   },
   {
      username: 'adamaw',
      password: 'password1',
      email: 'adamaw@galactica.com'
   },
   {
      username: 'adamaa',
      password: 'password1',
      email: 'adamaa@galactica.com'
   }
];

//const seedUsers = () => User.bulkCreate(userData);

   //console.log(userData);
//const seedUsers = () => {
   for (var i = 0; i < userData.length; i++) {
      const username = userData[i].username;
      const password = userData[i].password;
      const email = userData[i].email;
   
      const response =  await fetch('http://localhost:3001/api/users', {
         method: 'post',
         body: JSON.stringify({
            username,
            email,
            password
         }),
         headers: { 'Content-Type': 'application/json'}
      });
       // check the response status
      if (response.ok) {
         console.log(`username: ${username}, email: ${email} made it in to the database`);
      } else {
         console.log(`The poo hit the fan!`);
      }
   }
}

module.exports = seedUsers;