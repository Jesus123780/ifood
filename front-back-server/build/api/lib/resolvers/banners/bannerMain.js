"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPromoBanners = exports.setBanners = exports.saveImages = exports.getAllPromoBanners = exports.getAllMasterBanners = exports.deleteOneBannerPromo = exports.deleteOneBannerMaster = exports.default = void 0;

var _banners = _interopRequireDefault(require("../../models/banners/banners"));

var _util = require("../../utils/util");

var _fs = _interopRequireDefault(require("fs"));

var _apolloServerExpress = require("apollo-server-express");

var _utils = require("../../utils");

var _bannerspromo = _interopRequireDefault(require("../../models/bannerspromo/bannerspromo"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const getAllMasterBanners = async (_, {
  min,
  max
}, ctx, info) => {
  const attributes = (0, _util.getAttributes)(_banners.default, info);
  const data = await _banners.default.findAll({
    attributes,
    where: {
      [_sequelize.Op.or]: [{
        BannersState: {
          [_sequelize.Op.gt]: 0
        }
      }]
    },
    limit: [min || 0, max || 100],
    order: [['BannersState', 'ASC']]
  });
  return data;
};

exports.getAllMasterBanners = getAllMasterBanners;

const getAllPromoBanners = async (_, {
  min,
  max,
  search
}, ctx, info) => {
  const attributes = (0, _util.getAttributes)(_bannerspromo.default, info);
  const data = await _bannerspromo.default.findAll({
    attributes,
    where: {
      [_sequelize.Op.or]: [{
        bpState: {
          [_sequelize.Op.gt]: 0
        }
      }]
    },
    limit: [min || 0, max || 100],
    order: [['bpState', 'ASC']]
  });
  return data;
};

exports.getAllPromoBanners = getAllPromoBanners;

const deleteOneBannerPromo = async (_, {
  bpId,
  bpState
}, ctx, info) => {
  try {
    await _bannerspromo.default.update({
      bpState: bpState === 1 ? 0 : 1
    }, {
      where: {
        bpId: (0, _util.deCode)(bpId)
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

exports.deleteOneBannerPromo = deleteOneBannerPromo;

const deleteOneBannerMaster = async (_, {
  BannerId,
  BannersState,
  path
}, ctx, info) => {
  // console.log(path)
  // try {
  //     unlinkSync('public/Bannerlista2_zsVI.png');
  //     // console.log('successfully deleted /tmp/hello');
  //   } catch (err) {
  //       console.log(err)
  //     // handle the error
  //   };
  // // var filePath = 'c:/book/discovery.docx';
  // // fs.unlinkSync(path);
  try {
    await _banners.default.update({
      BannersState: BannersState === 1 ? 0 : 1
    }, {
      where: {
        BannerId: (0, _util.deCode)(BannerId)
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

exports.deleteOneBannerMaster = deleteOneBannerMaster;

const saveImages = async ({
  filename,
  mimetype,
  fileStream,
  state
}) => {
  let nameFile = filename.replace(/\s+/g, '');

  try {
    const path = state === 2 ? `public/promo/${nameFile}` : state === 3 ? `public/logo/${nameFile}` : state === 4 ? `public/banner/${nameFile}` : `public/${nameFile}`;
    await fileStream.pipe(_fs.default.createWriteStream(path));
    return path;
  } catch (error) {
    throw (0, _apolloServerExpress.ApolloError)('Lo sentimos, ha ocurrido un error interno', error);
  }
};

exports.saveImages = saveImages;

const setBanners = async (_, {
  input
}, ctx) => {
  try {
    const {
      description,
      image,
      name
    } = input;
    const fileUpload = await image;
    const {
      createReadStream,
      filename,
      mimetype
    } = fileUpload; // const extFile = filename.substring(filename.lastIndexOf('.'), filename.length)

    const fileStream = createReadStream();
    await saveImages({
      filename,
      mimetype,
      fileStream
    });
    const data = await _banners.default.create({
      BannersState: 1,
      description,
      path: `${_utils.URL_BASE}static/${filename}`,
      name
    });
    return data;
  } catch (error) {
    throw new _apolloServerExpress.ApolloError(error, 'No se pudo eliminar el producto debido a un error interno.');
  }
};

exports.setBanners = setBanners;

const setPromoBanners = async (_, {
  input
}, ctx) => {
  try {
    const {
      description,
      image,
      name
    } = input;
    const fileUpload = await image;
    const {
      createReadStream,
      filename,
      mimetype
    } = fileUpload; // const extFile = filename.substring(filename.lastIndexOf('.'), filename.length)

    const fileStream = createReadStream();
    await saveImages({
      filename,
      mimetype,
      fileStream,
      state: 2
    });
    await _bannerspromo.default.create({
      bpState: 1,
      description,
      path: `${_utils.URL_BASE}static/promo/${filename}`,
      name
    }); // return data
  } catch (error) {
    throw new _apolloServerExpress.ApolloError(error, 'No se pudo eliminar el producto debido a un error interno.');
  }
};

exports.setPromoBanners = setPromoBanners;
var _default = {
  TYPES: {},
  QUERIES: {
    getAllMasterBanners,
    getAllPromoBanners
  },
  MUTATIONS: {
    setBanners,
    setPromoBanners,
    deleteOneBannerMaster,
    deleteOneBannerPromo
  }
};
exports.default = _default;