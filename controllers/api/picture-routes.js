const router = require('express').Router();
const { Picture } = require('../../models');
const fileUpload = require('express-fileupload');
const Jimp = require('jimp');

// GET /api/pictures
// get all of the pictures, no filter
router.get('/', (req, res) => {
   Picture.findAll({})
      .then(dbPictureData => {
         if (!dbPictureData) {
            res.status(404).json({ message: 'There are no pictures in the database' });
            return;
         }
         res.json(dbPictureData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// GET /api/pictures/1
// get one picture
router.get('/:id', (req, res) => {
   Picture.findAll({
      where: {
         post_id: req.params.id
      }
   })
      .then(dbPictureData => {
         if (!dbPictureData) {
            res.status(404).json({ message: 'There were no pictures with that id' });
            return;
         }
         res.json(dbPictureData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST /api/pictures
// create a picture entry
router.post('/', (req, res) => {
   Picture.create({
      filetype: req.body.filetype,
      filename: req.body.filename,
      data: req.body.data,
      annotation: req.body.annotation,
      post_id: req.body.post_id,
      user_id: req.body.user_id
      // user_id: req.sesssion.user_id
   })
      .then(dbPictureData => res.json(dbPictureData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
}); 

// PUT /api/pictures/1
// update a picture's information
router.put('/:id', (req, res) => {
   Picture.update(req.body, {
      where: {
         id: req.params.id
      }
   })
      .then(dbPictureData => {
         if (!dbPictureData[0]) {
            res.status(404).json({ message: 'There are no pictures with that id' });
            return;
         }
         res.json(dbPictureData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// DELETE /api/pictures/1
// delete a picture from the database
router.delete('/:id', (req, res) => {
   Picture.destroy({
      where: {
         id: req.params.id
      }
   })
      .then(dbPictureData => {
         if (!dbPictureData) {
            req.status(404).json({ message: 'There are no pictures with that id' });
            return;
         }
         res.json(dbPictureData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});


//Route to post images.
router.post('/upload', async function(req, res) {
   //console.log(req.body);
   if (!req.files || Object.keys(req.files).length === 0) {
     res.status(400);
     return;
   }
   
   namemod = Math.floor(Math.random() * 1000);
   namemod = namemod.toString();
   //console.log('namemod', namemod);
   let upLoadFile = req.files.upLoadFile;
   let filename = namemod + req.files.upLoadFile.name;
   let uploadPath = 'public/images/' + filename;
   
   let filetype =req.files.upLoadFile.mimetype;
   let fannotation = req.body.annotation;
   let fuser_id = req.body.user_id;
   let fpost_id = req.body.post_id;
   //console.log (filetype);
   //|| (filetype !== 'image/png') || (filetype !== 'image/tiff') || (filetype !== 'image/bmp')
   if (filetype == 'video/mp4' ){
      
      console.log('File type failed');
      return res.send('Incorrect file type');
   };
   //console.log('req.files >>>', req.files); // eslint-disable-line
   //console.log (filename, uploadPath);

   await upLoadFile.mv(uploadPath, function(err) {
     if (err) {
       console.log ('Image move error, post pic route', err);
     }
     console.log('file written to images')
   res.status(200);
   
   });
   
    //console.log(filename, filetype)
    await Picture.create({
       
      filetype: filetype,
      filename: filename,
      data: '',
      annotation: fannotation,
      post_id: fpost_id, //req.body.post_id
      user_id: fuser_id //req.body.user_id
      // user_id: req.sesssion.user_id
      })
      //.then(dbPictureData => res.json(dbPictureData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
      await Jimp.read(uploadPath, function (err, image) {
         if (err) throw err;
         image.resize( 256, Jimp.AUTO)
                               
              .write(uploadPath);
         console.log('Image resized');
         return res.send('File uploaded!');
        });
   
  
});


module.exports = router;