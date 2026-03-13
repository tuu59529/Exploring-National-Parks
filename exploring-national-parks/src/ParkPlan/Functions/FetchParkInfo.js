// ParkInfo.js, fetch the list of parks and return info
/**
 * Fetches data from the National Park Service API about a specific park
 * specified by parkCode
 * @async
 * @global
 * @function FetchParkInfo
 *
 * @param {Object} parkCode - The park code object containing the park code
 * @returns {Promise<Object>} A promise that resolves to data about the specific park.
 * @throws {Error} If the network response is not ok or an error occurs during the process.
 */
import config from "../../config";
export const FetchParkInfo = async (parkCode) => {
    try {
      await parkCode;
      // Builds the park details request URL from environment values.
      var url = `${config.npsBaseUrl}/parks?api_key=${config.npsApiKey}&parkCode=${parkCode}`;
      console.log("url park info",url);
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

export default FetchParkInfo;
