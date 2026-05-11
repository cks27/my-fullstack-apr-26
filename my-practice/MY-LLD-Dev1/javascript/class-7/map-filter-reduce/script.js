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

const isVeg = (item) => {
     const itemLower = item.toLowerCase();
    return !itemLower.includes('chicken') && !itemLower.includes('egg');
}

const isOnionGarlicFree = (item) => {
    const itemLower = item.toLowerCase();
    return !itemLower.includes('garlic') && !itemLower.includes('onion');
}
const vegMenu = menu.filter(isVeg);

const jainMenu = menu.filter(isVeg).filter(isOnionGarlicFree);

const nonVegMenu = menu.filter((dish) => !isVeg(dish));

console.log(vegMenu);
console.log(jainMenu);
console.log(nonVegMenu);


const cart = [
{
    title: "Macbook Air",
    price: 100,
    qty: 2
},
{
    title: "Macbook Pro",
    price: 200,
    qty: 3
},
{
    title: "Iphone",
    price: 50,
    qty: 5
},
]

const sum = cart.reduce((acc, el) => acc + (el.qty * el.price), 0);
console.log(sum);