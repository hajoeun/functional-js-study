var products = [
  {
    is_selected: true, // <--- 장바구니에서 체크 박스 선택
    name: "반팔티",
    price: 10000, // <--- 기본 가격
    sizes: [ // <---- 장바구니에 담은 동일 상품의 사이즈 별 수량과 가격
      { name: "L", quantity: 2, price: 0 },
      { name: "XL", quantity: 3, price: 0 },
      { name: "2XL", quantity: 2, price: 2000 }, // <-- 옵션의 추가 가격
    ]
  },
  {
    is_selected: true,
    name: "후드티",
    price: 21000,
    sizes: [
      { name: "L", quantity: 3, price: -1000 },
      { name: "2XL", quantity: 1, price: 2000 },
    ]
  },
  {
    is_selected: false,
    name: "맨투맨",
    price: 16000,
    sizes: [
      { name: "L", quantity: 4, price: 0 }
    ]
  }
];


//1. 모든 수량
var tq = function(products) {
  return _reduce(products, function(tq, product) {
    return _reduce(product.sizes, function(tq, size) {
      return tq + size.quantity;
    }, tq);
  }, 0)
};
console.log(tq(products)); // 15

//2. 선택 된 총 수량
console.log(tq(_filter(products, function(product) { return product.is_selected; }))); // 11
// _go(products,
//   function(products) {
//     return _filter(products, function(product) { return product.is_selected; })
//   },
//   tq,
//   console.log);

//3. 모든 가격
var tp = function(products) {
  return _reduce(products, function(tp, product) {
    return _reduce(product.sizes, function(tp, size) {
      return (product.price + size.price) * size.quantity;
    }, tp);
  }, 0);
};
console.log(tp(products)); // 64000

//4. 선택 된 총 가격
console.log(tp(_filter(products, function(product) { return product.is_selected; }))); // 23000
// _go(products,
//   function(products) {
//     return _filter(products, function(product) { return product.is_selected; });
//   },
//   tp,
//   console.log)
  