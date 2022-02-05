const io = require("socket.io-client"),
/*Creates a client that connects ot server at the specified address*/
client = io.connect("192.168.0.91:5000");
export default client;