const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  formatType: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  category: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  duration: {
    type: String,
    required: true,
    maxLength: 13,
  },
  hasCertificate: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  academy: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  lecturer: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  groupSchedule: {
    type: Array, // [[{day: 'Monday', hour: '13:00'}, {...}, {...}], [{...}, {...}, {...}]]
    required: true
  },
  startMonth: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  reviews: {
    type: Array,
    required: false
  }
});

const Course = mongoose.model("Courses", courseSchema);

module.exports.Course = Course;