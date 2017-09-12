!function(lo) {
  _.each($('.movie_box'), __(
    _.c(movies),
    _.t$(`
      .header
        .title 
          h3 한국 영화 무비 박스
        .filter
          .rating
            label 등급 
            .inputs {{_.go($, _.map(m => m.rating), _.uniq, _.sum(`, _.t$(`
              input[type=checkbox name=rating value='{{$}}'] {{$}}
            `) ,`))}}
          .genre
            label 장르 
            .inputs {{_.go($, _.map(m => m.genre), _.uniq, _.sum(`, _.t$(`
              input[type=checkbox name=genre value='{{$}}'] {{$}}
            `) ,`))}}
          .director
            label 감독 
            .inputs {{_.go($, _.map(m => m.director), _.uniq, _.sum(`, _.t$(`
              input[type=checkbox name=director value='{{$}}'] {{$}}
            `) ,`))}}
        .sort
          label 정렬
          select
            option[value=name] 이름
            option[value=attendance] 관객수
            option[value=comment] 댓글
            option[value=like] 좋아요
      .body
        ul.movie_list {{_.go($, `, lo.items = _.sum(_.t$(`
          li.movie_item {{$.name}} | {{$.date}} | {{$.director}} | {{$.genre}} | {{$.rating}} [ {{$.attendance}} | {{$.like}} | {{$.comment}} ]
        `)) ,`)}}
        .extension
          .btns
            button.btn1 가장 개봉한 영화가 가장 많았던 해의 총 관람객 수
            button.btn2 2000년대 개봉한 영화 중 가장 관객수가 적은 영화
            button.btn3 12세 이상 관람가 중에서 김기덕 감독의 영화가 아닌 영화 다섯편
    `),
    D.prepend_to('.movie_box'),

    _.c('.movie_box'), D,
    D.on('change', '.filter input[type=checkbox]', __(
      _.always("input:checked"), D,
      _.reduce((result, c) => {
        result[c.name] ? result[c.name].push(c.value) : result[c.name] = [c.value];
        return result;
      }, {}),
      lo.movie_filter = _.memoize(
        checked_map =>
          _.filter(movies, m =>
            _.every(_.map(checked_map, (arr, key) => _.contains(arr, m[key])))
          ),
        checked_map => _.reduce(checked_map, (str, arr, key) => str + arr.join() + key, '')
      ),
      data => lo.current_list = data,
      lo.items,
      D.html_to('.movie_list'))),

    D.on('change', '.sort select', __(
      e => _.sort_by(lo.current_list || movies, e.$currentTarget.value),
      lo.items,
      D.html_to('.movie_list'))),

    D.on('click', '.extension .btn1', __(
      // - 가장 개봉한 영화가 많았던 해의 총 관람객 수
      () =>
        _.go(
          lo.current_list || movies,
          _.group_by(v => v.date.slice(0, 4)),
          _.max('length'),
          _.reduce((m, v) => m + v.attendance, 0)),
      _.log)),

    D.on('click', '.extension .btn2', __(
      // - 2000년대 개봉한 영화 중 가장 관객수가 적은 영화
      function() {
        let data = lo.current_list || movies;

      }, _.log)),

    D.on('click', '.extension .btn3', __(
      // - 12세 이상 관람가 중에서 김기덕 감독의 영화가 아닌 영화 다섯편
      function() {
        let data = lo.current_list || movies;

      }, _.log))
  ))

}({});