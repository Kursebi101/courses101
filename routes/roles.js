const { Role } = require('../models/role');
const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();

    return res.status(200).send({ code: 'roles/found', message: "მივიღეთ როლები", data: roles });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'roles/not_found', message: "შეცდომა როლების ძებნისას" });
  }
})

router.post('/', verify, verifyAdmin, async (req, res) => {
  const roleObj = new Role(req.body);

  try {
    await roleObj.save();
    let data = await Role.find();

    return res.status(201).send({ code: 'role/created', message: 'როლი წარმატებით შეიქმნა', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'role/not_created', message: 'შეცდომა როლის შექმნისას' });
  }
})

router.delete('/:role_id', verify, verifyAdmin, async (req, res) => {
  const id = req.params.role_id;

  try {
    await Role.findByIdAndDelete(id);
    let data = await Role.find();

    return res.status(200).send({ code: 'role/deleted', message: 'როლი წარმატებით წაიშალა', data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'role/not_deleted', message: 'შეცდომა როლის შექმნისას' });
  }
})

module.exports = router;