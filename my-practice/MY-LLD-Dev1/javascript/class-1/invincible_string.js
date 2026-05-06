let a = "This only works if and only if";
let b = a.slice(a.indexOf("only"));
let c = b.lastIndexOf("only");
console.log(b);
b[c] = "i"

console.log(a);
console.log(b);