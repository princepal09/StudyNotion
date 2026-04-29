const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, "Lastname is required"],

  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],

  },
  phoneNo: {
    type: Number,
    required: [true, "Phone is required"],

  },
  countrycode: {
    type: String,
    required: [true, "CountryCode is required"],

  },
  message: {
    type: String,
    required: true,
    required: [true, "Message is required"],

  },
  // users : [{
  //   type : mongoose.Schema.Types.ObjectId,
  //   ref : "User",
  //   required : true,
  //   default : null
  // }]
});

module.exports = mongoose.model("Contact", contactSchema);
