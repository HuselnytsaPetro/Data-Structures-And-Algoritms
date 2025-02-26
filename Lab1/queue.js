class Queue {
    #array;
    #P1;
    #P2;
    constructor() {
        this.#array = [];
        this.#P1 = 0;
        this.#P2 = 0;
    };
    enqueue(item) {
        this.#array.push(item);
        this.#P2++;
    };
    dequeue() {
        if (this.isEmpty() === false) {
            let item = this.#array.shift();
            this.#P2--;
            return item;
        }
        else {
            console.log("Queue is empty! Cannot remove the element!");
        }
    };
    peek() {
        if (this.isEmpty() === false)
            return this.#array[this.#P1];
        else
            console.log("Queue is empty! Cannot get the element!");
    };
    removeElements(N) {
        if (N <= 0)
            return; // якщо хочем видалити від'ємну або нульову кількість елементів
        else {
            if (N <= this.#P2 + 1) {
                for (let counter = 0; counter < N; counter++) { // N ВПРИНЦИПІ ВИСТУПАЄ ІНДЕКСОМ ДО ЯКОГО ТРЕБА ВИДАЛЯТИ!
                    this.#array.shift();
                }
            }
            else
                this.clear(); // якщо N більше за розмір черги тоді очищаємо всю
        }
    };
    clear() {
        let length = this.#array.length;
        let counter = 0;
        while (counter <= length) {
            this.#array.shift();
            counter++;
        }
    };
    isEmpty() {
        return this.#array.length === 0;
    };
    draw() {
        for (let index = 0; index < this.#array.length; index++) {
            console.log(`${this.#array[index]} `);
        }
    };
};
function Main() {
    let queue = new Queue();
    queue.enqueue(4);
    queue.enqueue(6);
    queue.enqueue(2);
    queue.enqueue(5);
    queue.enqueue(10);



    queue.removeElements(0);
    console.log("------------------------------")
    queue.draw();
};

Main();