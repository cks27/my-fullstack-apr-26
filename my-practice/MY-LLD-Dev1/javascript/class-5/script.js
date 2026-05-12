/*
    i/p: set(obj, "a.b.c", 100);  OR set(obj, "a.0.b", 42)
    o/p: {
            a: {
                b: {
                c: 100
                }
            }
        }
*/
function implementSet(obj, path, value) {
    const keys = Array.isArray(path) ? path : path.split('.');

    let current = obj;

    for(let i=0; i<keys.length; i++) {
        const key = keys[i];

        // last key -> assign value
        if(i === keys.length - 1) {
            current[key] = value;
            return obj;
        }

        // if key does not exist create structure
        if(!(key in current)) {
            current[key] = {};
        }

        current = current[key];
    }
}

console.log(implementSet({}, "a.b.c", 100));
console.log(implementSet({}, "a.0.b", 42));

// ======================================================================================================

