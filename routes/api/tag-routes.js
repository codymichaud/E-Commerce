const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, attributes: ['product_name', 'price', 'stock', 'category_id'] }]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['product_name', 'price', 'stock', 'category_id'] }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'There are no tags with that id.' })
    };
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'There are no tags with this id.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'There are no tags with that id.' })
      return;
    };
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
  // delete on tag by its `id` value
});

module.exports = router;
