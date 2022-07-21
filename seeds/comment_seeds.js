const Comment = require('../models/Comment');

const commentSeeds = [
    {
        "comment": "testing testing",
      "blog_id": 1,
      "user_id" : 3,
      },
      {
        "comment": "testing 2",
      "blog_id": 2,
      "user_id" : 3,
      },
      {
        "comment": "testing 3",
      "blog_id": 1,
      "user_id" : 2,
      },
      {
        "comment": "testing 4",
      "blog_id": 1,
      "user_id" : 1,
      }


];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;