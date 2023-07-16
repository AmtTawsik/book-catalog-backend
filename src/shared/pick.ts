/**
 * pick is a utility function that extracts specific keys from an object and returns a new object with only those keys.
 * It takes an object (obj) and an array of keys (keys) as parameters.
 * The function iterates over the keys array and checks if the object has the key.
 * If the object has the key, it adds the key-value pair to the final object.
 * The function returns the final object with the selected keys and their corresponding values.
 * @param obj The source object to pick keys from.
 * @param keys An array of keys to pick from the source object.
 * @returns A new object with only the selected keys and their corresponding values.
 */

const pick = <T extends object, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }

  return finalObj;
};

// Export the pick function as the default export
export default pick;
