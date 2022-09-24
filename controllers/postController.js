const Post = require('../models/postModel');
const Comment = require('../models/commentsModel');
const mongoose = require('mongoose')

const {uploadImage, deleteImage} = require('../utils/uploadImage')

const getPosts = async (req, res) => {

    const json = await Post.find({ published: { $eq: true } })
    .sort({ createdAt: 1 })
    .populate({
      path: 'author',
      select: ['_id', 'username'],
    });


    if(!json){
        return res.status(400).json({ msg: 'Bad Request' });
    }

    return res.status(200).json(json);

   
  };


  const createPost = async (req, res) => {
    const { title, desc, img } = req.body;
    const {imgUrl, img_id} = await uploadImage(img)

    try {
      const post = await Post.create({
        title,
        desc,
        img: imgUrl,
        imgId: img_id,
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
  
    try {
      const post = await Post.find({ author: req.user });
      res.status(200).json(post);
    } catch (error) {
      res.status(401).json({ msg: 'Not found' });
    }
  };


  const updatePost = async (req, res) => {
    const { img, imgId } = req.body;
    const { postId } = req.params;
  

    let imgUrl = '';
    let  img_id = ''

    if (img.length > 150) {
      ({imgUrl, img_id} = await uploadImage(img));
    } else {
      await deleteImage(imgId)
      imgUrl = img;
      img_id = ''
    }
  
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { ...req.body, img: imgUrl, imgId:  img_id },
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

  const getSpecificPostComments = async (req, res) => {
    const { postId } = req.params;
  
    const comments = await Comment.find({ post: postId }).sort({ createdAt: 1 });
  
    if (!comments) {
      return res.status(401).json({ msg: 'No comments yet' });
    }
  
    return res.status(200).json(comments);
  };
  
  const getSpecificComment = async (req, res) => {
    const { commentId } = req.params;
  
    const comment = await Comment.find({ _id: commentId }).sort({ createdAt: 1 });
  
    if (!comment) {
      return res.status(401).json({ msg: 'No such comment' });
    }
  
    return res.status(200).json(comment);
  };

  module.exports = {
    getPosts,
    createPost,
    getSpecificPost,
    getAuthorPosts,
    updatePost,
    deletePost,
    getSpecificPostComments,
    getSpecificComment
  }
