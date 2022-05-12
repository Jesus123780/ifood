"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlSubscriptions = require("graphql-subscriptions");

var _statusPedidoFinal = _interopRequireDefault(require("../../models/Store/statusPedidoFinal"));

var _util = require("../../utils/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
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

let currentNumber = 0;

function incrementNumber() {
  //  currentNumber++;
  const currentNumber = {
    success: true,
    message: 'lol'
  };
  pubsub.publish('NEW_ORDER_STORE', {
    newStorePedidosNum: currentNumber
  });
  setTimeout(incrementNumber, 1000);
} // Start incrementing


incrementNumber();
const Query = {
  Query: {
    getOneSalesStoreS: async (parent, {
      to,
      content
    }, ctx) => {
      setTimeout(incrementNumber, 1000);
      pubsub.publish('NEW_ORDER_STORE', {
        newStorePedidosNum: currentNumber
      });
      return 1;
    }
  }
};
const SubscriptionSubscription = {
  Subscription: {
    newStorePedidosNum: {
      subscribe: () => pubsub.asyncIterator(['NEW_ORDER_STORE'])
    }
  }
};

const pushNotificationOrder = async (_root, {
  pCodeRef,
  idStore
}, context, info) => {
  const attributes = (0, _util.getAttributes)(_statusPedidoFinal.default, info); // console.log(context, 11)

  const data = await _statusPedidoFinal.default.findOne({
    attributes,
    where: {
      pCodeRef: pCodeRef,
      idStore: (0, _util.deCode)(idStore)
    }
  });
  pubsub.publish('NEW_NOTIFICATION_ORDER', {
    newStoreOrder: data,
    context: context
  });
  return data;
};

const NotificationMutation = {
  Mutation: {
    createOneNotification: async (parent, {
      message
    }, ctx) => {
      try {
        pubsub.publish('NEW_NOTIFICATION', {
          newNotification: message
        });
        return message;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  }
};
const SubscriptionSubscriptionNotification = {
  Subscription: {
    newNotification: {
      subscribe: () => pubsub.asyncIterator(['NEW_NOTIFICATION'])
    }
  }
};
const SubscriptionNotificationOrder = {
  Subscription: {
    newStoreOrder: {
      subscribe: (0, _graphqlSubscriptions.withFilter)((_, __, ctx) => {
        // if (!ctx) throw new AuthenticationError('Unauthenticated')
        return pubsub.asyncIterator(['NEW_NOTIFICATION_ORDER']);
      }, ({
        newStoreOrder,
        context
      }, args, ctx) => {
        if (context.restaurant === newStoreOrder.idStore) {
          // console.log(context.restaurant === newStoreOrder.idStore)
          return true;
        } else return false; // console.log(newStoreOrder.idStore, 9)
        // deCode(ctx.restaurant)
        // if (newMessage.from === ctx.User.uUsername || newMessage.to === ctx.User.uUsername) {
        // }
        // return false

      })
    }
  }
};
var _default = {
  TYPES: {},
  QUERIES: {
    pushNotificationOrder,
    ...Query.Query
  },
  MUTATIONS: { ...NotificationMutation.Mutation
  },
  SUBSCRIPTIONS: { ...SubscriptionSubscription.Subscription,
    ...SubscriptionSubscriptionNotification.Subscription,
    ...SubscriptionNotificationOrder.Subscription
  }
};
exports.default = _default;