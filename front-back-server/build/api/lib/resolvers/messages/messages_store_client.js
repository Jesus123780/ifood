"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMessage = exports.getMessages = exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _sequelize = require("sequelize");

var _messages = _interopRequireDefault(require("../../models/Messages/messages"));

var _Store = _interopRequireDefault(require("../../models/Store/Store"));

var _util = require("../../utils/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { PubSub, withFilter } from 'apollo-server'
const pubsub = new _graphqlSubscriptions.PubSub(); //create a PubSub instance

/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */

const getMessages = async (parent, {
  from
}, ctx) => {
  try {
    try {
      if (!ctx.User || !from) throw new Error('Debes iniciar sesión primero');
      const otherUser = await _Store.default.findOne({
        attributes: ['id', 'idStore'],
        where: {
          idStore: !!from && (0, _util.deCode)(from)
        }
      });
      if (!otherUser) throw new Error('Usuario no existe');
      const ID = [ctx.User.id, otherUser.idStore];
      const messages = await _messages.default.findAll({
        where: {
          from: {
            [_sequelize.Op.in]: ID
          },
          to: {
            [_sequelize.Op.in]: ID
          }
        },
        order: [['aDatCre', 'ASC']]
      });
      return messages;
    } catch (e) {
      return e;
    }
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400);
    return error;
  }
};

exports.getMessages = getMessages;

const sendMessage = async (parent, {
  to,
  content
}, ctx) => {
  try {
    try {
      const message = await _messages.default.create({
        from: ctx.User.id,
        to,
        content
      });
      pubsub.publish('NEW_MESSAGE', {
        newMessage: message,
        ctx
      });
      return message;
    } catch (err) {
      throw new _apolloServerExpress.ApolloError('Lo sentimos, ha ocurrido un error interno');
    }
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400);
    return error;
  }
}; // Suscripción para enviar mensajes


exports.sendMessage = sendMessage;
const SubscriptionSubscription = {
  Subscription: {
    newMessage: {
      subscribe: (0, _graphqlSubscriptions.withFilter)((_, __, ctx) => {
        if (!ctx) throw new _apolloServerExpress.AuthenticationError('Unauthenticated');
        return pubsub.asyncIterator(['NEW_MESSAGE']); // eslint-disable-next-line no-unused-vars
      }, ({
        newMessage,
        ctx
      }, _, __) => {
        if (newMessage.from === ctx.User.id || newMessage.from === ctx.User.id) {
          return true;
        } else {
          return false;
        }
      })
    }
  }
};
var _default = {
  TYPES: {},
  QUERIES: {
    getMessages
  },
  MUTATIONS: {
    sendMessage
  },
  SUBSCRIPTIONS: { ...SubscriptionSubscription.Subscription
  }
};
exports.default = _default;