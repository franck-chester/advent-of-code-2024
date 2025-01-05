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
part2.example = 2858;          // ['???'];
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
    disk.forEach((b, index) => solution += index * (b != FREE_BLOCK ? b : 0));

    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    let solution = 0
    const entry = entries[0];

    type Block = {
        fileId : number,
        size : number
    }

    const FREE_BLOCK = -1;
    const disk = new Array<Block>();
    const READING_FILE = true;
    const READING_SPACE = false;
    let state = READING_FILE;
    entry.split('').forEach((c, index) => {
        const size = parseInt(c);
        const fileId = state === READING_FILE ? index / 2 : FREE_BLOCK
        disk.push({fileId, size}); 
        state = !state;
    });

    disk.forEach((b,i) => console.log(`${i} : ${b.fileId} : ${b.size}`));

    console.log(`let's move files into free space `);
    if (isTest) {
        console.log(`We start with:`);
        console.log(disk.map(b => (b.fileId == FREE_BLOCK ? '.' : `${b.fileId}`).repeat(b.size)).join(''));
    }
    let freeSpacePosition = -1; 
    for(let blockIndex = disk.length -1; blockIndex > 0; blockIndex-- ){
        let block = disk[blockIndex];
        if (isTest) console.log(`${blockIndex} : ${block.fileId} : ${block.size}`)
        if(block.fileId == FREE_BLOCK) continue;
        if (isTest) console.log(`${blockIndex} : looking for a ${block.size} sized space to move file ${block.fileId} into...`)
        freeSpacePosition = disk.findIndex((b, index) => index < blockIndex && b.fileId == FREE_BLOCK && b.size >= block.size);
        if (freeSpacePosition == -1){
            if (isTest) console.log(`${blockIndex} : no ${block.size} sized space to move file ${block.fileId} into!`);
             continue; 
        }
        // remove the file from its position
        block = disk.splice(blockIndex, 1)[0];
        // replace it with free space
        disk.splice(blockIndex, 0, {fileId : FREE_BLOCK, size: block.size});

        // remove the free space
        let space = disk.splice(freeSpacePosition, 1)[0];
    
        // insert the file
        disk.splice(freeSpacePosition, 0, block);
        // pad with remaining space
        if(block.size < space.size){
            disk.splice(freeSpacePosition+1, 0, {fileId : FREE_BLOCK, size: space.size - block.size});
            blockIndex++;
        }
        
        if (isTest) {
            console.log(`${blockIndex} : moved ${JSON.stringify(block)} to position ${freeSpacePosition} of ${disk.length} ${block.size < space.size ? ' - some space remains' : ''}`);
            console.log(disk.map(b => (b.fileId == FREE_BLOCK ? '.' : `${b.fileId}`).repeat(b.size)).join(''));
        }
    } 

    if (isTest) {
        console.log('post compacting, calculated/expected: ');
        console.log(disk.map(b => (b.fileId == FREE_BLOCK ? '.' : `${b.fileId}`).repeat(b.size)).join(''));
        console.log('00992111777.44.333....5555.6666.....8888..');
    }

    // calculate the checksum
    // flatten the disk
    const flattened = new Array<number>();
    disk.forEach((b) => flattened.push(...new Array(b.size).fill(b.fileId)));
    flattened.forEach((b, index) => solution += index * (b != FREE_BLOCK ? b : 0));

    return `${solution}`;
}