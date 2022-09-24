const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  getSpecificPost,
  getAuthorPosts,
  updatePost,
  deletePost,
  getSpecificPostComments,
  getSpecificComment,
} = require('../controllers/postController');
const requireAuth = require('../middleware/requireAuth');

router.get('/', getPosts);
router.get('/authorPosts', requireAuth, getAuthorPosts);
router.get('/:postId', getSpecificPost);
router.get('/:postId/comments', getSpecificPostComments);
router.get('/:postId/comments/:commentId', getSpecificComment);

router.use(requireAuth);

router.post('/', createPost);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);

module.exports = router;