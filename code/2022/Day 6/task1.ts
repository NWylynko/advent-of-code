import { input } from "./input";

const decode = (dataStream: string) => {
  let str = "";

  for (let i = 0; i < dataStream.length; i++) {
    const char = dataStream[i];

    if (str.length >= 4) {
      // we found it
      return { str, marker: i };
    }

    if (str.includes(char)) {
      // reset it if the char is already in the str
      str = char;
    } else {
      str += char;
    }
  }
};

const x = decode(input);

console.log(x);
