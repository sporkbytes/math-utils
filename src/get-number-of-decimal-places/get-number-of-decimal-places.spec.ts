import { describe, it, expect } from 'vitest';

import { getNumberOfDecimalPlaces } from './get-number-of-decimal-places.js';

describe('getNumberOfDecimalPlaces', () => {
	it('should return the proper number of decimals for a number with decimals', () => {
		expect(getNumberOfDecimalPlaces(13.5)).toBe(1);
		expect(getNumberOfDecimalPlaces(13.55)).toBe(2);
		expect(getNumberOfDecimalPlaces(13.555)).toBe(3);
	});

	it('should return 0 if there are no decimals', () => {
		expect(getNumberOfDecimalPlaces(13)).toBe(0);
		expect(getNumberOfDecimalPlaces('13.')).toBe(0);
		expect(getNumberOfDecimalPlaces(NaN)).toBe(0);
		expect(getNumberOfDecimalPlaces(null)).toBe(0);
	});
});
