

function Car(name, price) {
    // Properties
    this.name = name;
    this.price = price;
    // console.log(this); // if new keyword is added then this keyword points to an object i.e c1


    
    // Getter - methods which are used to simply read single property value
    this.getName = function () {
        return this.name;
    }

    this.getPrice = function () {
        return this.price;
    }

    // Setters - methods which are used to simply set the value of one property
    this.setPrice = function (newPrice) {
        if (newPrice < 0) {
            this.price = 0;
            return;
        }
        this.price = newPrice;
    }
}


Car.prototype.printCar = function () {
        console.log(`Name: ${this.name}`);
        console.log(`Price: ${this.price}`);
}

const c1 = new Car("BMW", 1000); // Car is not a plain function anymore it is constructor function , because of new keyword

const c2 = new Car("Ferrari", 2000);