const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      as: 'Product',
    }
  }).then((cats) => { res.json(cats); });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: {
      model: Product,
      as: 'Product',
    }
  }).then((cat) => { res.json(cat); });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCat) => { res.json(newCat) })
    .catch((err) => { res.json(err) });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
    { where: { category_id: req.params.id } }
  )
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.id,
    },
  })
    .then((deletedCat) => {
      res.json(deletedCat);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
