
# Hearth

![](https://img.shields.io/static/v1?label=license&message=MIT&color=green)
  

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)
* [Tests](#tests)
* [Contact Me](#contact-me)

## Description
Hearth was developed during the COVID-19 outbreak to be a way for families and friends to share pictures and memories together.  It provides a safe, secure way of viewing pictures, and allows others to add to your albums.  It is a non-social media alternative to Facebook and Twitter.

## Installation
Clone the hearth repository from GitHub.com/feuerbacherb.  Run NPM install from the cloned folder, then run npm start to create the database.  The machine where the project resides must have MySQL installed.  Create an .env file that contains three entries, DB_NAME='hearth_db', DB_USER, and DB_PW, which corresponds to a local user and password for MySQL.  Open MySQL and run source db/schema.sql, which will create the database on your local machine.  If you wish to seed data in to your database, run npm start seed, which will populate the user, tblgroup, usergroup, and post tables.  All the IDs have a password of password1.  Once this is finished, run npm start and the webserver will start up.  Finally, register in to Hearth.

## Usage
In order to use Hearth to upload memories, the user needs to register or log in to the Hearth system.  Next, the user will have to create a group and provide a unique code for that group.  The name and code combination allows the system to let other users access the group, and it MUST be given to the other user by the current user.  Once a group is created, open the group by clicking on the button.  The next page allows you to create an ablum and add a description to that album.  This album is associated with the group and user.  Once the album is created, open the album and start uploading files.  The system restricts the user to only uploading jpg files.  You can add a description to the picture, useful for helping to remember who was in the picture.  Once the picture has been uploaded, it will show up below.  Finally, to exit Hearth, click on the Logout button in the upper right corner.

## License
MIT License

Copyright (c) 2020 Group 5

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributions
This project is currently closed.  Thanks to my classmates who helped to make this a reality.

## Tests
In order to test the project, you may either install it on your own machine or access the on-line version located at infinite-ocean-27765.herokuapp.com, then run through the pages and upload photos.

## Contact Me
* [Email](mailto:feuerbacherb@gmail.com)

* [GitHub](https://www.github.com/feuerbacherb)
