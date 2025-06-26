import { TIMEOUT_SEC } from './config';

/**
 * Creates a promise that rejects after a certain number of seconds.
 * Used to implement a request timeout when making AJAX calls.
 *
 * @param {number} s - The number of seconds before the promise rejects
 * @returns {Promise<never>} - A rejected promise after the specified time
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * A universal function to make AJAX requests (GET or POST) with timeout handling.
 * Automatically detects whether to make a GET or POST request based on the presence of `uploadData`.
 *
 * @param {string} url - The endpoint URL to send the request to
 * @param {Object} [uploadData=undefined] - Data to be uploaded (used for POST requests). If omitted, a GET request is made.
 * @returns {Promise<Object>} - The JSON response from the API
 * @throws {Error} - If the request fails, times out, or the response status is not OK
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // Determine fetch method: POST if data exists, otherwise GET
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // API expects JSON
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url); // GET request

    // Run both fetch and timeout in parallel; whichever finishes first is used
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    // Parse JSON response
    const data = await res.json();

    // If response is not OK (status not 2xx), throw a custom error with message and status code
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    // Re-throw the error to be handled by the calling function
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
