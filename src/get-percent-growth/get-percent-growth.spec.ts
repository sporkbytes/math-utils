import { describe, it, expect } from 'vitest';

import { getPercentGrowth } from './get-percent-growth.js';

describe('getPercentGrowth', () => {
	it('should return the percent growth from the oldValue to the newValue and round to 2 digits by default', () => {
		expect(getPercentGrowth(5, 7.33)).toBe(46.6);
	});

	it('should return the percent growth from the oldValue to the newValue and round to the number of digits specified', () => {
		expect(getPercentGrowth(5, 6.283945, 3)).toBe(25.679);
	});

	it('should return NaN when the oldValue or the newValue cannot be parsed to a number', () => {
		expect(getPercentGrowth(null, 100)).toBeNaN();
		expect(getPercentGrowth(100, null)).toBeNaN();
		expect(getPercentGrowth(null, null)).toBeNaN();
		expect(getPercentGrowth('string', 13.5)).toBeNaN();
		expect(getPercentGrowth(3.375, 'string')).toBeNaN();
		expect(getPercentGrowth('string', 'string')).toBeNaN();
	});

	it('should return NaN when the oldValue is 0', () => {
		expect(getPercentGrowth(0, 100)).toBeNaN();
	});
});
