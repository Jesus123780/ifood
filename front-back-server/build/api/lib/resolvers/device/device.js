"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberIncremented = exports.getRoles = exports.getMessage = exports.default = exports.currentNumber = void 0;

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */

/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
const getRoles = async (_root, _args, context, info) => {
  console.log('first');
};

exports.getRoles = getRoles;

const getMessage = async (_root, _args, context, info) => {
  console.log(context.pubsub);
  return 'Prueba 1';
};

exports.getMessage = getMessage;

const currentNumber = async (_root, _args, context, info) => {
  let currentNumber = 0;
  context.pubsub.publish('NUMBER_INCREMENTED', {
    numberIncremented: currentNumber
  });
  return 0; // return 'Prueba 1'
};

exports.currentNumber = currentNumber;

const numberIncremented = async (_root, _args, context, info) => {
  return {
    numberIncremented: {
      subscribe: () => context.pubsub.asyncIterator(['NUMBER_INCREMENTED'])
    }
  }; // return 'Prueba 1'
};

exports.numberIncremented = numberIncremented;
var _default = {
  TYPES: {},
  QUERIES: {
    getRoles,
    // currentNumber,
    getMessage
  },
  MUTATIONS: {// numberIncremented
  },
  SUBSCRIPTIONS: {// numberIncremented
  }
};
exports.default = _default;