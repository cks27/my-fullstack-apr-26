const fsp = require('node:fs/promises');

const p1 = fsp.readFile('inp1.txt', {encoding:'utf-8'});
const p2 = fsp.readFile('inp2.txt', { encoding: 'utf-8' });

Promise.all([p1, p2])
    .then((result) => {
        const allNums = [];
        
        // merge the data
        for (let content of result) {
            allNums.push(...content.split('\n'));
        }
        
        // cleaning the data - removing invalid values (values which are not number)
        const cleanedNums = allNums.filter((val) => val.trim().length !== 0);
        
        // sort
        cleanedNums.sort((a, b) => a - b);

        // joining the sorted array back with new line character.
        const data = cleanedNums.join('\n');
        // console.log(data);
        return fsp.writeFile('output.txt', data);
    })
    .then(() => {
        console.log('File written successfully');
    })
    .catch((err) => {
        console.log('Something went wrong', err.message);
    })
    .finally(() => {
        console.log('Everything done!');
    })


