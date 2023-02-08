const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).send({ code: 'category/found', message: "მივიღეთ კატეგორიები", data: categories });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'categories/not_found', message: 'შეცდომა კატეგორიების ძებნისას' });
  }
})

router.post('/', verify, verifyAdmin, async (req, res) => {
  const categoryObj = new Category(req.body);

  try {
    await categoryObj.save();
    let data = await Category.find();

    return res.status(201).send({ code: 'category/created', message: 'კატეგორია წარმატებით შეიქმნა', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'category/not_created', message: 'შეცდომა კატეგორიის შექმნისას' });
  }
})

router.delete('/:category_id', verify, verifyAdmin, async (req, res) => {
  const id = req.params.category_id;

  try {
    await Category.findByIdAndDelete(id);
    let data = await Category.find();

    return res.status(200).send({ code: 'category/deleted', message: 'კატეგორია წარმატებით წაიშალა', data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'category/not_deleted', message: 'შეცდომა კატეგორიის წაშლისას' });
  }
})

module.exports = router;