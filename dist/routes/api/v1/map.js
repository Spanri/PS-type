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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var obr = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(res, user) {
    var cl1, cl2, sl1, sl2, cdelta, sdelta, x, y, len, _i, lat1, lat2, long1, long2, len2, at, _i2, maxlat, minlat, maxlon, minlon, _i3;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return Math.max.apply(Math, user.speed);

          case 3:
            user.obr.max = _context7.sent;

            if (user.obr.max > 100) user.obr.type = "Лихач";else if (user.obr.max < 40) user.obr.type = "Черепашка";else user.obr.type = "Обычный человек";

            //max dist
            cl1 = void 0, cl2 = void 0, sl1 = void 0, sl2 = void 0, cdelta = void 0, sdelta = void 0, x = void 0, y = void 0;

            user.obr.dist = 0;
            len = 0;

            for (_i = 1; user.date[_i] != null; _i++) {
              len++;
              lat1 = user.latitude[_i - 1] * M_PI / 180;
              lat2 = user.latitude[_i] * M_PI / 180;
              long1 = user.longitude[_i - 1] * M_PI / 180;
              long2 = user.longitude[_i] * M_PI / 180;


              cl1 = cos(lat1);
              cl2 = cos(lat2);
              sl1 = sin(lat1);
              sl2 = sin(lat2);
              cdelta = cos(long2 - long1);
              sdelta = sin(long2 - long1);

              y = sqrt(pow(cl2 * sdelta, 2) + pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
              x = sl1 * sl2 + cl1 * cl2 * cdelta;

              user.obr.dist += atan2(y, x) * 6372795;
            }
            user.obr.dist /= 1000;

            //max time
            len2 = 0;

            while (user.obr.time[i] != null) {
              len2++;
            }user.obr.time[len2 + 1] = user.date[len] - user.date[0];

            //average time
            at = 0;

            for (_i2 = 1; user.obr.time[_i2] != null; _i2++) {
              at += user.obr.time[_i2];
            }user.obr.avtime = at / (len2 + 1);

            //the radius variation
            maxlat = 0, minlat = 5, maxlon = 0, minlon = 5;

            for (_i3 = 0; user.latitude[_i3] != null; _i3++) {
              if (user.latitude[_i3] > maxlat) maxlat = user.latitude[_i3];
              if (user.latitude[_i3] < minlat) minlat = user.latitude[_i3];
              if (user.longitude[_i3] > maxlat) maxlat = user.longitude[_i3];
              if (user.longitude[_i3] < minlat) minlat = user.longitude[_i3];
            }
            user.obr.radvar = sqrt(pow(maxlat - minlat, 2) + pow(maxlon - minlon, 2));

            //clear arrays
            _context7.next = 21;
            return function () {
              for (var _i4 = 0; user.date[_i4] != null; _i4++) {
                user.date[_i4] = null;
                user.speed[_i4] = null;
                user.latitude[_i4] = null;
                user.longitude[_i4] = null;
              }
            };

          case 21:
            _context7.t0 = _context7.sent;
            (0, _context7.t0)();
            _context7.next = 25;
            return user.save();

          case 25:
            _context7.next = 31;
            break;

          case 27:
            _context7.prev = 27;
            _context7.t1 = _context7['catch'](0);
            (0, _helpers.valerr)(res, _context7.t1);console.error(_context7.t1);
          case 31:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this, [[0, 27]]);
  }));

  return function obr(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _helpers = __webpack_require__(3);

var _jwtDecode = __webpack_require__(6);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _jsonwebtoken = __webpack_require__(5);

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
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, token) {
                var user;
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
                        _context.next = 19;
                        break;

                      case 4:
                        user = null;
                        _context.prev = 5;
                        _context.next = 8;
                        return _user2.default.findOne({ _id: token._id }).exec();

                      case 8:
                        user = _context.sent;

                        if (user) {
                          _context.next = 11;
                          break;
                        }

                        return _context.abrupt('return', (0, _helpers.notFound)(res));

                      case 11:
                        _context.next = 13;
                        return _user2.default.update({ _id: user._id }, {
                          $push: {
                            latitude: { $each: [req.body.latitude] },
                            longitude: { $each: [req.body.longitude] },
                            speed: { $each: [req.body.speed] },
                            date: { $each: [req.body.date] }
                          }
                        });

                      case 13:
                        return _context.abrupt('return', res.status(200).send({
                          status: 'ok',
                          message: 'Data successfuly processed'
                        }));

                      case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](5);
                        return _context.abrupt('return', (0, _helpers.dberr)(res));

                      case 19:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined, [[5, 16]]);
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

router.post('/startPos', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _jsonwebtoken2.default.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(err, token) {
                var user;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!err) {
                          _context3.next = 4;
                          break;
                        }

                        res.status(500).send({
                          status: 'error',
                          message: 'Verify error',
                          message2: err.message
                        });
                        _context3.next = 19;
                        break;

                      case 4:
                        user = null;
                        _context3.prev = 5;
                        _context3.next = 8;
                        return _user2.default.findOne({ _id: token._id }).exec();

                      case 8:
                        user = _context3.sent;

                        if (user) {
                          _context3.next = 11;
                          break;
                        }

                        return _context3.abrupt('return', (0, _helpers.notFound)(res));

                      case 11:
                        _context3.next = 13;
                        return _user2.default.update({ _id: user._id }, {
                          $push: {
                            'track.dateTrack': { $each: [req.body.dateTrack] },
                            'track.startTime': { $each: [req.body.StartTime] }
                          }
                        });

                      case 13:
                        return _context3.abrupt('return', (0, _helpers.ok)(res));

                      case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3['catch'](5);
                        return _context3.abrupt('return', (0, _helpers.dberr)(res));

                      case 19:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined, [[5, 16]]);
              }));

              return function (_x9, _x10) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());

router.post('/obr', function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _jsonwebtoken2.default.verify(req.body.token, '5i39Tq2wX00PC0QEuA350vi7oDB2nnq3', function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(err, token) {
                var user;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!err) {
                          _context5.next = 4;
                          break;
                        }

                        res.status(500).send({
                          status: 'error',
                          message: 'Verify error',
                          message2: err.message
                        });
                        _context5.next = 26;
                        break;

                      case 4:
                        user = null;
                        _context5.prev = 5;
                        _context5.next = 8;
                        return _user2.default.findOne({ _id: token._id }).exec();

                      case 8:
                        user = _context5.sent;

                        if (user) {
                          _context5.next = 11;
                          break;
                        }

                        return _context5.abrupt('return', (0, _helpers.notFound)(res));

                      case 11:
                        _context5.prev = 11;
                        _context5.next = 14;
                        return _user2.default.update({ _id: user._id }, {
                          $push: {
                            'track.stopTime': { $each: [req.body.StopTime] },
                            'track.points': { $each: [req.body.points] }
                          }
                        });

                      case 14:
                        _context5.next = 19;
                        break;

                      case 16:
                        _context5.prev = 16;
                        _context5.t0 = _context5['catch'](11);
                        return _context5.abrupt('return', res.status(404).send({
                          status: 'error',
                          message: 'Error in saving'
                        }));

                      case 19:
                        obr(res, user);
                        return _context5.abrupt('return', (0, _helpers.ok)(res));

                      case 23:
                        _context5.prev = 23;
                        _context5.t1 = _context5['catch'](5);
                        return _context5.abrupt('return', (0, _helpers.dberr)(res));

                      case 26:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined, [[5, 23], [11, 16]]);
              }));

              return function (_x14, _x15) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}());

exports.default = router;

/***/ })
/******/ ]);