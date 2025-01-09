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
part2.example = 55312;          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
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
function findLastIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number {
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

function part2Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    const stones = entries[0].split(' ');
    console.log(stones.join(' '));

    // map of array where each value is the solution after index blinks
    // key = starting stone
    // value = array of max size = 75
    // value[0] = output of blinking 75 times
    // value[10] = output of blinking 65 (75-10) times
    // value[74] = output of blinking 1 (75-74) time
    const lookup = new Map<string, string[][]>();
    const blink = (stone: string): string[] => {
        let result = [];
        if (stone === '0') {
            result = ['1'];
        }
        // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. 
        // (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
        else if (stone.length % 2 == 0) {
            const mid = stone.length / 2;
            result = [stone.substring(0, mid), `${parseInt(stone.substring(mid))}`];
        }
        //If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
        else {
            result = [`${parseInt(stone) * 2024}`];
        }
        if (isTest) console.log(`  blink(${stone}) => ${result}`);
        return result;
    };
    const MAX_BLINK = 25;
    const blinkOneStoneToTheEnd = (stoneIn: string, blinksSoFar: number): string[] => {
        
        const stones = blink(stoneIn); // first blink
        
        for (let i = stones.length - 1; i >= 0; i--) {
            let blinks = blinksSoFar + 1;

            const stone = stones[i];
            if (!lookup.has(stone)) {
                const cache = Array.from({ length: MAX_BLINK }, () => []);
                lookup.set(stone, cache);
            }
            // check the cache
            const lookedUp = lookup.get(stone)!;
            const remainingBlinksToTheEnd = MAX_BLINK - blinks
            const minimumIndex = MAX_BLINK -remainingBlinksToTheEnd;
            // if 1 remaining blink to the end : minimumIndex = MAX_BLINK -2, one before last
            // if 3 remaining blink to the end : minimumIndex = MAX_BLINK -4, etc
            // if MAXBLINK-1 (all but one) remaining blink to the end : minimumIndex = MAX_BLINK - (MAXBLINK-1+1) = 0, etc
            const index =  lookedUp.findIndex((s, index) => index >= minimumIndex && s.length > 0);
            const blinksWeCanSave = MAX_BLINK - index;
            // if 3 remaining blink to the end : blinksWeCanSave = MAX_BLINK -4 = (6-4=2))
            if (index >= 0 && blinksWeCanSave > 1) {
                if (isTest) console.log(`${''.padEnd(blinksSoFar, ' ')}  Found solution for ${stone} and ${blinksWeCanSave} iterations...`)
                const resultAfterNBlinks = lookedUp[index];
                if (isTest) console.log(`${''.padEnd(blinksSoFar, ' ')}   -> we can save ourselves ${blinksWeCanSave} blinks out of ${remainingBlinksToTheEnd} : ${resultAfterNBlinks} `)
                stones.splice(i, 1, ...resultAfterNBlinks);
                blinks += blinksWeCanSave;
            }

            if (blinks < MAX_BLINK) {
                const resultAfterNBlinks = blinkOneStoneToTheEnd(stone, blinks);
                stones.splice(i, 1, ...resultAfterNBlinks);
            }
        }
        if (isTest) console.log(`${''.padEnd(blinksSoFar, ' ')}blinkOneStoneToTheEnd(${stoneIn}, ${blinksSoFar}) : ${stones}`);
        if (!lookup.has(stoneIn)) {
            const cache = Array.from({ length: MAX_BLINK }, () => []);
            lookup.set(stoneIn, cache);
        }
        lookup.get(stoneIn)![blinksSoFar+1] = stones;
        if (isTest) console.log(`${''.padEnd(blinksSoFar, ' ')} Saved solution for ${stoneIn} and ${MAX_BLINK - blinksSoFar} remaining iterations : ${stones} `);
        
        return stones;
    }

    for (let i = stones.length - 1; i >= 0; i--) {
        const resultAfterNBlinks = blinkOneStoneToTheEnd(stones[i], 0);
        if (isTest) console.log(`${stones[i]} =>  ${resultAfterNBlinks}`);
        stones.splice(i, 1, ...resultAfterNBlinks);
    }
    return `${stones.length}`;
}