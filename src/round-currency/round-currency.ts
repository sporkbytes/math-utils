import { roundNumberToDigits } from '../round-number-to-digits/index.js';

/**
 * @alias module:mathUtils.roundCurrency
 * @description Given an amount, round it to 2 decimal places for use in currency.
 * @param {number | null} amount - The amount being rounded.
 * @return {number} The amount rounded to 2 digits.
 * @example
 * roundCurrency(10.34628295567127); // 10.35
 */
export function roundCurrency(amount: number | null): number {
	if (amount == null || isNaN(amount)) {
		return NaN;
	}

	return roundNumberToDigits(amount, 2);
}
