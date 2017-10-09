"use strict";
import mongoose from 'mongoose';
import mongooseUnique from 'mongoose-unique-validator';
import mongooseBcrypt from 'mongoose-bcrypt';

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
    age: {
      type: Date,
      required: false,
      validate: {
        validator,
        message: 'Age must be > 14 and < 110'
      }
    },
    sex: {
      type: Number,
      min: [0, 'Sex must be >= 0'],
      max: [2, 'Sex must be <= 2'],
      required: false,
      validate: {
        validator: Number.isInteger,
        message: 'Sex must be an integer'
      }
    },
    latitude: {
      type: [Number],
      required: false
    },
    longitude: {
      type: [Number],
      required: false
    },
    speed: {
        type: [Number],
        required: false
    },
    obr: {
      max: Number,
      dist: Number,
      type: {
        type: String,
        default: "Статистики пока нет"
      }
    } 
  },  { versionKey: false }
);

userSchemavk.plugin(mongooseUnique);
userSchemavk.plugin(mongooseBcrypt);

export default mongoose.model('Uservk', userSchemavk);