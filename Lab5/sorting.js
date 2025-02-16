function selectionSort() {
    let array = [
        [12, 5, 78, 3, 90, 42, 67, 31, 56],
        [9, 27, 14, 88, 53, 2, 41, 73, 60],
        [33, 7, 25, 81, 49, 6, 19, 91, 11],
        [59, 36, 98, 20, 1, 74, 64, 83, 17],
        [47, 89, 30, 8, 54, 99, 28, 15, 45],
        [77, 22, 35, 68, 86, 40, 13, 58, 79],
        [95, 16, 4, 70, 32, 61, 85, 50, 26],
        [39, 72, 66, 10, 55, 94, 34, 97, 43],
        [23, 80, 21, 46, 92, 87, 71, 5, 63]
    ];

    console.log(array);

    let maxValueIndex = 0;

    for (let i = 0; i < array.length; i++) {
        let lastIndex = array[i].length - 1;
        while (lastIndex != 0) {
            for (let j = 0; j <= lastIndex; j++) {
                if (array[i][j] > array[i][maxValueIndex])
                    maxValueIndex = j;
            }
            let tmpBig = array[i][maxValueIndex];
            array[i][maxValueIndex] = array[i][lastIndex];
            array[i][lastIndex] = tmpBig;
            lastIndex--;
            maxValueIndex = 0;
        }
    }

    for (let i = 0; i < array.length; i++) {
        let resultRow = " ";
        for (let j = 0; j < array[i].length - 1; j++) {
            resultRow += `${array[i][j]} `
        }
        console.log(resultRow);
    }
};
selectionSort();
