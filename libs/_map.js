export const _map = (list, iter) => {
	var res = [];
	if (Array.isArray(list)) {
		for (var i = 0, len = list.length; i < len; i++)
			res[i] = iter(list[i], i, list);
	} else {
		var keys = Object.keys(list);
		for (var i = 0, len = keys.length; i < len; i++)
			res[i] = iter(list[keys[i]], keys[i], list);
	}
	return res;
};
