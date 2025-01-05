///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day04";
export function part1(entries: string[], isTest? : boolean, testNumber?:number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = 18;          // ['???'];
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
    let solution = 0;
    const XMAS = 'XMAS';
    const grid = Grid.fromEntries<string>(entries, (s) => XMAS.includes(s)? s : '.');

    enum Direction {
        RIGHT = "→",
        DOWN = "↓",
        LEFT = "←",
        UP = "↑",
        DOWN_RIGHT = "↘",
        DOWN_LEFT = "↙",
        UP_RIGHT = "↗",
        UP_LEFT = "↖"
    }

    type DirectionOffset = [number, number, Direction];
    const directions: DirectionOffset[] = [
        [1, 0, Direction.RIGHT], [0, 1, Direction.DOWN], [-1, 0, Direction.LEFT], [0, -1, Direction.UP], 
        [1, 1, Direction.DOWN_RIGHT], [-1, -1, Direction.DOWN_LEFT], [1, -1, Direction.UP_RIGHT], [-1, 1, Direction.UP_LEFT] 
    ];

    function depthFirstSearch(x: number, y: number, index: number, direction: Direction): boolean {
        if (index === XMAS.length) return true; // we have matched all characters, stop now

        if (x < 0 || y < 0 || x > grid.maxX || y > grid.maxY || grid.getCell(x,y) !== XMAS[index]) return false; // we've gone past the grid boundary or found a non-matching character

        const startingCharacter = grid.getCell(x,y)!;
        grid.setCell(x,y,'#'); // temporarily mark as visited so that we don't revisit within that one search

        const [dx, dy] = directions.find(d => d[2] === direction)!;
        if (depthFirstSearch(x + dx, y + dy, index + 1, direction)) {
            grid.setCell(x,y,startingCharacter); // Unmark - This is the backtracking step, where the function reverts to the previous state to explore other paths.
            return true;
        }

        grid.setCell(x,y,startingCharacter); // Unmark 
        return false;
    }

    for(let x = 0; x<=grid.maxX; x++){
        for(let y = 0; y<=grid.maxY; y++){
            // start searching for the first letter of the word and then explore the neighboring cells to find the next letter. 
            // If at any point, we can't find the next letter or reach a boundary of the grid, we backtrack to the previous letter and try a different path.
            for (const [dx, dy, direction] of directions) {
                if (depthFirstSearch(x, y, 0, direction)) {
                    solution++;
                    console.log(`found XMAS starting from ${x}, ${y} in direction ${direction}`);
                    grid.logAreaToConsole(x,y,4, (s) => s!);
                }
            }
        }
    }

    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest? : boolean, testNumber?:number) {
    let solution = '???'
    for(let i=0; i<entries.length; i++){
    }
    return `${solution}`;
}
