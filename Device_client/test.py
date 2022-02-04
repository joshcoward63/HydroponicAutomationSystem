import websocket

ws = websocket.WebSocket()
ws.connect("ws://192.168.0.91:8000")
ws.send("Hello, Server")
print(ws.recv())
ws.close()