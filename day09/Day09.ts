///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day09";
export function part1(entries: string[], isTest?: boolean, testNumber?: number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = 1928;          // ['???'];
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
    let solution = 0
    const entry = entries[0];

    const disk = new Array<number>();
    const READING_FILE = true;
    const READING_SPACE = false;
    const FREE_BLOCK = -1;
    let state = READING_FILE;
    entry.split('').forEach((c, index) => {
        const blockSize = parseInt(c);
        disk.push(...new Array(blockSize).fill(state === READING_FILE ? index / 2 : FREE_BLOCK)); // use -1 to indicate a free block
        state = !state;
    });

    if (isTest) {
        console.log('pre compacting, calculated/expected: ');
        console.log(disk.map(n => n == FREE_BLOCK ? '.' : n.toString()).join(''));
        console.log('00...111...2...333.44.5555.6666.777.888899');
    }

    // let's move blocks into free space
    let freeSpacePosition = -1;
    do {
        freeSpacePosition = disk.findIndex((n, index) => index >= freeSpacePosition && n == FREE_BLOCK);
        if (freeSpacePosition == -1) break;
        let lastBlock = disk.pop()!;
        if (lastBlock != FREE_BLOCK) {
            disk[freeSpacePosition] = lastBlock;
            if (isTest) {
                console.log(`moved ${lastBlock} to position ${freeSpacePosition} of ${disk.length}`);
            }
        }
    } while (freeSpacePosition > -1);

    if (isTest) {
        console.log('post compacting, calculated/expected: ');
        console.log(disk.map(n => n == FREE_BLOCK ? '.' : n.toString()).join(''));
        console.log('0099811188827773336446555566..............');
    }

    // calculate the checksum
    disk.forEach((b, index) => solution+= index * (b != FREE_BLOCK ? b : 0));

    return `${solution}`;
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