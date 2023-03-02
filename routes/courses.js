const { Course } = require('../models/course');
const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();

    return res.status(200).send({ code: 'course/found', message: "მივიღეთ კურსები", data: courses });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'courses/not_found', message: 'შეცდომა კურსების ძებნისას' });
  }
})

router.post('/', verify, verifyAdmin, async (req, res) => {
  const courseObj = new Course(req.body);

  try {
    await courseObj.save();
    let data = await Course.find();

    return res.status(201).send({ code: 'course/created', message: 'კურსი წარმატებით შეიქმნა', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'course/not_created', message: 'შეცდომა კურსის შექმნისას' });
  }
})

router.delete('/:course_id', verify, verifyAdmin, async (req, res) => {
  const id = req.params.course_id;

  try {
    await Course.findByIdAndDelete(id);
    let data = await Course.find();

    return res.status(200).send({ code: 'course/deleted', message: 'კურსი წარმატებით წაიშალა', data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'course/not_deleted', message: 'შეცდომა კურსის წაშლისას' });
  }
})

module.exports = router;