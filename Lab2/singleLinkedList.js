class SingleNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
};

class SingleLinkedList {
    constructor() {
        this.head = null;
    }
    addNode(value) {
        if (this.isEmpty() === true)
            this.head = new SingleNode(value);
        else {
            let curr = this.head;
            while (curr.next !== null)
                curr = curr.next;
            curr.next = new SingleNode(value);
        }
    }
    removeNode(index) {
        if (this.isEmpty() === false) {
            if (index === 0) {
                this.head = this.head.next;
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
            output += `${curr.value} --> `;
        output += `null`;
        console.log(output);
    }
    isEmpty() {
        return this.head === null;
    }
    calculateMax() {
        let maxValue = -9999999999999;
        let curr = this.head;

        while (curr != null) {
            if (curr.value > maxValue)
                maxValue = curr.value;
            curr = curr.next;
        }

        return maxValue;
    }
    pasteMaxValues() {
        let maxValue = this.calculateMax();
        let curr = this.head;
        while (curr != null) {
            if (curr.value === 1) {
                let newBigNode = new SingleNode(maxValue);
                newBigNode.next = curr.next;
                curr.next = newBigNode;
                curr = newBigNode.next;
            }
            else {
                curr = curr.next;
            }
        }
    }

};

function Main() {
    let singleLinkedList = new SingleLinkedList();
    singleLinkedList.draw();
    singleLinkedList.addNode(100);
    singleLinkedList.addNode(1);
    singleLinkedList.addNode(1);
    singleLinkedList.addNode(1);
    singleLinkedList.addNode(1);
    singleLinkedList.addNode(1);
    singleLinkedList.addNode(1);
    singleLinkedList.addNode(1);

    singleLinkedList.pasteMaxValues();
    singleLinkedList.draw();
};
Main();