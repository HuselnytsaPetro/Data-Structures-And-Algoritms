function calculateX(x, a, b) {
    let result = -1;
    let errorMessage = "";

    if (x < 8) {
        result = Math.abs(a * x + b);
    } else {
        if (x === 8) {
            let sqrtArgument = (b * x) + 3;

            if (sqrtArgument < 0) {
                errorMessage = "Error: Square root argument must be non-negative!";
            } else {
                result = 5 * Math.sqrt(sqrtArgument);
            }
        } else {
            if (x > 8 && x <= 10) {
                result = Math.cos(x);
            } else {
                errorMessage = "X is out of range!";
            }
        }
    }

    errorMessage ? console.log(errorMessage) : console.log("Calculation successful!");
    return result;
};

console.log(calculateX(11, 5, 0));