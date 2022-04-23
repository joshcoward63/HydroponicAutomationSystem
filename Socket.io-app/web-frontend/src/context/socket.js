const io = require("socket.io-client"),
/*Creates a client that connects ot server at the specified address*/
client = io.connect("160.2.181.201:5505");
export default client;