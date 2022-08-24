const faker = require('faker');
const db = require('../config/connection')
const { Comment, User, Post, Inventory } = require('../models')



db.once('open', async () => {

  await User.deleteMany({});
  await Inventory.deleteMany({});
  await Post.deleteMany({});

  // USERS + FRIENDS
  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    

    userData.push({ username, email, password });
  }

   const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }
// -------------------------------------------------------------------

// POSTS
 let createdPosts = []

 for (let i = 0; i < 50; i += 1) {
   const postBody = faker.lorem.words(Math.round(Math.random() * 200) + 1);
   const title = faker.lorem.words(Math.round(Math.random() * 4) + 1);

   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
   const { username, _id: userId } = createdUsers.ops[randomUserIndex];

   const createdPost = await Post.create({ title, postBody, username });

   const updatedUser = await User.updateOne(
     { _id: userId },
     { $push: { posts: createdPost._id } }
   );

   createdPosts.push(createdPost)
 }
 
 // -----------------------------------------------------------
 


 // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const { _id: postId } = createdPosts[randomPostIndex];

    await Post.updateOne(
      { _id: postId },
      { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );

  }
 
  let createdInventory = []

  for (let i = 0; i < 50; i += 1) {
    const card_name = faker.lorem.words(Math.round(Math.random() * 200) + 1);
    const scryfall_id = faker.lorem.words(Math.round(Math.random() * 4) + 1);
    const img_uri = faker.name.firstName;
    
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdCard = await Inventory.create({ username, card_name, scryfall_id, img_uri });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { inventory: createdCard._id } }
    );

    createdInventory.push(createdCard)
  }
  console.log('all done!');
  process.exit(0);
});





// db.once('open', async () => {
//   try {
//     await User.deleteMany({});
//     await Comment.deleteMany({});
//     await Inventory.deleteMany({});
//     await Post.deleteMany({});
    

//     await User.create(userSeeds);
//     await Comment.create(commentSeeds)
//     await Inventory.create(inventorySeeds)
//     await Post.create(postSeeds)

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
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   console.log('all done!');
//   process.exit(0);
// });

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

