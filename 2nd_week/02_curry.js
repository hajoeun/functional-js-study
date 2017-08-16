var sum = function(a, b) { 
  return a + b; 
};

// 객체 지향 스타일 커링
Function.prototype.curry = function(a) { 
  var that = this; 
  return function(b) { 
    return that(a, b); 
  }; 
};

var o_sum15 = sum.curry(15), o_sum10 = sum.curry(10);
console.log(o_sum15(10), o_sum10(5));

// 함수형 커링: _curry
function _curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    }
  }
}

var f_sum15 = _curry(sum)(15), f_sum10 = _curry(sum)(10);
console.log(f_sum15(10), f_sum10(5));


// 순서를 뒤집은 커링: _curryr
function _curryr(fn) {
  return function(a, b) {
    if (!b) {
      return function(b) {
        return fn(b, a);
      }
    }
    return fn(a, b);

  }
}

function divide(a, b) {
  return a / b;
}

var divided_by_8 = _curryr(divide)(8);
console.log(divided_by_8(16))

function __map(list, iter) {
  var res = [];
  for (var i = 0, len = list.length; i < len; i++)
    res[i] = iter(list[i], i, list);
  return res;
}

__map = _curryr(__map);

sum = _curry(sum);

var sum50 = _pipe(sum(10), sum(20), sum(10));

_go(10, sum50, console.log);

console.log(sum50(100));