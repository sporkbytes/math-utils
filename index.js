/**
 * Utility functions use to perform basic math.
 * @module mathUtils
 */
(function(root, factory) {
	/* istanbul ignore next */
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	}
	else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	}
	else {
		root.mathUtils = factory();
	}
})(/* istanbul ignore next */ typeof self !== 'undefined' ? self : this, function() {
	return {
		calculatePercent,
		getNumberOfDecimalPlaces,
		getPercent,
		getPercentGrowth,
		roundCurrency,
		roundNumberToDigits
	};

	/**
	 * @alias module:mathUtils.calculatePercent
	 * @description Given an amount, return the percent value of amount.
	 * @param {number} amount - The original full amount you're finding the percent of.
	 * @param {number} percent - The percentage you want to retrieve from amount.
	 * @return {number} The percent of amount.
	 * @example
	 * calculatePercent(13.50, 25);	// 3.375
	 */
	function calculatePercent(amount, percent) {
		const amountDecimals = getNumberOfDecimalPlaces(amount);
		const percentDecimals = getNumberOfDecimalPlaces(percent);
		const amountAsInteger = Math.round(amount + `e${amountDecimals}`);
		const percentAsInteger = Math.round(percent + `e${percentDecimals}`);
		const precisionCorrection = `e-${amountDecimals + percentDecimals + 2}`;	// add 2 to scale by an additional 100 since the percentage supplied is 100x the actual multiple (e.g. 35% is passed as 35, but as a proper multiple is 0.35)

		return Number((amountAsInteger * percentAsInteger) + precisionCorrection);
	}

	/**
	 * @alias module:mathUtils.getNumberOfDecimalPlaces
	 * @description Given a `number`, return the number of decimal places contained within it.  Only the first decimal point is used if you pass a number with more than one decimal point.
	 * @param {number} number - The number for which you are getting the number of decimal places.
	 * @return {number} The number of decimal places contained in `number`.
	 */
	function getNumberOfDecimalPlaces(number) {
		const decimals = parseFloat(number).toString().split('.')[1];

		if (decimals) {
			return decimals.length;
		}

		return 0;
	}

	/**
	 * @alias module:mathUtils.getPercent
	 * @description Given two numbers (numerator and denominator) and an optional precision, determine the numerator's percent of the denominator.
	 * @param {number} numerator - The numerator in the percentage calculation.
	 * @param {number} denominator - The denominator in the percentage calculation.
	 * @param {number} [precision = 2] The number of digits to round the result to.
	 * @return {number|NaN} The numerator's percentage of the denominator, rounded to precision digits.  Will return NaN if the calculated percentage is non-numeric.
	 * @example
	 * getPercent(3.375, 13.50); // 25.00
	 */
	function getPercent(numerator, denominator, precision = 2) {
		const percent = (parseFloat(numerator) / parseFloat(denominator)) * 100;

		if (isNaN(percent) || !isFinite(percent)) {
			return NaN;		// NaN is falsy and properly communicates to users of this function that the result calculated is not a number
		}

		return roundNumberToDigits(percent, precision);
	}

	/**
	 * @alias module:mathUtils.getPercentGrowth
	 * @description Given two numbers (oldValue and newValue) and an optional precision, determine the percent growth from oldValue to newValue.
	 * @param {number} oldValue - The oldValue in the percentage calculation.
	 * @param {number} newValue - The newValue in the percentage calculation.
	 * @param {number} [precision = 2] The number of digits to round the result to.
	 * @return {number|NaN} The percent growth from oldValue to newValue, rounded to precision digits.  Will return NaN if the calculated percentage is non-numeric.
	 * @example
	 * getPercentGrowth(5, 10); // 100.00
	 * getPercentGrowth(5, 7.33); // 46.60
	 */
	function getPercentGrowth(oldValue, newValue, precision = 2) {
		const growth = parseFloat(newValue) - parseFloat(oldValue);
		const growthPercent = getPercent(growth, oldValue, precision);

		if (isNaN(growthPercent) || !isFinite(growthPercent)) {
			return NaN;		// NaN is falsy and properly communicates to users of this function that the result calculated is not a number
		}

		return growthPercent;
	}

	/**
	 * @alias module:mathUtils.roundCurrency
	 * @description Given an amount, round it to 2 decimal places for use in currency.
	 * @param {number} amount - The amount being rounded.
	 * @return {number} The amount rounded to 2 digits.
	 * @example
	 * roundCurrency(10.34628295567127);	// 10.35
	 */
	function roundCurrency(amount) {
		return roundNumberToDigits(amount, 2);
	}

	/**
	 * @alias module:mathUtils.roundNumberToDigits
	 * @description Given a number and a precision, return the number rounded to precision digits.  See [this blog post]{@link http://jacklmoore.com/notes/rounding-in-javascript/}.
	 * @param {number} number - The number being rounded.
	 * @param {number} precision - The number of digits to round to.
	 * @return {number} The number rounded to precision digits.
	 * @example
	 * roundNumberToDigits(10.34628295567127, 6);	// 10.346283
	 */
	function roundNumberToDigits(number, precision) {
		if (precision == null) {
			return number;
		}

		return Number(Math.round(number + `e${precision}`) + `e-${precision}`);
	}
});
