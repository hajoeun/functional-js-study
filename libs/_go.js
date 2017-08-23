import { _reduce } from './_reduce.js';

export const _go = (seed, ...fns) => {
	return _reduce(fns, (se, fn) => {
		return fn(se);
	}, seed)
};