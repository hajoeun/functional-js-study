export const _filter = (list, iter) => {
	var res = [];
	if (Array.isArray(list)) {
		for (var i = 0, len = list.length; i < len; i++)
			if (iter(list[i], i, list))
				res.push(list[i]);
	} else {
		var keys = Object.keys(list);
		for (var i = 0, len = keys.length; i < len; i++)
			if (iter(list[keys[i]], keys[i], list))
				res.push(list[keys[i]]);
	}
	return res;
};
