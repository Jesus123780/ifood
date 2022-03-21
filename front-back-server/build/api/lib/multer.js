"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import uuid from 'uuid/v4';
const storage = _multer.default.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime() + _path.default.extname(file.originalname)}`);
  }
});

var _default = (0, _multer.default)({
  storage
});

exports.default = _default;