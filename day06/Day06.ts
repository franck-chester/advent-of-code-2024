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
part2.example = '6';          // ['???'];
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
    const potentialObstructions = new Grid<string>(map.width, map.height, (x,y)=>{
        let c = map.getCell(x,y); 
        return c! == '^'? '.' : c!;
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

         // could I create a loop?
         let xo = x;
         let yo = y;
         let doo = direction;

         switch (direction) {
            case directions.up: doo = directions.right; break;
            case directions.right: doo = directions.down; break;
            case directions.down: doo = directions.left; break;
            case directions.left: doo = directions.up; break;
        }
         if (doo.axis == X) {
            xo -= doo.inc;
        } else {
            yo -= doo.inc;
        }
        let potentialLoop = false; // true if our new direction would take us on a previous step going the same way
        switch (direction) {
            case directions.up: potentialLoop = map.getCell(xo,yo) == 'U'; break;
            case directions.right: potentialLoop = map.getCell(xo,yo) == 'R'; break;
            case directions.down: potentialLoop = map.getCell(xo,yo) == 'D'; break;
            case directions.left: potentialLoop = map.getCell(xo,yo) == 'L'; break;
        }
        if(potentialLoop){
            // if I turned right here, I'd retrace my steps
            potentialObstructions.setCell(x,y,'O');
            console.log(`x=${x}, y=${y}, potential obstruction, xo=${xo}, yo=${yo} => ${map.getCell(xo,yo)}`);
            map.logToConsole2((c,x1,y1) => (x1==x && y1 ==y)? 'O' : c! );
        } 

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
            let D = '';
            let P = map.getCell(x,y);
            switch (direction) {
                case directions.up: {
                    switch(P){
                        case 'U': D = 'U'; break;
                        case 'R': D = '\\'; break;
                        case 'D': D = '|'; break;
                        case 'L': D = '/'; break;
                        case '\\': D = '\\'; break;
                        case '/': D = '/'; break;
                        case '|': D = '|'; break;
                        case '+': D = '+'; break;
                        case '-': D = '+'; break;
                    }
                    break;
                }
                case directions.right: {
                    switch(P){
                        case 'U': D = '/'; break;
                        case 'R': D = 'R'; break;
                        case 'D': D = '|'; break;
                        case 'L': D = '/'; break;
                        case '\\': D = '\\'; break;
                        case '/': D = '/'; break;
                        case '|': D = '|'; break;
                        case '+': D = '+'; break;
                        case '-': D = '+'; break;
                    }
                    break;
                }
                case directions.down:{
                    switch(P){
                        case 'U': D = 'U'; break;
                        case 'R': D = '\\'; break;
                        case 'D': D = '|'; break;
                        case 'L': D = '/'; break;
                        case '\\': D = '\\'; break;
                        case '/': D = '/'; break;
                        case '|': D = '|'; break;
                        case '+': D = '+'; break;
                        case '-': D = '+'; break;
                    }
                    break;
                }
                case directions.left: {
                    switch(P){
                        case 'U': D = 'U'; break;
                        case 'R': D = '\\'; break;
                        case 'D': D = '|'; break;
                        case 'L': D = '/'; break;
                        case '\\': D = '\\'; break;
                        case '/': D = '/'; break;
                        case '|': D = '|'; break;
                        case '+': D = '+'; break;
                        case '-': D = '+'; break;
                    }
                    break;
                }
            }
            map.setCell(x,y,D);
            console.log(`x=${x}, y=${y}, going ${directionNames[JSON.stringify(direction)]}`);
        }

       

    } while (true); // madness!
    map.logToConsole(c => c! );
    potentialObstructions.logToConsole(c => c! );
    let solution = potentialObstructions.count(c => c == 'O');
    return `${solution}`;
}