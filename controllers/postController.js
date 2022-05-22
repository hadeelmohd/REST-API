const Post = require("../models/post");
const validationHandler = require('../validations/validationHandler');


exports.index = async (req, res) => { //everytime a route comes here it has a request and a response 
    //  res.send({ message: 'hi'});
    //creating an index to show our posts 
    try {
      const pagination = req.query.pagination 
      ? parseInt(req.query.pagination) 
      : 10; // declaring pagination parameter => to retrieve 10 posts at a time 

      const page = req.query.page 
      ? parseInt(req.query.page)
      : 1; //specify the page where we are currently searching or the first page by default 
      const posts = await Post.find({
        user: { $in: [...req.user.following, req.user.id]} //show only my following posts and my posts -- $in means inside this array
      })
      .skip((page - 1) * pagination) //if we r in page 2 then 2-1 * 10 == 10 > skip the first 10 items and retrieve the next 10 
      .limit(pagination) // limit the number of items being retrieved, to the number of the variable 
      .populate('user')
      .sort({ createdAt: -1}); 
      //gets a list of docs + sorting them by date descinding {bigger -> smaller}
      res.send(posts); //sending back posts to show 
    } catch(err) {
      next(err);
    }
};

exports.show = async (req, res) => {
try {
  const post = await Post.findOne({
    _id: req.params.id,
    user: { $in: [...req.user.following, req.user.id]}
  }).populate('user');
  //mongoose will find the user id inside the post and link it to the user model

  res.send(post);
} catch(err) {
  next(err);
}
};

exports.store = async (req, res, next) => {
    try{
      validationHandler(req);
      // res.send({ message: "The name is " + req.body.name });

      let post = new Post();
      post.description = req.body.description;
      post.image = req.file.filename;
      post.user = req.user;
      post = await post.save(); //saved our post into the database 
      res.send(post);
    } catch(err){
        next(err); //as return but its a built in function 
    }
}

exports.update = async (req, res, next) => {
  try{
    validationHandler(req);
    // res.send({ message: "The name is " + req.body.name });

    let post = await Post.findById(req.params.id); // to query by id 
    // check if auth user is auther 
    if (!post || post.user != req.user.id){ // if we dont have a post or the logged in user 
      console.log(post.user);
      console.log(req.user._id);
      const error = new Error("wrong request");
      error.statusCode = 400;
      throw error;
    }
    post.description = req.body.description;

    post = await post.save(); //saved our post into the database 
    res.send(post);

  } catch(err){
      next(err); //as return but its a built in function 
  }
}

exports.delete = async (req, res, next) => {
  try{
    let post = await Post.findById(req.params.id); // to query by id
    if (!post || post.user != req.user.id){ // if we are not the author we cant delete the post
      console.log(post.user);
      console.log(req.user._id);
      const error = new Error("wrong request");
      error.statusCode = 400;
      throw error;
    } 
    await post.delete(); //saved our post into the database 
    res.send({message: "post deleted successfully"});

  } catch(err){
      next(err); //as return but its a built in function 
  }
}