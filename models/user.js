"use strict";
import mongoose from 'mongoose';
import mongooseUnique from 'mongoose-unique-validator';
import mongooseBcrypt from 'mongoose-bcrypt';

function validator(v) {
  return v && (/[^\s]{6,}/).test(v);  //любой символ, кроме пробела и минимум 6 штук
}
const message = name => `${name} must be longer than 6 symbols`;

const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      index: true,
      validate: {
        validator,
        message: message('Username')
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator,
        message: message('Password')
      }
    },
    age: {
      type: Date,
      required: false
      // min: [Date.now() - Date('2014-01-01'), 'Age must be >= 18'],
      // max: [Date('2014-01-01'), 'Age must be <= 110'],
      // validate: {
      //   validator: v => {
      //     return v && (/^\d{2}-\d{2}-\d{4}/).test(v);
      //   },
      //   message: 'Age must be a date'
      // }
    },
    sex: {
      type: Number,
      min: [0, 'Sex must be >= 0'],
      max: [2, 'Sex must be <= 2'],
      required: false,
      default: 0,
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

userSchema.plugin(mongooseUnique);
userSchema.plugin(mongooseBcrypt);

export default mongoose.model('User', userSchema);
