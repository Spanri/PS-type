"use strict";
const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');
const mongooseBcrypt = require('mongoose-bcrypt');

function validator(v) {
  return v && (/[^\s]{6,}/).test(v);  //любой символ, кроме пробела и минимум 6 штук
}
const message = name => `${name} must be longer than 6 symbols`;

const obr = {
  max: Number,
  time: Date,
  dist: Number,
  avtime: Date,
  radvar: Number,
  date: {
    type: [Date],
    required: false
  },
  type: {
    type: String,
    default: "Статистики пока нет",
    required: false
  }
}

const accel = {
  x: {
    type: [Number],
    required: false
  },
  y: {
    type: [Number],
    required: false
  },
  z: {
    type: [Number],
    required: false
  },
  type: {
    type: [String],
    required: false
  },
  date: {
    type: [String],
    required: false
  },
  time: {
    type: [String],
    required: false
  },
  lat: {
    type: [Number],
    required: false
  },
  lon: {
    type: [Number],
    required: false
  },
}

const track = {
  dateTrack: {
    type: [String],
    required: false
  },
  startTime: {
    type: [String],
    required: false
  },
  stopTime: {
    type: [String],
    required: false
  },
  points: {
    type: [String],
    required: false
  },
}

const map = {
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
    type: [String],
    required: false
  },
}

const about = {
  experience: String,
  country: String,
  city: String,
}

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
  name: String,
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
  
  obr, // результаты конечной обработки
  track, // треки
  accel, // акселерометр
  about, // то, что пользователь вводит сам
  map, // широта, долгота, скорость, дата
}, { versionKey: false }
);

userSchema.plugin(mongooseUnique);
userSchema.plugin(mongooseBcrypt);

module.exports = mongoose.model('User', userSchema);
