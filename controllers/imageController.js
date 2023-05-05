const s3 = require('../middleware/spaces');
const { extractErrorInfo } = require('../utils/errorUtils');

exports.uploadImageToSpaces = async (file) => {
  try {
    const fileContent = Buffer.from(file.buffer, 'binary');
    const params = {
      Bucket: 'courses101-space',
      Key: `${Date.now()}-${file.originalname}`,
      Body: fileContent,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const data = await s3.upload(params).promise();

    // res.status(200).json({ message: 'Image uploaded to DigitalOcean Spaces', imageURL: data.Location });
    return data.Location
  } catch (error) {
    console.log(error); // Add this line to help debug the issue
    // res.status(500).json({ message: 'Error uploading image', error: extractErrorInfo(error) });
    return ''
  }
};
