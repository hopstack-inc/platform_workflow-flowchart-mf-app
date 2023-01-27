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

export const getObjectList = (list) => {
  const expList = []
  list.forEach((item) => {
    const words = item.split("-");
    let name = ""
    words.forEach((word) => name+=word)
    expList.push({name:name, id:item})
  })
  return expList;
}
