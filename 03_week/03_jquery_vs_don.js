/*
  3. 라이브러리 소개 jQuery의 함수형 대안 'don.js'
   - 기본적인 사용법 소개 (jQuery와 유사성)
   - don.js가 함수형에 적합한 이유 (jQuery와 차이점)
*/

// // 기본적인 사용법
// // jQuery
// $('body');
// $('body').addClass('container');
//
// // don.js
// D('body');
// D.addClass(D('body'), 'container'); // 커링 지원!


// // 차이점
// // jQuery (http://api.jquery.com/map/)
// console.log(
//   $( ":checkbox" )
//     .map(function() {
//       return this.id;
//     })
//     .get()
//     .join());


// // don.js
// _.go(D('[type="checkbox"]'),
//   _.pluck('id'),
//   _.join(),
//   _.log
// );


var projections = [
  { id: 1, user_id: 2, _: { user: { name: 'ID', age: 36 }, products: [ { name: '긴팔티' }, { name: '후드티' } ] } },
  { id: 2, user_id: 7, _: { user: { name: 'BJ', age: 32 }, products: [ { name: '긴팔티' } ] } },
  { id: 3, user_id: 8, _: { user: { name: 'JM', age: 34 }, products: [ { name: '에코백' }, { name: '청바지' }] } },
  { id: 4, user_id: 9, _: { user: { name: 'PJ', age: 27 }, products: [ { name: '양말' }, { name: '후드티' }, { name: '긴팔티' }, { name: '에코백' } ] } },
  { id: 5, user_id: 1, _: { user: { name: 'HA', age: 25 }, products: [ { name: '에코백' } ] } },
  { id: 6, user_id: 11, _: { user: { name: 'JE', age: 26 }, products: [ { name: '머플러' } ] } },
  { id: 7, user_id: 12, _: { user: { name: 'JI', age: 31 }, products: [ { name: '머그컵' } ] } },
  { id: 8, user_id: 15, _: { user: { name: 'MP', age: 23 }, products: [ { name: '에코백' } ] } },
  { id: 9, user_id: 15, _: { user: { name: 'MP', age: 23 }, products: [ { name: '에코백' }] } },
  { id: 10, user_id: 15, _: { user: { name: 'MP', age: 23 }, products: [ { name: '에코백' }] } },
];


// // template 함수
// _.template('$', `
//   li#{{$.id}}
//     .user_info#{{$.user_id}}
//       h4 {{$._.user.name}}
//     ul.products {{_.sum($._.products, `, _.t$(`
//       li {{$.name}}
//     `) ,`)}}
//     button 주문취소`);


// // don.js
// _.go(
//   projections,
//   _.sum(_.t$(`
//     li#{{$.id}}
//       .user_info#{{$.user_id}}
//         h4 {{$._.user.name}}
//       ul.products {{_.sum($._.products, `, _.t$(`
//         li {{$.name}}
//       `) ,`)}}
//       button 주문취소
//       `)),
//   D.appendTo('.user_list')
// );
//
// _.go('body',
//   D,
//   D.on('click', 'button', __(
//     _.v('$currentTarget'),
//     D.parent('li'),
//     D.hide
//   ))
// );


// // jQuery
// _.go(projections,
//   _.sum(_.t$(`
//     li#{{$.id}}
//       .user_info#{{$.user_id}}
//         h4 {{$._.user.name}}
//       ul.products {{_.sum($._.products, `, _.t$(`
//         li {{$.name}}
//       `) ,`)}}
//       button 주문취소
//       `)),
//   html => $(html).appendTo('.user_list')
// );
//
// _.go('body',
//   $,
//   body =>
//     $(body).on('click', 'button', __(
//       _.v('currentTarget'),
//       current => $(current).parent().hide()
//   ))
// );