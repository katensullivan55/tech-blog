const router = require('express').Router();
const { Comment, User, Blog, } = require('../../models');
const withAuth = require('../../utils/auth');
// Routes for '/api/blog
// get all blog
router.get('/', (req, res) => {
  Blog.findAll({
    order: [['updated_at', 'DESC']]
  })
    .then((results) => {
      res.json(results);

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create an blog
router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id, 
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
// get specific blog/ blog page
router.get('/:id',  (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
      // ticker: req.params.ticker,
    },
    
  })
    .then((results) => {
      // if no results, respond with 404 and inform user no results found for that ID
      if (!results) {
        res.status(404).json({
          message: `No Blog found with ID ${req.params.id} found. Please try again with a different ID.`,
        });
        return;
      }
      // else respond with results
      res.json(results);
      // const tickers = results.map((id) => id.get({ plain: true }));
      console.log(results)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete an blog by id
router.delete('/:id',withAuth, (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
  //delete all the comments as well when blog-id deleted
  Comment.destroy({
    where: {
      blog_id: req.params.id
    }
  })
    .then((results) => {
      // if there are no results, set status to 404 and inform user that ID is not found
      if (!results) {
        res.status(404).json({
          message: `No Blog with Id ${req.params.id} found. Please try again with different ID.`,
        });
        return;
      }
      // else, respond with results
      res.json({ message: 'Blog deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update an blog (we using this to closed the blog)
router.put('/:id', withAuth, (req, res) => {
  Blog.update(
    {
      title: req.body.title,
      content: req.body.content,
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
      message: 'Blog update successfully',
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;