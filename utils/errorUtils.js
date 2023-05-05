function extractErrorInfo(error) {
  return {
    message: error.message,
    stack: error.stack,
    name: error.name,
  };
}

module.exports = {
  extractErrorInfo,
};
