const { Role } = require('../models/role');
const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const roles = await Role.find();

  return res.status(200).send({ code: 'role/found', message: "Got Roles", data: roles });
})

router.post('/', verify, verifyAdmin, async (req, res) => {
  const roleObj = new Role(req.body);

  try {
    await roleObj.save();
    let data = Role.find();

    return res.status(201).send({ code: 'role/created', message: 'Role Created Successfully', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'role/not_created', message: 'Something Went Wrong While Creating Role' });
  }
})

router.delete('/:role_id', verify, verifyAdmin, async (req, res) => {
  const id = req.params.role_id;

  try {
    await Role.findByIdAndDelete(id);
    let data = Role.find();

    return res.status(200).send({ code: 'role/deleted', message: 'Role Deleted Successfully', data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'role/not_deleted', message: 'Something Went Wrong While Deleting Role' });
  }
})

module.exports = router;