///////////////////
// BOILER PLATE  //

import { Tree, TreeNode, TreeRoot } from "../lib/Treet";

///////////////////
const day = "Day07";
export function part1(entries: string[], isTest? : boolean, testNumber?:number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = '3749';          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest? : boolean, testNumber?:number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test.txt';    // ['test01.txt'];
part2.example = '???';          // ['???'];
part2.inputFile = 'input.txt';

type Operator = "+"|"*";

class Operation extends TreeNode<number, Operator> {
    constructor(parent : TreeRoot<number, Operator>, name: Operator, value: number) {
        super(parent, name, value);
    }
}

type Equation = {
    result: number;
    values: number[];
    possibleCalculations : Tree<number, Operator>;
};

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    let solution = 0
    const m = /(?<result>\d*):\s(?<values>.*)/
    for(let i=0; i<entries.length; i++){
        const matches = m.exec(entries[i]);
        const result = parseInt(matches?.groups?.result!);
        const values = (matches?.groups?.values!).split(' ').map(s => parseInt(s));
        console.log(`i = ${i}, result = ${result}, values = ${values}`)
        let equation : Equation = {
            result,
            values,
            possibleCalculations : new Tree<number, Operator>(values[0])
        }
        
        
        let nodes = [equation.possibleCalculations.root];
        for(let j = 1; j<values.length; j++){
            let nextNodes = new Array<Operation>();
            const value = values[j];
            nodes.forEach(n =>{
                nextNodes.push(n.addChild(new Operation(n, '+', n.value + value)));
                nextNodes.push(n.addChild(new Operation(n, '*', n.value * value)));
            });
            nodes = nextNodes;
        }
        let validEquations = nodes.filter(n => {
            if(n.value == result){
                console.log(n.debugLabel);
            }
            return n.value == result
    });
        if(validEquations.length > 0){
            console.log(`valid   : ${entries[i]}`);
            solution += result;
        }else {
            console.error(`invalid : ${entries[i]}`);
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