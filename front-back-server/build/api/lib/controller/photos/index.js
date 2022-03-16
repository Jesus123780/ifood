"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePhoto = updatePhoto;

var _apolloServerExpress = require("apollo-server-express");

var _CategorieStore = _interopRequireDefault(require("../../models/information/CategorieStore"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CatStore from '../../models/'
async function updatePhoto(req, res) {
  const {
    cName,
    csDescription
  } = req.body;
  const {
    fieldname,
    originalname,
    filename
  } = req.file;

  try {
    // await fs.unlink(path.resolve(photo.imagePath));
    const res = await _CategorieStore.default.create({
      cName,
      csDescription,
      cPathImage: `${_utils.URL_BASE}uploads/${filename}`
    });
    return res.json({
      message: 'Successfully updated'
    });
  } catch (e) {
    return res.json({
      message: e
    });
  }
}