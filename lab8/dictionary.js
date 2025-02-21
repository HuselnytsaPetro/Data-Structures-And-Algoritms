class Dictionary {
    #values;
    #keys;
    constructor(length) {
        this.#values = new Array();
        this.#keys = new Array();
        for (let i = 0; i < length; i++) {
            this.#values.push([]);
            this.#keys.push([]);
        }
    }

    set(key, value) {
        let positionIndex = this.#calculateIndex(key);
        if (!this.#keys[positionIndex].includes(key)) {
            this.#values[positionIndex].push(value);
            this.#keys[positionIndex].push(key);
        }
        else {
            console.log("This key is already exists!");
        }
    };

    get(key) {
        let positionIndex = this.#calculateIndex(key);
        if (this.#keys[positionIndex].includes(key)) {
            return this.#values[positionIndex];
        }
        else {
            console.log("This key is doesnt exists!");
            return null;
        }
    };


    #calculateIndex(key) {
        let keyStr = key.toString();
        let hash = 0;
        for (let i = 0; i < keyStr.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.#values.length;
    };

};
let dictionary = new Dictionary(15);
dictionary.set("Яблуко", "Apple");
dictionary.set("Меч", "Sword");
dictionary.set("чеМ", "GG");
dictionary.set("Острів", "Island");

console.log(dictionary.get("Яблуко"));