"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerBanner = exports.getOneBanners = exports.default = exports.DeleteOneBanner = void 0;

var _util = require("../../utils/util");

var _utils = require("../../utils");

var _bannerStore = _interopRequireDefault(require("../../models/Store/bannerStore"));

var _bannerMain = require("./bannerMain");

var _sequelize = require("sequelize");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getOneBanners = async (_, {
  idStore
}, _ctx, info) => {
  const attributes = (0, _util.getAttributes)(_bannerStore.default, info);
  const data = await _bannerStore.default.findOne({
    attributes,
    where: {
      [_sequelize.Op.or]: [{
        bnState: 1,
        idStore: (0, _util.deCode)(idStore)
      }]
    }
  });
  return data;
}; // eslint-disable-next-line no-unused-vars


exports.getOneBanners = getOneBanners;

const registerBanner = async (_, {
  input
}, _ctx) => {
  try {
    // CREATE FILE SAVE
    const {
      bnImage,
      idStore
    } = input;
    if (!idStore) return {
      success: false,
      message: 'Ocurrió un error interno'
    };
    const fileUpload = await bnImage; // eslint-disable-next-line no-unused-vars

    const {
      createReadStream,
      filename,
      mimetype,
      encoding
    } = fileUpload;
    const fileStream = createReadStream();
    let nameFile = filename.replace(/\s+/g, '');
    const path = await (0, _bannerMain.saveImages)({
      filename: nameFile,
      mimetype,
      fileStream,
      state: 4
    });
    const OneBannerData = await _bannerStore.default.findOne({
      attributes: ['bnId', 'path', 'idStore', 'bnState'],
      where: {
        [_sequelize.Op.or]: [{
          idStore: (0, _util.deCode)(idStore)
        }]
      }
    });

    if (OneBannerData) {
      await _bannerStore.default.update({
        path: `${_utils.URL_BASE}static/banner/${nameFile}`,
        bnImageFileName: filename,
        bnImage: `${_utils.URL_BASE}static/banner/${nameFile}`
      }, {
        where: {
          idStore: (0, _util.deCode)(idStore)
        }
      });
    } else {
      if (path) {
        await _bannerStore.default.create({
          idStore: (0, _util.deCode)(idStore),
          bnState: 1,
          path: `${_utils.URL_BASE}static/banner/${nameFile}`,
          bnImageFileName: filename,
          bnImage: `${_utils.URL_BASE}static/banner/${nameFile}`
        });
        return {
          success: true,
          message: 'Subido con éxito'
        };
      } else {
        return {
          success: false,
          message: 'No se pudo cargar la imagen'
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Ocurrió un error'
    };
  }
}; // eslint-disable-next-line no-unused-vars


exports.registerBanner = registerBanner;

const DeleteOneBanner = async (_, {
  bnId,
  idStore,
  bnImageFileName
}, ctx, info) => {
  try {
    if (bnImageFileName && idStore) {
      (0, _fs.unlinkSync)(`public/banner/${bnImageFileName}`);
    }

    await _bannerStore.default.destroy({
      where: {
        bnId: (0, _util.deCode)(bnId),
        idStore: (0, _util.deCode)(idStore)
      }
    });
    return {
      success: true,
      message: 'Banner Eliminado'
    };
  } catch (error) {
    return {
      success: false,
      message: `${error}, Error interno`
    };
  }
};

exports.DeleteOneBanner = DeleteOneBanner;
var _default = {
  TYPES: {},
  QUERIES: {
    getOneBanners
  },
  MUTATIONS: {
    registerBanner,
    DeleteOneBanner
  }
};
exports.default = _default;