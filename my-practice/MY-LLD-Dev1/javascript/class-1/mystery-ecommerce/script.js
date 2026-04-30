let users = [{
  name: "Rajneesh",
  age: 34,
  address: {
    local: "22 Alaknanda",
    city: "Dehradun",
    state: "UK",
  },
  orders: [{
    id: 1,
    name: "GOT Book Series"
  }],
},
{
  name: "Bhavesh",
  age: 37,
  address: {
    local: "48 DT Row",
    city: "Hyderabad",
    state: "AP",
  },
},
{
  name: "Jasbir",
  age: 38,
  address: {
    local: "196 Lama Bhavan",
    city: "Gangtok",
    state: "Sikkim",
  },
  orders: [{
    id: 1,
    name: "Chair"
  },
  {
    id: 2,
    name: "PS5"
  },
  ],
},
];


function updateUsers(users, userObject, item) {
  /*let newUsers = [...users];
    let newUserObject = { ...userObject };
    
    if (item) {
        if (!newUserObject?.orders) {
        newUserObject.orders = [];
        newUserObject.orders.push({
            "id": 1,
            "name": item
        });
        } else {
        newUserObject.orders.push({
            "id": newUserObject.orders.length + 1,
            "name": item
        });
        }
    }

    if (userObject) {
        newUsers.push(newUserObject);
    }

    return newUsers;
  */
  // 1. Find if the user already exists
  let existingUser = users.find(u => u.name === userObject.name);

  // 2. If user doesn't exist, we add them to the users array
  if (!existingUser) {
    existingUser = userObject; // Don't copy it, use the exact object
    users.push(existingUser);
  }

  // 3. If an item is provided, add it to the existingUser's orders
  if (item) {
    if (!existingUser.orders) {
      existingUser.orders = [];
    }

    // Check if this user already has this exact order (like Sample Test Case 1)
    let hasItem = existingUser.orders.some(order => order.name === item);

    // If not, add the new order
    if (!hasItem) {
      existingUser.orders.push({
        id: existingUser.orders.length + 1,
        name: item
      });
    }
  }

  return users;
}

/* ----------------- Sample Test Case 1:------------------ */
let userObject1 = {
  name: "Rajneesh",
  age: 34,
  address: {
    local: "22 Alaknanda",
    city: "Dehradun",
    state: "UK",
  },
};
let item1 = "GOT Book Series";
console.log(updateUsers(users, userObject1, item1));

/* ----------------- Sample Test Case 2:------------------ */
let userObject2 = {
  name: "Ravi",
  age: 24,
  address: {
    local: "25 Iroda",
    city: "Dehradun",
    state: "UK",
  }
}
// let item2 = "GOT Book Series";
console.log(updateUsers(users, userObject2));

/* ----------------- Sample Test Case 3:------------------ */
let userObject3 = {
  name: "Ravi",
  age: 24,
  address: {
    local: "25 Iroda",
    city: "Dehradun",
    state: "UK",
  },
}
let item3 = "Chair";
console.log(updateUsers(users, userObject3, item3));


