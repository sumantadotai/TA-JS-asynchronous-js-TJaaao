- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```javascript
let times = [1, 2, 3, 4];
let promises = times.map((sec) => {
  new Promise((resolved, reject) => {
    setTimeout(() => resolved(`Resolved After   ${sec} Seconds`, sec * 1000));
  });
});

Promise.all(promises).then((res) => console.log(res));
```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```javascript
let usernames = [
  "infysumanta",
  "techwithtim",
  "hussien89aa",
  "odan",
  "zulhfreelancer",
];
let userDataPromise = usernames.map((username) => {
  return fetch(`https://api.github.com/users/${username}/followers`).then(
    (res) => res.json()
  );
});

Promise.all(userPromises).then((users) => {
  users.forEach((user) => console.log(user.followers));
});
```

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

```javascript
let one = fetch(`https://random.dog/woof.json`).then((res) => res.json());

let two = fetch(`https://aws.random.cat/meow`).then((res) => res.json());

Promise.race([one, two]).then(console.log);
```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Arya"), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Whoops!")), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve("John"), 3000)
);

Promise.allSettled([one, two, three])
  .then((res) => console.log(res))
  .catch((error) => console.error(error));

Promise.all([one, two, three])
  .then((res) => console.log(res))
  .catch((error) => console.error(error));
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Arya"), 1000);
  }),
  "Sam",
  { name: "John" },
]).then(console.log);

//Output: ['Arya', 'Sam', {…}]
//1sec time is required for the to promise to resolve
```
