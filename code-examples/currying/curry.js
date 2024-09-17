const add = (x,y,z) => x + y + z;

const toPair = f => ([x,y]) => f(x,y);

const fromPair = f => (x,y) => f([x,y]);

const flip = f => (y,x) => f(x,y);

const curry = f => (...args) => {
    if (args.length >= f.length) {
        console.log('if', args);
        return f(...args);
    } else {
        console.log('else', args); 
        return (...moreArgs) => curry(f)(...args, ...moreArgs);
    }
};

const uncurry = f => (...args) => {
    if (args.length === 1) {
        return y => f(args[0], y);
    } else {
        return f(args[0], ...args.slice(1));
    }
};

// example

const curriedAdd = curry(add);

// console.log(curriedAdd); // 2

const increment = curriedAdd(1, 2);

// console.log(increment); // 1

const result = increment(3); // 3

console.log(result); // 6

// example 2

const modulo = curry((x,y) => y % x);

const isOdd = modulo(2);

const result2 = isOdd(3); // 1

console.log(result2);

// example 3
// when to use currying and when not to use currying

// use it when you want to remember the first argument
const filter = curry((f, xs) => xs.filter(f));

// example of composition
const getOdds = filter(isOdd);

const result3 = getOdds([1,2,3,4,5,6,7]); // [1,3,5,7]
