"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setALogoStore = exports.deleteALogoStore = exports.default = void 0;

var _Store = _interopRequireDefault(require("../../models/Store/Store"));

var _utils = require("../../utils");

var _util = require("../../utils/util");

var _fs = require("fs");

var _bannerMain = require("../banners/bannerMain");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteALogoStore = async (_root, {
  idStore,
  Image
}, ctx) => {
  try {
    if (Image) {
      (0, _fs.unlinkSync)(`public/logo/${Image}`);
      await _Store.default.update({
        Image: null,
        ImageName: null
      }, {
        where: {
          idStore: (0, _util.deCode)(idStore || ctx.restaurant)
        }
      });
      return {
        success: true,
        message: 'Logo eliminado'
      };
    }
  } catch (err) {
    return {
      success: false,
      message: 'no eliminado error'
    };
  }
};

exports.deleteALogoStore = deleteALogoStore;

const setALogoStore = async (_root, {
  logo,
  idStore
}) => {
  try {
    const fileUpload = await logo;
    const {
      createReadStream,
      filename,
      mimetype
    } = fileUpload;
    const fileStream = createReadStream();
    await (0, _bannerMain.saveImages)({
      filename,
      mimetype,
      fileStream,
      state: 3
    });
    let nameFile = filename.replace(/\s+/g, '');
    await _Store.default.update({
      Image: `${_utils.URL_BASE}static/logo/${nameFile}`,
      ImageName: filename
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
    setALogoStore,
    deleteALogoStore
  }
};
exports.default = _default;