import axios from "axios";



function fetchWikiExtract() {
  const wikiEndpoint = 'https://vsbattles.fandom.com/api.php';
  const wikiParams = '?action=query'
    + "&createaccount"
    + "json"
    + "feedwatchlist"



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
    return result
  }).catch(error => {
    console.log("an error has occurede" + error);
    return null;
  })

}

module.exports = { fetchWikiExtract }
