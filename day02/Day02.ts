///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day02";
export function part1(entries: string[], isTest? : boolean, testNumber?:number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = '2';          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest? : boolean, testNumber?:number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test.txt';    // ['test01.txt'];
part2.example = '4';          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    const inc = 1;
    const dec = -1
    const flat = 0;
    let solution = 0;
    for(let i=0; i<entries.length; i++){
        const levels = entries[i].split(' ').map(s => parseInt(s));
        let slope = flat;
        if (levels[0]<levels[1]) slope = inc;
        else if(levels[0]>levels[1]) slope = dec;

        let safe = (slope != flat);
        //console.log(`${levels[0]} -> ${levels[1]} => ${slope == inc?'up':slope == dec?'down':'flat'}`);
        let j = 2;
        let incline = 0;
        for(; j<levels.length && safe; j++){
            incline = levels[j] - levels[j-1];
            safe = (slope == inc && incline > 0 && incline < 4)
                 ||(slope == dec && incline < 0 && incline > -4);
            //console.log(`${levels[j]} - ${levels[j-1]} = ${incline} : ${safe?'':'not '}safe (${slope == inc?'up':''}${slope == dec?'down':''})`);
        }

        console.log(`${levels.join(' ')} : ${slope == inc?'up':slope == dec?'down':'flat'} : ${safe?'safe': 'unsafe from level ['+j+'] = '+levels[j]} : incline = ${incline}`);
        if(safe) solution++;

    }
    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    const inc = 1;
    const dec = -1
    const flat = 0;
    let solution = 0;
    for(let i=0; i<entries.length; i++){
        const levels = entries[i].split(' ').map(s => parseInt(s));
        let slope = flat;
        if (levels[0]<levels[1]) slope = inc;
        else if(levels[0]>levels[1]) slope = dec;

        let safe = (slope != flat);
        let safeWithout = false;
        let removedLevels = 0;
        //console.log(`${levels[0]} -> ${levels[1]} => ${slope == inc?'up':slope == dec?'down':'flat'}`);
        let j = 1;
        let inclineWithLevel = 0;
        let inclineWithoutLevel = 0;
        for(; (j<levels.length-1) && safe; j++){
            inclineWithLevel = levels[j] - levels[j-1];
            inclineWithoutLevel = levels[j+1] - levels[j-1];

            safeWithout = 
                    (slope == inc && inclineWithoutLevel > 0 && inclineWithoutLevel < 4)
                ||  (slope == dec && inclineWithoutLevel < 0 && inclineWithoutLevel > -4);

            let safeWith =  (slope == inc && inclineWithLevel > 0 && inclineWithLevel < 4)
                || (slope == dec && inclineWithLevel < 0 && inclineWithLevel > -4);

            if (!safeWith && safeWithout) removedLevels++;

            safe = safeWith || (safeWithout && removedLevels < 2);
  
            console.log(`(${slope == inc?'up':''}${slope == dec?'down':''}) ${levels[j-1]} => ${levels[j]} = ${inclineWithLevel} / ${levels[j-1]} => ${levels[j+1]} = ${inclineWithoutLevel}: ${safeWith?'':'not '}safe with / removed ${removedLevels} levels / ${safe?'':'NOT '}safe`);
        }

        console.log(`${levels.join(' ')} : ${slope == inc?'up':slope == dec?'down':'flat'} : ${safe?'safe': 'unsafe from level ['+j+'] = '+levels[j]} : incline1 = ${inclineWithLevel} / incline2 = ${inclineWithoutLevel}`);
        if(safe) solution++;

    }
    return `${solution}`;
}