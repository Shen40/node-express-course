const { createReadStream } = require('fs');
const stream = createReadStream("../content/big.txt", {
encoding: "utf8",
highWaterMark: 1000,
});
let counter = 0; 
stream.on("data", (chunk) => {
    counter++;
    console.log(`Chunk ${counter}:`);
    console.log(chunk);
});

stream.on("end", () => {
    console.log(`\n Total chunks: ${counter}`);
});


stream.on("error", (err) => {
    console.error("Stream error:", err);
});