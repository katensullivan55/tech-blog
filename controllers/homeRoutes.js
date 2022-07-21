const routes = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const path=require('path')
//homepage display routes
routes.get('/',async (req,res)=>{
  try {
    
    // Get all alerts and JOIN with user data
    const blogData = await Blog.findAll({
      order: [['updated_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
          // order: 'id desc'
        },
      ],
    });
    const commentData = await Comment.findAll({
      include: [
       
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    // Pass serialized data and session flag into template
    // console.log('alerts', alerts);
    res.render('homepage', {
      blogs,
      comments,
      canDeleteComment: comments.user_id === req.session.user_id,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//get the login page from handlebars
routes.get('/login',async (req,res)=>{
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login')
})

//get the signup page from handlebars
routes.get('/signup',async (req,res)=>{
  res.render('signup')
})
// routes.get('/blog', (req, res) => {
//   res.render('createblog', {
//     loggedIn: req.session.loggedIn,
//   });
// });
routes.get('/edit/:id',withAuth, async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  });
// console.log( blogData)
  const blog = blogData.get({ plain: true });
  res.render('editblog', {
    ...blog,
    canDelete: blog.user_id === req.session.user_id,
    loggedIn: req.session.loggedIn,
  });
});

routes.get('/editcomment/:id',withAuth, async (req, res) => {
  const commentData = await Comment.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      
    ],
  });
// console.log( commentData)
  const comment = commentData.get({ plain: true });
  res.render('editcomment', {
    ...comment,
    canDeleteComment: comment.user_id === req.session.user_id,
    loggedIn: req.session.loggedIn,
  });
});
//view alert by id routes
routes.get('/blog/:id',withAuth, async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  });
  
// console.log( blogData)
  const blog = blogData.get({ plain: true });
  res.render('viewblog', {
    ...blog,
    canDelete: blog.user_id === req.session.user_id,
    loggedIn: req.session.loggedIn,
  });
});

//view alert by id routes
routes.get('/comment/:id',withAuth, async (req, res) => {
  const commentData = await Comment.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  const comments = commentData.map((comment) => comment.get({ plain: true }));
  res.render('viewblog', {
    ...comments,
    canDeleteComment: comments.user_id === req.session.user_id,
    loggedIn: req.session.loggedIn,
  });
});



//dashboard listing all the blogs from user-id
routes.get('/dashboard',withAuth, async (req, res) => {
  //router.get('/dashboard', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
console.log(user, user)
    // console.log('user', user);
    res.render('dashboard', {
      ...user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// //get the profile page from handlebars
routes.get('/createblog',withAuth, async (req,res)=>{
  res.render('createblog', {
    loggedIn: req.session.loggedIn,
  })
})
//get profile information by id 
routes.get('/profile/:id',withAuth, (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },

  })
    .then((results) => {
      // if no results, respond with 404 and inform user no results found for that ID
      if (!results) {
        res.status(404).json({
          message: `No username exit!.`,
        });
        return;
      }
      // else respond with results
      // res.json(results);
      // console.log(results);
      const ids = results.map((id) => id.get({ plain: true }));
      
      res.render('profile' , {
        ids,
        loggedIn: req.session.loggedIn,
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = routes;