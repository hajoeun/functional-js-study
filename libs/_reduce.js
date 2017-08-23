export const _reduce = (list, iter, memo) => {
	var i = 0;
	if (Array.isArray(list)) {
		var res = (memo != undefined ? memo : list[i++]);
		for (var len = list.length; i < len; i++)
			res = iter(res, list[i], i, list);
	} else {
		var keys = Object.keys(list), res = (memo != undefined ? memo : list[keys[i++]]);
		for (var len = keys.length; i < len; i++)
			res = iter(res, list[keys[i]], keys[i], list);
	}
	return res;
};