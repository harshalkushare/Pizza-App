const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [5, "First name must be atleast 5 character long"],
      lowercase: true,
      trim: true, //auto remove extra space
      maxlength: [20, "First name should be less than or equal to 20"]
   },

   lastName: {
      type: String,
      required: [true, "lastt Name is required"],
      minlength: [5, "last name must be atleast 5 character long"],
      lowercase: true,
      trim: true, //auto remove extra space
      maxlength: [20, "last name should be less than or equal to 20"]
   },

   mobileNumber: {
      type: String,
      trim: true,
      maxlength: [10, "Phone no should be 10 number"],
      minlength: [10, "Phone no should be 10 number"],
      unique: [true, "Phone no is already in use"],
      required: [true, "Phone no Should be provided"]
   },

   email: {
      type: String,
      trim: true,
      required: [true, "pls Enter email"],
      unique: [true, "This email is already used"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },

   password: {
      type: String,
      required: [true, "Password should be provided"],
      minlength: [6, "Should be minimum 5 character long"]
   },

   role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
   },

   address: {
      type: String
   }
}, {
   timestamps: true
});

userSchema.pre('save', async function () {
   //here we can modify or secure user password before it is saved in mongodb
   const hashedPassword = await bcrypt.hash(this.password, 10);
   this.password = hashedPassword;
})

const user = mongoose.model("user", userSchema);

module.exports = user;
