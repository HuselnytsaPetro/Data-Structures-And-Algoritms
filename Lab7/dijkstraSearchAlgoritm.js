class Graph {
    #nodes;
    #isDirected;
    constructor(isDirected) {
        this.#nodes = new Map();
        this.#isDirected = isDirected;
    };
    static GraphNode = class {
        constructor(value) {
            this.value = value;
            this.edges = [];
            this.pathValue = Number.MAX_VALUE;
        }
        showInfo() {
            let message = "";;
            this.edges.forEach(edge => {
                message += `${this.value}-->${edge.to.value} (w-${edge.weight}); `;
            });
            if (this.edges.length === 0)
                message += `${this.value}`
            console.log(message);
        }
    };
    static Edge = class {
        constructor(from, to, weight = 1) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }
    };
    addNode(value) {
        if (this.#nodes.has(value)) {
            console.log(`❌ Cannot add node with value ${value} because of she already exsits!`);
        }
        else
            this.#nodes.set(value, new this.constructor.GraphNode(value));
    };
    removeNode(value) {
        if (!this.#nodes.has(value)) {
            console.log(`❌ Cannot delete node with value ${value} because of she doesn't exsits!`);
        }
        else {
            let deletedNode = this.#nodes.get(value);
            for (let node of this.#nodes.values()) {
                if (node === deletedNode)
                    continue;
                for (let edge of node.edges) {
                    if (edge.to === deletedNode)
                        node.edges = node.edges.filter(edge => edge.to !== deletedNode);
                }
            }
            this.#nodes.delete(value);
        }
    };
    addEdge(valueFrom, valueTo, weight = 1) {
        let nodeFrom = this.#nodes.get(valueFrom);
        let nodeTo = this.#nodes.get(valueTo);

        if (nodeFrom === undefined) {
            console.log(`❌ Node with value ${valueFrom} doesnt exists! Cannot create the edge between ${valueFrom}-->${valueTo}!`);
            return;
        }
        if (nodeTo === undefined) {
            console.log(`❌ Node with value ${valueTo} doesnt exists! Cannot create the edge between ${valueFrom}-->${valueTo}!`);
            return;
        }

        let edge1 = new this.constructor.Edge(nodeFrom, nodeTo, weight);
        if (!nodeFrom.edges.some(edge => edge.to === nodeTo))
            nodeFrom.edges.push(edge1);

        if (this.#isDirected === false) {
            let edge2 = new this.constructor.Edge(nodeTo, nodeFrom, weight);
            if (!nodeTo.edges.some(edge => edge.to === nodeFrom))
                nodeTo.edges.push(edge2);
        }

    };
    removeEdge(valueFrom, valueTo) {
        let nodeFrom = this.#nodes.get(valueFrom);
        let nodeTo = this.#nodes.get(valueTo);

        if (nodeFrom === undefined) {
            console.log(`❌ Node with value ${valueFrom} doesnt exists! Cannot remove the edge between ${valueFrom}-->${valueTo}!`);
            return;
        }
        if (nodeTo === undefined) {
            console.log(`❌ Node with value ${valueTo} doesnt exists! Cannot remove the edge between ${valueFrom}-->${valueTo}!`);
            return;
        }

        let prLength = nodeFrom.edges.length;
        nodeFrom.edges = nodeFrom.edges.filter(edge => edge.to !== nodeTo);

        if (this.#isDirected === false) {
            nodeTo.edges = nodeTo.edges.filter(edge => edge.to !== nodeFrom);
        }

        if (prLength === nodeFrom.edges.length)
            console.log(`❌ Cannot delete edge between ${valueFrom}-->${valueTo} because this edge doesnt exists!`);
    };
    draw() {
        console.log("-----------------GRAPH-----------------")
        for (let value of this.#nodes.values())
            value.showInfo();
        console.log("---------------------------------------")
    };
    dijkstraSearchAlgoritm(startNode) {
        let distanceMap = new Map();
        let prQueue = new PrioritaizeQueue();
        let firstNode = this.#nodes.get(startNode);

        if (firstNode === undefined) {
            console.log("❌ This start node is not exists!");
            return;
        }

        firstNode.pathValue = 0;
        prQueue.enqueue(firstNode);

        for (let node of this.#nodes.values()) {
            distanceMap.set(node.value, null);
            prQueue.enqueue(node);
        };

        while (prQueue.length != 0) {
            let currentNode = prQueue.dequeue();
            for (let edge of currentNode.edges) {
                if (prQueue.contains(edge.to)) {
                    if (currentNode.pathValue + edge.weight < edge.to.pathValue) {
                        edge.to.pathValue = currentNode.pathValue + edge.weight;
                        distanceMap.set(edge.to.value, currentNode.value);
                        prQueue.resize(edge.to);
                    }
                }
            }
        };

        for (let key of distanceMap.keys()) {
            if (key === firstNode.value)
                continue;
            let pthValue = this.#nodes.get(key).pathValue;
            let resultPath = `${key}`;
            let changeKey = key;
            let prV;
            do {
                let prevVertexKey = distanceMap.get(changeKey);
                prV = this.#nodes.get(prevVertexKey);
                changeKey = prevVertexKey;
                resultPath = `${prevVertexKey}-->` + resultPath;
            }
            while (prV !== firstNode);

            resultPath += `; (${pthValue}L)`
            console.log(resultPath);
            resultPath = "";
        }
    };
};
class PrioritaizeQueue {
    #queue;
    constructor() {
        this.#queue = []
        this.length = 0;
    };
    enqueue(node) {
        if (this.#queue.some(nod => nod.value === node.value))
            return;

        let index = 0;
        while (true) {
            if (index >= this.#queue.length) {
                this.#queue.push(node);
                break;
            }
            if (node.pathValue <= this.#queue[index].pathValue) {
                this.#queue.splice(index, 0, node)
                break;
            }
            index++;
        }
        this.length++;
    };
    dequeue() {
        if (!this.isEmpty()) {
            this.length--;
            return this.#queue.shift();
        }
    };
    isEmpty() {
        return this.#queue.length === 0;
    };
    resize(node) {
        for (let index = 0; index < this.#queue.length; index++) {
            if (this.#queue[index].value === node.value) {
                this.#queue.splice(index, 1);
                this.length--;
                this.enqueue(node);
                return;
            }
        }
    };
    contains(node) {
        return this.#queue.some(nod => nod.value === node.value);
    };
};

let graph = new Graph(false);
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addNode(6);

graph.addEdge(1, 3, 6);
graph.addEdge(1, 4, 11);
graph.addEdge(1, 6, 1);
graph.addEdge(1, 2, 10);

graph.addEdge(2, 6, 11);
graph.addEdge(2, 4, 8);

graph.addEdge(4, 5, 2);

graph.addEdge(6, 3, 4);
graph.addEdge(6, 5, 2);

graph.addEdge(5, 3, 2);

graph.dijkstraSearchAlgoritm(4);

graph.draw();