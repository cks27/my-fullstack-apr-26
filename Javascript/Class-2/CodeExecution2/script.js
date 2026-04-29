
var a = 100;

function fun() {
    var b = 200;

    function innerFun() {
        console.log('Inner fun');
    }

    innerFun();
}

fun();

console.log(a);