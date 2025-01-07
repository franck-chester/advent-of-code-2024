///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day10";
export function part1(entries: string[], isTest?: boolean, testNumber?: number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = 36;          // ['???'];
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
    let solution = 0;
    const grid = Grid.fromEntries<number>(entries, (s) => s == '.' ? -2 : parseInt(s));

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
        [1, 0, Direction.RIGHT], [0, 1, Direction.DOWN], [-1, 0, Direction.LEFT], [0, -1, Direction.UP]
    ];

    type Trail = { x: number, y: number }[];

    function depthFirstSearch(x: number, y: number, index: number, trail: Trail): Trail[] {
        if (index === 10) return [trail]; // we have reached the end of the trail, return it

        if (x < 0 || y < 0 || x > grid.maxX || y > grid.maxY || grid.getCell(x, y) !== index) return []; // we've gone past the grid boundary or the height is wrong

        const startingHeight = grid.getCell(x, y)!;
        grid.setCell(x, y, -1); // temporarily mark as visited so that we don't revisit within that one search

        let trails: Trail[] = [];
        for (const [dx, dy] of directions) {
            const newTrail = [...trail, { x: x + dx, y: y + dy }];
            trails.push(...depthFirstSearch(x + dx, y + dy, index + 1, newTrail));
        }

        grid.setCell(x, y, startingHeight); // Unmark
        return trails;
    }

    for (let y = 0; y <= grid.maxY; y++) {
        for (let x = 0; x <= grid.maxX; x++) {
            // start searching for height == 0 and then explore the neighboring cells to find the next possible height. 
            // If at any point, we can't find the next height or reach a boundary of the grid, we backtrack to the previous letter and try a different path.
            if (grid.getCell(x, y) === 0) {
                const trails = depthFirstSearch(x, y, 0, [{ x, y }]);
                const trailEnds = new Set<string>();
                trails.forEach(t => {
                    if(isTest) console.log(t.map(xy => `(${xy.x},${xy.y})`).join('->'));
                    trailEnds.add(`${t[9].x},${t[9].y}`)
            });
                if (isTest) console.log(`score = ${(trailEnds.size)} starting from ${x},${y}`);
                solution += trailEnds.size;
            }
        }
    }

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