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
    firstEnt: {
      type: Boolean,
      required: false
    }
});

userSchemavk.plugin(mongooseUnique);
userSchemavk.plugin(mongooseBcrypt);

export default mongoose.model('Uservk', userSchemavk);