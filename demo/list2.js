const curry = require('lodash/curry')
const list = [
  { name: "fluffykins", element: "lightning" },
  { name: "noomi", element: "lightning" },
  { name: "karo", element: "fire" },
  { name: "doomer", element: "timewarp" }
];

let hasEleCurry = curry((element, obj) => obj.element === element);

let lightList = list.filter(hasEleCurry("lightning"));

console.log(lightList);
