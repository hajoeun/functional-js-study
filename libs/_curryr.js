export const _curryr = (func) => {
	return function(a, b) {
		return !b ? function(b) {
			return func(b, a);
		} : func(a, b);
	}
};