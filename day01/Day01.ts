///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day01";
export function part1(entries: string[], isTest? : boolean, testNumber?:number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = '???';          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest? : boolean, testNumber?:number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test.txt';    // ['test01.txt'];
part2.example = '???';          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    let solution = 0

    let list1 = new Array<number>();
    let list2 = new Array<number>();
    const m = /(?<one>\d*)\s+(?<two>\d*)/
    for(let i=0; i<entries.length; i++){
        const matches = m.exec(entries[i]);
        list1.push(parseInt(matches?.groups?.one!))
        list2.push(parseInt(matches?.groups?.two!))
    }

    list1.sort((a,b) => a-b);
    list2.sort((a,b) => a-b);

    for(let i=0; i<list1.length; i++){
        console.log(`${list1.at(i)!} - ${list2.at(i)!} => ${Math.abs(list1.at(i)! - list2.at(i)!)}`)
        solution += (Math.abs(list1.at(i)! - list2.at(i)!))
    }

    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    let solution = 0

    let list1 = new Array<number>();
    let list2 = new Array<number>();
    const m = /(?<one>\d*)\s+(?<two>\d*)/
    for(let i=0; i<entries.length; i++){
        const matches = m.exec(entries[i]);
        list1.push(parseInt(matches?.groups?.one!))
        list2.push(parseInt(matches?.groups?.two!))
    }


    for(let i=0; i<list1.length; i++){
        let a = list1.at(i)!;
        let similarity = list2.filter(b => b === a).length;
        let score = a * similarity;
        console.log(`${a!} appears ${similarity} => ${score}`)
        solution += score
    }
    return `${solution}`;
}