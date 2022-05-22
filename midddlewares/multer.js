const path = require('path');
const multer = require("multer");

module.exports = folderName => {
return multer({  //multer instance with some options : 
fileFilter: (req, file, cb) => { //to prevent us from uploading anythig that is not an img
const ext = path.extname(file.originalname); //extension of the file 
if (
ext !== ".png" &&
ext !== ".jpg" &&
ext !== ".gif" &&
ext !==".jpeg"
) {
return cb(new Error("Only images are allowed"));
}
cb(null, true); //callback
},
dest: `public/uploads/${folderName}/` //destination folder where our files will go 
});
};
