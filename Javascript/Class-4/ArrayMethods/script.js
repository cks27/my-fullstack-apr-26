
// Slice-------------------------------------
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const res1 = nums.slice();

const res2 = nums.slice(4);

// --------------------------------

const colors = ['red', 'orange', 'green'];

const index = colors.indexOf('orange'); //if present returns the index otherwise return -1.

// split--------------------------

// const sentence = 'The brown fox jumps over a white lazy dog.'

// -----------------------------------------------------------

const sentence = 'The brown fox jumps over a white lazy dog'

/*
Write a method
    
    Q1. Reverse the order of a word in given string.
        e.g: 
    input: sentence = 'The brown fox jumps over a white lazy dog'
    output: "dog lazy white a over jumps fox brown The"

*/

function reverseWords(sentence) {
    return sentence.split(' ').reverse().join(' ');
}

/*
Write a method
    
    Q2. Reverse the order of characters in a word in a given string.
        e.g: 
    input: sentence = 'The brown fox jumps over a white lazy dog'
    output: "ehT nworb xof spmuj revo a etihw yzal god"

*/

function reverseWordsCharOrder(sentence) {
    const words = sentence.split(' ');

    const res = [];
    for (let word of words) {
        const reversedWord = word.split("").reverse().join("");
        res.push(reversedWord);
    }

    return res.join(" ");
}

console.log(reverseWordsCharOrder(sentence));
console.log(reverseWordsCharOrder("This is a sentence"));