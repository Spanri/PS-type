/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(7);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseBcrypt = __webpack_require__(9);

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validator(v) {
  return v && /[^\s]{6,}/.test(v); //любой символ, кроме пробела и минимум 6 штук
}
var message = function message(name) {
  return name + ' must be longer than 6 symbols';
};

var obr = {
  max: Number,
  dist: Number,
  avtime: Number,
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
};

var track = {
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
  }
};

var userSchema = _mongoose2.default.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    index: true,
    validate: {
      validator: validator,
      message: message('Username')
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: validator,
      message: message('Password')
    }
  },
  name: String,
  experience: String,
  country: String,
  city: String,
  age: {
    type: Date,
    required: false,
    validate: {
      validator: function validator(v) {
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
  obr: obr,
  track: track
}, { versionKey: false });

userSchema.plugin(_mongooseUniqueValidator2.default);
userSchema.plugin(_mongooseBcrypt2.default);

exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//There is func for input error

//common error

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dberr = dberr;
exports.ok = ok;
exports.notFound = notFound;
exports.valerr = valerr;
function dberr(res) {
    res.status(500).send({
        status: 'error',
        message: 'Database error',
        message2: err.message
    });
}

//for change.js
function ok(res) {
    return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    });
}

//for authorization
function notFound(res) {
    return res.status(404).send({
        status: 'error',
        message: 'User not found'
    });
}

//for validation of token (time of life - 10days) ???
function valerr(res, err) {
    if (err.name === 'ValidationError') {
        var firstErr = err.errors[Object.keys(err.errors)[0]];
        var message = 'Unexpected error';
        if (firstErr.kind === 'unique') message = 'User with this username already exists';else if (firstErr.message) message = firstErr.message;
        return res.status(400).send({
            status: 'error',
            message: message
        });
    }
    if (err.name === 'CastError') {
        return res.status(400).send({
            status: 'error',
            message: err.message
        });
    }
    return dberr(res);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("mongoose-bcrypt");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _jsonwebtoken = __webpack_require__(5);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _helpers = __webpack_require__(3);

var _jwtDecode = __webpack_require__(6);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

//https://toster.ru/q/369662
//get token, time of life - 10days, secret in app.js
var getToken = function getToken(req, payload) {
  return _jsonwebtoken2.default.sign(payload, req.app.get('secret'), {
    expiresIn: '10d'
  });
};

var verifyPassword = function verifyPassword(user, password) {
  return new Promise(function (resolve, reject) {
    user.verifyPassword(password, function (err, isValid) {
      if (err) reject(err);else if (!isValid) reject(new Error('Invalid password'));else resolve();
    });
  });
};

router.post('/signup', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var userToCreate, user, payload, firstErr, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //create object with info about user
            userToCreate = {
              username: req.body.username,
              password: req.body.password,
              age: req.body.age,
              sex: req.body.sex,
              name: req.body.name,
              experience: req.body.experience,
              country: req.body.country,
              city: req.body.city
            };
            _context.prev = 1;
            _context.next = 4;
            return _user2.default.create(userToCreate);

          case 4:
            user = _context.sent;
            payload = { username: user.username, _id: user._id };
            return _context.abrupt('return', res.status(200).send({
              status: 'ok',
              message: 'User successfuly created',
              user: payload,
              token: getToken(req, payload)
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](1);

            if (!(_context.t0.name === 'ValidationError')) {
              _context.next = 18;
              break;
            }

            firstErr = _context.t0.errors[Object.keys(_context.t0.errors)[0]];
            message = 'Unexpected error';

            if (firstErr.kind === 'unique') message = 'User with this username already exists';else if (firstErr.message) message = firstErr.message;
            return _context.abrupt('return', res.status(400).send({
              status: 'error',
              message: message
            }));

          case 18:
            return _context.abrupt('return', (0, _helpers.dberr)(res));

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 9]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/signin', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var user, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = null;
            _context2.prev = 1;
            _context2.next = 4;
            return _user2.default.findOne({ username: req.body.username }).exec();

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return', (0, _helpers.notFound)(res));

          case 7:
            _context2.next = 9;
            return verifyPassword(user, req.body.password);

          case 9:
            _context2.next = 18;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](1);

            if (!(_context2.t0.message === 'Invalid password')) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt('return', res.status(400).send({
              status: 'error',
              message: 'Wrong password'
            }));

          case 17:
            return _context2.abrupt('return', (0, _helpers.dberr)(res));

          case 18:
            payload = { username: user.username, _id: user._id };
            return _context2.abrupt('return', res.status(200).send({
              status: 'ok',
              message: 'User successfuly authorized',
              token: getToken(req, payload)
            }));

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 11]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = router;

/***/ })
/******/ ]);