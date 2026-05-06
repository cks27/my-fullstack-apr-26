
const sentence = 'The brown fox jumps over a white lazy dog'

// Q1. Reverse the order of a word in given string 
function reverseWords(sentence) {
    // const valList = sentence.split(' ');
    // return valList.reverse().join(' ');
    return sentence.split(' ').reverse().join(' ');
}

// Q2 Reverse the order to character in a word in a given string
function reverseWordsCharOrder(sentence) {
    /*const valList = sentence.split(' ');
    let ans = [];
    for(let val of valList) {
        const charList = val.split('');
        console.log(charList.reverse())
        ans.concat(charList.reverse());
        console.log(ans);
    }

    return ans.join(' ').trim();*/
    const words = sentence.split(' ');
    const res = [];
    for(let word of words) {
        const reversedWord = word.split('').reverse().join('');
        res.push(reversedWord);
    }
    return res.join(' ');
}


console.log(reverseWords(sentence));
console.log(reverseWordsCharOrder(sentence));


// Flat polyfills
const nums = [1,2,3,[4,5],6]

function flatMe(list) {
    const ans = [];
    for(let item of list) {
        if(Array.isArray(item)) {
            ans.push(...item);
        } else {
            ans.push(item);
        }

    }
    return ans;
}
console.log(flatMe(nums);


function flatten() {
    const list = this;
    const ans = [];
    for(let item of list) { // TODO: can i user this directly here
        if(Array.isArray(item)) {
            ans.push(...item);
        } else {
            ans.push(item);
        }

    }
    return ans;
}
if(!Array.prototype.flat) {
    Array.prototype.flatten = flatten;
}

console.log(nums.flatten());