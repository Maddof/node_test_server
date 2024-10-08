import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = process.env.PORT;

// Get current path
const __dirname = import.meta.dirname;

// Test a comment

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else if (req.url === "/contact-me") {
        filePath = path.join(__dirname, "public", "contact-me.html");
      } else {
        filePath = path.join(__dirname, "public", "404.html");
      }
      const data = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
