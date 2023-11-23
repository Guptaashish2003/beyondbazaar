import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { NextResponse } from "next/server";
const UserSchema = new mongoose.Schema( 
  
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      maxlength: [30, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },

    password: {
      type: String,
      minlength: [6, "Password cannot be less than 6 characters"],
      select: false,
    },
    phoneNo: {
      type: Number,
      minlength: [10, "Phone number cannot be less than 10 numbers"],
      maxlength: [10, "Phone number cannot be more than 10 numbers"],      
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "superadmin", "seller", "admin"],
    },
    address: [
      {
        name:{
          type: String,
        },
        street: {
          type: String,
          maxlength: [30, "Street cannot be more than 60 characters"],
        },

        city: {
          type: String,
          required: [true, "Please provide your city"],
          maxlength: [30, "City cannot be more than 60 characters"],
        },

        state: {
          type: String,
          required: [true, "Please provide your state"],
          maxlength: [30, "State cannot be more than 60 characters"],
        },

        zip: {
          type: String,
          required: [true, "Please provide your zip"],
          maxlength: [30, "Zip cannot be more than 60 characters"],
        },
        phoneNo: {
          type:Number,
        },
      }
    ],
    byGoogle:{
      type: Boolean,
      default: false
    },
    isEmailValid:{
      type: Boolean,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if(this.password){
    if (!this.isModified("password") || !this?.password) {
      return NextResponse.next()
    }
    
  
    this.password = await bcrypt?.hash(this.password, 10);
  }
});




UserSchema.method("getSignedToken", async function getSignedToken(password) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
});

//checking password

UserSchema.method("matchPassword", async function matchPassword(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
});

// genrating password reset token

UserSchema.method("getResetPasswordToken",function getResetPasswordToken() {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
})

// genrating email verification token

UserSchema.method("getEmailVerificationToken",function getEmailVerificationToken() {
  const emailToken = crypto.randomBytes(20).toString("hex");

  this.emailVerificationToken = crypto
      .createHash("sha256")
      .update(emailToken)
      .digest("hex");
  this.emailVerificationExpires = Date.now() + 10 * 60 * 1000;
  return emailToken;
})


const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
