const curry = require('lodash/curry')
const list = [
  { name: "fluffykins", element: "lightning" },
  { name: "noomi", element: "lightning" },
  { name: "karo", element: "fire" },
  { name: "doomer", element: "timewarp" }
];

let hasElement = curry((element, obj) => obj.element === element);

let lightList = list.filter(hasElement("lightning"));

console.log(lightList);
