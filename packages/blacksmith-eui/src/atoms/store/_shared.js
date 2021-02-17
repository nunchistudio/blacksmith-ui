/**
 * Export the function to check if a name is valid.
 *
 * @param {string} name
 */
export function isNameValid(name) {
  return name.match(/^[a-zA-Z0-9-_]+$/) !== null;
};
