module.exports = {
    add: (x, y) => { return x + y },
    sub: (x, y) => { return x - y },
    mul: (x, y) => { return x * y },
    div: (x, y) => {
        if (y != 0) return x / y;
        else throw new Error('Cannot divide by zero !');
    },
    pow: (x, y) => { return x ** y },
};