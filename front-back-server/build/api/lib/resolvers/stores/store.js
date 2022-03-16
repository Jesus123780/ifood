"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setALogoStore = exports.default = void 0;

var _Store = _interopRequireDefault(require("../../models/Store/Store"));

var _utils = require("../../utils");

var _util = require("../../utils/util");

var _bannerMain = require("../banners/bannerMain");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setALogoStore = async (_root, {
  logo,
  idStore
}, ctx) => {
  try {
    const fileUpload = await logo;
    const {
      createReadStream,
      filename,
      mimetype,
      encoding
    } = fileUpload; // saveImages()

    const fileStream = createReadStream();
    const path = await (0, _bannerMain.saveImages)({
      filename,
      mimetype,
      fileStream,
      state: 3
    });
    console.log(logo);
    await _Store.default.update({
      Image: `${_utils.URL_BASE}static/logo/${filename}`
    }, {
      where: {
        idStore: (0, _util.deCode)(idStore)
      }
    });
    return {
      success: true,
      message: 'Logo subido con éxito'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Lo sentimos ha ocurrido un error vuelve a intentarlo'
    };
  }
};

exports.setALogoStore = setALogoStore;
var _default = {
  TYPES: {},
  QUERIES: {},
  MUTATIONS: {
    setALogoStore
  }
};
exports.default = _default;