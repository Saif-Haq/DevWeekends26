const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        
        res.end("Welcome to my Node.js HTTP Server!");
    }
    
    else if (req.url === "/read") {
        fs.readFile("./text_file.txt", "utf8", (err, data) => {    
        res.end(data);
        });
    }
    
    else if (req.url === "/write") {
        const content = `Updated at ${new Date().toISOString()}\n`;
        
        fs.appendFile("./text_file.txt", content, (err) => {
            if (err) {
                res.writeHead(500);
                res.end("Failed to update file");
                return;
            }
            res.writeHead(200);
            res.end("File updated successfully");
        });
    }
    
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});