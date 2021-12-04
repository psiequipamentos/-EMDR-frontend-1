/**
 * * DEVELOPMENT {
 *      api_url: "http://localhost:3002",
 *     create_room_url: "http://localhost:3002/daily/new-room"
 * }
 * * TESTING {
 *      api_url: "http://ec2-54-232-146-124.sa-east-1.compute.amazonaws.com",
 *     create_room_url: "http://ec2-54-232-146-124.sa-east-1.compute.amazonaws.com:3002/daily/new-room"
 * }
 */
const serverConnectionConfig ={
    api_url: "http://ec2-15-228-160-164.sa-east-1.compute.amazonaws.com:3001",
    create_room_url: "http://ec2-15-228-160-164.sa-east-1.compute.amazonaws.com:3002/daily/new-room",
    websocket_url:"http://ec2-15-228-160-164.sa-east-1.compute.amazonaws.com:3001"
};

export default  serverConnectionConfig;
