export const _curryr3 = (func) => {
	return function(a, b, c) {
		if (arguments.length == 1)
			return function(b) {
				return func(b, a);
			};
		if (arguments.length == 2)
			return function(c) {
				return func(c, a, b);
			};
		return func(a, b, c);
	}
}