import {
	calculatePercent,
	getNumberOfDecimalPlaces,
	getPercent,
	getPercentGrowth,
	roundCurrency,
	roundNumberToDigits,
} from './index';

describe('calculatePercent', () => {
	it('should calculate the percent of an amount with no rounding', () => {
		expect(calculatePercent(13.5, 25)).toBe(3.375);
		expect(calculatePercent(25.9, 25)).toBe(6.475);
		expect(calculatePercent(17.6, 100)).toBe(17.6); // fails on v1.16.0 function at https://bitbucket.org/sporkbytes/web-application/src/9227303c9b6d4e5344aac9fd271d8d072610a6ef/shared/js?at=master&fileviewer=file-view-default#js-35
		expect(calculatePercent(20.05, 10)).toBe(2.005); // fails on Stack Overflow function at https://stackoverflow.com/a/4372912
		expect(calculatePercent(20.98, 10)).toBe(2.098); // fails on v1.15.1 function at https://bitbucket.org/sporkbytes/web-application/src/109852367421f129d58163edb3ab1962fd09f8ff/client/src/app/components/utilities/utilities.service.js?at=1.15.1&fileviewer=file-view-default#utilities.service.js-73
	});

	it('should return NaN when the amount is null', () => {
		expect(calculatePercent(null, 25)).toBeNaN();
	});

	it('should return NaN when the percent is null', () => {
		expect(calculatePercent(13.5, null)).toBeNaN();
	});
});

describe('getNumberOfDecimalPlaces', () => {
	it('should return the proper number of decimals for a number with decimals', () => {
		expect(getNumberOfDecimalPlaces(13.5)).toBe(1);
		expect(getNumberOfDecimalPlaces(13.55)).toBe(2);
		expect(getNumberOfDecimalPlaces(13.555)).toBe(3);
	});

	it('should return 0 if there are no decimals', () => {
		expect(getNumberOfDecimalPlaces(13)).toBe(0);
		expect(getNumberOfDecimalPlaces('13.')).toBe(0);
		expect(getNumberOfDecimalPlaces(NaN)).toBe(0);
		expect(getNumberOfDecimalPlaces(null)).toBe(0);
	});
});

describe('getPercent', () => {
	it('should return the numerator as a percent of the denominator and round to 2 digits by default', () => {
		expect(getPercent(3.375, 13.5)).toBe(25.0);
		expect(getPercent('3.375', '13.50')).toBe(25.0);
	});

	it('should return the numerator as a percent of the denominator and round to the number of specified digits', () => {
		expect(getPercent(3.38, 13.5, 3)).toBe(25.037);
		expect(getPercent('3.38', '13.50', 3)).toBe(25.037);
	});

	it('should return NaN when either the numerator or the denominator cannot be parsed to a number', () => {
		expect(getPercent(null, 13.5)).toBeNaN();
		expect(getPercent(3.375, null)).toBeNaN();
		expect(getPercent(null, null)).toBeNaN();
		expect(getPercent('string', 13.5)).toBeNaN();
		expect(getPercent(3.375, 'string')).toBeNaN();
		expect(getPercent('string', 'string')).toBeNaN();
	});

	it('should return NaN when the denominator is 0', () => {
		expect(getPercent(0, 0)).toBeNaN();
		expect(getPercent(100, 0)).toBeNaN();
		expect(getPercent(-100, 0)).toBeNaN();
	});

	it('should get the percent when the precision is null', () => {
		expect(getPercent(3.375, 13.5, null)).toBe(25.0);
	});
});

describe('getPercentGrowth', () => {
	it('should return the percent growth from the oldValue to the newValue and round to 2 digits by default', () => {
		expect(getPercentGrowth(5, 7.33)).toBe(46.6);
	});

	it('should return the percent growth from the oldValue to the newValue and round to the number of digits specified', () => {
		expect(getPercentGrowth(5, 6.283945, 3)).toBe(25.679);
	});

	it('should return NaN when the oldValue or the newValue cannot be parsed to a number', () => {
		expect(getPercentGrowth(null, 100)).toBeNaN();
		expect(getPercentGrowth(100, null)).toBeNaN();
		expect(getPercentGrowth(null, null)).toBeNaN();
		expect(getPercentGrowth('string', 13.5)).toBeNaN();
		expect(getPercentGrowth(3.375, 'string')).toBeNaN();
		expect(getPercentGrowth('string', 'string')).toBeNaN();
	});

	it('should return NaN when the oldValue is 0', () => {
		expect(getPercentGrowth(0, 100)).toBeNaN();
	});
});

describe('roundCurrency', () => {
	it('should round to 2 digits', () => {
		expect(roundCurrency(10.34628295567127)).toBe(10.35);
		expect(roundCurrency(290.335)).toBe(290.34);
	});

	it('should return NaN when the amount is null', () => {
		expect(roundCurrency(null)).toBeNaN();
	});
});

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
