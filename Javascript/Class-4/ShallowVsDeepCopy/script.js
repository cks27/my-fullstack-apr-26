
// Shallow Copy

const arr = [1, 2, 3, [100, 200], 500];

const arrCopy = [...arr];

const obj = {
    name: 'Max',
    age: 25,
    address: {
        city: 'Delhi',
        country: 'India'
    }
}

const objCopy = {
    ...obj
}


// Deep Copy

const objJsonString = JSON.stringify(obj);

const objDeepCopy = JSON.parse(objJsonString);

const objDeepCopy1 = structuredClone(obj);


