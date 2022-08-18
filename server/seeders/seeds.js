const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedInv = require('./inv-seeds');
const db = require('../config/connection')


db.once('open', async () => {
  try {


  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
})

// SEQUELIZE 

// const seedAll = async () => {
//   await sequelize.sync({ force: true });
//   console.log('--------------');
//   await seedUsers();
//   console.log('--------------');

//   await seedPosts();
//   console.log('--------------');

//   await seedComments();
//   console.log('--------------');

//   await seedInv();
//   console.log('--------------');

// };

