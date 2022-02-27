'use strict';

var _express = _interopRequireDefault(require("express"));

var _apolloServer = require("apollo-server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init Server
const app = (0, _express.default)();
const port = 4000; // Init pubsub
// const pubsub = new PubSub()

app.get('/', (req, res) => {
  res.send({
    message: 'Hola mundo'
  });
});
/** Configurar cabeceras y cors
 * @abstract
 * @author Jesus Juvinao
*/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Allow', 'GET, POST');
  next();
});
app.listen(4000, () => {
  console.log('listening on port', port);
});