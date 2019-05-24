const o = {
  name: "obj"
};

function sayHello(word, other) {
  console.log(this.name, " say ", word, other);
}

sayHello.bind2(o, "hello world")("  fun call");











new (sayHello.bind2(o, "hello world"))("   new call");
