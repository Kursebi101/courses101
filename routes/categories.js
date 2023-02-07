const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).send({ code: 'category/found', message: "Got Categories", data: categories });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'category/not_found', message: 'Something Went Wrong While Searching for Categories' });
  }
})

router.post('/', verify, verifyAdmin, async (req, res) => {
  const categoryObj = new Category(req.body);

  try {
    await categoryObj.save();
    let data = Category.find();

    return res.status(201).send({ code: 'category/created', message: 'Category Created Successfully', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'category/not_created', message: 'Something Went Wrong While Creating a Category' });
  }
})

router.delete('/:category_id', verify, verifyAdmin, async (req, res) => {
  const id = req.params.category_id;

  try {
    await Category.findByIdAndDelete(id);
    let data = Category.find();

    return res.status(200).send({ code: 'category/deleted', message: 'Category Deleted Successfully', data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'category/not_deleted', message: 'Something Went Wrong While Deleting a Category' });
  }
})

module.exports = router;