const { writeFile, readFile } = require("fs").promises;  

const writer = async()=>{
    try{
        await writeFile("temp.txt", "Line one\n");
        await writeFile("temp.txt", "Line two\n", { flag: "a" });
        await writeFile("temp.txt", "Line three\n", { flag: "a" });
    }catch(err) {
        console.log("An error occurred: ", err)
    }
    
}

const reader = async()=>{
    try{
        const contents = await readFileSync("temp.txt", 'utf8')
        console.log(contents); 
    }catch(err) {
        console.log("An error occurred: ", err)
    }
}

const readWrite = async()=>{
        await writer();
        await reader();
}

readWrite(); 