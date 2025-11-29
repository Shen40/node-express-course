const { writeFile, readFile } = require("fs").promises;


writeFile("temp.txt", "Line one\n")
.then(() => {
return writeFile("temp.txt", "Line two\n", { flag: "a" });
})
.then(() => {
return writeFile("temp.txt", "Line three\n", { flag: "a" });
})
.then(() => {
return readFile("temp.txt", "utf-8");
})
.then((data) => {
console.log(data);
})
.catch((error) => {
console.log("An error occurred:", error);
});