"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _photos = require("../controller/photos");

var _multer = _interopRequireDefault(require("../multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.route('/photos') // .get((req, res) => res.send('hello world'))
.get(_photos.updatePhoto).post(_multer.default.single('image'), _photos.updatePhoto);
router.route('/photos/:id');
var _default = router;
exports.default = _default;