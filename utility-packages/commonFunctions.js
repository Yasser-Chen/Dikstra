function objectInArrayByReference(object, array) {
    for (const obj of array) {
      if (object === obj) {
        return true;
      }
    }
    return false;
  }