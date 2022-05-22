const express = require('express');
const postController = require('../controllers/postController'); //importing the controller 
const uploadImage = require('../midddlewares/multer');
const { hasDescription } = require('../validations/validators');
const router = express.Router();

router.get('/', postController.index);//our first endpoint
router.get("/:id", postController.show); // a route for showing a single post 
router.post('/', 
uploadImage('posts').single('image'), //every time we send a req the file should be an image 
hasDescription, 
postController.store);//our second endpoint 
router.patch("/:id", hasDescription, postController.update); //we use put or patch for updating 
// put to replace the old doc with a new one 
//patch to modify only some parts of an existing object 
router.delete("/:id", postController.delete);


module.exports = router;