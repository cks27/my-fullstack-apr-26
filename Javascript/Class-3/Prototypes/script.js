

const person = {
    name: 'Max',
    age: 25,
    greet: function () {
        console.log('Greeting from max');
    }
}

const a = Object.create(person);

a.name = 'John';

const b = Object.create(a);