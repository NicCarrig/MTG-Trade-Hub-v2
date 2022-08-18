const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Inventory } = require('../models');
const withAuth = require('../utils/auth');

// get all cards for currently logged in user
router.get('/', withAuth, (req, res) => {
    // console.log(req.session);
    console.log('======================');
    Inventory.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'user_id',
        'card_name',
        'img_uri'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const cards = dbPostData.map(cards => cards.get({ plain: true }));
        // console.log(cards);
        res.render('collection', { cards, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.get('/user/:id', (req, res) => {
  // console.log(req.params);
  console.log('======================');
  Inventory.findAll({
    where: {
      user_id: req.params.id
    },
    attributes: [
      'id',
      'user_id',
      'card_name',
      'img_uri'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const cards = dbPostData.map(cards => cards.get({ plain: true }));
      // console.log(cards);
      if(req.session.user_id){
        console.log(res);
        res.render(`user-inventory`, { cards, loggedIn: true });
      }
      else{
        res.render(`user-inventory`, { cards });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




// router.get('/user/:username', (req, res) => {
//   // console.log(req.params);
//   console.log('======================');
//   Inventory.findAll({
//     where: {
//       username: req.params.username
//     },
//     attributes: [
//       'id',
//       'user_id',
//       'card_name',
//       'img_uri'
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       const cards = dbPostData.map(cards => cards.get({ plain: true }));
//       // console.log(cards);
//       if(req.session.user_id){
//         console.log(res);
//         res.render(`user-inventory`, { cards, loggedIn: true });
//       }
//       else{
//         res.render(`user-inventory`, { cards });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });




module.exports = router;