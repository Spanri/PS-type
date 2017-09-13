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
      type: Number,
      min: [14, 'Age must be >= 14'],
      max: [110, 'Age must be <= 110'],
      required: false,
      validate: {
        validator: Number.isInteger,
        message: 'Age must be an integer'
      }
    },
    sex: {
      type: Boolean,
      required: false,
      validate: {
        validator: v => typeof(v) === "boolean",
        message: "Sex must be Boolean (true for male)"
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
