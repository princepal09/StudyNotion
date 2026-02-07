const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  users : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true,
    default : null
  }]
});

module.exports = mongoose.model("Contact", contactSchema);
