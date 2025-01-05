///////////////////
// BOILER PLATE  //
///////////////////
const day = "Day08";
export function part1(entries: string[], isTest?: boolean, testNumber?: number): string { return part1Implementation(entries, isTest, testNumber); };
part1.day = day;
part1.testFile = 'test.txt';    // ['test01.txt'];
part1.example = 14;          // ['???'];
part1.inputFile = 'input.txt';

export function part2(entries: string[], isTest?: boolean, testNumber?: number): string { return part2Implementation(entries, isTest, testNumber); };
part2.day = day;
part2.testFile = 'test.txt';    // ['test01.txt'];
part2.example = 34;          // ['???'];
part2.inputFile = 'input.txt';

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
function part1Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    // build a map of location coordinates.
    type Coordinates = {
        x: number,
        y: number
    }
    type CoordinatesPair = {
        a: Coordinates,
        b: Coordinates
    }

    const nodesMap = new Map<string, { nodes: Array<Coordinates>, pairsOfNodes: Array<CoordinatesPair> }>();
    const maxY = entries.length;
    const maxX = entries[0].length;
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            const node = entries[y][x];
            if ('.' === node) continue;
            if (!nodesMap.has(node)) nodesMap.set(node, { nodes: new Array<Coordinates>(), pairsOfNodes: new Array<CoordinatesPair>() });
            const nodes = nodesMap.get(node)!.nodes;
            const pairsOfNodes = nodesMap.get(node)!.pairsOfNodes;
            // create additional pairs
            for (let n = 0; n < nodes.length; n++) {
                pairsOfNodes.push({ a: nodes[n], b: { x, y } });
            }
            nodes.push({ x, y });
        }
    }

    // console.log (`max X = ${maxX}, max Y = ${maxY}`);
    // nodesMap.forEach((value, key) => {
    //     console.log(`Key: ${key}`);
    //     console.log("Nodes:", value.nodes);
    //     console.log("Pairs of Nodes:", value.pairsOfNodes);
    // });

    // for each pair, calculates the antinodes
    function reflectPoint(a: Coordinates, b: Coordinates): Coordinates {
        return {
            x: 2 * b.x - a.x,
            y: 2 * b.y - a.y
        };
    };

    const antinodes = new Set<string>();

    nodesMap.forEach((value, key) => {
        const pairsOfNodes = value.pairsOfNodes;
        pairsOfNodes.forEach(pair => {
            let antinode = reflectPoint(pair.a, pair.b);
            if (antinode.x >= 0 && antinode.x < maxX && antinode.y >= 0 && antinode.y < maxY) {
                antinodes.add(`${antinode.x},${antinode.y}`);
                //console.log(`${JSON.stringify(antinode)} is antinode of ${key} pair ${JSON.stringify(pair)} `);
            }
            antinode = reflectPoint(pair.b, pair.a);
            if (antinode.x >= 0 && antinode.x < maxX && antinode.y >= 0 && antinode.y < maxY) {
                antinodes.add(`${antinode.x},${antinode.y}`);
                //console.log(`${JSON.stringify(antinode)} is antinode of ${key} pair ${JSON.stringify(pair)} `);
            }
        });
    });

    let solution = antinodes.size;


    return `${solution}`;
}

/////////////////////////////
// ACTUAL CODE - Part TWO  //
/////////////////////////////
function part2Implementation(entries: string[], isTest?: boolean, testNumber?: number) {
    // build a map of location coordinates.
    type Coordinates = {
        x: number,
        y: number
    }
    type CoordinatesPair = {
        a: Coordinates,
        b: Coordinates
    }

    const nodesMap = new Map<string, { nodes: Array<Coordinates>, pairsOfNodes: Array<CoordinatesPair> }>();
    const maxY = entries.length;
    const maxX = entries[0].length;
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            const node = entries[y][x];
            if ('.' === node) continue;
            if (!nodesMap.has(node)) nodesMap.set(node, { nodes: new Array<Coordinates>(), pairsOfNodes: new Array<CoordinatesPair>() });
            const nodes = nodesMap.get(node)!.nodes;
            const pairsOfNodes = nodesMap.get(node)!.pairsOfNodes;
            // create additional pairs
            for (let n = 0; n < nodes.length; n++) {
                pairsOfNodes.push({ a: nodes[n], b: { x, y } });
            }
            nodes.push({ x, y });
        }
    }

    // for each pair, calculates the antinodes
    function isAligned(a: Coordinates, b: Coordinates, c: Coordinates): boolean {
        // Calculate the slope of the line (a, b)
        const slope = (b.y - a.y) / (b.x - a.x);
        // Check if point c lies on the line
        return (c.y - a.y) === slope * (c.x - a.x);
    }

    const antinodes = new Set<string>();

    // flatten the list of pairs
    const pairsOfNodes = new Array<CoordinatesPair>();
    nodesMap.forEach((value, _key) => {
        pairsOfNodes.push(...value.pairsOfNodes);
    });

    // visit each coordinates and check whether it is aligned with at list one pair
    for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
            const alignedWith = pairsOfNodes.find(pair => isAligned(pair.a, pair.b, {x,y}));
            if(alignedWith) antinodes.add(`${x},${y}`);
        }
    }

    let solution = antinodes.size;
    return `${solution}`;
}