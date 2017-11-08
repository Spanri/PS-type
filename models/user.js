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
      required: false,
      validate: {
        validator: (v) => {
          var birthday = new Date(v.getTime());
          var today = new Date();
          var years = today.getFullYear() - birthday.getFullYear();
          birthday.setFullYear(today.getFullYear());
          if (today < birthday) years--;
          return years > 14 && years < 110;
        },
        message: 'Age must be > 14 and < 110'
      }
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
    date: {
      type: [Date],
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
