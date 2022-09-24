const Post = require('../models/postModel');

const getPosts = async (req, res) => {
    console.log(req);
    try {
      const json = await Post.find({ published: { $eq: true } })
        .sort({ createdAt: 1 })
        .populate({
          path: 'author',
          select: ['_id', 'username'],
        });
  
      res.status(200).json(json);
    } catch (error) {
      res.status(400).json({ msg: 'Bad Request' });
    }
  };


  const createPost = async (req, res) => {
    const { title, desc, img } = req.body;
    const imgUrl = await uploadImage(img);
    try {
      const post = await Post.create({
        title,
        desc,
        img: imgUrl,
        author: req.user[0],
      });
  
      res.status(200).json({ msg: 'Post was successfully created' });
    } catch (error) {
      res.status(400).json({ msg: 'Bad Request' });
    }
  };


  const getSpecificPost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.find({ _id: postId }).populate({
        path: 'author',
        select: ['_id', 'username'],
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(401).json({ msg: 'Bad Request' });
    }
  };


  const getAuthorPosts = async (req, res) => {
    const { authorId } = req.params;
    console.log(req.user);
  
    try {
      const post = await Post.find({ author: req.user });
      res.status(200).json(post);
    } catch (error) {
      res.status(401).json({ msg: 'Not found' });
    }
  };


  const updatePost = async (req, res) => {
    const { img } = req.body;
    const { postId } = req.params;
  
    let imgUrl = '';
  
    if (img.length > 150) {
      imgUrl = await uploadImage(img);
    } else {
      imgUrl = img;
    }
  
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { ...req.body, img: imgUrl },
      { returnOriginal: false }
    );
  
    if (!post) {
      return res.status(401).json({ msg: 'No such post!' });
    }
  
    return res.status(200).json({ message: 'Your post has been updated' });
  };

  const deletePost = async (req, res) => {
    const { postId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ error: 'No such post' });
    }
  
    const post = await Post.findOneAndDelete({ _id: postId });
  
    if (!post) {
      return res.status(401).json({ msg: 'No such post!' });
    } else {
      return res.status(200).json(post);
    }
  };

  module.exports = {
    getPosts,
    createPost,
    getSpecificPost,
    getAuthorPosts,
    updatePost,
    deletePost
  }
