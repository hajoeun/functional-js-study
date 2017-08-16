// 실전 코드 조각 예제
var products = [
  {
    is_popular: true,
    name: "반팔티",
    price: 10000,
    sizes: [ 
      { name: "L", quantity: 2, price: 0 },
      { name: "XL", quantity: 3, price: 0 },
      { name: "2XL", quantity: 2, price: 2000 }
    ]
  },
  {
    is_popular: false,
    name: "긴팔티",
    price: 31000,
    sizes: [ 
      { name: "L", quantity: 2, price: 0 },
      { name: "XL", quantity: 3, price: 1000 },
      { name: "2XL", quantity: 2, price: 2000 }
    ]
  },
  {
    is_popular: true,
    name: "후드티",
    price: 21000,
    sizes: [
      { name: "L", quantity: 0, price: 0 },
      { name: "XL", quantity: 5, price: 1000 },
      { name: "2XL", quantity: 10, price: 2000 }
    ]
  },
  {
    is_popular: false,
    name: "맨투맨",
    price: 16000,
    sizes: [
      { name: "L", quantity: 4, price: 0 }
    ]
  },
  {
    is_popular: true,
    name: "기모후드티",
    price: 26000,
    sizes: [
      { name: "L", quantity: 3, price: -1000 },
      { name: "2XL", quantity: 4, price: 2000 }
    ]
  },
  {
    is_popular: false,
    name: "기모맨투맨",
    price: 21000,
    sizes: [
      { name: "M", quantity: 0, price: 0 },
      { name: "L", quantity: 0, price: 0 },
      { name: "XL", quantity: 0, price: 2000 }
    ]
  }
];

// 1) dom에 모든 상품 이름 추가하기
var dom = ["에코백"];
_each(products, (product) => dom.push(product.name));
console.log(dom); // ["에코백", "반팔티", "긴팔티", "후드티", "맨투맨", "기모후드티", "기모맨투맨"]

// 2) 모든 상품 이름 배열 만들기
var product_names = _map(products, (product) => product.name);
console.log(product_names); // ["반팔티", "긴팔티", "후드티", "맨투맨", "기모후드티", "기모맨투맨"]

// 3) 가격이 20000원 미만인 인기 상품 찾기
var popluar_under_20000_products = _filter(products, data => (data.price < 20000) && data.is_popular);
console.log(popluar_under_20000_products); 


// 4) 가격대별로 분류된 제품 목록 만들기
var grouped_products = _reduce(products, function(grouped, product) {
  if (product.price > 30000) {
    grouped['30000'] ? grouped['30000'].push(product.name) : (grouped['30000'] = [ product.name ]);
  } else if (product.price > 20000) {
    grouped['20000'] ? grouped['20000'].push(product.name) : (grouped['20000'] = [ product.name ]);
  }
  else {
    grouped['10000'] ? grouped['10000'].push(product.name) : (grouped['10000'] = [ product.name ]);
  }
  return grouped;
}, {});
console.log(grouped_products);


// 5) 제품명이 "후드티"인 제품의 가격 총합 (사이즈별 가격 변동 조건 포함)
// var hood_product_total_price;
_go(products,
  products => _find(products, product => product.name == '후드티'),
  hoodie => {
    var price = hoodie.price;
    return _reduce(hoodie.sizes, (sum, size)  => sum + (price + size.price) * size.quantity, 0)
  },
  console.log
);
// console.log(hood_product_total_price);

_go(products,
  _find(product => product.name == '후드티'),
  hoodie => {
    var price = hoodie.price;
    return _reduce(hoodie.sizes, (sum, size)  => sum + (price + size.price) * size.quantity, 0)
  },
  console.log
);


// 6) 가격이 2만원대인 제품 중에서 재고가 있는 제품 찾기
var special_product = _filter(products, data => {
  return data.price >= 20000 && data.price < 30000 && _find(data.sizes, d => d.quantity);
});
console.log(special_product);