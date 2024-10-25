import { getPercent } from '../get-percent/index.js';

/**
 * @alias module:mathUtils.getPercentGrowth
 * @description Given two numbers (oldValue and newValue) and an optional precision, determine the percent growth from oldValue to newValue.
 * @param {number | string | null} oldValue - The oldValue in the percentage calculation.
 * @param {number | string | null} newValue - The newValue in the percentage calculation.
 * @param {number | null} [precision=2] The number of digits to round the result to.
 * @return {number} The percent growth from oldValue to newValue, rounded to precision digits. Will return NaN if the calculated percentage is non-numeric.
 * @example
 * getPercentGrowth(5, 10); // 100.00
 * getPercentGrowth(5, 7.33); // 46.60
 */
export function getPercentGrowth(
	oldValue: number | string | null,
	newValue: number | string | null,
	precision: number | null = 2
): number {
	const oldNum = parseFloat(String(oldValue));
	const newNum = parseFloat(String(newValue));

	if (isNaN(oldNum) || isNaN(newNum) || oldNum === 0) {
		return NaN;
	}

	const growth = newNum - oldNum;
	return getPercent(growth, oldNum, precision);
}
