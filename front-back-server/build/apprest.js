'use strict';

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init Server
const app = (0, _express.default)();
const port = 5000; // config port 

app.set('port', process.env.PORT || port); // Middleware

app.use((0, _morgan.default)('dev'));
app.use(_bodyParser.default.json());
app.use((0, _cookieParser.default)(process.env.COOKIE_SECRET_KEY || 'B2EE2E811317D6AAF902646FED7A72A2')); // config static files

app.use('/static', _express.default.static('public')); // Accept all origins

const corsOptions = {
  origin: (_origin, callback) => callback(null, true),
  credentials: true
};
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)(corsOptions));
app.use('/', (req, res) => {
  res.send('food!');
});
app.listen(port, () => {
  console.log(`🚀 endpoint ready at http://localhost:${port}`);
});