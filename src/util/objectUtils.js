const isEmpty = (obj) => {
    let name;
    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    if (obj.constructor !== Object) {
      return false;
    }
    return true;
}

// Duplicate object
const duplicate = (object) => {
    return Object.assign({}, object)
}


module.exports = { isEmpty, duplicate }