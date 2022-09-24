const Comment = require('../models/commentsModel');

const createComment = async (req, res) => {
  const { username, desc, id } = req.body;
  console.log(req.body);

  if (!username || !desc) {
    return res.status(401).json({ error: 'All fileds must be filled' });
  }

  const comment = await Comment.create({
    username,
    desc,
    post: id,
  });

  if (comment) {
    res.status(200).json(comment);
  }
};

module.exports = {
  createComment,
};