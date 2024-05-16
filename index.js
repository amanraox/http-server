function parseReq(raw) {
  let request = raw.toString();
  let [line1, ...lines] = request.split('\r\n');
  let [method, route, version] = line1.split(' ');
  let [path, search] = route.split('?');
  let query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  let headers = Object.fromEntries(lines.filter((_,i) => i <= lines.length - 3).map(line => line.split(': ')));
  let body = lines[lines.length - 1];
  return { method, path, query, headers, body, version };
}

function stringifyRes(data) {
}

require('net').createServer(socket => {
  socket.on('data', raw => {
    const data = parseReq(raw);
    console.log(data)
    socket.end();
  });
}).listen(4221, "0.0.0.0");
