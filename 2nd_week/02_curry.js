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

// var o_sum15 = sum.curry(15), o_sum10 = sum.curry(10);
// console.log(o_sum15(10), o_sum10(5));

// 함수형 커링: _curry


// var f_sum15 = _curry(sum)(15), f_sum10 = _curry(sum)(10);
// console.log(f_sum15(10), f_sum10(5));


// 순서를 뒤집은 커링: _curryr
