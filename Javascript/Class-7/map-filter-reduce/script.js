
// ----------------------------------- map----------------------------

function square(n) {
    return n ** 2;
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const sqOfNums = nums.map(square);

const sqRootOfNums = nums.map((n) => Math.sqrt(n));

// ------------------------------------ filter -------------------------

function isEven(num) {
    return num % 2 === 0;
}

const evenNums = nums.filter(isEven);

const oddNums = nums.filter((num) => num % 2 !== 0);

// ------------------------------------- menu filter problem---------------------

const menu = [
    "Kadhai Paneer",
    "Onion Rings",
    "Onion Pizza",
    "Garlic Bread",
    "Chicken Biryani",
    "Veg Birynai",
    "Dal Makhni",
    "Egg Fried Rice",
    "Butter Garlic Naan",
    "Onion Paratha",
    "Aloo Paratha",
    "Dal Bati",
    "Poha",
    "Chhole Bhature",
    "Dhokla",
    "Onion Dosa",
    "Masala Dosa",
    "Kadhai Chicken",
    "Chicken Korma",
    "Butter Chicken"
];

function isVeg(dish) {
    if (dish.toLowerCase().includes('egg') || dish.toLowerCase().includes('chicken')) {
        return false;
    }
    return true;
}

function isOnionGarlicFree(dish) {
    if (dish.toLowerCase().includes('onion') || dish.toLowerCase().includes('garlic')) {
        return false;
    }
    return true;
}



// 1. Veg Menu - Should not contain Egg and Chicken

// console.log(menu);
const vegMenu = menu.filter(isVeg);
// console.log(vegMenu);


// 2. Jain Menu - Veg && Should not contain onion & garlic

const jainMenu = menu.filter(isVeg).filter(isOnionGarlicFree);

// console.log(jainMenu);

const nonVegMenu = menu.filter((dish) => !isVeg(dish));

// console.log(nonVegMenu);

// -------------------------------------reduce------------------

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//acc = 0
// 1st
const sum = arr.reduce((acc, it) => {
    return acc + it;
}, 0);


// 2nd
let res = 0;
for (let num of arr) {
    res += num;
}

// console.log(res);

// 3rd
let res1 = 0;
for (let i = 0; i < arr.length; i++){
    res1 += arr[i];
}

// console.log(res1);


const cart = [
    {
        title: "Macbook Air",
        price: 100.999,
        qty: 2
    },
     {
        title: "Macbook Pro",
        price: 200.9,
        qty: 3
    },
      {
        title: "Iphone",
        price: 50.5,
        qty: 5
    },
]

// Total Value of the cart

const totalValue = cart.reduce((total, product) => total + product.price * product.qty, 0);
console.log(totalValue);




