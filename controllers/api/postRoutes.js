const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// * /api/post *

// ======== SINGLE POST ROUTE =======

router.get('/:id', withAuth, async (req, res) => {
  try {

    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: 
          [{
            model: User, 
            attributes: ['username']
          }]
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    res.render('post', {
      ...post,
      logged_in: true
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// ========== CREATE POST ===============

router.post('/', withAuth, async (req, res) => {

  try {

    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

// ======== EDIT COMMENT =========

router.put('/:id', withAuth, async (req, res) => {

  try {

    console.log(req.body);

    const editPost = await Post.update({
      ...req.body,
      user_id: req.session.user_id,

    }, { where: {
      id: req.params.id}}
 );

    res.status(200).json(editPost);

  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  };

});

// ============= DELETE POST =============

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
