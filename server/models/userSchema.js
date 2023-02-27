import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
});

//Hashing password to secure
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcryptjs.hashSync(this.password, 10);
  }
  next();
});

//generate tokens to verify user
userSchema.methods.generateToken = async function () {
  try {
    let generatedToken = jwt.sign({ _id: this.id }, process.env.SECRET_KEY);
    // this.tokens = this.tokens.concat({ token: generatedToken });
    // await this.save();
    return generatedToken;
  } catch (error) {
    console.log(error);
  }
};

export default mongoose.model("Users", userSchema);
