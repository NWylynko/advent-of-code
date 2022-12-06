import { input } from "./input";

const decode = (dataStream: string) => {
  let str = "";

  for (let i = 0; i < dataStream.length; i++) {
    const firstChar = dataStream[i];

    for (let j = i; j < dataStream.length; j++) {
      const char = dataStream[j];

      if (str.length >= 14) {
        // found it
        return { str, marker: j };
      }

      if (str.includes(char)) {
        // reset
        str = firstChar;
        break;
      } else {
        str += char;
      }
    }
  }
};

const x = decode(input);

console.log(x);
