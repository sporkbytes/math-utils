import { describe, it, expect } from 'vitest';

import { getPercent } from './get-percent.js';

describe('getPercent', () => {
	it('should return the numerator as a percent of the denominator and round to 2 digits by default', () => {
		expect(getPercent(3.375, 13.5)).toBe(25.0);
		expect(getPercent('3.375', '13.50')).toBe(25.0);
	});

	it('should return the numerator as a percent of the denominator and round to the number of specified digits', () => {
		expect(getPercent(3.38, 13.5, 3)).toBe(25.037);
		expect(getPercent('3.38', '13.50', 3)).toBe(25.037);
	});

	it('should return NaN when either the numerator or the denominator cannot be parsed to a number', () => {
		expect(getPercent(null, 13.5)).toBeNaN();
		expect(getPercent(3.375, null)).toBeNaN();
		expect(getPercent(null, null)).toBeNaN();
		expect(getPercent('string', 13.5)).toBeNaN();
		expect(getPercent(3.375, 'string')).toBeNaN();
		expect(getPercent('string', 'string')).toBeNaN();
	});

	it('should return NaN when the denominator is 0', () => {
		expect(getPercent(0, 0)).toBeNaN();
		expect(getPercent(100, 0)).toBeNaN();
		expect(getPercent(-100, 0)).toBeNaN();
	});

	it('should get the percent when the precision is null', () => {
		expect(getPercent(3.375, 13.5, null)).toBe(25.0);
	});
});
