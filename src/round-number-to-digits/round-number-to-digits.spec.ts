import { describe, it, expect } from 'vitest';

import { roundNumberToDigits } from './round-number-to-digits';

describe('roundNumberToDigits', () => {
	it('should round to the specified number of digits for a positive number', () => {
		expect(roundNumberToDigits(10.34628295567127, 6)).toBe(10.346283);
	});

	it('should round to the specified number of digits for a negative number', () => {
		expect(roundNumberToDigits(-10.34628295567127, 6)).toBe(-10.346283);
	});

	it('should including trailing zeroes', () => {
		expect(roundNumberToDigits(100, 2)).toBe(100.0);
	});

	it('should round up when the next extra digit is 5 or higher', () => {
		expect(roundNumberToDigits(10.515, 2)).toBe(10.52);
	});

	it('should round down when the next extra digit is 4 or lower', () => {
		expect(roundNumberToDigits(10.514, 2)).toBe(10.51);
	});

	it('should return NaN when the number is null', () => {
		expect(roundNumberToDigits(null, 2)).toBeNaN();
	});
});
