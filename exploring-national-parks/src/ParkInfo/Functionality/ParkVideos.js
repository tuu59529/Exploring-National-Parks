/**
 * Retrieves a list of videos for a specific park.
 * @async
 * @function parkVideos

 * @global 
 * @param {string} parkCode - The code of the park.
 * @returns {Promise<void>} - A promise that resolves with the list of videos.
 * @throws {Error} - If unable to fetch videos.
 */
import config from '../../config';// parkVideos function that takes in parkCode and returns a list of videos

async function parkVideos(parkCode){
    try{
      // Builds the park videos request URL from environment values.
      var url = `${config.npsBaseUrl}/multimedia/videos?parkCode=${parkCode}&api_key=${config.npsApiKey}`;
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('Unable to fetch videos');
      }
      const data = await response.json();
      console.log('videos: ', data);
    } catch(error){
      console.log('Error Fetching Videos: ', error.message);
    }
  }
  export default parkVideos;