import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, //for searching in database so it's useful to enable it herer
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //storing the images in cloudnary, (cloudnary Image ID)
      required: true,
    },
    coverImage: {
      type: String, //this will also store in cloudnary,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password ins required"],
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () { // middleware
  // this function takes time so we make this function asynchronous
  if (!this.isModified("password")) return next(); // it also a method
  this.password = await bcrypt.hash(this.password, 10); // im storing the password in hashing form
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  // inject  in this schema just like prototype
  return await bcrypt.compare(password, this.password); // it return true,false
};

userSchema.methods.genrateAcessToken = function () {
  //already which stored in database so i can access them
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.genrateRefreshToken = function () {
  //already which stored in datagase so i can access them
  return jwt.sign(
    // jwt takes to parameters,payloadm and secret key
    {
      _id: this._id, // this is payload
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
