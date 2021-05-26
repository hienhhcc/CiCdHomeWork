const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && key in object) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = {
  pick,
};
