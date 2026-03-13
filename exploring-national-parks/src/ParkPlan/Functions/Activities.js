/**
 * Retrieves activities data from the National Parks Service API.
 * If the data is available in the local storage, it returns the cached data.
 * Otherwise, it makes a network request to fetch the data from the API.
 * The retrieved data is stored in the local storage for future use.
 * @function Activities
 * @async
 * @global
 *
 * @returns {Promise<Object>} A promise that resolves to the activities data.
 * @throws {Error} If there is an error in fetching or parsing the data.
 */
// Activities.js
import config from '../../config';

export const Activities = async () => {
  try {
    const cacheKey = 'activitiesData';
    let activitiesData = localStorage.getItem(cacheKey);

    if (activitiesData) {
      return JSON.parse(activitiesData);
    }
    // Fetches park activities using environment configuration values.
    const response = await fetch(
        `${config.npsBaseUrl}/activities?api_key=${config.npsApiKey}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();

    localStorage.setItem(cacheKey, JSON.stringify(json));

    return json;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
