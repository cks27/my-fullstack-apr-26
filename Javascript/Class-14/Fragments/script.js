const section = document.querySelector('section');
const btn = document.querySelector('button');

btn.addEventListener('click', function () {

    // const div = document.createElement('div');
    const fragment = document.createDocumentFragment()

    for (let i = 1; i <= 10; i++) {
        // creating a paragraph
        const para = document.createElement('p');

        // setting some text to the para.
        para.innerText = `This is para ${i}`;
    
        // ------Bad Way----
        // This DOM Manipulation step is executed 10 times.
        // section.appendChild(para);

        // -----Better way
        // Adding the create para to div
        fragment.appendChild(para);
    }

    section.appendChild(fragment);
});

// Benefits of Fragment

// 1. Avoid multiple DOM Manipulation by aggragating the result using fragment
// 2. Fragment do not contribute to a valid html node, hence prevent unnecessary node from getting added.
