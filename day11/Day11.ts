///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day11";
export function part1(entries: string[], isTest?: boolean, testNumber?: number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = 55312;          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest?: boolean, testNumber?: number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test.txt';    // ['test01.txt'];
part2.example = '???';          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    let solution = '???'
    const stones = entries[0].split(' ');
    console.log(stones.join(' '));
    let blinks = 1;
    do {
        for (let i = stones.length - 1; i >= 0; i--) {
            // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
            if (stones[i] === '0') {
                stones[i] = '1';
            }
            // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. 
            // (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
            else if (stones[i].length % 2 == 0) {
                const mid = stones[i].length / 2;
                stones.splice(i, 1, stones[i].substring(0, mid), `${parseInt(stones[i].substring(mid))}`);
            }
            //If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
            else {
                stones[i] = `${parseInt(stones[i]) * 2024}`;
            }
        }
        console.log(`After ${blinks} blinks - ${stones.length} stones`);
    } while (blinks++ < 25);
    return `${stones.length}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    let solution = '???'
    for (let i = 0; i < entries.length; i++) {
    }
    return `${solution}`;
}