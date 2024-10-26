import { roundNumberToDigits } from '../round-number-to-digits/index.js';

/**
 * @alias module:mathUtils.getPercent
 * @description Given two numbers (numerator and denominator) and an optional precision, determine the numerator's percent of the denominator.
 * @param {number | string | null} numerator - The numerator in the percentage calculation.
 * @param {number | string | null} denominator - The denominator in the percentage calculation.
 * @param {number | null} [precision=2] The number of digits to round the result to.
 * @return {number} The numerator's percentage of the denominator, rounded to precision digits. Will return NaN if the calculated percentage is non-numeric.
 * @example
 * getPercent(3.375, 13.50); // 25.00
 * getPercent('3.375', '13.50'); // 25.00
 */
export function getPercent(
	numerator: number | string | null,
	denominator: number | string | null,
	precision: number | null = 2
): number {
	const num = parseFloat(String(numerator));
	const den = parseFloat(String(denominator));

	if (isNaN(num) || isNaN(den) || den === 0) {
		return NaN;
	}

	const percent = (num / den) * 100;
	return roundNumberToDigits(percent, precision);
}
