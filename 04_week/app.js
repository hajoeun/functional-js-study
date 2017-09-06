!function(lo) {

  let movie_filter = _.memoize((ratings, genres, directors) =>
    _.filter(movies, movie => {
      let r = ratings.length ? _.contains(ratings, movie.movie_rating) : true,
        g = genres.length ? _.contains(genres, movie.genre) : true,
        d = directors.length ? _.contains(directors, movie.director) : true;
      return _.every([r,g,d]);
    }),
    (ratings, genres, directors) => ratings.join() + '&&' + genres.join() + '&&' + directors.join());

  _.each($('.movie_box'), __(
    _.c(movies),
    _.t$(`
      .header
        .title 
          h3 한국 영화 무비 박스
        .filter
          .rating
            label 등급 
            .inputs {{_.go($, _.map(m => m.movie_rating), _.uniq, _.sum(`, _.t$(`
              input[type=checkbox name=movie_rating value='{{$}}'] {{$}}
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
          li.movie_item {{$.name}} | {{$.date}} | {{$.director}} | {{$.genre}} | {{$.movie_rating}} [ {{$.attendance}} | {{$.like}} | {{$.comment}} ]
        `)) ,`)}}
        .extension
          .btns
            button.btn1 가장 개봉한 영화가 가장 많았던 해의 총 관람객 수
            button.btn2 2000년대 개봉한 영화 중 가장 관객수가 적은 영화
          .results
            .res1
            .res2
    `),
    $.prepend_to('.movie_box'),


    _.c('.movie_box'), $,
    $.on('change', '.filter input[type=checkbox]', _.pipe(
      () => {
        let ratings = _.go('.rating input:checked', $, $.val),
          genres = _.go('.genre input:checked', $, $.val),
          directors = _.go('.director input:checked', $, $.val);

        return movie_filter(ratings, genres, directors);
      },
      data => lo.current_list = data,
      lo.items,
      $.html_to('.movie_list'))),

    $.on('change', '.sort select', _.pipe(
      e => _.sort_by(lo.current_list || movies, e.$currentTarget.value),
      lo.items,
      $.html_to('.movie_list'))),

    $.on('click', '.extension .btn1', function() {

    }),

    $.on('click', '.extension .btn2', function() {

    })


  ))

}({});