/**
 * @alias module:mathUtils.roundNumberToDigits
 * @description Given a number and a precision, return the number rounded to precision digits.
 * @param {number | null} number - The number being rounded.
 * @param {number | null} precision - The number of digits to round to.
 * @return {number} The number rounded to precision digits.
 * @example
 * roundNumberToDigits(10.34628295567127, 6); // 10.346283
 */
export function roundNumberToDigits(
	number: number | null,
	precision: number | null
): number {
	if (number == null || isNaN(number)) {
		return NaN;
	}

	if (precision == null) {
		return number;
	}

	// Use exponential notation to shift decimal and perform rounding
	const numStr = number + 'e' + precision;
	const roundedStr = Math.round(Number(numStr)) + 'e-' + precision;
	const result = Number(roundedStr);

	return result;
}
