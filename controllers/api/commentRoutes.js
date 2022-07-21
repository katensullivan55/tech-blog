const router = require('express').Router();
const  {Comment}  = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({
        // order: [['created_at', 'DESC']]
    })
      .then((results) => {
        res.json(results);
  
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//add comment 
router.post('/', async (req, res) => {
try {
    const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id
    });

    res.status(200).json(newComment);
} catch (err) {
    res.status(400).json(err);
}
});

// delete comment by id
router.delete('/:id',withAuth, (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })
      .then((results) => {
        // if there are no results, set status to 404 and inform user that ID is not found
        if (!results) {
          res.status(404).json({
            message: `No comment with Id ${req.params.id} found. Please try again with different ID.`,
          });
          return;
        }
        // else, respond with results
        res.json({ message: 'Comment deleted successfully' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // update comment
  router.put('/:id', withAuth, (req, res) => {
    Comment.update(
      {
        comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    )
    .then((results) => {
      res.json({
        message: 'Comment update successfully',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  

module.exports = router;