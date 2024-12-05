///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day05";
export function part1(entries: string[], isTest? : boolean, testNumber?:number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = '143';          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest? : boolean, testNumber?:number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test.txt';    // ['test01.txt'];
part2.example = '???';          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
interface Rule {
    mustBeAfter : number[],
    mustBeBefore : number[],
}
function part1Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    let solution = 0;

    let rules = new Map<number, Rule>();
    
    let i=0;
    // first process the rules, create a map of page to rules
    for(; i<entries.length; i++){
        if(entries[i].length == 0) break;

        const rule = (entries.at(i)?.split('|').map(s => parseInt(s)))!;
        console.log(`Processing rule ${i}: ${rule.join(',')}...`)

        if(!rules.has(rule[0])){
            rules.set(rule[0], {mustBeAfter: [], mustBeBefore:[]});
            console.log(`Initialised rules for page ${rule[0]}: ...`)
        }
        if(!rules.has(rule[1])){
            rules.set(rule[1], {mustBeAfter: [], mustBeBefore:[]});
            console.log(`Initialised rules for page ${rule[1]}: ...`)
        }

        rules.get(rule[0])?.mustBeBefore.push(rule[1]);
        rules.get(rule[1])?.mustBeAfter.push(rule[0]);

    }

    console.log(`Processed ${i} rules:`);
    console.log(rules);


    // next process the updates
    for(i++;i<entries.length; i++){
        const update = (entries.at(i)?.split(',').map(s => parseInt(s)))!;

        console.log(`Validating update ${update.join(',')}...`)
        let updateIndex = 1;
        let correctOrder = true;
        for(let j=0; j<update.length; j++, updateIndex++){
            const thisPage = update[j];
            const rule = rules.get(thisPage)!;
            
            console.log(`   Is page ${thisPage} correct?...`)
            console.log(`       Is page ${thisPage} after ${rule.mustBeAfter}?...`)
            let k=0;
            for(; k<j && correctOrder; k++){
                const preceedingPage = update[k]!;
                correctOrder = rule.mustBeAfter.includes(preceedingPage);

                if(!correctOrder){
                    console.log(`       !! page ${thisPage} break the rule "must be after ${preceedingPage}":`);
                    console.log(JSON.stringify(rule, null, 2));
                }
            }
        
            console.log(`       Is page ${thisPage} before ${rule.mustBeBefore}?...`)
            for(k++; k<update.length && correctOrder; k++){
                const followingPage = update[k]!;
                correctOrder = rule.mustBeBefore.includes(followingPage);

                if(!correctOrder){
                    console.log(`       !! page ${thisPage} break the rule "must be before ${followingPage}":`);
                    console.log(JSON.stringify(rule, null, 2));
                }
            }

            
        }

        if(correctOrder){
            const middlePage = update[Math.floor(update.length / 2)];
            console.log(`Update ${updateIndex} (${update.join(',') }) is in correct Order - middle page is : ${middlePage}`);

            solution+= middlePage
        }

       
    }

    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    let solution = '???'
    return `${solution}`;
}