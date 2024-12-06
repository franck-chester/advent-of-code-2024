///////////////////
// BOILER PLATE  //

import { Grid } from "../lib/Grid";

///////////////////
const day = "Day06";
export function part1(entries: string[], isTest?: boolean, testNumber?: number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = '41';          // ['???'];
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
    let solution = 1;

    let x = 0;
    let y = 0;
    const X = true;
    const Y = false;
    type Direction = { axis: boolean; inc: number };
    const directions: { [key: string]: Direction } = {
        up: { axis: Y, inc: -1 },
        right: { axis: X, inc: 1 },
        down: { axis: Y, inc: 1 },
        left: { axis: X, inc: -1 },
    };
    const directionNames = {
        [JSON.stringify(directions.up)]: 'up',
        [JSON.stringify(directions.right)]: 'right',
        [JSON.stringify(directions.down)]: 'down',
        [JSON.stringify(directions.left)]: 'left',
    };

    const map = Grid.fromEntries<string>(entries, (s, xx, yy) => {
        if (s == '^') {
            x = xx!;
            y = yy!;
        }
        return s;
    });

    map.logToConsole(c => c! );
    console.log(`Starting position x=${x}, y = ${y}`);
    let direction = directions.up;

    do {
        if (direction.axis == X) {
            x += direction.inc;
        } else {
            y += direction.inc;
        }
        if (x < 0 || y < 0 || x > map.maxX || y > map.maxY) break;  // guard has left the map
        if (map.getCell(x, y) == '#') {
            // step back
            if (direction.axis == X) {
                x -= direction.inc;
            } else {
                y -= direction.inc;
            }
            // turn right
            switch (direction) {
                case directions.up: direction = directions.right; break;
                case directions.right: direction = directions.down; break;
                case directions.down: direction = directions.left; break;
                case directions.left: direction = directions.up; break;
            }
            console.log(`x=${x}, y=${y}, turning right`);
        } else {
            map.setCell(x,y,'X');
            console.log(`x=${x}, y=${y}, going ${directionNames[JSON.stringify(direction)]}`);
        }
    } while (true); // madness!

    map.logToConsole(c => c! );
    solution = map.count(c => c == 'X');
    return `${solution}`;

}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    let solution = '???'
    return `${solution}`;
}