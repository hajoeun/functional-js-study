!function(window) {
  var $ = window.D, $1 = window.D1, _ = window._, local_db, web_sql;

  web_sql = openDatabase('todoDB', '1', 'todo database', 5 * 1024 * 1024);
  web_sql.transaction(function(tx) { tx.executeSql('CREATE TABLE IF NOT EXISTS todos(id INTEGER, title TEXT, completed INTEGER)', []); });

  var template = _.t('', '\
    section.todoapp\
      header.header\
        h1 todos\
        input.new-todo[placeholder="What needs to be done?" autofocus]\
       section.main\
        input.toggle-all[type="checkbox"]\
        label[for="toggle-all"] Mark all as complete\
        ul.todo-list\
      footer.footer\
        span.todo-count\
        ul.filters\
          li\
            a#all.{{(!localStorage.route || localStorage.route == "all") ? "selected" : ""}} All\
          li\
            a#active.{{localStorage.route == "active" ? "selected" : ""}}] Active\
          li\
            a#completed.{{localStorage.route == "completed" ? "selected" : ""}}] Completed\
        button.clear-completed Clear completed\
    footer.info\
      p Created by \
        a[href=https://www.github.com/joeunha] Joeun Ha\
        | & \
        a[href=https://www.github.com/dev-jip] JIP\
      p Powered by \
        a[href=https://marpple.github.io/partial.js] Partial.js\
        | & \
        a[] Don.js'),

    t_list = _.sum(_.t$('\
      li.{{$.completed ? "completed" : ""}}[data-id={{$.id}}] \
        input.toggle[type=checkbox {{$.completed ? "checked" : ""}}]\
        label {{$.title}}\
        button.delete')),

    counter = function() {
      var len = _.reject(local_db, function(d) { return d.completed }).length;
      $.text($('.todo-count'),  _.s('l', '{{l}} ' +  (len < 2 ? 'item' : 'items') + ' left')(len));
    },

    router = _.tap(function(state) {
      !localStorage.route && (localStorage.route = 'all');
      if (typeof state == 'string') localStorage.route = state;

      _.go(localStorage.route,
        function(state) {
          if (state === 'active')
            return _.filter(local_db, function(d) { return !d.completed });
          if (state === 'completed')
            return _.filter(local_db, function(d) { return d.completed });
          return local_db;
        },
        t_list, _.if(_.is_empty, _.c('')).else(_.idtt),
        $.html_to($1('.todo-list')));
    }, counter);


  _.go("",
    function() {
      return new Promise(function(next) {
        web_sql.transaction(function(tx) {
          tx.executeSql('select * from todos', [], function(t, res) {
            next(local_db = _.to_array(res.rows));
          });
        });
      })},
    template, $.el,
    $.append_to('body'),
    router,

    $.on('keypress', '.new-todo', function(e) {
      var value = $.val(e.$currentTarget);
      if (value && e.keyCode == 13) {
        $.val(e.$currentTarget, '');
        _.go(value,
          _.cb(function(text, next) {
            web_sql.transaction(function(tx) {
              var id = Date.now();
              tx.executeSql('INSERT INTO todos (id, title, completed) VALUES (?,?,?)', [id, text, 0], function() {
                next({ id: id, title: text, completed: 0 });
              });
            });
          }),
          _.tap(function(data) { local_db.push(data); return local_db; }, counter),
          _.if(_.l("localStorage.route !== 'completed'"),
            __(_.wrap_arr, t_list, $.append_to('.todo-list'))))
      }
    }),

    $.on('click', '.delete', __(
      _.val('$currentTarget'),
      $.closest('li'),
      $.remove,
      $.attr('data-id'),
      _.cb(function(id, next) {
        web_sql.transaction(function(tx) {
          tx.executeSql('delete from todos where id=?', [id], _(next, id), _.loge) })
      }),
      function(id) { local_db = _.reject(local_db, function(d) { return d.id == id }) },
      counter
    )),

    $.on('click', '.toggle', __(
      _.val('$currentTarget'),
      $.closest('li'),
      _.if(_.l("localStorage.route === 'all'"),
        $.toggle_class('completed'))
        .else($.remove),
      $.attr('data-id'),
      _.cb(function(id, next) {
        web_sql.transaction(function(tx) {
          tx.executeSql('select completed from todos where id=?', [id], function(t, res) {
            t.executeSql('UPDATE todos SET completed=? WHERE id=?', [res.rows[0].completed ? 0 : 1, id], _(next, id), _.loge)
          })
        })
      }),
      function(id) {
        _.find(local_db, function(d) {
          return d.id == id && !void (d.completed = d.completed ? 0 : 1) })
      },
      counter)),

    $.on('click', '.toggle-all', __(
      _.c('.todo-list li:not(.completed)'), $,
      _.if(_.l("localStorage.route === 'all'"), $.add_class('completed'))
        .else($.remove),
      _.cb(function(id, next) {
        web_sql.transaction(function(tx) {
          tx.executeSql('UPDATE todos SET completed=1 WHERE completed=0', [], function() { next(local_db) }, _.loge)
        })
      }),
      _.filter(function(d) { return !d.completed && (d.completed = 1) }),
      router,
      counter)),

    $.on('click', 'ul.filters li a', __(
      _.val('$currentTarget'),
      _.tap(_.c('a.selected'), $, $.remove_class('selected')),
      $.add_class('selected'),
      $.attr('id'),
      router)),

    $.on('click', '.clear-completed', __(
      _.c('where completed=1'),
      _.cb(function(where, next) {
        web_sql.transaction(function(tx) {
          tx.executeSql('delete from todos ' + where, [], next, _.loge) })}),
      function() { local_db = _.reject(local_db, function(d) { return d.completed }) },
      counter,
      _.c('ul.todo-list li'), $,
      $.remove('.completed')))
  );

}(window);