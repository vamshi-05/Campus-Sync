const mongoose = require("mongoose");
const { Schema } = mongoose;

const facultySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  password: {
    type: String,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  facultyMobileNumber: {
    type: Number,
  },
  joiningYear: {
    type: Number,
    required: true,
  },
  subjectsCanTeach: [
    {
      type: String,
    },
  ],
  otp: {
    type: String,
  },
});

module.exports =
  mongoose.models.faculty || mongoose.model("faculty", facultySchema);
