"use strict";
import mongoose from 'mongoose';
import mongooseUnique from 'mongoose-unique-validator';
import mongooseBcrypt from 'mongoose-bcrypt';
import a from './common';

async function validator(v) {
  var birthday = new Date(v.getTime());
  var today = new Date();
  var years = today.getFullYear() - birthday.getFullYear();
  await birthday.setFullYear(today.getFullYear());
  if (today < birthday) years--;
  return years > 14 && years < 110;
}

const userSchemavk = mongoose.Schema({
    idvk: {
      type: String,
      required: [true, "Idvk is required"],
      validate: {
        validator: v => typeof(v) === "string",
        message: "Idvk must be String"
      }
    },
    usernamevk: {
      type: String,
      required: [true, "Usernamevk is required"],
      validate: {
        validator: v => typeof(v) === "string",
        message: "Usernamevk must be String"
      }
    },
    a 
  },  { versionKey: false }
);

userSchemavk.plugin(mongooseUnique);
userSchemavk.plugin(mongooseBcrypt);

export default mongoose.model('Uservk', userSchemavk);