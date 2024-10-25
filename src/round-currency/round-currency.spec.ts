import { describe, it, expect } from 'vitest';

import { roundCurrency } from './round-currency.js';

describe('roundCurrency', () => {
	it('should round to 2 digits', () => {
		expect(roundCurrency(10.34628295567127)).toBe(10.35);
		expect(roundCurrency(290.335)).toBe(290.34);
	});

	it('should return NaN when the amount is null', () => {
		expect(roundCurrency(null)).toBeNaN();
	});
});
