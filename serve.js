// Minimal static file server for local use: node serve.js [port]
//
// This exists only so browsers that restrict file:// pages can still open the planner.
// It is deliberately bound to the loopback address: the planner's whole point is that
// your data never leaves the machine, and a dev server on 0.0.0.0 would hand this
// folder to anyone on the same network.
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.argv[2] || 8731);
const host = "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8"
};

function send(res, code, body) {
  res.writeHead(code, { "content-type": "text/plain; charset=utf-8" });
  res.end(body);
}

http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "method not allowed");

  let rel;
  try {
    // A malformed escape such as "/%" throws here; without this the whole server dies.
    rel = decodeURIComponent(req.url.split("?")[0]);
  } catch (e) {
    return send(res, 400, "bad request");
  }
  if (rel.indexOf("\0") !== -1) return send(res, 400, "bad request");
  if (rel === "/") rel = "/planner.html";

  const norm = path.normalize(rel).replace(/^[\\/]+/, "");
  // Never serve dotfiles: .git holds repository internals and may hold credentials.
  if (norm.split(/[\\/]/).some(part => part.startsWith("."))) return send(res, 404, "not found");

  const file = path.join(root, norm);
  if (file !== root && !file.startsWith(root + path.sep)) return send(res, 403, "forbidden");

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, "not found");
    res.writeHead(200, {
      "content-type": types[path.extname(file)] || "application/octet-stream",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file).on("error", () => res.end()).pipe(res);
  });
}).listen(port, host, () => console.log("http://" + host + ":" + port));
