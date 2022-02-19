const sleep = (delay = 0) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export { sleep };
