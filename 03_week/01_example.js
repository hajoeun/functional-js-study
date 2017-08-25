var users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 34 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 }
];


// 1. 30세 미만의 유저의 이름 목록
_go(users,
  _filter(function(user) { return user.age < 30 }),
  _map(function(user) { return user.name }),
  console.log
);

// 2. 30세 이상의 유저의 id 목록
_go(users,
  _filter(function(user) { return user.age >= 30 }),
  _map(function(user) { return user.id }),
  console.log
);


// 3. 30세 미만의 유저들의 나이의 총합
_go(users,
  _filter(function(user) { return user.age < 30 }),
  _reduce(function(init, user) { return init + user.age }, 0),
  console.log
);


// 4. 이름이 'PJ'인 유저의 나이
console.log(_find(users, function(user) { return user.name == 'PJ' }).age);


// 5. n빵 함수 : curryr을 사용
function div(a, b) {
  return a / b;
}

var div_by_7 = _.partial(div, _, 7);
console.log(div_by_7(10000));

function test() {
  console.log(arguments);
}

var test1 = _.partial(test, _, 1)
console.log(
  test1(2,3)
)





