/**
 * @alias module:mathUtils.getNumberOfDecimalPlaces
 * @description Given a `number` or `string`, return the number of decimal places contained within it.
 * @param {number | string | null} input - The number for which you are getting the number of decimal places.
 * @return {number} The number of decimal places contained in `input`.
 */
export function getNumberOfDecimalPlaces(
	input: number | string | null
): number {
	if (input == null || isNaN(Number(input))) {
		return 0;
	}

	const numberString = String(input);
	const decimalPart = numberString.split('.')[1];

	return decimalPart ? decimalPart.length : 0;
}
