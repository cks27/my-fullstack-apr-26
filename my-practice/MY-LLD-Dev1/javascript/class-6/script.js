class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distance(another) {
        const hor = another.x - this.x;
        const ver = another.y - this.y;
        return Math.sqrt(hor**2 + ver**2);
    }
}

const p1 = new Point(4,5);
const p2 = new Point(7,8);

console.log(p1.distance(p2));


function fun() {
    var a = 100;

    return function () {
        a++;
        console.log(a);
    }
}
const f = fun();
f();