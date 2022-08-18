const faker = require('faker');
const userSeeds = require('./user-seeds.json');
// const postSeeds = require('./post-seeds');
// const commentSeeds = require('./comment-seeds');
// const inventorySeeds = require('./inv-seeds');
const db = require('../config/connection')
const { User, Comment, Inventory, Post } = require('../models')

db.once('open', async () => {
  try {
    await User.deleteMany({});
    // await Comment.deleteMany({});
    // await Inventory.deleteMany({});
    // await Post.deleteMany({});
    

    await User.create(userSeeds);
    // await Comment.create(commentSeeds)
    // await Inventory.create(inventorySeeds)
    // await Post.create(postSeeds)

    // for (let i = 0; i < commentSeeds.length; i++) {
    //   const { _id, commentAuthor } = await Comment.create(commentSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: commentAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

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

