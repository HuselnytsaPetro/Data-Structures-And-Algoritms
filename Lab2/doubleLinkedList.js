class DoubleNode {
    constructor(value) {
        this.next = null;
        this.prev = null;
        this.value = value;
    }
};
class DoubleLinkedList {
    constructor() {
        this.head = null;
    }

    addNode(value) {
        if (this.isEmpty() === true)
            this.head = new DoubleNode(value);
        else {
            let curr = this.head;
            while (curr.next !== null)
                curr = curr.next;
            curr.next = new DoubleNode(value);
            curr.next.prev = curr;
        }
    }

    removeNode(index) {
        if (this.isEmpty() === false) {
            if (index === 0) {
                this.head = this.head.next;
                this.head.prev = null;
            }
            else {

                let indexCounter = 0;
                let curr = this.head;

                while (indexCounter + 1 !== index) {
                    curr = curr.next;
                    indexCounter++;
                    if (curr === null) {
                        console.log("Index out of range!");
                        return;
                    }
                }
                curr.next = curr.next.next;

                if (curr.next !== null)
                    curr.next.next.prev = curr;

            }
        }
        else
            throw Error("List is empty!");
    }

    draw() {
        if (this.isEmpty() === true) {
            console.log("Empty list, nothing draw...");
            return;
        }
        let output = "";
        for (let curr = this.head; curr !== null; curr = curr.next)
            output += `${curr.value} <--> `;
        output += `null`;
        console.log(output);
    }

    isEmpty() {
        return this.head === null;
    }

    twoIndexes(pX, pY) {
        if (pX < pY) {
            let tempDoubleLinkedList = new DoubleLinkedList();
            let index = 0;
            let curr = this.head;

            while (index != pY) {

                if (index > pX) {
                    tempDoubleLinkedList.addNode(curr.value);
                }
                curr = curr.next;
                index++;
            }

            return {
                firstIndex: this.head,
                secondIndex: tempDoubleLinkedList.head || null,
                list: tempDoubleLinkedList
            };
        }
        else
            console.log("PX index must be greater than PY");
    }
};
function Main() {
    let doubleLinkedList = new DoubleLinkedList();
    doubleLinkedList.draw();
    doubleLinkedList.addNode(4);
    doubleLinkedList.addNode(8);
    doubleLinkedList.addNode(12);
    doubleLinkedList.addNode(16);
    doubleLinkedList.addNode(20);


    let cortage = doubleLinkedList.twoIndexes(0, 4);
    cortage.list.draw();
    console.log(cortage.firstIndex.value);
    console.log(cortage.secondIndex.value);
}
Main();