const { Academy } = require('../models/academy');
const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const data = await Academy.find();

    return res.status(200).send({ code: 'academies/found', message: "მივიღეთ აკადემიები", data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'academies/not_found', message: "შეცდომა აკადემიების ძებნისას" });
  }
})

router.post('/', verify, verifyAdmin, async (req, res) => {
  const academyObj = new Academy(req.body);

  try {
    await academyObj.save();
    let data = await Academy.find();

    return res.status(201).send({ code: 'academy/created', message: 'აკადემია წარმატებით შეიქმნა', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'academy/not_created', message: 'შეცდომა აკადემიის შექმნისას' });
  }
})

router.delete('/:academy_id', verify, verifyAdmin, async (req, res) => {
  const id = req.params.academy_id;

  try {
    await Academy.findByIdAndDelete(id);
    let data = await Academy.find();

    return res.status(200).send({ code: 'academy/deleted', message: 'აკადემია წარმატებით წაიშალა', data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'academy/not_deleted', message: 'შეცდომა აკადემიის შექმნისას' });
  }
})

module.exports = router;