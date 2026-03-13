
/**
 * Fetches alerts for a specific park.
 * @async
 * @global
 * @function FetchAlerts
 *
 * @param {string} parkCode - The code of the park.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response containing the alerts.
 * @throws {Error} - If the network response is not ok or an error occurs during the fetch.
 */

import config from '../../config';

export const FetchAlerts = async (parkCode) =>{
    try{
        // Builds the park alerts request URL from environment values.
        const url = `${config.npsBaseUrl}/alerts?api_key=${config.npsApiKey}&parkCode=${parkCode}&q=closure`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const json = await response.json();
        // json.data.map((alert => {return alert.id, alert.description}))
        return json;
    }catch (error){
        console.error(error.message);
        throw error;
    }
}
export default FetchAlerts;
