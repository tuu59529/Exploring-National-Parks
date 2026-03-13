/**
 * Fetches people related to a specific park dictated by parkCode
 * 
 * @global
 * @async
 * @function FetchPeople

 * @param {Object} parkCode - The park code object containing the park code
 * @returns {Promise<Object>} A promise that resolves to the people data for the given park.
 * @throws {Error} In case of error in API fetching or in other logic
 */
import config from '../../config';

export const FetchPeople = async (parkCode) => {
    try {
      const url =  `${config.npsBaseUrl}/people?parkCode=${parkCode.value}&api_key=${config.npsApiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

export default FetchPeople;