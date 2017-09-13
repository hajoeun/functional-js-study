export const _each = (list, iter) => {
	if (Array.isArray(list)) {
		for (var i = 0, len = list.length; i < len; i++)
			iter(list[i], i, list);
	} else {
		var keys = Object.keys(list);
		for (var i = 0, len = keys.length; i < len; i++)
			iter(list[keys[i]], keys[i], list);
	}
};
