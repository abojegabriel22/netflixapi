"use strict";

var express = require('express');

var app = express();
var port = 1234; // let port = process.env.PORT||1234;

var bodyParser = require('body-parser');

var cors = require('cors');

var mongo = require('mongodb');

var _require = require('./controller/dbController'),
    dbConnect = _require.dbConnect,
    getData = _require.getData,
    postData = _require.postData,
    updateOrder = _require.updateOrder,
    deleteWached = _require.deleteWached; // MIDDLEWARE(SUPPORTING LIBRARIES)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors()); // DEFINE YOUR ROUTE

app.get('/', function (req, res) {
  res.send('Hi from express');
}); // GET YOUR LOCATION MOVIE INDUSTRY

app.get('/country', function _callee(req, res) {
  var query, collection, output;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = {};
          collection = "country";
          _context.next = 4;
          return regeneratorRuntime.awrap(getData(collection, query));

        case 4:
          output = _context.sent;
          res.send(output);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // GET MOVIES CATEGORIES 

app.get('/category', function _callee2(req, res) {
  var query, collection, output;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = {};
          collection = "category";
          _context2.next = 4;
          return regeneratorRuntime.awrap(getData(collection, query));

        case 4:
          output = _context2.sent;
          res.send(output);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // GET ALL MOVIES 

app.get('/items', function _callee3(req, res) {
  var query, collection, output;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = {};

          if (req.query.locationId) {
            query = {
              "location_id": Number(req.query.locationId)
            };
          } else if (req.query.movieId) {
            query = {
              "type_id": Number(req.query.movieId)
            };
          } else {
            query = {};
          }

          collection = "items";
          _context3.next = 5;
          return regeneratorRuntime.awrap(getData(collection, query));

        case 5:
          output = _context3.sent;
          res.send(output);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // movies with respect to category + location 

app.get('/filter/:categoryId', function _callee4(req, res) {
  var categoryId, locationId, collection, output;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          categoryId = Number(req.params.categoryId);
          locationId = Number(req.query.locationId);

          if (locationId) {
            query = {
              "category_id": categoryId,
              "location_id": locationId
            };
          } else {
            query = {};
          }

          collection = "items";
          _context4.next = 6;
          return regeneratorRuntime.awrap(getData(collection, query));

        case 6:
          output = _context4.sent;
          res.send(output);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // DETAILS 

app.get('/items/:id', function _callee5(req, res) {
  var id, query, collection, output;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = Number(req.params.id);
          query = {
            id: id
          };
          collection = "items";
          _context5.next = 5;
          return regeneratorRuntime.awrap(getData(collection, query));

        case 5:
          output = _context5.sent;
          res.send(output);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //movies watched

app.get('/watched', function _callee6(req, res) {
  var query, collection, output;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          query = {};

          if (req.query.name) {
            query = {
              name: req.query.name
            };
          } else {
            query = {};
          } // let query = {}


          collection = "watched";
          _context6.next = 5;
          return regeneratorRuntime.awrap(getData(collection, query));

        case 5:
          output = _context6.sent;
          res.send(output);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //place order

app.post('/placeOrder', function _callee7(req, res) {
  var data, collection, response;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          data = req.body;
          collection = "watched";
          console.log(">>>", data);
          _context7.next = 5;
          return regeneratorRuntime.awrap(postData(collection, data));

        case 5:
          response = _context7.sent;
          res.send(response);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //update

app.put('/updateOrder', function _callee8(req, res) {
  var collection, condition, data, output;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          collection = "watched";
          condition = {
            "id": Number(req.params.id)
          };
          data = {
            $set: {
              "status": req.body.status
            }
          };
          _context8.next = 5;
          return regeneratorRuntime.awrap(updateOrder(collection, condition, data));

        case 5:
          output = _context8.sent;
          res.send(output);

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //delete movies watched

app["delete"]('/deleteWached', function _callee9(req, res) {
  var collection, condition, output;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          collection = "watched";
          condition = {
            "id": Number(req.params.id)
          };
          _context9.next = 4;
          return regeneratorRuntime.awrap(deleteWached(collection, condition));

        case 4:
          output = _context9.sent;
          res.send(output);

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
}); // app.get('/')

app.listen(port, function (err) {
  dbConnect();
  if (err) throw err;
  console.log("server is running on port ".concat(port));
});