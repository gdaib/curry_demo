const methods = {}

const types = [
  "array",
  "object",
  "null",
  "symbol",
  "number",
  "string",
  "boolean"
];

const getType = (o) => Object.prototype.toString.call(o).replace(/\[|\]/g, '').slice(7).toLowerCase()

const upperCaseFirstChar = (str) => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()

types.forEach((type) => {
  methods["is" + upperCaseFirstChar(type)] = (o) => getType(o) === type
})


methods['isNaN'] = (n) => n !== n


console.log(Object.keys(methods));