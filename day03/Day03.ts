///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day03";
export function part1(entries: string[], isTest?: boolean, testNumber?: number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = 161;          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest?: boolean, testNumber?: number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test2.txt';    // ['test01.txt'];
part2.example = 48;          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    let solution = 0;
    // flatten the entries back into a single string
    const instructions = entries.join();
    const regex = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g;
    let match;
    while ((match = regex.exec(instructions)) !== null) {
        const a = parseInt(match.groups?.a!);
        const b = parseInt(match.groups?.b!);
        solution += a * b;
    }
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    let solution = 0;
    // flatten the entries back into a single string
    const instructions = entries.join().split(/don't\(\).*?do\(\)/g).join();
    const regex = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g;

    let match;
    while ((match = regex.exec(instructions)) !== null) {
        const a = parseInt(match.groups?.a!);
        const b = parseInt(match.groups?.b!);
        solution += a * b;
    }
    return `${solution}`;
}