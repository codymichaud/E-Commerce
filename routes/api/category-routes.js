const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json(error)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });
    if (!categories) {
      res.status(404).json({ message: 'No categories found with this id.' })
    }
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json(error)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json(error)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const categories = await Category.update(req.body);
    res.status(200).json(categories)
  } catch (error) {
    res.status(400).json(error)
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {

  // delete a category by its `id` value
});

module.exports = router;
