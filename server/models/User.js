const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Ensure the email is stored in lowercase
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please enter a valid email address'] // Validates email format
    },
    password: {
        type: String,
        required: true,
        select: true // Prevent password from being returned by default in queries
    }
}, { timestamps: true }); // Adds createdAt & updatedAt fields

// Before saving, hash the password if it's being modified
UserSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    // Only hash the password if it's new or modified
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next(); // Proceed with saving
    } catch (error) {
      next(error); // Pass the error if hashing fails
    }
  } else {
    next(); // Proceed without modification if the password is not changed
  }
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
