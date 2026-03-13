/**
 * Fetches places related to a specific park dictated by parkCode
 * @global
 * @async
 * @function FetchPlaces

 * 
 * @param {Object} parkCode - The park code object containing the park code
 * @param {Array} activities - A list of activities selected by the user
 * @returns {Promise<Object>} A promise that resolves to the places data for the given park.
 * @throws {Error} In case of error in API fetching or in other logic
 */
import config from '../../config';

export const FetchThingsToDo = async (parkCode, activities) => {
    try {

        //Used to save the ids of the things to do returned and all of the things to do returned
        const allThingsToDo = [];
        const responseIds = new Set();
        var json;

        if(activities.length > 0) {
            for (const activity of activities) {
                const url =  `${config.npsBaseUrl}/thingstodo?parkCode=${parkCode.value}&limit=3&q=${activity.label}&sort=-relevanceScore&api_key=${config.npsApiKey}`;
                console.log("url :" + url);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                json = await response.json();
                json.data.forEach(thing => {
                    console.log("thing",thing);
                    if(!responseIds.has(thing.id)) {
                        responseIds.add(thing.id);
                        allThingsToDo.push(thing);
                    }
                });
            }
            //Sort based on relevance score
            allThingsToDo.sort((a, b) => b.relevanceScore - a.relevanceScore);
        } else {
            const url =  `${config.npsBaseUrl}/thingstodo?parkCode=${parkCode.value}&limit=50&api_key=${config.npsApiKey}`;
            console.log("url :" + url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            json = await response.json();
            json.data.forEach(thing => {
                console.log("thing",thing);
                allThingsToDo.push(thing);
            });
        }
        
        console.log("list", allThingsToDo);        
      return allThingsToDo;
    } catch (error) {
      console.error(error.message);
    }
  };

  export default FetchThingsToDo;