(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose-bcrypt");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(3);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseBcrypt = __webpack_require__(4);

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

var _common = __webpack_require__(11);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validator(v) {
  return v && /[^\s]{6,}/.test(v); //любой символ, кроме пробела и минимум 6 штук
}
var message = function message(name) {
  return name + ' must be longer than 6 symbols';
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
  a: _common2.default
}, { versionKey: false });

userSchema.plugin(_mongooseUniqueValidator2.default);
userSchema.plugin(_mongooseBcrypt2.default);

exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var validator = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(v) {
    var birthday, today, years;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            birthday = new Date(v.getTime());
            today = new Date();
            years = today.getFullYear() - birthday.getFullYear();
            _context.next = 5;
            return birthday.setFullYear(today.getFullYear());

          case 5:
            if (today < birthday) years--;
            return _context.abrupt('return', years > 14 && years < 110);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function validator(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(3);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseBcrypt = __webpack_require__(4);

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var userSchemavk = _mongoose2.default.Schema({
  idvk: {
    type: String,
    required: [true, "Idvk is required"],
    validate: {
      validator: function validator(v) {
        return typeof v === "string";
      },
      message: "Idvk must be String"
    }
  },
  usernamevk: {
    type: String,
    required: [true, "Usernamevk is required"],
    validate: {
      validator: function validator(v) {
        return typeof v === "string";
      },
      message: "Usernamevk must be String"
    }
  },
  age: {
    type: Date,
    required: false,
    validate: {
      validator: validator,
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
  date: {
    type: [Date],
    required: false
  },
  obr: {
    max: Number,
    dist: Number,
    avtime: Number,
    radvar: Number,
    date: {
      type: [Number],
      required: false
    },
    type: {
      type: String,
      default: "Статистики пока нет"
    }
  }
}, { versionKey: false });

userSchemavk.plugin(_mongooseUniqueValidator2.default);
userSchemavk.plugin(_mongooseBcrypt2.default);

exports.default = _mongoose2.default.model('Uservk', userSchemavk);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

function ok(res) {
    return res.status(200).send({
        status: 'ok',
        message: 'User successfuly changed'
    });
}

function notFound(res) {
    return res.status(404).send({
        status: 'error',
        message: 'User not found'
    });
}

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

//токены для запросов в постмане, пользователи asdfgh
//vk eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHZrIjoiYXNkZmdoIiwiX2lkIjoiNTk2NTNjYzM2NzA5MzExOTQ0YzRhZjlmIiwiaWF0IjoxNDk5ODA2OTE2LCJleHAiOjE1MDA2NzA5MTZ9.a1tV8GwWQhtzZ89F3kkNYLlRoE10VbOx8MkMxjTGDFU
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZGZnaCIsIl9pZCI6IjU5NjUzZWE1NjcwOTMxMTk0NGM0YWZhMCIsImlhdCI6MTQ5OTgwNzM5NywiZXhwIjoxNTAwNjcxMzk3fQ.Ww4xxFd65Oez0hVPED4mH4NaiVn9IeD8Hl0DckjEdJY

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usSch = {
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
    obr: {
        max: Number,
        dist: Number,
        avtime: Number,
        radvar: Number,
        date: {
            type: [Number],
            required: false
        },
        type: {
            type: String,
            default: "Статистики пока нет"
        }
    }
};

exports.default = usSch;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var obr = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(res, user) {
    var cl1, cl2, sl1, sl2, cdelta, sdelta, x, y, len, _i, lat1, lat2, long1, long2, len2, at, _i2, maxlat, minlat, maxlon, minlon, _i3;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Math.max.apply(Math, user.a.speed);

          case 3:
            user.a.obr.max = _context3.sent;

            if (user.a.obr.max > 100) user.a.obr.type = "Лихач";else if (user.a.obr.max < 40) user.a.obr.type = "Черепашка";else user.a.obr.type = "Обычный человек";

            //max dist
            cl1 = void 0, cl2 = void 0, sl1 = void 0, sl2 = void 0, cdelta = void 0, sdelta = void 0, x = void 0, y = void 0;

            user.a.obr.dist = 0;
            len = 0;

            for (_i = 1; user.a.date[_i] != null; _i++) {
              len++;
              lat1 = user.a.latitude[_i - 1] * M_PI / 180;
              lat2 = user.a.latitude[_i] * M_PI / 180;
              long1 = user.a.longitude[_i - 1] * M_PI / 180;
              long2 = user.a.longitude[_i] * M_PI / 180;


              cl1 = cos(lat1);
              cl2 = cos(lat2);
              sl1 = sin(lat1);
              sl2 = sin(lat2);
              cdelta = cos(long2 - long1);
              sdelta = sin(long2 - long1);

              y = sqrt(pow(cl2 * sdelta, 2) + pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
              x = sl1 * sl2 + cl1 * cl2 * cdelta;

              user.a.obr.dist += atan2(y, x) * 6372795;
            }
            user.a.obr.dist /= 1000;

            //max time
            len2 = 0;

            while (user.a.obr.time[i] != null) {
              len2++;
            }user.a.obr.time[len2 + 1] = user.a.date[len] - user.a.date[0];

            //average time
            at = 0;

            for (_i2 = 1; user.a.obr.time[_i2] != null; _i2++) {
              at += user.a.obr.time[_i2];
            }user.a.obr.avtime = at / (len2 + 1);

            //the radius variation
            maxlat = 0, minlat = 5, maxlon = 0, minlon = 5;

            for (_i3 = 0; user.a.latitude[_i3] != null; _i3++) {
              if (user.a.latitude[_i3] > maxlat) maxlat = user.a.latitude[_i3];
              if (user.a.latitude[_i3] < minlat) minlat = user.a.latitude[_i3];
              if (user.a.longitude[_i3] > maxlat) maxlat = user.a.longitude[_i3];
              if (user.a.longitude[_i3] < minlat) minlat = user.a.longitude[_i3];
            }
            user.a.obr.radvar = sqrt(pow(maxlat - minlat, 2) + pow(maxlon - minlon, 2));

            //clear arrays
            _context3.next = 21;
            return function () {
              for (var _i4 = 0; user.a.date[_i4] != null; _i4++) {
                user.a.date[_i4] = null;
                user.a.speed[_i4] = null;
                user.a.latitude[_i4] = null;
                user.a.longitude[_i4] = null;
              }
            };

          case 21:
            _context3.t0 = _context3.sent;
            (0, _context3.t0)();
            _context3.next = 25;
            return user.save();

          case 25:
            return _context3.abrupt('return', (0, _helpers.ok)(res));

          case 28:
            _context3.prev = 28;
            _context3.t1 = _context3['catch'](0);
            (0, _helpers.valerr)(res, _context3.t1);console.error(_context3.t1);
          case 32:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 28]]);
  }));

  return function obr(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var _path = __webpack_require__(5);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _user = __webpack_require__(6);

var _user2 = _interopRequireDefault(_user);

var _uservk = __webpack_require__(7);

var _uservk2 = _interopRequireDefault(_uservk);

var _helpers = __webpack_require__(8);

var _jwtDecode = __webpack_require__(10);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _jsonwebtoken = __webpack_require__(9);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/pos', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _jsonwebtoken2.default.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, decoded) {
                var token, user, uservk;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 4;
                          break;
                        }

                        res.status(500).send({
                          status: 'error',
                          message: 'Verify error',
                          message2: err.message
                        });
                        _context.next = 41;
                        break;

                      case 4:
                        token = decoded;
                        user = null, uservk = null;
                        _context.prev = 6;
                        _context.next = 9;
                        return _user2.default.findOne({ _id: token._id }).exec();

                      case 9:
                        user = _context.sent;
                        _context.next = 12;
                        return _uservk2.default.findOne({ _id: token._id }).exec();

                      case 12:
                        uservk = _context.sent;

                        if (!(!user && !uservk)) {
                          _context.next = 15;
                          break;
                        }

                        return _context.abrupt('return', (0, _helpers.notFound)(res));

                      case 15:
                        _context.next = 20;
                        break;

                      case 17:
                        _context.prev = 17;
                        _context.t0 = _context['catch'](6);
                        return _context.abrupt('return', (0, _helpers.dberr)(res));

                      case 20:
                        if (!user) {
                          _context.next = 32;
                          break;
                        }

                        _context.prev = 21;
                        _context.next = 24;
                        return _user2.default.update({ _id: user._id }, {
                          $push: {
                            'a.latitude': { $each: [req.body.latitude] },
                            'a.longitude': { $each: [req.body.longitude] },
                            'a.speed': { $each: [req.body.speed] },
                            'a.date': { $each: [req.body.date] }
                          }
                        });

                      case 24:
                        return _context.abrupt('return', res.status(200).send({
                          status: 'ok',
                          message: 'Data successfuly processed'
                        }));

                      case 27:
                        _context.prev = 27;
                        _context.t1 = _context['catch'](21);
                        (0, _helpers.valerr)(res, _context.t1);

                      case 30:
                        _context.next = 41;
                        break;

                      case 32:
                        _context.prev = 32;
                        _context.next = 35;
                        return _uservk2.default.update({ _id: uservk._id }, {
                          $push: {
                            'a.latitude': { $each: [req.body.latitude] },
                            'a.longitude': { $each: [req.body.longitude] },
                            'a.speed': { $each: [req.body.speed] },
                            'a.date': { $each: [req.body.date] }
                          }
                        });

                      case 35:
                        return _context.abrupt('return', res.status(200).send({
                          status: 'ok',
                          message: 'Data successfuly processed'
                        }));

                      case 38:
                        _context.prev = 38;
                        _context.t2 = _context['catch'](32);
                        (0, _helpers.valerr)(res, _context.t2);
                      case 41:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined, [[6, 17], [21, 27], [32, 38]]);
              }));

              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/obr', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _jsonwebtoken2.default.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(err, decoded) {
                var token, user, uservk;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!err) {
                          _context4.next = 4;
                          break;
                        }

                        res.status(500).send({
                          status: 'error',
                          message: 'Verify error',
                          message2: err.message
                        });
                        _context4.next = 21;
                        break;

                      case 4:
                        token = decoded;
                        user = null, uservk = null;
                        _context4.prev = 6;
                        _context4.next = 9;
                        return _user2.default.findOne({ _id: token._id }).exec();

                      case 9:
                        user = _context4.sent;
                        _context4.next = 12;
                        return _uservk2.default.findOne({ _id: token._id }).exec();

                      case 12:
                        uservk = _context4.sent;

                        if (!(!user && !uservk)) {
                          _context4.next = 15;
                          break;
                        }

                        return _context4.abrupt('return', (0, _helpers.notFound)(res));

                      case 15:
                        _context4.next = 20;
                        break;

                      case 17:
                        _context4.prev = 17;
                        _context4.t0 = _context4['catch'](6);
                        return _context4.abrupt('return', (0, _helpers.dberr)(res));

                      case 20:
                        if (user) obr(res, user);else obr(res, uservk);

                      case 21:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined, [[6, 17]]);
              }));

              return function (_x11, _x12) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}());

exports.default = router;

/***/ })
/******/ ])));