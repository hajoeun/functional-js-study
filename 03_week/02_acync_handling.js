var post = {
  id: 66,
  title: '함수형 자바스크립트 스터디',
  price: 10000,
  _: { items: [
    { no: 0,
      type: 'text',
      body: '커링과 파이프라인 코딩',
      id: null },
    { no: 1,
      type: 'photo',
      url: '/img/curry.png',
      id: 11 },
    { no: 2,
      type: 'heading',
      body: '함수형으로의 전환',
      id: null },
    { no: 3,
      type: 'photo',
      url: '/img/profile.jpg',
      id: 23 }]
  }
};

var db_api_insert = function(table, set) {
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log("db insert: ", set);
      resolve(set)
    }, 2000)
  })
};

var db_api_update = function(table, set, where) {
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log("db update: ", set, where);
      resolve(set)
    }, 3000)
  })
};

_.go(post,
  post => post._.items,
  _.reduce(function(res, li){
    if (li.id) return res.has_id.push(li), res;
    return res.id_null.push(_.omit(li, 'id')), res;
  }, { has_id : [], id_null : [] }),
  _.all(
    __(
      items => items.has_id,
      _.map(item => db_api_update('item', _.omit(item, 'id'), { id: item.id }))),
    __(
      items => items.id_null,
      items => db_api_insert('item', items))),
  _(console.log, 'all end : '));


// _.go(post,
//   post => post._.items,
//   _.partition(_.val('id')),
//   _.to_mr,
//   _.spread(
//     _.map(item => db_api_update('item', _.omit(item, 'id'), { id: item.id })),
//     items=> db_api_insert('item', items)),
//   _(console.log, 'all end : '));