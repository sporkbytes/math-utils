import { getNumberOfDecimalPlaces } from '../get-number-of-decimal-places/index.js';
import { roundNumberToDigits } from '../round-number-to-digits/index.js';

/**
 * @alias module:mathUtils.calculatePercent
 * @description Given an amount, return the percent value of the amount.
 * @param {number | string | null} amount - The original full amount you're finding the percent of.
 * @param {number | string | null} percent - The percentage you want to retrieve from the amount.
 * @return {number} The percent of the amount.
 * @example
 * calculatePercent(13.50, 25); // 3.375
 */
export function calculatePercent(
	amount: number | string | null,
	percent: number | string | null
): number {
	const amountNum = parseFloat(String(amount));
	const percentNum = parseFloat(String(percent));

	if (isNaN(amountNum) || isNaN(percentNum)) {
		return NaN;
	}

	const result = (amountNum * percentNum) / 100;

	// Determine the total number of decimal places
	const amountDecimals = getNumberOfDecimalPlaces(amountNum);
	const percentDecimals = getNumberOfDecimalPlaces(percentNum);
	const totalDecimals = amountDecimals + percentDecimals + 2; // plus 2 for division by 100

	return roundNumberToDigits(result, totalDecimals);
}
