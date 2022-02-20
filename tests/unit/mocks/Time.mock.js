/**
 * A sleep method, used to wait for an async script execution
 *
 * @param {Number} delay Delay to wait for
 * @returns {Promise} Promise to await latter execution
 */
const sleep = (delay = 0) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export { sleep };
