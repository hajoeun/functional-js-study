!function(lo) {

  lo.criterias = _.reduce(movies, function(obj, movie) {
    if (!_.contains(obj.ratings, movie.rating)) obj.ratings.push(movie.rating);
    if (!_.contains(obj.genres, movie.genre)) obj.genres.push(movie.genre);
    if (!_.contains(obj.directors, movie.director)) obj.directors.push(movie.director);
    return obj;
  }, { ratings: [], genres: [], directors: [] });

  _.each(D('.movie_box'), __(
    _.c([movies, lo.criterias]),
    _.to_mr,
    _.t('$, cris', `
      .header
        .title 
          h3 한국 영화 무비 박스
        .filter {{_.go(cris, `, _.sum(_.t('cri, k', `
          .{{k}}
            label {{(k == 'ratings') ? '등급' : (k == 'genres') ? '장르' : '감독'}} 
            .inputs {{_.go(cri, _.sum(`, _.t$(`
              input[type=checkbox name=rating value='{{$}}'] {{$}}
            `) ,`))}}
        `)) ,`)}}
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
          .results
            .res1
            .res2
    `),
    D.prepend_to('.movie_box'),

    /*
      1. 전체 영화 데이터(배열): movies
      2. 영화 데이터 형태: {
         attendance: 724747,
         comment: 206,
         date: "1997-11-22",
         director: "류승완",
         genre: "핑크 영화",
         id: 0,
         like: 10,
         rating: "15세 이상 관람가",
         name: "편지"
      }
      3. 필터링 방법:
         - 같은 카테고리 내에선 'OR' 조건. (15세 이상 관람가 || 12세 이상 관람가)
         - 다른 카테고리와는 'AND' 조건. (15세 이상 관람가 && 핑크 영화 && 류승완)
      4. 정렬 방법:
         - 이미 필터링된 데이터 중에서 정렬.
      5. DOM 다루기: jQuery == $ || Don == D || document.querySelector
    */

    _.c('.movie_box'), D,
    D.on('change', '.filter input[type=checkbox]', __(
      function(e) {
        let filtered_data = [];

        return filtered_data;
      },
      data => lo.current_list = data,
      lo.items,
      D.html_to('.movie_list'))),

    D.on('change', '.sort select', __(
      function(e) {
        let sorted_data = [];

        return sorted_data;
      },
      lo.items,
      D.html_to('.movie_list'))),

    D.on('click', '.extension .btn1', __(
      function(e) {
        let data = lo.current_list || movies;

      }, _.log)),

    D.on('click', '.extension .btn2', __(
      function(e) {
        let data = lo.current_list || movies;

      }, _.log))
  ))

}({});