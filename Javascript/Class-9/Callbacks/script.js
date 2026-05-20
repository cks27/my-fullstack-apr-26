
// function uploadFile(filePath, uploaded) {
//     console.log('Started uploading the file');
//     // -----------------imagine this is the actual download process and takes 2 sec.
//     setTimeout(() => {
//         uploaded('profile.jpg')
//     }, 2000);
// }

// function resize(fileName, resized) {
//     console.log('File resize started');
//     // -----------------imagine the actual resizing here
//     setTimeout(() => {
//         const compressedFile = fileName.split('.')[0] + '.zip';
//         resized(compressedFile);
//     }, 1000);
// }

// function publish(compressedFile, published) {
//     console.log('Started to publish the file');
//     setTimeout(() => {
//         published(compressedFile);
//     }, 1000);
// }

// function encrypt() {

// }

// function save() {

// }


// // Bad Code
// uploadFile('http://facebook.com/uploads/profile.jpg', function (fileName) {
//     console.log(`File uploading completed ${fileName}`);
//     resize(fileName, function (compressedFile) {
//         console.log(`File resize completed ${compressedFile}`);
//         publish(compressedFile, function (finalFile) {
//             console.log('File published successfully, everything done!');
//         });
//     });
// });


// ----------------------------------- Good Code using promise

function uploadFile(filePath) {
    console.log('Started uploading the file');
    // -----------------imagine this is the actual download process and takes 2 sec.
    return new Promise((resolve, reject) => {
        if (!filePath.startsWith('https')) {
            reject(new Error('protocol is not https'));
        } else {
            setTimeout(() => {
                resolve('profile.jpg')
            }, 2000);
        }
    })
}

function resize(fileName) {
    console.log('File resize started');
    // -----------------imagine the actual resizing here
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const compressedFile = fileName.split('.')[0] + '.zip';
            resolve(compressedFile);
        }, 1000);
    })
}

function publish(compressedFile) {
    console.log('Started to publish the file');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(compressedFile);
        }, 1000);
    })
}


// Consuming the promise
uploadFile('http://facebook.com/uploads/profile.jpg')
    .then(function (fileName) {
        console.log(`File upload completed ${fileName}`);
        return resize(fileName);
    })
    .then(function (resizedFile) {
        console.log(`File resized Successfully ${resizedFile}`);
        return publish(resizedFile);
    })
    .then(function (publishedFile) {
        console.log(`File published successfully ${publishedFile}`);
    })
    .catch(function (err) {
        console.log('Inside catch');
        console.log(err);
    })



