const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRouter = require("./routes/users");
const roleRouter = require('./routes/roles');
const categoryRouter = require('./routes/categories');
const formatRouter = require('./routes/formats');
const courseRouter = require('./routes/courses');
const academyRouter = require('./routes/academies');
const lecturerRouter = require('./routes/lectors');
const uploadsRouter = require('./routes/uploads');

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.NODE_ENV === 'production' ? process.env.REMOTE_MONGO_DB_URI : process.env.LOCAL_MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const whiteList = [
  'https://kursebi.com',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('Origin rejected: ', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['access_token', 'uid']
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/api/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRouter);
app.use('/api/roles', roleRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/formats', formatRouter);
app.use('/api/courses', courseRouter);
app.use('/api/academies', academyRouter);
app.use('/api/lectors', lecturerRouter);
app.use('/api/uploads', uploadsRouter);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
