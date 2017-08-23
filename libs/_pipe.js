import { _go } from './_go.js';

export const _pipe = (...fns) => {
	return function(seed) {
		return _go.apply(null, [seed].concat(fns));
	}
}