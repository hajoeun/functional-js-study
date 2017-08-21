!function(window) {
  var doc = window.document
    , doc_el = doc.documentElement
    , slice = Array.prototype.slice
    , push = Array.prototype.push
    , don_uid = function(id) {
    return function() {
      return 'don_js_' + '_' + id++;
    };
  }(0);

  // simple partial.js
  var ___ = {};
  function _(func) {
    var parts1 = [], parts2 = [],
      parts = slice.call(arguments, 1),
      ___idx = parts.length;

    for (var i in parts)
      if (parts[i] == ___) ___idx = i;
      else if (i < ___idx) parts1.push(parts[i]);
      else parts2.push(parts[i]);

    return function() {
      var args1 = parts1.slice(), args2 = parts2.slice(),
        rest = slice.call(arguments);

      for (var i in args1) if (args1[i] == _) args1[i] = rest.shift();
      for (var i in args2) if (args2[i] == _) args2[i] = rest.pop();

      return func.apply(null, args1.concat(rest.concat(args2)));
    }
  }

  function _push_apply(_larr, results) {
    if (typeof _larr == 'string' || !_like_arr(_larr)) _larr = [_larr];
    push.apply(results, _larr);
    return results;
  }

  function _is_node(node, nt) {
    return node && typeof node == 'object' && (nt = node.nodeType) && (nt == 1 || nt == 9);
  }

  function _is_str(o) { return typeof o == 'string'; }

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  function _like_arr(coll) {
    if (coll && coll.nodeType == 1) return false;
    var length = coll == null ? void 0 : coll.length;
    return typeof coll != 'string' && typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX && coll !== coll.window;
  }
  function _length(list) { return list == null ? void 0 : list.length; }

  function _is_object(obj) { return typeof obj == 'object' && !!obj; }
  function _keys(obj) { return _is_object(obj) ? Object.keys(obj) : []; }
  function _idtt(val) { return val; }

  _each = function f(data, iter) {
    if (!iter) return function(data2) { return f(data2, data) };
    var i = -1, len = data && data.length, keys = typeof len == 'number' ? null : _keys(data);
    if (keys && (len = keys.length))
      while (++i < len) iter(data[keys[i]]);
    else
      while (++i < len) iter(data[i]);
    return data;
  }

  function _each2(obj, iter) {
    for (var i = 0, keys = _keys(obj), len = keys.length; i < len; i++) iter(obj[keys[i]], keys[i]);
    return obj;
  }
  function _eachr(arr, iter) {
    for (var i = _length(arr)-1; i > -1; i--) iter(arr[i], i);
    return arr;
  }
  function _map(arr, iter) {
    for (var res = [], i = 0, len = _length(arr); i < len; i++) res[i] = iter(arr[i], i);
    return res;
  }
  function _mapr(arr, iter) {
    for (var res = [], i = _length(arr)-1; i > -1; i--) res[i] = iter(arr[i], i);
    return res;
  }
  function _find(arr, predi) {
    for (var i = 0, len = _length(arr); i < len; i++) if (predi(arr[i], i)) return arr[i];
  }
  function _filter(arr, predi) {
    var res = [], i = -1, len = _length(arr);
    while (++i < len) if (predi(arr[i], i)) res.push(arr[i]);
    return res;
  }
  function _contains(arr, value) {
    return arr && arr.indexOf(value) != -1;
  }
  function _flat(new_arr, arr, noDeep, start) {
    _each(arr, function(v) {
      if (!_like_arr(v) || (!Array.isArray(v) && !(!!(v && v.callee)))) return new_arr.push(v);
      noDeep ? _each(v, function(v) { new_arr.push(v); }) : _flat(new_arr, v, noDeep);
    }, start);
    return new_arr;
  }

  function _flatten(arr, noDeep, start) { return _flat([], arr, noDeep, start); }
  function _is_fn(o) { return typeof o == 'function'; }
  function _is_numeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

  var matches = doc_el.matches || doc_el.webkitMatchesSelector || doc_el.mozMatchesSelector || doc_el.msMatchesSelector;
  function match_func(el, selector) {
    if (!selector || !el || el.nodeType !== 1) return false;
    return matches.call(el, selector);
  }
  function not_match_func(el, selector) {
    return !match_func(el, selector);
  }

  // don.js
  !function() {
    var rquick_expr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    // combinator_expr = /^\s*[+|~]\s*/;

    if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
      var el = this;
      while (el) {
        if (match_func(el, selector)) return el;
        el = el.parentElement;
      }
    };

    function el_return_match(el, selector) {
      return !selector || match_func(el, selector) ? el : undefined;
    }
    function define_root(root) {
      if (!root) return doc;
      var is_string = typeof root == 'string';
      if (!_is_node(root) && !is_string && _like_arr(root)) return root[0];
      if (is_string) return $1(root);
      return root;
    }
    function make_predi(selector) {
      return selector ? function(results, el, selector) {
        return el && match_func(el, selector) && results.indexOf(el) == -1;
      } : function(results, el) {
        return el && results.indexOf(el) == -1;
      };
    }
    function make_string_selector(sel_arr, root) {
      if (!root.nodeType) return [];
      var i = 0, len = sel_arr.length, results, is_root_id = !!root.id;
      if (!is_root_id) root.id = don_uid();
      for (var _sel_arr = []; i < len;) _sel_arr.push('#' + root.id + ' ' + sel_arr[i++]);
      results = _$(_sel_arr.join(','), root.parentNode || doc, true);
      // if (!is_root_id) root.removeAttribute('id'); 그냥 id없으면 id강제로 넣어버려
      return results;
    }
    var filter_or_not = function f(els, selector, func) {
      if (typeof els == 'string') return _(f, _, els, func);
      if (els == null) return;
      if (!_like_arr(els)) els = [els];
      for (var i = 0, results = [], len = els.length, el; i < len; i++)
        if ((el = els[i]) && func(el, selector)) results.push(el);
      return results;
    };
    var prev_or_next = function f(els, selector, p_or_n) {
      if (typeof els == 'string') return _(f, _, els, p_or_n);
      if (els == null) return;
      if (!_like_arr(els)) return el_return_match(els[p_or_n], selector);
      var predi = make_predi(selector);
      for (var i = 0, results = [], len = els.length, _el, el; i < len; i++)
        if ((_el = els[i]) && predi(results, (el=_el[p_or_n]), selector)) results.push(el);
      return results;
    };
    var until = function(els, selector, funcA, funcB) {
      if (typeof els == 'string') return _(f, _, els, funcA, funcB);
      if (els == null) return;
      if (!_like_arr(els)) els = [els];
      if (!selector) return funcA(els);
      var results = [], el, parents = [];
      do {
        els = funcB(els);
        for(var i=0, len=els.length;i<len;i++)
          if ((el = els[i]) && not_match_func(el, selector) && results.indexOf(el) == -1) {
            results.push(el);
            parents.push(el);
          }
        els = parents;
        parents = [];
      } while(len);
      return results;
    };
    $.children = function f(els, selector) {
      if (typeof els == 'string') return _(f, _, els);
      if (els == null) return;
      if (!_like_arr(els)) els = [els];
      for (var i = 0, results = [], len = els.length, children, _el; i < len; i++)
        if ((_el = els[i]) && (children = els[i].children))
          for (var j = 0, len2 = children.length, el; j < len2; j++)
            if ((el = children[j]) && results.indexOf(el) == -1) results.push(el);
      return selector ? $.filter(results, selector) : results;
    };
    $.closest = function f(els, selector) {
      if (arguments.length == 1) return _(f, _, els);
      if (els == null) return;
      if (!_like_arr(els)) return els.closest(selector) || undefined;
      for (var i = 0, results = [], len = els.length, _el, el; i < len; i++)
        if ((_el = els[i]) && (el = _el.closest(selector)) && results.indexOf(el) == -1) results.push(el);
      return results;
    };
    $.contains = doc_el.contains ?
      function(parent, node) {
        var _parent = parent.nodeType === 9 ? parent.documentElement : parent,
          _node = node && node.parentNode;
        return parent === _node || !!( _node && _node.nodeType === 1 && (
            _parent.contains ? _parent.contains( _node ) :
              parent.compareDocumentPosition && parent.compareDocumentPosition( _node ) & 16
          ));
      } :
      function(parent, node) {
        while (node && (node = node.parentNode)) if (node === parent) return true;
        return false;
      };
    $.contents = function(els) {
      if (els == null) return;
      if (!_like_arr(els)) els = [els];
      for (var i = 0, results = [], len = els.length, child_nodes, _el; i < len; i++)
        if ((_el = els[i]) && (child_nodes = _el.childNodes))
          if (_el.contentDocument) results.push(_el.contentDocument);
          else for (var j = 0, len2 = child_nodes.length, el; j < len2; j++)
            if ((el = child_nodes[j]) && results.indexOf(el) == -1) results.push(el);
      return results;
    };
    $.eq = function f(els, idx) {
      if (arguments.length == 1) return _(f, _, els);
      if (els == null) return;
      if (!_like_arr(els)) els = [els];
      return els[idx];
    };
    $.filter = _(filter_or_not, _, _ , match_func);
    $.find = function f(parent_els, selector) {
      if (arguments.length == 1 && (typeof parent_els == 'string')) return _(f, _, parent_els);
      if (parent_els == null) return;
      if (!_like_arr(parent_els)) parent_els = [parent_els];
      var p_els_len = _length(parent_els),
        selector_is_string = typeof selector == 'string',
        selector_split = selector_is_string && selector.split(','),
        selector_func =  selector_is_string ? function(root) {
          return make_string_selector(selector_split, root)
        } : function(root) {
          return _$(selector, root);
        };
      for (var i = 0, results = []; i < p_els_len; i++)
        for (var j = 0, els = selector_func(define_root(parent_els[i])), els_len = els.length, el; j < els_len; j++)
          if ((el = els[j]) && results.indexOf(el) == -1) results.push(el);
      return results;
    };
    $.find1 = function f(parent_els, selector) {
      if (arguments.length == 1 && (typeof parent_els == 'string')) return _(f, _, parent_els);
      if (parent_els == null) return;
      return $.find(parent_els, selector)[0];
    };
    // $.find = function f(parent_els, selector) {
    //   if (arguments.length == 1 && (typeof parent_els == 'string')) return _(f, _, parent_els);
    //   if (parent_els == null) return;
    //   if (!_like_arr(parent_els)) parent_els = [parent_els];
    //   var p_els_len = _length(parent_els),
    //     selector_is_string = typeof selector == 'string',
    //     selector_split = selector_is_string && selector.split(','),
    //     selector_func = !selector_is_string || !_find(selector_split, function(sel) { return combinator_expr.test(sel); })
    //       ? function(root) {
    //         return _$(selector, root, selector_is_string);
    //       } : function(root) {
    //         return make_string_selector(selector_split, root);
    //       };
    //   for (var i = 0, results = []; i < p_els_len; i++)
    //     for (var j = 0, els = selector_func(define_root(parent_els[i])), els_len = els.length, el; j < els_len; j++)
    //       if ((el = els[j]) && results.indexOf(el) == -1) results.push(el);
    //   return results;
    // };
    $.has = function f(els, selector) {
      if (arguments.length == 1) return _(f, _, els);
      if (els == null) return;
      var finders = $.find(els, selector);
      if (!_like_arr(els)) return finders.length ? els : undefined;
      var finders_len = finders.length;
      for (var i = 0, results = [], len = els.length, el; i < len; i++)
        if ((el = els[i]))
          for (var j = 0; j < finders_len; j++)
            if ($.contains(el, finders[j]) && results.indexOf(el) == -1) results.push(el);
      return results;
    };
    $.is = function f(els, selector) {
      if (arguments.length == 1) return _(f, _, els);
      if (els == null) return;
      if (!_like_arr(els)) return match_func(els, selector);
      for (var i = 0, len = els.length, el; i < len; i++)
        if ((el = els[i]) && match_func(el, selector)) return true;
      return false;
    };
    $.next = _(prev_or_next, _, _, 'nextElementSibling');
    $.next_all = $.nextAll = function f(els, selector) {
      return typeof els == 'string' ? _(f, _, els) : $.find(els, '~' + (selector || '*'));
    };
    $.next_until = $.nextUntil = _(until, _, _, $.nextAll, $.next);
    $.not = _(filter_or_not, _, _ , not_match_func);
    $.parent = function f(els, selector) {
      if (typeof els == 'string') return _(f, _, els);
      if (els == null) return;
      if (!_like_arr(els)) return el_return_match(els.parentElement, selector);
      var predi = make_predi(selector);
      for (var i = 0, results = [], len = els.length, el, _el; i < len; i++)
        if ((_el = els[i]) && predi(results, (el = _el.parentElement), selector)) results.push(el);
      return results;
    };
    $.parents = function f(els, selector) {
      if (typeof els == 'string') return _(f, _, els);
      if (els == null) return;
      if (!_like_arr(els)) els = [els];
      var results = [], el, find_parent = selector ? function (els, selector) {
        return $.closest($.parent(els), selector);
      } : $.parent;
      do {
        els = find_parent(els, selector);
        for (var i = 0, len = els.length; i < len; i++)
          if ((el = els[i]) && results.indexOf(el) == -1) results.push(el);
      } while (len);
      return results;
    };
    $.parents_until = $.parentsUntil = _(until, _, _, $.parents, $.parent);
    $.prev = _(prev_or_next, _, _, 'previousElementSibling');
    $.prev_all = $.prevAll = function f(els, selector) {
      if (typeof els == 'string') return _(f, _, els);
      if (els == null) return;
      if (!_like_arr(els)) els = [els];
      var results = [], el;
      do {
        els = $.prev(els, selector);
        for (var i = 0, len = els.length; i < len; i++)
          if ((el = els[i]) && results.indexOf(el) == -1) results.push(el);
      } while (len);
      return results;
    };
    $.prev_until = $.prevUntil = _(until, _, _, $.prevAll, $.prev);
    $.siblings = function f(els, selector) {
      if (typeof els == 'string') return _(f, _, els);
      if (els == null) return;
      if (!_like_arr(els)) els = [els];
      var predi = make_predi(selector);
      for(var i=0,results = [],len=els.length, _el, parent;i<len;i++)
        if ((_el = els[i]) && (parent = _el.parentNode))
          for(var j=0, children=parent.children, len2 = children.length, el; j<len2;j++)
            if (predi(results, (el = children[j]), selector) && el != _el) results.push(el);
      return results;
    };

    function _$(selector, root, _selector_is_string) {
      var m, elem, match, results = [], doc_or_frag = (root.nodeType == 9 || root.nodeType == 11) ? root : root.ownerDocument,
        selector_is_string = _selector_is_string || typeof selector == 'string';
      if (!root || root.document || !selector || (selector_is_string && !selector.trim()))
        return results;
      else if (selector.document || (selector.nodeType && selector.nodeType == 9))
        return _push_apply(selector, results);
      else if (selector_is_string)
        if (!(match = rquick_expr.exec(selector)))
          return _push_apply(root.querySelectorAll(selector), results);
        else if ((m = match[1]) && doc_or_frag.getElementById && (elem = doc_or_frag.getElementById(m)) && $.contains(root, elem))
          return _push_apply(elem, results);
        else if ((m = match[3]) && root.getElementsByClassName)
          return _push_apply(root.getElementsByClassName(m), results);
        else if ((m = match[2]) && root.getElementsByTagName)
          return _push_apply(root.getElementsByTagName(m), results);
        else
          return _push_apply(root.querySelectorAll(selector), results);
      else if (_is_node(selector))
        return _is_node(root) && $.contains(root, selector) ? results.push(selector) : results;
      else if (!selector_is_string && _like_arr(selector))
      // return _push_apply(selector, results);
        if (!_is_node(root)) return _push_apply(selector, results);
        else for (var i=0, el, len=selector.length;i<len;i++)
          if ($.contains(root, (el=selector[i]))) results.push(el);
      return results;
    }

    function _$1(selector, root, _selector_is_string) {
      var m, match, doc_or_frag, selector_is_string = _selector_is_string || typeof selector == 'string';
      if (!root || !selector || (selector_is_string && !selector.trim())) return ;
      else if (selector_is_string)
        if (!(match = rquick_expr.exec(selector)))
          return root.querySelector(selector) || undefined;
        else if ((m = match[1]) && (doc_or_frag = ((root.nodeType == 9 || root.nodeType == 11) ? root : root.ownerDocument)).getElementById)
          return doc_or_frag.getElementById(m) || undefined;
        else if ((m = match[3]) && root.getElementsByClassName)
          return root.getElementsByClassName(m)[0];
        else if ((m = match[2]) && root.getElementsByTagName)
          return root.getElementsByTagName(m)[0];
        else
          return root.querySelector(selector) || undefined;
      else if (selector.document || (selector.nodeType && selector.nodeType == 9))
        return selector;
      else if (_is_node(selector))
        return _is_node(root) && $.contains(root, selector) ? selector : undefined;
      else if (!selector_is_string && _like_arr(selector))
        return selector[0];
    }

    window.D = $;
    window.$ = $;
    window.D1 = $1;
    window.$1 = $1;

    function $(selector) {
      return _$(selector, doc);
    }
    function $1(selector) {
      return _$1(selector, doc);
    }

    var _cache = {};
    var $_keys = Object.keys($), ki=0;
    while(ki < $_keys.length) _cache[$_keys[ki++]] = {};
  }();

  // don.manipulation.js
  !function($) {
    function _is_win(obj) { return obj != null && obj == obj.window; }
    function _is_win_el_or_els(els) { return _is_win(els) || _is_win(els[0]) }
    function _get_win(els) { return _is_win_el_or_els(els) ? window : _check_doc(els) ? window : false; }
    function _is_document(obj) { return obj != null && obj.nodeType == 9; }
    function _check_doc(els) { return _is_document(els) || _is_document(els[0]) }
    function _is_el_or_els(els) { return _is_node(els) || _is_node(els[0]) }

    function _check_boxSizing (el) { return $.css(el, 'boxSizing') == 'border-box'; }
    function _display_is_none (el) { return $.css(el, 'display') == 'none'; }
    function _is_node_name(el, name) { return el && el.nodeName && el.nodeName.toLowerCase() === name.toLowerCase(); }
    function _parse_float_only_numeric(n) { return _is_numeric(n) ? parseFloat(n) : n; }

    var class_editor = function f(el, class_name, method) {
      if (!_is_node(el)) return _(f, _, el, method);
      if (el == null) return;
      var val = _is_fn(class_name) ? class_name(el) : class_name;
      if (val)
        if (/\s/.test(val)) _each(val.split(" "), function(v) { el.classList[method](v); });
        else el.classList[method](val);
      return el;
    };

    $.add_class = $.addClass = _(class_editor, _, _, 'add');
    $.remove_class = $.removeClass = _(class_editor, _, _, 'remove');
    $.toggle_class = $.toggleClass = _(class_editor, _, _, 'toggle');

    $.has_class = $.hasClass = function f(el, class_name) {
      if (arguments.length == 1) return _(f, _, el);
      if (el == null) return;
      return el.classList.contains(class_name);
    };

    $.attr = function f(el, attr_name, attr_value) {
      if (!_is_node(el)) return arguments.length == 1 ? _(f, _, el) : _(f, _, el, attr_name);
      if (el == null) return;
      if (_is_fn(attr_value)) return f(el, attr_name, attr_value(el.getAttribute(attr_name), el));

      if (arguments.length == 2 && _is_str(attr_name)) {
        var value = el.getAttribute(attr_name);
        if (value == undefined) return;
        if (_is_numeric(value)) return parseFloat(value);
        if (value == "true") return true;
        if (value == "false") return false;
        if (value == "null") return null;
        return value;
      }

      if (attr_name.constructor == Object) return _each2(attr_name, function(v, k) { f(el, k, v) }), el;
      if (attr_value === undefined) return el;
      if (attr_value === null) return $.remove_attr(el, attr_name);

      return el.setAttribute(attr_name, attr_value);
    };

    $.remove_attr = $.removeAttr = function f(el, attr_name) {
      if (_is_str(el)) return _(f, _, el);
      if (el == null || !attr_name) return;
      return el.removeAttribute(attr_name), el;
    };

    var css_number = {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    };

    function check_css_num(value, p_name) {
      if (_is_numeric(value)) return css_number[p_name] ? value : value + "px";
      return value;
    }

    $.css = function f(el, prop_name, prop_value) {
      if (el == null) return;
      if (!_is_node(el)) return arguments.length == 1 ? _(f, _, el) : _(f, _, el, prop_name);

      if (arguments.length == 2 && prop_name.length != null)
        return (Array.isArray(prop_name) ?
          function(el) { return prop_name.reduce(function(o, p) {
            return o[p] = el.ownerDocument.defaultView.getComputedStyle(el, null)[p], o }, {}) }
          : function(el) { return el.ownerDocument.defaultView.getComputedStyle(el, null)[prop_name] })(el);

      return (_is_str(prop_name) ? function(el, i) {
        var val = _is_fn(prop_value) ? prop_value(i, el) : prop_value;
        if (val) el.style[prop_name] = check_css_num(val, prop_name);
      } : function(el) { _each2(prop_name, function(attr, name) { el.style[name] = check_css_num(attr, name); }) })(el), el;
    };

    $.remove = function f(el, selector) {
      if (el == null) return;
      if (_is_str(el)) return _(f, _, el);
      if (selector) if (!match_func(el, selector)) return el;
      return el.parentNode.removeChild(el);
    };

    var text_or_html = function f(el, content, method) {
      if (el == null) return;
      if (!_is_node(el)) return _(f, _, el, method);
      if (content === undefined) return el[method];
      var val = _is_fn(content) ? content(el[method]) : content;
      if (val !== undefined) el[method] = val;
      return el;
    };

    var html_to_or_text_to = function f(el, fn) {
      if (_is_fn(el)) return _(f, _, el);
      if (_is_str(el)) el = $1(el);
      return _(fn, el);
    };

    $.text = _(text_or_html, _, _, 'textContent');
    $.html = _(text_or_html, _, _, 'innerHTML');

    $.textTo = $.text_to = html_to_or_text_to($.text);
    $.htmlTo = $.html_to = html_to_or_text_to($.html);

    function make_insert(type, reverse) {
      function insert(target, elem) {
        var last = target.length - 1 || 0;
        var fns = {
          append: function(te, i) { return te.appendChild(last == i ? elem : elem.cloneNode(true)) },
          prepend: function(te, i) { return te.insertBefore(last == i ? elem : elem.cloneNode(true), te.firstChild) },
          after: function(te, i) { return te.parentNode.insertBefore(last == i ? elem : elem.cloneNode(true), te.nextSibling) },
          before: function(te, i) { return te.parentNode.insertBefore(last == i ? elem : elem.cloneNode(true), te) }
        };

        if (_like_arr(target))
          if (reverse) return _map(target, fns[type]);
          else _each(target, fns[type]);
        else
          fns[type](target, 0);

        return reverse ? elem : target;
      }

      return function f(els, content) {
        if (arguments.length == 1) return _(f, _, els);

        var target = els, elem = content;

        if (reverse) {
          target = _is_str(content) ? $(content) : content;
          elem = els;
        }
        if (target == null) return;
        if (arguments.length > 2) elem = _flatten(slice.call(arguments, 1));

        if (_is_node(elem)) return insert(target, elem);
        if (!reverse && _is_fn(elem)) {
          var fn = elem, exec_fn = function(el, i) { return f(el, fn(i, el.innerHTML)) };
          return _like_arr(target) ? _each(target, exec_fn) : exec_fn(target, 0);
        }
        if (elem == null) return reverse ? elem : target;
        if (_is_str(elem)) {
          if (/^<.*>.*/.test(elem)) {
            var temp = doc.createElement('div');
            temp.innerHTML = elem;
            if (reverse) return f(_map(temp.childNodes, _idtt), target);
            return f(target, _map(temp.childNodes, _idtt));
          }
          if (reverse) elem = $(elem);
          else return insert(target, doc.createTextNode(elem));
        }
        if (_like_arr(elem)) {
          if (type == 'append') {
            if (reverse) return _flatten(_map(elem, function(el) { return f(el, target) }));
            _each(elem, function(el) { f(target, el) });
          } else {
            if (reverse) return _flatten(_mapr(elem, function(el) { return f(el, target) }));
            _eachr(elem, function(el) { f(target, el) });
          }
        }
        return reverse ? elem : target;
      }
    }

    $.append = make_insert('append');
    $.prepend = make_insert('prepend');
    $.appendTo = $.append_to = make_insert('append', true);
    $.prependTo = $.prepend_to = make_insert('prepend', true);

    $.after = make_insert('after');
    $.before = make_insert('before');
    $.insertAfter = $.insert_after = make_insert('after', true);
    $.insertBefore = $.insert_before = make_insert('before', true);

    var default_display = {};

    function get_default_display(el) {
      var node_name = el.nodeName, display = default_display[node_name];
      if (display) return display;

      var temp, doc = el.ownerDocument;
      temp = doc.body.appendChild(doc.createElement(node_name));
      display = $.css(temp, 'display');
      temp.parentNode.removeChild(temp);

      if (display == 'none') display = 'block';
      return default_display[node_name] = display;
    }
    function show_or_hide(el, is_show) {
      if (el == null) return;
      if (is_show) {
        function fn(el) {
          if (el.style.display != 'none') {
            if (el.hidden) el.style.display = get_default_display(el);
            return;
          }
          if (el._prev_display) el.style.display = el._prev_display;
          else el.style.display = '';
        }
      } else {
        function fn(el) {
          if (el.style.display == 'none') return;
          if (el.style.display) el._prev_display = el.style.display;
          el.style.display = 'none';
        }
      }
      return fn(el), el;
    }

    $.show = _(show_or_hide, _, true);
    $.hide = _(show_or_hide, _, false);

    function is_hidden_within_tree(el) {
      return el.style.display == 'none' ||
        el.style.display == '' &&
        (el.ownerDocument && $.contains(el.ownerDocument, el)) &&
        $.css(el, 'display') == 'none';
    }

    $.toggle = function(el, state) {
      if (el == null) return;
      if (typeof state === "boolean") { return $[state ? 'show' : 'hide'](el); }
      return $[is_hidden_within_tree(el) ? 'show' : 'hide'](el), el;
    };

    $.clone = function(el) {
      if (el == null) return;
      return el.cloneNode(true);
    };

    $.empty = function(el) {
      if (el == null) return;
      return (el.innerHTML = ''), el;
    };

    function wid_hei_fn(wid_hei_type, wid_hei, window_width_type) {
      // wid_hei_type 1: outer, 2: innerWidth, 3: width

      function _get_doc_wid_hei(els, wid_hei) {
        var body = els.body || els[0].body;
        return wid_hei == "width" ? Math.max( body.offsetWidth, body.scrollWidth, doc_el.offsetWidth, doc_el.offsetWidth, doc_el.clientWidth )
          : Math.max( body.offsetHeight, body.scrollHeight, doc_el.offsetHeight, doc_el.offsetHeight, doc_el.clientHeight )
      }

      function get_wid_hei_val (wid_hei_get, wid_hei_inner_outer, wid_hei, outer_margin_bool) {
        return function(el) {
          var left_top, right_bottom;
          if (wid_hei == "width") {
            left_top = "Left";
            right_bottom = "Right";
          } else {
            left_top = "Top";
            right_bottom = "Bottom";
          }

          var styles = window.getComputedStyle(el),
            width = _display_is_none(el) ? parseFloat(styles.width) : el.getBoundingClientRect()[wid_hei],
            borderLeft_Top = parseFloat(styles["border" + left_top + "Width"]),
            borderRight_Bottom = parseFloat(styles["border" + right_bottom + "Width"]),
            paddingLeft_Top = parseFloat(styles["padding" + left_top]),
            paddingRight_Bottom = parseFloat(styles["padding" + right_bottom]),
            res;

          switch (wid_hei_inner_outer) {
            case 1:
              var marginLeft_Top = parseFloat(styles["margin" + left_top]);
              var marginRight_Bottom = parseFloat(styles["margin" + right_bottom]);
              res = !wid_hei_get ? _check_boxSizing(el) ? 0 : - (paddingLeft_Top + paddingRight_Bottom + borderLeft_Top + borderRight_Bottom)
                : outer_margin_bool ? ( width + marginLeft_Top + marginRight_Bottom ) : ( width );
              break;
            case 2:
              res = wid_hei_get ? (width - borderLeft_Top - borderRight_Bottom)
                : _check_boxSizing(el) ? borderLeft_Top + borderRight_Bottom : - (paddingLeft_Top + paddingRight_Bottom);
              break;
            case 3:
              res = wid_hei_get ? (width - borderRight_Bottom - borderLeft_Top - paddingLeft_Top - paddingRight_Bottom)
                : _check_boxSizing(el) ? paddingLeft_Top + paddingRight_Bottom + borderLeft_Top + borderRight_Bottom : 0;
              break;
          }

          return res;
        }
      }

      return function f(els, value) {
        if (els == null) return;
        if (!_is_el_or_els(els) && !_is_win_el_or_els(els) && !_check_doc(els) && els.length !=0) return _(f, _, els);

        var get_wid_hei = get_wid_hei_val(true, wid_hei_type, wid_hei, value);

        if (arguments.length == 1 || value == true) {
          if(_is_win_el_or_els(els))
            return _like_arr(els) ? _map(els, function(v) { return v[window_width_type] }) : els[window_width_type];
          if (_check_doc(els)) return _get_doc_wid_hei(els, wid_hei);
          return _like_arr(els) ? _map(els, get_wid_hei) : get_wid_hei(els);
        }

        function cal_width (el, value) {
          var res_val = get_wid_hei_val(false, wid_hei_type, wid_hei)(el) + parseFloat(value);
          var res = res_val < 0 ? 0 : res_val;
          el.style[wid_hei] = res + "px"
        }

        var set_width = _is_fn(value) ?
          function(el,i) {
            var val = value(i, get_wid_hei(el), el);
            if (val) cal_width(el, val)
          } :
          function(el) { cal_width(el, value) };

        return _like_arr(els) ? _each(els, set_width) : set_width(els), els;
      }
    }


    $.width = wid_hei_fn(3, "width", "innerWidth");
    $.innerWidth = wid_hei_fn(2, "width", "innerWidth");
    $.outerWidth = wid_hei_fn(1, "width", "clientWidth");

    $.height = wid_hei_fn(3, "height", "innerHeight");
    $.innerHeight = wid_hei_fn(2, "height", "innerHeight");
    $.outerHeight = wid_hei_fn(1, "height", "clientHeight");


    $.offsetParent = function f(els) {
      if (els == null) return;
      function offsetParent_iter(el) {
        var offsetParent = el.offsetParent;
        while (offsetParent && $.css( offsetParent, "position" ) === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || doc_el;
      }

      return _like_arr(els) ? _map(els, offsetParent_iter) : offsetParent_iter(els);
    };

    $.position = function f(els) {
      if (els == null) return;
      function position_iter(el) {
        var offsetParent, offset, parentOffset = { top: 0, left: 0 };

        if ($.css( el, "position" ) === "fixed") {
          offset = el.getBoundingClientRect();
        } else {
          offsetParent = $.offsetParent(el);
          offset = $.offset(el);

          if (!_is_node_name(offsetParent, "html")) {
            parentOffset = $.offset(offsetParent);
          }
          parentOffset = {
            top: parentOffset.top + offsetParent.clientTop,
            left: parentOffset.left + offsetParent.clientLeft
          };
        }

        return {
          top: offset.top - parentOffset.top - parseFloat($.css(el, "marginTop")) + doc_el.clientTop,
          left: offset.left - parentOffset.left - parseFloat($.css(el, "marginLeft")) + doc_el.clientLeft
        };
      }

      return _like_arr(els) ? _map(els, position_iter) : position_iter(els);
    };

    $.offset = function f(els, options) {
      if (els == null) return;
      // options : function or coordinates
      if (!_is_el_or_els(els) && els.length != 0) return _(f, _, els);

      //setoffset
      if (options) {
        function offset_iter_set(el, i) {
          if (_is_fn(options)) return f(el, options(i, offset_iter_get(el), el));

          var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
            position = $.css(el, "position"),
            props = {};

          if (position === "static") {
            el.style.position = "relative";
          }

          curOffset = $.offset(el);
          curCSSTop = $.css(el, "top");
          curCSSLeft = $.css(el, "left");
          calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

          if (calculatePosition) {
            curPosition = $.position(el);
            curTop = curPosition.top;
            curLeft = curPosition.left;
          } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
          }

          if (options.top != null) {
            props.top = (options.top - curOffset.top) + curTop;
          }
          if (options.left != null) {
            props.left = (options.left - curOffset.left) + curLeft;
          }

          return $.css(el, props), el;
        }

        return _like_arr(els) ? _map(els, offset_iter_set) : offset_iter_set(els);
      }

      function offset_iter_get(el) {
        var rect = el.getBoundingClientRect();
        return rect.width || rect.height ? {
          top: rect.top + window.pageYOffset - doc_el.clientTop,
          left: rect.left + window.pageXOffset - doc_el.clientLeft
        } : { top: 0, left: 0 };
      }

      return _like_arr(els) ? _map(els, offset_iter_get) : offset_iter_get(els)
    };

    function selected(el) { return el.selected }
    function sltval(el) { return _parse_float_only_numeric(el.value) }

    $.val = function f(els, value) {
      if (els == null) return;
      if (!_is_el_or_els(els) && els.length != 0) return _(f, _, els);

      if (arguments.length == 1) {
        function get_iter(el) {
          if (_is_node_name(el, "select")) {
            return el.multiple ? _map(_filter(el.options, selected), sltval) : sltval(_find(el.options, selected));
          } else if (el.type == "radio" || el.type == "number") {
            return _parse_float_only_numeric(el.value);
          } else {
            var ret = el.value;
            // Handle most common string cases
            if (typeof ret === "string") {
              return ret.replace(/\r/g, "");
            }
            return ret == null ? "" : ret;
          }
        }
        return _like_arr(els) ? _map(els, get_iter) : get_iter(els);
      }

      function set_iter(el, i){
        if (_is_fn(value)) return f(el, value(i, f(el), el));

        var val = value;
        if (value == null) {
          val = "";
        } else if (typeof value === "number") {
          val += "";
        }

        if ((el.type == "radio" || el.type == "checkbox") && Array.isArray(value)) {
          return el.checked = _is_str(_find(value, function(val) { return val == el.value }));
        } else if (_is_node_name(el, "select")) {
          if (Array.isArray(value)) {
            var list = value;
            return _each(el.options, function(option) { option.selected = _contains(list, option.value) });
          } else {
            return _each(el.options, function(option) { option.selected = option.value == value });
          }
        }
        el.value = val;
      }

      return _like_arr(els) ? _each(els, set_iter) : set_iter(els, 0), els;
    };

    $.el = function f(html) {
      if (!_is_str(html)) return;
      if (/^<.*>.*/.test(html)) {
        var div = doc.createElement('div');
        div.innerHTML = html;
        return _map(div.children, _idtt);
      } else {
        return [doc.createElement(html)];
      }
    };

    $.frag = function f(html) {
      if (!_is_str(html)) return;
      var doc_frag = doc.createDocumentFragment();
      if (/^<.*>.*/.test(html)) {
        var div = doc.createElement('div');
        div.innerHTML = html;
        var len = div.children.length;
        for (var i = 0; i < len; i++) {
          doc_frag.appendChild(div.children[0]);
        }
      } else {
        var some = doc.createElement(html);
        doc_frag.appendChild(some);
      }

      return doc_frag;
    };

    function _scroll_fn(el, val, prop, method) {
      var top = prop == "pageYOffset" ? true : false;
      var win = _get_win( el );
      if (val == undefined) return win ? win[ prop ] : el[ method ];
      if (win) {
        win.scrollTo(
          !top ? val : win.pageXOffset,
          top ? val : win.pageYOffset
        );
      } else {
        el[method] = val;
      }
      return el;
    }

    $.scrollTop = function f(el, val) {
      if (el == null || (!_is_el_or_els(el) && !_is_win_el_or_els(el))) return;
      return _scroll_fn(el, val, "pageYOffset", "scrollTop");
    };

    $.scrollLeft = function f(el, val) {
      if (el == null || (!_is_el_or_els(el) && !_is_win_el_or_els(el))) return;
      return _scroll_fn(el, val, "pageXOffset", "scrollLeft");
    };

  }(D);

  // don.event_n_fetch.js, inspired by https://github.com/oneuijs/oui-dom-events/blob/master/build/index.js
  !function() {
    var $ = D;

    var handlers = {};
    var specialEvents = {};
    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

    var focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };

    var _dtId = 1;
    function getDtId(obj) {
      return obj._dtId || (obj._dtId = _dtId++);
    }

    function parse(event) {
      var dotIndex = event.indexOf('.');
      if (dotIndex > 0) {
        return {
          e: event.substring(0, event.indexOf('.')),
          ns: event.substring(dotIndex + 1, event.length)
        };
      }
      return { e: event };
    }

    function realEvent(type) {
      return hover[type] || (focusinSupported && focus[type]) || type;
    }

    function findHandlers(el, selector, event, callback, delegated) {
      event = parse(event);
      return (handlers[getDtId(el)] || []).filter(function (handler) {
        return handler &&
          (!event.e || handler.e === event.e) &&
          (!event.ns || handler.ns === event.ns) &&
          (!callback || handler.callback === callback) &&
          (!selector || handler.selector === selector) &&
          (delegated === undefined || handler.delegated === delegated);
      });
    }

    function removeEvent(el, event, selector, callback) {
      if (_like_arr(el) && !_is_node(el) && el != el.window) return _each(el, function(el) {
        removeEvent(el, event, selector, callback);
      });

      /*var eventName = parse(event).e;*/
      if (!el._dtId) return el;
      var elHandlers = handlers[getDtId(el)];
      var matchedHandlers = findHandlers(el, selector, event, callback);
      matchedHandlers.forEach(function (handler) {
        /*if (el.removeEventListener) el.removeEventListener(eventName, handler.delegator || handler.callback);*/
        elHandlers.splice(elHandlers.indexOf(handler), 1);
      });
      return el;
    }

    function makeProxy(el, callback) {
      return function(e) {
        e = compatible(e);
        e.$delegateTarget = e.$currentTarget = el;
        if (e.isImmediatePropagationStopped()) return;
        var result = callback.call(el, e);
        if (result === false) e.preventDefault(), e.stopPropagation();
        return result;
      }
    }

    function sortDelegate(handlers, delegateTarget, target) {
      return _filter(_map(handlers, function(handler, i) {
        return {
          el: _filter($.find(delegateTarget, handler.selector), function(el) {
            return el == target || $.contains(el, target);
          }).sort(function(a, b) {
            if ($.contains(b, a)) return -1;
            else if ($.contains(a, b)) return 1;
            return 0;
          })[0],
          handler: handler,
          i: i
        };
      }), function(d) {
        return d.el;
      }).sort(function(a, b) {
        if ($.contains(b.el, a.el)) return -1;
        else if ($.contains(a.el, b.el)) return 1;
        return a.i < b.i ? -1 : 1;
      });
    }

    function bindEvent(el, selector, event, callback, delegator, once) {
      if (!el) return el;
      if (_like_arr(el) && !_is_node(el) && el != el.window) return _each(el, function(el) {
        bindEvent(el, selector, event, callback, delegator, once);
      });

      var id = getDtId(el);
      var handler = parse(event);
      var elHandlers = handlers[id] || (handlers[id] = []);
      handler.callback = callback;

      // emulate mouseenter, mouseleave
      if (!delegator && handler.e in hover) callback = function(e) {
        var related = e.relatedTarget;
        if (!related || (related !== el && !$.contains(el, related)))
          return handler.callback.apply(el, arguments);
      };

      var proxy = makeProxy(el, delegator || callback);
      handler.selector = selector;
      handler.delegated = !!delegator;
      handler.delegator = once ? delegator ? function(e) {
        proxy(e);
        e.$delegate_called && D.off(el, event, selector, callback);
      } : function(e) {
        D.off(el, event, callback);
        proxy(e);
      } : proxy;

      elHandlers.push(handler);
      if (findHandlers(el, null, handler.e).length > 1) return el;

      el.addEventListener(realEvent(handler.e), function(e) {
        _each(sortDelegate(findHandlers(el, null, handler.e, null, true), el, e.target), function(d) {
          d.handler.delegator(e);
        });
        _each(findHandlers(el, null, handler.e, null, false), function(handler) { handler.delegator(e); });
      }, false);

      return el;
    }

    var returnTrue = function() { return true },
      returnFalse = function() { return false },
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      };

    function compatible(event) {
      if (event.isDefaultPrevented) return event;

      _each2(eventMethods, function(predicate, name) {
        var eventMethod = event[name];
        event[name] = function() {
          this[predicate] = returnTrue;
          return eventMethod && eventMethod.apply(event, arguments);
        };
        event[predicate] = returnFalse;
      });

      event.timeStamp || (event.timeStamp = Date.now());

      if (event.defaultPrevented !== undefined ? event.defaultPrevented :
          'returnValue' in event ? event.returnValue === false :
            event.getPreventDefault && event.getPreventDefault()) {
        event.isDefaultPrevented = returnTrue;
      }
      return event;
    }

    function delegator(el, selector, callback, is_hover) {
      return function(e) {
        if (e.isPropagationStopped()) return;
        var els = $.find(el, selector);
        var matched;
        for (var i = 0, l = els.length; i < l; i++) {
          var child = els[i];
          if (child === e.target || $.contains(child, e.target)) {
            e.$currentTarget = matched = child;
            e.$delegateTarget = el;
            break;
          }
        }
        if (matched) {
          if (is_hover) {
            var related = e.relatedTarget;
            if (!related || (related !== matched && !$.contains(matched, related))) {
              e.$delegate_called = true;
              return callback.apply(matched, arguments);
            }
          } else {
            e.$delegate_called = true;
            return callback.apply(matched, arguments);
          }
        }
      }
    }

    D.on = function on(el, eventType, cb_or_sel, callback2) {
      if (el == null) return;
      if (arguments.length == 2) return _(on, _, el, eventType);
      if (arguments.length == 3) return _is_str(el) ?
        _(on, _, el, eventType, cb_or_sel) : bindEvent(el, null, eventType, cb_or_sel);

      return bindEvent(el, cb_or_sel, eventType, callback2, delegator(el, cb_or_sel, callback2, parse(eventType).e in hover));
    };

    D.off = function off(el, eventType, callback, callback2) {
      if (el == null) return;
      if (_is_str(el)) return arguments.length == 2 ? _(off, _, el, eventType) : _(off, _, el, eventType, callback);

      return _is_str(callback) ?
        removeEvent(el, eventType, callback, callback2) :
        removeEvent(el, eventType, null, callback);
    };

    D.one = D.once = function once(el, eventType, cb_or_sel, callback2) {
      if (el == null) return;
      if (arguments.length == 2) return _(once, _, el, eventType);
      if (arguments.length == 3) return _is_str(el) ?
        _(once, _, el, eventType, cb_or_sel) :
        bindEvent(el, null, eventType, cb_or_sel, false, true);

      return bindEvent(el, cb_or_sel, eventType, callback2, delegator(el, cb_or_sel, callback2, parse(eventType).e in hover), true);
    };

    D.trigger = function trigger(el, eventType, props) {
      if (el == null) return;
      if (arguments.length == 1) return _(trigger, _, el);

      if (_like_arr(el) && !_is_node(el) && el != el.window) return _each(el, function(el) {
        triggerHandler(el, makeEvent(eventType, props));
      });
      triggerHandler(el, makeEvent(eventType, props));
    };

    function triggerHandler(el, e) {
      el.dispatchEvent(e);
      if (!e.isDefaultPrevented() && e.type == 'submit') el.submit();
    }

    function makeEvent(eventType, props) {
      var event = doc.createEvent(specialEvents[eventType] || 'Events');
      var bubbles = true;
      if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name]);
      event.initEvent(eventType, bubbles, true);
      return compatible(event);
    }

    /*D.submit = function(el) {
     if (el == null) return;
     triggerHandler(el, makeEvent('submit'));
     };*/

    function fetch_to_json(fetched) {
      return fetched.then(function(res) { return res.json() });
    }

    function ajax_method(method, url, data) {
      return fetch_to_json(fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: 'same-origin'
      }));
    }
    D.get = function(url, query_obj) {
      return fetch_to_json(fetch(append_query(url, D.param(query_obj)), {
        headers: { "Content-Type": "application/json" },
        credentials: 'same-origin'
      }));
    };
    D.post = _(ajax_method, 'POST');
    D.put = _(ajax_method, 'PUT');
    D.del = _(ajax_method, 'DEL');

    D.upload = function(input_or_form, opt) {
      return new Promise(function(resolve) {
        if (input_or_form == null) return;
        if (input_or_form.nodeName == 'INPUT') {
          var formData = new FormData();
          var files = input_or_form.files;
          for (var i = 0, file; file = files[i]; ++i) formData.append(file.name, file);
        } else {
          var formData = new FormData(input_or_form);
        }
        var is_multiple = input_or_form.multiple;
        var input_or_form2 = D.el(input_or_form.outerHTML);
        D.before(input_or_form, input_or_form2);
        D.remove(input_or_form);

        var xhr = new XMLHttpRequest(), url = D.UPLOAD_URL || '/api/file';
        if (opt) {
          _each(opt.data, function(val, key) { formData.append(key, val); });
          url = opt.url || url;
          if (opt.progress) xhr.upload.onprogress = function(e) {
            e.lengthComputable && opt.progress((e.loaded / e.total) * 100, e);
          };
        }
        xhr.open('POST', url, true);
        xhr.onload = function(e) {
          var data = JSON.parse(xhr.response);
          return resolve(is_multiple ? data : data[0] || data);
        };
        xhr.send(formData);  // multipart/form-data
      });
    };

    function append_query(url, query) {
      return query == '' ? url : (url + '&' + query).replace(/[&?]{1,2}/, '?');
    }

    D.param = function(a) {
      if (a == null) return;
      var s = [], rbracket = /\[\]$/,
        isArray = Array.isArray, add = function (k, v) {
          v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
          s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }, buildParams = function (prefix, obj) {
          var i, len, key;

          if (prefix) {
            if (isArray(obj)) {
              for (i = 0, len = obj.length; i < len; i++) {
                if (rbracket.test(prefix)) {
                  add(prefix, obj[i]);
                } else {
                  buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                }
              }
            } else if (obj && String(obj) === '[object Object]') {
              for (key in obj) {
                buildParams(prefix + '[' + key + ']', obj[key]);
              }
            } else {
              add(prefix, obj);
            }
          } else if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
              add(obj[i].name, obj[i].value);
            }
          } else {
            for (key in obj) {
              buildParams(key, obj[key]);
            }
          }
          return s;
        };

      return buildParams('', a).join('&').replace(/%20/g, '+');
    };
  }();
}(window);