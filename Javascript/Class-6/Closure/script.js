

function fun() {
    var a = 100;

    function innerFun() {
        a++;
        console.log(a);
    }

    return innerFun;
}

//closure = {a: 100}
const f = fun();
f(); //closure = {a: 101}
f(); //closure = {a: 102}
f(); //closure = {a: 103}