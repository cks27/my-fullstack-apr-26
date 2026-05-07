

const nums = [1, 2, 3, [4, 5], 6];

if (!Array.prototype.flat) {
    Array.prototype.myFlat = function () {
        const arr = this;
        const res = [];
        for (let el of arr) {
            // If el is an array
            if (Array.isArray(el)) {
                res.push(...el);
            } else {
                // when el is not an array
                res.push(el);
            }
        }
        return res;
    }
}


