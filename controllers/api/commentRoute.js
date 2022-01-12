const router = require('express').Router();
const { Router } = require('express');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// ======== ONE COMMENT ======

router.get('/:id', async (req, res) => {

  try {
    // console.log(req.params.id);
    const comment = await Comment.findAll({
      where:
      {
        post_id: req.params.id
      }
    });

    const userData = await User.findAll()

    const user = userData.map((user) => user.get({ plain: true }));

    const comments = comment.map((comment) => comment.get({ plain: true }));

    console.log(comments);

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// =========== CREATE COMMENT =========

router.post('/', withAuth, async (req, res) => {

  try {

    console.log(req.body);

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);


  } catch (error) {
    res.status(400).json(error);
  };

});

// ======== POST / DISPLAY COMMENT =========

router.post('/:id', withAuth, async (req, res) => {

  try {

    console.log(req.body);

    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id
    });

    res.status(200).json(newComment);

  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  };

});

module.exports = router;