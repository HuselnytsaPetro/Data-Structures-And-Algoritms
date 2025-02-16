function calculateX(x, a, b) {
    let result = -1;

    if (x < 8) {
        result = Math.abs(a * x + b);
    }

    if (x === 8) {
        let sqrtArgument = (b * x) + 3;

        if (sqrtArgument < 0) {
            throw Error("Error: Square root argument must be non-negative!");
        }

        result = 5 * Math.sqrt(sqrtArgument);
    }

    if (x > 8 && x <= 10) {
        result = Math.cos(x);
    }

    if (x > 10)
        throw Error("X is out of range!");

    return result;
};

console.log(calculateX(11, 5, 0));