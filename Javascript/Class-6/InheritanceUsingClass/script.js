
class Car{
    static appName = "CarApplication";
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    get getName() {
        return this.name;
    }

    get getPrice() {
        return this.price;
    }

    static start() {
        console.log(this.appName);
        console.log('Starting the car');
    }
}

class RacingCar extends Car{
    //name, price, 
    //maxSpeed, isDiscBrake
    constructor(name, price, maxSpeed, isDiscBrake) {
        super(name, price);
        this.maxSpeed = maxSpeed;
        this.isDiscBrake = isDiscBrake;
    }
}


const r1 = new RacingCar("Ferrari", 2000, 300, true);



// ------------------------------------------Point class

class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.hypot(dx, dy);
    }
}

const p1 = new Point(2, 3);
const p2 = new Point(4, 5);


// var varName = 10;
// function b() {
//     console.log( varName);
// }
// function fn() {
//     var varName = 20;
//     b();
//     console.log(varName);
// }
// fn();

