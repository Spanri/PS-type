"use strict";
import mongoose from 'mongoose';
import mongooseUnique from 'mongoose-unique-validator';
import mongooseBcrypt from 'mongoose-bcrypt';

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
      required: false
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