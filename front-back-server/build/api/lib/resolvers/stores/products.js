"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setImageProducts = exports.saveImagesProducts = exports.default = void 0;

var _utils = require("../../utils");

var _productFood = _interopRequireDefault(require("../../models/product/productFood"));

var _fs = _interopRequireDefault(require("fs"));

var _util = require("../../utils/util");

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveImagesProducts = async ({
  filename,
  fileStream
}) => {
  const path = `public/platos/${filename}`;
  await fileStream.pipe(_fs.default.createWriteStream(path));
  return path;
};

exports.saveImagesProducts = saveImagesProducts;

const setImageProducts = async (_root, {
  input
}) => {
  try {
    const {
      pCode,
      file,
      pId
    } = input || {};
    const fileUpload = await file; // eslint-disable-next-line no-unused-vars

    const {
      createReadStream,
      filename,
      mimetype
    } = fileUpload;
    const fileStream = createReadStream();
    await saveImagesProducts({
      filename,
      mimetype,
      fileStream
    });
    const data = await _productFood.default.findOne({
      attributes: ['pCode', 'pId'],
      where: {
        [_sequelize.Op.or]: [{ ...(pId ? (0, _util.deCode)(pId) : {}),
          pCode: pCode
        }]
      }
    });

    if (data) {
      await _productFood.default.update({
        ProImage: `${_utils.URL_BASE}static/platos/${filename}`
      }, {
        where: {
          pCode: pCode,
          ...(pId ? (0, _util.deCode)(pId) : {})
        }
      });
    }

    if (!data || file) {
      return {
        success: false,
        message: 'No pudimos cargar la imagen'
      };
    }

    return {
      success: true,
      message: 'Imagen cargada con éxito'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Lo sentimos ha ocurrido un error vuelve a intentarlo'
    };
  }
};

exports.setImageProducts = setImageProducts;
var _default = {
  TYPES: {},
  QUERIES: {},
  MUTATIONS: {
    setImageProducts
  }
};
exports.default = _default;