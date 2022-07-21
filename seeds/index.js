const sequelize = require('../config/connection');
const { User, Alert, Comment } = require('../models');


// seedDatabase();
const seedUsers = require('./user_seeds');
const seedBlogs = require('./blog_seeds');
const seedComment = require('./comment_seeds');

//Will seedall
const seedAll = async () => {
    await sequelize.sync({force:false});
    console.log(`DB SYNCED`);
    await seedUsers();
    console.log('USERS SEEDED');
    await seedBlogs();
    console.log('BLOG SEEDED');
    await seedComment();
    console.log(`COMMENT SEEDED`);
    process.exit(0);
};

seedAll();