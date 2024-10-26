import { describe, it, expect } from 'vitest';

import { calculatePercent } from './calculate-percent.js';

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
