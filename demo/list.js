const list = [
  { name: "fluffykins", element: "lightning" },
  { name: "noomi", element: "lightning" },
  { name: "karo", element: "fire" },
  { name: "doomer", element: "timewarp" }
];

let hasElement = (element, obj) => obj.element === element

let lightList = list.filter(x => hasElement('lightning', x))

console.log(lightList);