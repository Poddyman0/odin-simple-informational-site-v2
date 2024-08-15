const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    //get URL
    const q = url.parse(req.url, true);
    //create Filename
    let filename = "";
    if (q.pathname === "/" || q.pathname === "") {
      filename = "." + "/index.html";
    } else {
      filename = "." + q.pathname + ".html";
    }
//used to asynchronously read the contents of a file. path: The path to the file you want to read. callback: A callback function that gets invoked once the file is completely read or an error occurs.

    fs.readFile(filename, function (err, data) {
      if (err) {
        // function is used in Node.js to write the HTTP header to the response that a server sends back to the client. statusCode: This is a three-digit HTTP status code, indicating the status of the response. For example, 404 indicates "Not Found", 200 indicates "OK", and so on. reasonPhrase (optional): This is an optional human-readable string explaining the status code. It's not commonly used, and if omitted, Node.js will provide a default reason phrase for the given status code
        res.writeHead(404, { "Content-Type": "text/html" });
        const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
          if (err) throw err;
          return data;
        });
        //The res.write() function in Node.js is used to send data to the client (i.e., the browser) over an HTTP connection. 
        res.write(page404);
        return res.end();
      } else {

        if (filename === "./about.html") {
          res.writeHead(200, { "Content-Type": "text/html" });
          const pageAbout = fs.readFileSync("about.html", "utf-8", (err, data) => {
            if (err) throw err;
            return data;
          });
          res.write(pageAbout);
          return res.end();
        } else if (filename === "./contact-me.html") {
          res.writeHead(200, { "Content-Type": "text/html" });
          const pageContactMe = fs.readFileSync("contact-me.html", "utf-8", (err, data) => {
            if (err) throw err;
            return data;
          });
          res.write(pageContactMe);
          return res.end();
        } else if (filename === "./index.html") {
          res.writeHead(200, { "Content-Type": "text/html" });
          const pageIndex = fs.readFileSync("index.html", "utf-8", (err, data) => {
            if (err) throw err;
            return data;
          });
          res.write(pageIndex);
          return res.end();
        }

      }
    });
  })
  .listen(8080);
