

class Car{
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    printCar() {
        console.log(this.name);
        console.log(this.price);
    }

    // Getters
    get getName() {
        return this.name;
    }

    get getPrice() {
        return this.price;
    }

    // Setters
    set setPrice(newPrice) {
        // Early exits
        if (newPrice < 0) {
            this.price = 0;
            return;
        }
        this.price = newPrice;
    }

    // static methods - we will do in next class
}

const c1 = new Car("BMW", 1000);
const c2 = new Car("Ferrari", 2000);