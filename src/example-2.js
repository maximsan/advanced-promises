import { Promise as BlueBird } from "bluebird";

/* asynchronous examples with async await */

// const getGithubUserInfo = async function(userId) {
//   const url = `https://api.github.com/users/${userId}`;
//   const response = await fetch(url);
//   return await response.json();
// };

//1. just .then
// getGithubUserInfo("maximsan").then(user => console.log(`${user.name}`));

// 2. use async with IIFE
// (async () => {
//   const user = await getGithubUserInfo("maximsan");
//   console.log(`${user.name} ${user.location}`);
// })();

//3. rewrite with class syntax

class User {
  static async fetchUserInfo(endPoint) {
    const url = `https://api.github.com/${endPoint}`;
    const response = await fetch(url);
    const info = await response.json();

    if (response.status !== 200) {
      throw Error(info.message);
    }

    return info;
  }

  async fetchUser(userId) {
    const url = `https://api.github.com/users/${userId}`;
    const response = await fetch(url);
    return await response.json();
  }
}

// (async function() {
//   // const userInfo = await User.fetchUserInfo("maximsan");
//   const user = new User();
//   const userInfo = await user.fetchUser("maximsan");
//   console.log(`${userInfo.name} ${userInfo.location}`);
// })();

//4. unexisted user request

// async function showUser(user) {
//   try {
//     const userInfo = await User.fetchUserInfo(user);
//     console.log(`${userInfo.name} ${userInfo.location}`);
//   } catch (err) {
//     console.log(`${err.message}`);
//   }
// }

// showUser("maximsan");

//5. async Promise all approach

// const fetchUserRepos = async id => {
//   const endpoint1 = `users/${id}`;
//   const endpoint2 = `users/${id}/repos`;

//   const userPromise = await User.fetchUserInfo(endpoint1);
//   const reposPromise = await User.fetchUserInfo(endpoint2);

//   const [user, repos] = await Promise.all([userPromise, reposPromise]);

//   console.log(`${user.name}`);
//   console.log(`${repos.length} repos`);
// };

// fetchUserRepos("maximsan");

//6 use await with other libraries

// async function pr() {
//   console.log("working...");
//   await Promise.resolve(BlueBird.delay(2000));
//   await BlueBird.delay(2000);
//   console.log("done");
// }

// pr();

//7 async generator
// Symbol.asyncIterator = Symbol.asyncIterator || Symbol("asyncIterator");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* generateUsersAndRepos(id) {
  const endpoint1 = `users/${id}`;
  const endpoint2 = `users/${id}/repos`;

  const userPromise = User.fetchUserInfo(endpoint1);
  const reposPromise = User.fetchUserInfo(endpoint2);

  const user = await userPromise;
  yield user.name;
  yield user.location;

  await delay(3000);

  const repos = await reposPromise;
  yield `repos: ${repos.length}`;
}

// while loop

// async function showData() {
//   const generator = generateUsersAndRepos("maximsan");
//   while (true) {
//     const { value, done } = await generator.next();
//     if (done) {
//       break;
//     }
//     console.log(value);
//   }
// }

// for await of

const info = generateUsersAndRepos("maximsan");

async function showData() {
  for await (const data of info) {
    console.log(data);
  }
}

showData();