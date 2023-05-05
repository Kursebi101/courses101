const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImageToSpaces } = require('../controllers/imageController');

router.post('/upload-image', upload.single('image'), uploadImageToSpaces);

module.exports = router;
