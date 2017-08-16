// 실전 코드 조각 예제
var products = [
  {
    is_popular: true,
    name: "반팔티",
    price: 10000,
    sizes: [ 
      { name: "L", quantity: 2, price: 0 },
      { name: "XL", quantity: 3, price: 0 },
      { name: "2XL", quantity: 2, price: 2000 },
    ]
  },
  {
    is_popular: false,
    name: "긴팔티",
    price: 31000,
    sizes: [ 
      { name: "L", quantity: 2, price: 0 },
      { name: "XL", quantity: 3, price: 1000 },
      { name: "2XL", quantity: 2, price: 2000 }, 
    ]
  },
  {
    is_popular: true,
    name: "후드티",
    price: 21000,
    sizes: [
      { name: "L", quantity: 3, price: -1000 },
      { name: "2XL", quantity: 1, price: 2000 },
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
      { name: "2XL", quantity: 4, price: 2000 },
    ]
  },
  {
    is_popular: false,
    name: "기모맨투맨",
    price: 21000,
    sizes: [
      { name: "M", quantity: 1, price: 0 },
      { name: "L", quantity: 4, price: 0 }
    ]
  }
];

// 1) dom에 모든 상품 이름 추가하기
var dom = ["에코백"];
console.log(dom); // ["에코백", "반팔티", "긴팔티", "후드티", "맨투맨", "기모후드티", "기모맨투맨"]

// 2) 모든 상품 이름 배열 만들기
var product_names;
console.log(product_names); // ["반팔티", "긴팔티", "후드티", "맨투맨", "기모후드티", "기모맨투맨"]

// 3) 가격이 20000원 미만인 인기 상품 찾기
var popluar_under_20000_products; 
console.log(popluar_under_20000_products); 

// 4) 가격대별로 분류된 제품 목록 만들기 
var grouped_products;
console.log(grouped_products); 

// 5) 제품명이 "후드티"인 제품의 가격 총합 (사이즈별 가격 변동 조건 포함)
var hood_product_total_price;
console.log(hood_product_total_price);

// 6) 가격이 20000원대인 제품 중에서 특정 사이즈의 수량이 4개 이상인 제품 찾기
var special_product;
console.log(special_product);