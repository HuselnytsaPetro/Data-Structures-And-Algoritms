function CalculateMedian(array) {
    if (array.length === 0) return null;

    for (let count = 0; count < array.length - 1; count++) { // Bubble sort!)

        let replaced = false;

        for (let index = 0; index < array.length - 1 - count; index++) {
            if (array[index] > array[index + 1]) {
                let tmp = array[index];
                array[index] = array[index + 1];
                array[index + 1] = tmp;
                replaced = true;
            }
        }

        if (!replaced)
            break;
    }

    return array.length % 2 !== 0 ? array[Math.floor(array.length / 2)] : (array[array.length / 2] + array[(array.length / 2) - 1]) / 2;
};
console.log(CalculateMedian([3, 2, 5, 4, 1]));