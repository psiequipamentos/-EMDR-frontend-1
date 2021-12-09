
const serverConnectionConfig ={
    api_url: "http://localhost:3002",
    create_room_url: "http://localhost:3002/daily/new-room",
    websocket_url:"http://localhost:3001"
};
const serverConnectionConfigProduction = {
    api_url: "https://www.emdrremoto.com.br:3002",
    create_room_url: "https://www.emdrremoto.com.br:3002/daily/new-room",
    websocket_url:"https://www.emdrremoto.com.br:3001"
}

export  {serverConnectionConfig, serverConnectionConfigProduction};
