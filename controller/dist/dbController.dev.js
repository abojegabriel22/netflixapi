"use strict";

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var mongo = require('mongodb');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient; // let mongoUrl = "mongodb://127.0.0.1:27017";


var mongoUrl = "mongodb+srv://netflixApp:bz6glLDhtykkTQjM@cluster0.16ffmn9.mongodb.net/?retryWrites=true&w=majority";
var client = new MongoClient(mongoUrl);

function dbConnect() {
  return regeneratorRuntime.async(function dbConnect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.connect());

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

var db = client.db('netflixdata');

function getData(colName, query) {
  var output, cursor, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, data;

  return regeneratorRuntime.async(function getData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          output = [];
          _context2.prev = 1;
          cursor = db.collection(colName).find(query);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _context2.prev = 5;
          _iterator = _asyncIterator(cursor);

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_iterator.next());

        case 9:
          _step = _context2.sent;
          _iteratorNormalCompletion = _step.done;
          _context2.next = 13;
          return regeneratorRuntime.awrap(_step.value);

        case 13:
          _value = _context2.sent;

          if (_iteratorNormalCompletion) {
            _context2.next = 20;
            break;
          }

          data = _value;
          output.push(data);

        case 17:
          _iteratorNormalCompletion = true;
          _context2.next = 7;
          break;

        case 20:
          _context2.next = 26;
          break;

        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 26:
          _context2.prev = 26;
          _context2.prev = 27;

          if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
            _context2.next = 31;
            break;
          }

          _context2.next = 31;
          return regeneratorRuntime.awrap(_iterator["return"]());

        case 31:
          _context2.prev = 31;

          if (!_didIteratorError) {
            _context2.next = 34;
            break;
          }

          throw _iteratorError;

        case 34:
          return _context2.finish(31);

        case 35:
          return _context2.finish(26);

        case 36:
          cursor.closed;
          _context2.next = 42;
          break;

        case 39:
          _context2.prev = 39;
          _context2.t1 = _context2["catch"](1);
          output.push({
            "Error": "Error in getData"
          });

        case 42:
          return _context2.abrupt("return", output);

        case 43:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 39], [5, 22, 26, 36], [27,, 31, 35]]);
}

function postData(colName, data) {
  var output;
  return regeneratorRuntime.async(function postData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.collection(colName).insertOne(data));

        case 3:
          output = _context3.sent;
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          output = {
            "response": "Error in postData"
          };

        case 9:
          return _context3.abrupt("return", output);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function updateOrder(colName, condition, data) {
  var output;
  return regeneratorRuntime.async(function updateOrder$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(db.collection(colName).updateOne(condition, data));

        case 3:
          output = _context4.sent;
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          output = {
            "response": "Error in update data"
          };

        case 9:
          return _context4.abrupt("return", output);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

function deleteWached(colName, condition) {
  var output;
  return regeneratorRuntime.async(function deleteWached$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.collection(colName).deleteOne(condition));

        case 3:
          output = _context5.sent;
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          output = {
            "response": "Error in update data"
          };

        case 9:
          return _context5.abrupt("return", output);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

module.exports = {
  dbConnect: dbConnect,
  getData: getData,
  postData: postData,
  updateOrder: updateOrder,
  deleteWached: deleteWached
}; // output = await db.collection(colName).find(query).toArray()