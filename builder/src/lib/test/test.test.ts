import { determineType } from '$lib/tools/index.js';

describe("test 1, 1st type", () => {
    it("1st type 1", () => {
        expect(determineType([1, "heap", determineType, { a: [1, 2] }, [1, "a"]])).toBe("(number | string | unknown | object | (number | string)[])[]");
    });
});
