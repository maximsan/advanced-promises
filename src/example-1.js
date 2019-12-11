import "./styles.css";

const apiURL = "https://starwars.egghead.training";

const rootElement = document.getElementById("root");

rootElement.innerHTML = `<div style="color:red; font-size: 1.25rem">Loading...</div>`;

/* asynchronous examples with promise API */

/* Only Promise ctor, Promise.resolve, Promise.reject */

// fetch(`${apiURL}films`)
//   .then(response => response.json())
//   .then(films => (rootElement.innerHTML = getFilmsInfo(films)));

// fetch(`${apiURL}films`)
//   .then(response => {
//     if (!response.ok) {
//       throw Error(`Bad data request`);
//     }
//     return response
//       .json()
//       .then(films => (rootElement.innerHTML = getFilmsInfo(films)));
//   })
//   .catch(error => {
//     console.warn(error);
//     rootElement.innerHTML = `:(`;
//   });

// function getFilmsInfo(films) {
//   return films
//     .sort((f1, f2) => f1.episode_id - f2.episode_id)
//     .map(
//       f =>
//         `<div style="margin-bottom: 1rem">${f.episode_id}. ${
//           f.title
//         }. <div style="margin-top: 0.25rem; margin-left:1.25rem"><span style="color:gold">Producer:</span> ${
//           f.producer
//         }</div></div>`
//     )
//     .join("\n");
// }

/* Promise all */

// function queryAPI(endPoint) {
//   return fetch(`${apiURL}/${endPoint}`).then(response => {
//     return response.ok
//       ? response.json()
//       : Promise.reject(Error("Unsuccessful request"));
//   });
// }

// Promise.all([queryAPI("films"), queryAPI("planets"), queryAPI("species")])
//   .then(([films, planets, species]) => {
//     rootElement.innerText = `Films: ${films.length}, planets: ${
//       planets.length
//     }, species: ${species.length}`;
//   })
//   .catch(error => {
//     console.error(error);
//     rootElement.innerText = ":(";
//   });

/* async await with Promise all */

async function queryAPI(endPoint) {
  const response = await fetch(`${apiURL}/${endPoint}`);

  if (response.ok) {
    return response.json();
  }

  throw new Error("Unsuccessful request");
}

async function main() {
  try {
    const [films, planets, species] = await Promise.all([
      queryAPI("films"),
      queryAPI("planets"),
      queryAPI("species")
    ]);
    rootElement.innerText = `Films: ${films.length}, planets: ${
      planets.length
    }, species: ${species.length}`;
  } catch (error) {
    console.error(error);
  } finally {
    // do final clean up
  }
}

main();
