<h1 align="center">Hearth</h1>

<p align='center'>
    <img src="/assets/group_page.png" alt="pic1"/>
    <img src="/assets/upload.png" alt="pic2"/>
    <img src="/assets/pic.png" alt="pic3"/>
</p>  

## Table of Contents
- [Description](#description)
- [Installation](#install)
- [Usage](#usage)
- [Questions](#questions)

## Description
Hearth was developed during the COVID-19 outbreak to be a way for families and friends to share pictures and memories together. It provides a safe, secure way of viewing pictures, and allows others to add to your albums. It is a non-social media alternative to Facebook and Twitter.

## Installation
Clone the hearth repository. Run NPM install from the cloned folder, then run npm start to create the database. The machine where the project resides must have MySQL installed. Create an .env file that contains three entries, DB_NAME='hearth_db', DB_USER, and DB_PW, which corresponds to a local user and password for MySQL. Open MySQL and run source db/schema.sql, which will create the database on your local machine. If you wish to seed data in to your database, run npm start seed, which will populate the user, tblgroup, usergroup, and post tables. All the IDs have a password of password1. Once this is finished, run npm start and the webserver will start up. Finally, register in to Hearth.

## Usage
In order to use Hearth to upload memories, the user needs to register or log in to the Hearth system. Next, the user will have to create a group and provide a unique code for that group. The name and code combination allows the system to let other users access the group, and it MUST be given to the other user by the current user. Once a group is created, open the group by clicking on the button. The next page allows you to create an ablum and add a description to that album. This album is associated with the group and user. Once the album is created, open the album and start uploading files. The system restricts the user to only uploading jpg files. You can add a description to the picture, useful for helping to remember who was in the picture. Once the picture has been uploaded, it will show up below. Finally, to exit Hearth, click on the Logout button in the upper right corner.
  

### Heroku Deploy
[Hearth](https://infinite-ocean-27765.herokuapp.com/) 


## Questions?
### Visit our GitHub Accounts
#### [Melissa Daskalantonakis for Github](https://github.com/melissadaska)
#### [Brent Feuerbacher Github](https://github.com/feuerbacherb)
#### [Terry Thompson GitHub](https://github.com/terrylthompsonintx) 

### Email Us 

#### melissa.daska@gmail.com for ✉️ email 
#### feuerbacherb@gmail.com for ✉️ email  
#### terrylthompsonintx@gmail.com for ✉️ email 
