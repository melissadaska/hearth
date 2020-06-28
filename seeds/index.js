const fetch = require('node-fetch');
const path = require('path');
const express = require('express');
const routes = require('../controllers');
const helpers = require('../utils/helpers');
const sequelize = require('../config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const seedUsers = require('./user-seeds');
const seedGroups = require('./group-seeds');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session(sess));

// turn on routes
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const seedAll = async () => {
   // reset the database with demo values
   await sequelize.sync({ force: true });
   console.log('\n******* Database Synced *******');

   await seedUsers();
   console.log('\n******* Users Seeded *******');

   await seedGroups();
   console.log('\n******* Groups Seeded *******');

};

seedAll();