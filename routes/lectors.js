const { Lector } = require('../models/lector');
const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const data = await Lector.find();

    return res.status(200).send({ code: 'lectors/found', message: "მივიღეთ ლექტორები", data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'lectors/not_found', message: "შეცდომა ლექტორების ძებნისას" });
  }
})

router.post('/', verify, verifyAdmin, async (req, res) => {
  const academyObj = new Academy(req.body);

  try {
    await academyObj.save();
    let data = await Lector.find();

    return res.status(201).send({ code: 'lector/created', message: 'ლექტორი წარმატებით შეიქმნა', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'lector/not_created', message: 'შეცდომა ლექტორის შექმნისას' });
  }
})

router.delete('/:lector_id', verify, verifyAdmin, async (req, res) => {
  const id = req.params.lector_id;

  try {
    await Lector.findByIdAndDelete(id);
    let data = await Lector.find();

    return res.status(200).send({ code: 'lector/deleted', message: 'ლექტორი წარმატებით წაიშალა', data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'lector/not_deleted', message: 'შეცდომა ლექტორის შექმნისას' });
  }
})

module.exports = router;