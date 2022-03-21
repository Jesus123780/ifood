"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPromoBanners = exports.setBanners = exports.saveImages = exports.getAllPromoBanners = exports.getAllMasterBanners = exports.deleteOneBannerPromo = exports.deleteOneBannerMaster = exports.default = void 0;

var _banners = _interopRequireDefault(require("../../models/banners/banners"));

var _util = require("../../utils/util");

var _fs = _interopRequireWildcard(require("fs"));

var _apolloServerExpress = require("apollo-server-express");

var _utils = require("../../utils");

var _bannerspromo = _interopRequireDefault(require("../../models/bannerspromo/bannerspromo"));

var _promises = require("fs/promises");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Op
} = require('sequelize');

const getAllMasterBanners = async (_, {
  min,
  max,
  search
}, ctx, info) => {
  const attributes = (0, _util.getAttributes)(_banners.default, info);
  const data = await _banners.default.findAll({
    attributes,
    where: {
      [Op.or]: [{
        BannersState: {
          [Op.gt]: 0
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
      [Op.or]: [{
        bpState: {
          [Op.gt]: 0
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
  console.log(state);
  const path = state === 2 ? `public/promo/${filename}` : state === 3 ? `public/logo/${filename}` : `public/${filename}`;
  await fileStream.pipe(_fs.default.createWriteStream(path));
  return path;
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
      mimetype,
      encoding
    } = fileUpload; // const extFile = filename.substring(filename.lastIndexOf('.'), filename.length)

    const fileStream = createReadStream();
    const path = await saveImages({
      filename,
      mimetype,
      fileStream
    });
    console.log(`${path}`);
    const data = await _banners.default.create({
      BannersState: 1,
      description,
      path: `${_utils.URL_BASE}static/${filename}`,
      name
    });
    return data;
  } catch (error) {
    console.log(error);
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
      mimetype,
      encoding
    } = fileUpload; // const extFile = filename.substring(filename.lastIndexOf('.'), filename.length)

    const fileStream = createReadStream();
    const path = await saveImages({
      filename,
      mimetype,
      fileStream,
      state: 2
    });
    console.log(`${path}`);
    const data = await _bannerspromo.default.create({
      bpState: 1,
      description,
      path: `${_utils.URL_BASE}static/promo/${filename}`,
      name
    }); // return data
  } catch (error) {
    console.log(error);
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