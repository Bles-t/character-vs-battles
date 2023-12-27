// import axios from "axios";



// function fetchWikiExtract() {
//   const wikiEndpoint = 'https://vsbattles.fandom.com/api.php';
//   const wikiParams = '?action=query'
//     + "edit"
//     + "format=json"
//     + "feedwatchlist"
//     + "origin=*"
//     + "query=parse"



//   const wikiLink = wikiEndpoint + wikiParams;

//   console.log(wikiLink);

//   var wikiConfig = {
//     timeout: 6500
//   };


//   async function getJsonResponse(url, config) {


//     const res = await axios.get(url, config);
//     return res.data;

//   }
//   return getJsonResponse(wikiLink, wikiConfig).then(result => {
//     return result
//   }).catch(error => {
//     console.log("an error has occurede" + error);
//     return null;
//   })

// }

// export default  { fetchWikiExtract }


import axios from "axios";

function fetchWikiExtract() {
  const wikiEndpoint = 'https://vsbattles.fandom.com/api.php';
  const wikiParams = '?action=query'
    + "edit"
    + "format=json"
    + "feedwatchlist"
    + "origin=*"
    + "query=parse";

  const wikiLink = wikiEndpoint + wikiParams;

  console.log(wikiLink);

  var wikiConfig = {
    timeout: 6500
  };

  async function getJsonResponse(url, config) {
    const res = await axios.get(url, config);
    return res.data;
  }

  return getJsonResponse(wikiLink, wikiConfig).then(result => {
    // Extract power levels from the result
    const textData = result?.parse?.text["*"];
    const powerLevels = extractPowerLevels(textData);

    // Do something with the extracted power levels
    console.log("Power Levels:", powerLevels);

    return result;
  }).catch(error => {
    console.log("An error has occurred: " + error);
    return null;
  });
}

// Function to extract power levels
function extractPowerLevels(textData) {
  const regex = /(\w+\s\d+[A-C]-?:.*?)(?=\w+\s\d+[A-C]-?|$)/gs;
  const matches = textData.match(regex);
  const powerLevels = {};

  if (matches) {
    matches.forEach(match => {
      const [category, description] = match.split(':').map(str => str.trim());
      powerLevels[category] = description;
    });
  }

  return powerLevels;
}

export default { fetchWikiExtract };
