const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Inventory } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/:id', (req, res) => {
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No cards found for this user' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post('/', withAuth, (req, res) => {
    console.log(req);
    Inventory.create({
      card_name: req.body.card_name,
      img_uri: req.body.img_uri,
      user_id: req.session.user_id,
      scryfall_id: req.body.scryfall_id
    })
      .then(dbInvData => res.json(dbInvData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Inventory.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbInvData => {
      if (!dbInvData) {
        res.status(404).json({ message: 'No card found with this id' });
        return;
      }
      res.json(dbInvData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;