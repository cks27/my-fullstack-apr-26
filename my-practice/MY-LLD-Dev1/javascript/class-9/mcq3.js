Promise.resolve(1) // Creates a fulfilled promise with value = 1

  .finally((data) => {
    // finally NEVER receives resolved/rejected value
    // so data will always be undefined
    console.log(data); // undefined

    // Returning a rejected promise from finally()
    // OVERRIDES the original fulfilled state (1)
    // Chain becomes: rejected('error')
    return Promise.reject("error");
  })

  .catch((error) => {
    // Since finally() returned rejected promise,
    // catch() executes

    console.log(error); // "error"

    // throw inside promise chain
    // = return Promise.reject("error2")
    // Chain becomes: rejected('error2')
    throw "error2";
  })

  .finally((data) => {
    // Again, finally does not receive any value/error
    console.log(data); // undefined

    // Promise.resolve(2)
    // creates fulfilled promise with value 2

    // .then(console.log)
    // is same as:
    // .then((value) => console.log(value))

    // prints: 2

    // console.log() returns undefined
    // so this becomes:
    // Promise<fulfilled(undefined)>

    // Since this promise RESOLVES successfully,
    // finally preserves original rejection ('error2')
    return Promise.resolve(2).then(console.log);
  })

  .then((value) => {
    // This will NOT run
    // because chain is still rejected('error2')
    console.log(value);
  })

  .catch((error) => {
    // Handles final rejection
    console.log(error); // "error2"
  });