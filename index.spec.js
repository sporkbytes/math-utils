const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

const mathUtils = require('./index');

describe('mathUtils', () => {
	describe('calculatePercent', () => {
		it('should calculate the percent of an amount with no rounding', () => {
			assert.strictEqual(mathUtils.calculatePercent(13.50, 25), 3.375);
			assert.strictEqual(mathUtils.calculatePercent(25.9, 25), 6.475);
			assert.strictEqual(mathUtils.calculatePercent(17.6, 100), 17.6);	// fails on v1.16.0 function at https://bitbucket.org/sporkbytes/web-application/src/9227303c9b6d4e5344aac9fd271d8d072610a6ef/shared/mathUtils.js?at=master&fileviewer=file-view-default#mathUtils.js-35
			assert.strictEqual(mathUtils.calculatePercent(20.05, 10), 2.005);	// fails on Stack Overflow function at https://stackoverflow.com/a/4372912
			assert.strictEqual(mathUtils.calculatePercent(20.98, 10), 2.098);	// fails on v1.15.1 function at https://bitbucket.org/sporkbytes/web-application/src/109852367421f129d58163edb3ab1962fd09f8ff/client/src/app/components/utilities/utilities.service.js?at=1.15.1&fileviewer=file-view-default#utilities.service.js-73
		});

		it('should return NaN when the amount is null', () => {
			assert.isNaN(mathUtils.calculatePercent(null, 25));
		});

		it('should return NaN when the percent is null', () => {
			assert.isNaN(mathUtils.calculatePercent(13.50, null));
		});
	});

	describe('getNumberOfDecimalPlaces', () => {
		it('should return the proper number of decimals for a number with decimals', () => {
			assert.strictEqual(mathUtils.getNumberOfDecimalPlaces(13.5), 1);
			assert.strictEqual(mathUtils.getNumberOfDecimalPlaces(13.55), 2);
			assert.strictEqual(mathUtils.getNumberOfDecimalPlaces(13.555), 3);
		});

		it('should return 0 if there are no decimals', () => {
			assert.strictEqual(mathUtils.getNumberOfDecimalPlaces(13), 0);
			assert.strictEqual(mathUtils.getNumberOfDecimalPlaces("13."), 0);
			assert.strictEqual(mathUtils.getNumberOfDecimalPlaces(NaN), 0);
			assert.strictEqual(mathUtils.getNumberOfDecimalPlaces(null), 0);
		});
	});

	describe('getPercent', () => {
		it('should return the numerator as a percent of the denominator and round to 2 digits by default', () => {
			assert.strictEqual(mathUtils.getPercent(3.375, 13.50), 25.00);
			assert.strictEqual(mathUtils.getPercent('3.375', '13.50'), 25.00);
		});

		it('should return the numerator as a percent of the denominator and round to the number of specified digits', () => {
			assert.strictEqual(mathUtils.getPercent(3.38, 13.50, 3), 25.037);
			assert.strictEqual(mathUtils.getPercent('3.38', '13.50', 3), 25.037);
		});

		it('should return NaN when either the numerator or the denominator cannot be parsed to a number', () => {
			assert.isNaN(mathUtils.getPercent(null, 13.50));
			assert.isNaN(mathUtils.getPercent(3.375, null));
			assert.isNaN(mathUtils.getPercent(null, null));
			assert.isNaN(mathUtils.getPercent('string', 13.50));
			assert.isNaN(mathUtils.getPercent(3.375, 'string'));
			assert.isNaN(mathUtils.getPercent('string', 'string'));
		});

		it('should return NaN when the denominator is 0', () => {
			assert.isNaN(mathUtils.getPercent(0, 0));
			assert.isNaN(mathUtils.getPercent(100, 0));
			assert.isNaN(mathUtils.getPercent(-100, 0));
		});

		it('should get the percent when the precision is null', () => {
			assert.strictEqual(mathUtils.getPercent(3.375, 13.50, null), 25.00);
		});
	});

	describe('getPercentGrowth', () => {
		it('should return the percent growth from the oldValue to the newValue and round to 2 digits by default', () => {
			assert.strictEqual(mathUtils.getPercentGrowth(5, 7.33), 46.60);
		});

		it('should return the percent growth from the oldValue to the newValue and round to the number of digits specified', () => {
			assert.strictEqual(mathUtils.getPercentGrowth(5, 6.283945, 3), 25.679);
		});

		it('should return NaN when the oldValue or the newValue cannot be parsed to a number', () => {
			assert.isNaN(mathUtils.getPercentGrowth(null, 100));
			assert.isNaN(mathUtils.getPercentGrowth(100, null));
			assert.isNaN(mathUtils.getPercentGrowth(null, null));
			assert.isNaN(mathUtils.getPercentGrowth('string', 13.50));
			assert.isNaN(mathUtils.getPercentGrowth(3.375, 'string'));
			assert.isNaN(mathUtils.getPercentGrowth('string', 'string'));
		});

		it('should return NaN when the oldValue is 0', () => {
			assert.isNaN(mathUtils.getPercentGrowth(0, 100));
		});
	});

	describe('roundCurrency', () => {
		it('should round to 2 digits', () => {
			assert.strictEqual(mathUtils.roundCurrency(10.34628295567127), 10.35);
			assert.strictEqual(mathUtils.roundCurrency(290.335), 290.34);
		});

		it('should return NaN when the amount is null', () => {
			assert.isNaN(mathUtils.roundCurrency(null));
		});
	});

	describe('roundNumberToDigits', () => {
		it('should round to the specified number of digits for a positive number', () => {
			assert.strictEqual(mathUtils.roundNumberToDigits(10.34628295567127, 6), 10.346283);
		});

		it('should round to the specified number of digits for a negative number', () => {
			assert.strictEqual(mathUtils.roundNumberToDigits(-10.34628295567127, 6), -10.346283);
		});

		it('should including trailing zeroes', () => {
			assert.strictEqual(mathUtils.roundNumberToDigits(100, 2), 100.00);
		});

		it('should round up when the next extra digit is 5 or higher', () => {
			assert.strictEqual(mathUtils.roundNumberToDigits(10.515, 2), 10.52);
		});

		it('should round down when the next extra digit is 4 or lower', () => {
			assert.strictEqual(mathUtils.roundNumberToDigits(10.514, 2), 10.51);
		});

		it('should return NaN when the number is null', () => {
			assert.isNaN(mathUtils.roundNumberToDigits(null, 2));
		});
	});
});
