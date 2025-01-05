# advent-of-code-2023
My 2023 attempt at the https://adventofcode.com/ challenge.

Competing against my colleagues at the very group, although this year, again, I don't really have the time or headspace to do it properly. 
Don't expect nice or smart code, this is panic coding at its finest. 
I will however build on last year and unit test (with [ts-jest](https://jestjs.io/docs/getting-started)) as much as possible. 

## Typescript setup

I always forget how to get there so, for the record
```
npm i typescript --save-dev 
npm i --save-dev @types/node
npm i --location=global ts-node
npm i ts-node --save-dev
npx tsc --init

npm i --save-dev ts-jest
npm i --save-dev @jest/globals

npx ts-jest config:init

ts-node aoc2023-fn.ts 7 1 test
ts-node aoc2023-fn.ts 7 2

npm test -- day00/Day00.test.ts
```

I'm not being particularly smart with TS, but using strong types saves me from pretty stupid mistakes. 

## Adding a new day

I've created [hygen](https://www.hygen.io/docs/quick-start) templates.
Once hygen is installed (`npm i -g hygen`) adding a new day is as simple as typing:

`hygen day add --day 6`

## Didn't do this at xmas

Had an initial go, managed (barely) days 1, 2, 5 and 6 before stopping.
Picking this up in January

## ⭐⭐ Day 1: Historian Hysteria

Easy enough, just wish it hadn't been a Sunday. Ended up doing it at bed time.
But at least this new repo is ready

## ⭐   Day 2: Red-Nosed Reports

can't even remember how I did part 1 before xmas

## ⭐⭐  Day 3: Mull It Over

05/01/2025 - super easy regex problem. Tripped a bit on how to iterate matches (I always forget) and hit an infinite loop after forgetting a `/g`
flag but otherwise easy. Part 2 twist was that you could have consecutive `do()` or `don't()` so my initial solution (split on either) didn't work

## Day 4: Ceres Search

05/01/2025 - not too hard... looked up the proper depth search algorithm because previous years implementation were poo. 
Apparently it's [backtracking](https://algodaily.com/lessons/word-search-solver-d642e52a).
2nd part was easy, just searched for diagonal MAS, tracked the A and counted A part of 2 MAS.. 30 min. happy enough.

## ⭐   Day 5: Print Queue

can't even remember how I did part 1 before xmas

## ⭐   Day 6: Guard Gallivant

can't even remember how I did part 1 before xmas

## ⭐⭐ Day 7: Bridge Repair

so, january the 4th,  2 h 30 on this, mostly building an over complicated tree class I didn't need but will hopefully come handy in the future.
part 2 took me just a few minutes, litteraly adding an extra line, so quite pleased.
but OMG it took me a while to get in gear. I've started asking copilot for bits of algorithms, but usually don't like the answer.
I asked it to start me with my Tree class, then wasted 30 min arguing with a machine before going back to using my own brain.

## ⭐⭐ Day 8: Resonant Collinearity

05/01/2025
mulled the solution in bed, decided not to use my Grid class but use a Map of coordinates.
not super optimised but I've managed to avoid a few obvious pitfall that would have had me reiterate the same location
several times. e.g. I build the pairs as I go.

used copilot for the reflection and alignedWith functions. 
I knew what I wanted, I even knew how to do it, but didn't trust myself.

about 15 min for part 2 - again, quite happy with that

## Day 9: Disk Fragmenter

05/01/2025