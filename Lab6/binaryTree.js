class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}
class BinaryTree {
    constructor() {
        this.root = null;
    };

    addNode(value) {
        if (this.root === null)
            this.root = new Node(value);
        else {
            this.#recursionAdd(this.root, value)
        }
    };
    findNode(value) {
        if (this.root === null)
            console.log("Tree is empty!");
        else {
            let currentNode = this.root;
            while (currentNode.value != value && currentNode != null) {
                currentNode = value > currentNode.value ? currentNode.right : currentNode.left;
            }
            return currentNode;
        }
    };
    removeNode(value) {
        if (this.root !== null) {
            let currentNode = this.root;
            let isDeleted = false;
            let parent = this.root;

            while (currentNode != null) {

                if (currentNode.value === value) {
                    let direction = parent.left === currentNode ? "left" : "right";
                    this.#deleteCaseWrapper(parent, currentNode, direction);
                    break;
                }

                parent = currentNode;
                currentNode = value > currentNode.value ? currentNode.right : currentNode.left;
            }
        }
        else
            console.log("Tree is empty!");
    };
    printTree() {
        if (this.root !== null)
            this.#postOrder(this.root);
        else
            console.log("Tree is empty!");
    };
    doubleValues() {
        if (this.root !== null)
            this.#doubleValue(this.root);
        else
            console.log("Tree is empty!");
    };
    isHalfFull() {
        let isHalf = true;
        let queue = [];
        queue.push(this.root);
        while (queue.length != 0) {
            let curr = queue.shift();
            if (curr === null) {
                queue = queue.filter(element => element !== null)
                isHalf = queue.length === 0;
                break;
            }
            queue.push(curr.left, curr.right);
        }
        let message = isHalf ? "Дерево майже повне!" : "Дерево не майже повне!";
        console.log(message);
        return isHalf;
    };
    #postOrder(node) {
        if (node.left != null) this.#postOrder(node.left);
        if (node.right != null) this.#postOrder(node.right);
        console.log(node.value);
    };
    #doubleValue(node) {
        if (node.left != null) this.#doubleValue(node.left);
        if (node.right != null) this.#doubleValue(node.right);
        node.value = node.value * 2;
    };
    #recursionAdd(node, value) {
        if (value > node.value) {

            if (node.right === null)
                node.right = new Node(value);
            else
                this.#recursionAdd(node.right, value);

        }
        else if (value < node.value) {

            if (node.left === null)
                node.left = new Node(value);
            else
                this.#recursionAdd(node.left, value);

        }
        else {
            console.log(`This node with value ${value} already exists!`);
            return;
        }
    };
    #deleteCaseWrapper(parent, child, direction) {
        // ЛИСТЯ
        if (child.left === null && child.right === null) {
            if (child === this.root) {
                this.root = null;
            }
            else {
                switch (direction) {
                    case "left":
                        parent.left = null;
                        break;
                    case "right":
                        parent.right = null;
                        break;
                }
            }
        }
        // EЛЕМЕНТ З ОДНИМ ДОЧІР
        else if ((child.left !== null && child.right === null) || (child.left === null && child.right !== null)) {
            let notNullChild = child.left !== null ? child.left : child.right;
            if (child === this.root) {
                this.root = notNullChild;
            }
            else {
                switch (direction) {
                    case "left":
                        parent.left = notNullChild;
                        break;
                    case "right":
                        parent.right = notNullChild;
                        break;
                }
            }
        }
        // EЛЕМЕНТ З ДВОМА ДОЧІР (HARD CASE)
        else if (child.left !== null && child.right !== null) {
            let currParent;
            let curr = child.right;
            let goesLeft = false;

            while (curr.left != null) {
                currParent = curr;
                curr = curr.left;
                goesLeft = true;
            }

            if (goesLeft === false) {
                if (child === this.root) {
                    this.root.value = curr.value;
                    this.root.right = null;
                }
                else {
                    child.value = curr.value;
                    if (curr.right !== null) {
                        child.right = curr.right;
                    }
                }
            }
            else {
                if (child === this.root) {
                    this.root.value = curr.value;
                }
                else {
                    child.value = curr.value;
                }
                currParent.left = null;
            }
        }
    }
}

function main() {
    let binaryTree = new BinaryTree();
    binaryTree.addNode(10);
    binaryTree.addNode(5);
    binaryTree.addNode(15);
    binaryTree.addNode(20);
    binaryTree.addNode(4);
    binaryTree.addNode(6);

    binaryTree.doubleValues();
    binaryTree.printTree();
    binaryTree.isHalfFull();
};

main();