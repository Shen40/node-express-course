const { writeFile } = require("fs");

console.log("at start");

writeFile("./temporary/fileB.txt", "This is line 1\n", (err) => {
  console.log("at point 1 (after line 1 write)");
  if (err) return console.log("Error at line 1:", err);
  writeFile("./temporary/fileB.txt", "This is line 2\n", { flag: "a" }, (err) => {
    console.log("at point 2 (after line 2 write)");
    if (err) return console.log("Error at line 2:", err);
    writeFile("./temporary/fileB.txt", "This is line 3\n", { flag: "a" }, (err) => {
      console.log("at point 3 (after line 3 write)");
      if (err) return console.log("Error at line 3:", err);
      console.log("All writes complete!");
    });
  });
});

console.log("at end");