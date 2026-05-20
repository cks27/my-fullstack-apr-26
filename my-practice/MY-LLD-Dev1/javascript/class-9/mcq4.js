// Promise resolved with value 1
const promise1 = Promise.resolve(1);

// Promise resolved with value 2
const promise2 = Promise.resolve(2);

// Promise resolved with value 3
const promise3 = Promise.resolve(3);

// Promise rejected with value 4
const promise4 = Promise.reject(4);

const promiseAll = async () => {

  // Wait for BOTH promises to resolve
  // Since both resolve successfully:
  // group1 = [1, 2]
  const group1 = await Promise.all([
    promise1,
    promise2
  ]);

  // Promise.all fails FAST
  // If even ONE promise rejects,
  // Promise.all immediately rejects

  // promise3 resolves -> 3
  // promise4 rejects -> 4 ❌

  // So this line throws error 4
  const group2 = await Promise.all([
    promise3,
    promise4
  ]);

  // This line NEVER executes
  // because function already throws
  return [group1, group2];
};

// promiseAll() returns a Promise

promiseAll()

  .then(console.log)

  // Handles rejection from async function
  .catch(console.log);