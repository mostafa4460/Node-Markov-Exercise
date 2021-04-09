const MarkovMachine = require('./markov');

describe("MarkovMachine tests", () => {
    let mm;
    beforeAll(() => {
        mm = new MarkovMachine("The cat is in the hat")
    })

    test('makeChains instance method', () => {
        expect(mm.chains).toEqual({
            the: ["cat", "hat"],
            cat: ["is"],
            is: ["in"],
            in: ["the"],
            hat: [null]
        })
    });

    test('makeText instance method', () => {
        expect(mm.makeText(numWords=0)).toBeNull();

        const text = mm.makeText(numWords=1);
        expect(text).toEqual(expect.any(String));
        expect(text.split(' ').length).toBe(1);

        const text2 = mm.makeText();
        expect(text2).toEqual(expect.any(String));
        expect(text2.split(' ').length).toBeLessThanOrEqual(100);
    });
});