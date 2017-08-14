// each, map, filter, reduce, go, curryr

function _each(list, iter) {
  if (Array.isArray(list)) {
    for (var i = 0, len = list.length; i < len; i++) 
      iter(list[i], i, list);
  } else {
    var keys = Object.keys(list);
    for (var i = 0, len = keys.length; i < len; i++) 
      iter(list[keys[i]], keys[i], list);
  }
}

function _map(list, iter) {
  var res = [];
  if (Array.isArray(list)) {
    for (var i = 0, len = list.length; i < len; i++) 
      res[i] = iter(list[i], i, list);
  } else {
    var keys = Object.keys(list);
    for (var i = 0, len = keys.length; i < len; i++) 
      res[i] = iter(list[keys[i]], keys[i], list);
  }
  return res;
}

function _filter(list, iter) {
  var res = [];
  if (Array.isArray(list)) {
    for (var i = 0, len = list.length; i < len; i++) 
      if (iter(list[i], i, list)) 
        res.push(list[i]);
  } else {
    var keys = Object.keys(list);
    for (var i = 0, len = keys.length; i < len; i++) 
      if (iter(list[keys[i]], keys[i], list)) 
        res.push(list[keys[i]]);
  }
  return res;
}

function _reduce(list, iter, memo) {
  var i = 0;
  if (Array.isArray(list)) {
    var res = (memo != undefined ? memo : list[i++]);
    for (var len = list.length; i < len; i++) 
      res = iter(res, list[i], i, list);
  } else {
    var keys = Object.keys(list), res = (memo != undefined ? memo : list[keys[i++]]);
    for (var len = keys.length; i < len; i++) 
      res = iter(res, list[keys[i]], keys[i], list);
  }
  return res;
}

var slice = Array.prototype.slice;
function _go(seed) {
  var fns = slice.call(arguments, 1);
  return _reduce(fns, function(se, fn) {
    return fn(se);
  }, seed)
}

function _curryr(func) {
  return function(a, b) {
    if (arguments.length == 1) 
      return function(b) {
        return func(b, a);
      }
    else 
      return func(a, b);
  }
}

function _curryr3(func) {
  return function(a, b, c) {
    if (arguments.length == 1)
      return function(b) {
        return func(b, a);
      }
    if (arguments.length == 2) 
      return function(c) {
        return func(c, a, b);
      }
    return func(a, b, c);
  }
}

_each = _curryr(_each);
_map = _curryr(_map);
_filter = _curryr(_filter);
_reduce = _curryr3(_reduce);
