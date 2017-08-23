export const _find = (list, iter) => {
	if (Array.isArray(list)) {
		for (var i = 0, len = list.length; i < len; i++)
			if (iter(list[i], i, list))
				return list[i];
	} else {
		var keys = Object.keys(list);
		for (var i = 0, len = keys.length; i < len; i++)
			if (iter(list[keys[i]], keys[i], list))
				return list[keys[i]];
	}
};