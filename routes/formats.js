const { Format } = require('../models/format');
const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const formats = await Format.find();

    return res.status(200).send({ code: 'format/found', message: "მივიღეთ ფორმატები", data: formats });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'format/not_found', message: 'შეცდომა ფორმატების ძებნისას' });
  }
})

router.post('/', verify, verifyAdmin, async (req, res) => {
  const formatObj = new Format(req.body);

  try {
    await formatObj.save();
    let data = await Format.find();

    return res.status(201).send({ code: 'format/created', message: 'ფორმატი წარმატებით შეიქმნა', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'format/not_created', message: 'შეცდომა ფორმატის შექმნისას' });
  }
})

router.delete('/:format_id', verify, verifyAdmin, async (req, res) => {
  const id = req.params.format_id;

  try {
    await Format.findByIdAndDelete(id);
    let data = await Format.find();

    return res.status(200).send({ code: 'format/deleted', message: 'ფორმატი წარმატებით წაიშალა', data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'format/not_deleted', message: 'შეცდომა ფორმატის წაშლისას' });
  }
})

module.exports = router;