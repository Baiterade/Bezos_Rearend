const router = require('express').Router();
const { response } = require('express');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[{
      model: Product,
      as: 'Products',
    }]
  })
    .then((Tags) => {
      res.json(Tags);
    })
    .catch((err) => {
      response.json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include:[{
      model: Product,
      as: 'Products',
    }]
  })
    .then((Tag) => {
      res.json(Tag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({tag_name: req.body.tag_name},
    { where: { tag_id: req.params.id } },
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { tag_id: req.params.id } })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
