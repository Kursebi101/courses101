const { Academy } = require('../models/academy');
const multer = require('multer');
const upload = multer();
const express = require('express');
const router = express.Router();
const { verify, verifyAdmin } = require('../middleware/auth');
const { uploadImageToSpaces } = require('../controllers/imageController');
const { Lector } = require('../models/lector');


router.get('/', async (req, res) => {
  try {
    const data = await Academy.find();

    return res.status(200).send({ code: 'academies/found', message: "მივიღეთ აკადემიები", data: data });
  } catch (err) {
    console.error(err);
    return res.send({ code: 'academies/not_found', message: "შეცდომა აკადემიების ძებნისას" });
  }
})

router.post('/', verify, verifyAdmin, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'avatar', maxCount: 50 }]), async (req, res) => {
  try {
    let logoUrl = null;
    let lectorIDs = [];

    // Call the uploadImageToSpaces middleware for logo
    if (req.files.logo) {
      logoUrl = await uploadImageToSpaces(req.files.logo[0]);
    }
    // Call the uploadImageToSpaces middleware for avatars
    for (let index in req.body.lectors) {
      let lectorURL = await uploadImageToSpaces(req.files.avatar[index]);
      let lectorObj = new Lector({
        ...req.body.lectors[index],
        avatar: lectorURL
      });

      let savedLector = await lectorObj.save();
      console.log(savedLector, '[LECTOR]')
      lectorIDs.push(savedLector._id);
    }

    const academyObj = new Academy({
      academyName: req.body.academyName,
      description: req.body.description,
      logo: logoUrl,
      lectors: lectorIDs
   
    });

    await academyObj.save();
    let data = await Academy.find();

    return res.status(201).send({ code: 'academy/created', message: 'აკადემია წარმატებით შეიქმნა', data: data });

  } catch (err) {
    console.error(err);
    return res.send({ code: 'academy/not_created', message: 'შეცდომა აკადემიის შექმნისას' });
  }
});

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