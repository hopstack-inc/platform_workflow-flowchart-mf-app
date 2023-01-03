export const mapToList = (map) => {
  const list = [];
  Object.entries(map).map(([k, v]) => {
    //* Create list from map
    list.push({ k, v });
  });
  return list;
};

export const listToMap = (list) => {
  const map = {};
  list.forEach(({ k, v }) => {
    map[k] = v;
  });
  return map;
};
