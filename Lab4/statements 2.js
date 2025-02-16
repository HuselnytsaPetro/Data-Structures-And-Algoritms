function calculateMembers(m) {
    if (m < 1) throw Error("M cannot be less then zero!");

    for (let n = 1; n <= m; n++) {

        let numerator = Math.log(n + 1);
        let denominator = (5 * Math.pow(n, 2)) + 3;

        if (numerator <= 0) {
            console.log(`Member of progression with number ${n} invalid because of log!`);
            continue;
        }
        
        if (denominator == 0) {
            console.log(`Member of progression with number ${n} invalid because of dividing by zero!`);
            continue;
        }

        console.log(`[${n}]: ${numerator / denominator}`)
    }
};

calculateMembers(100);