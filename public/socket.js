let socket = {connected:false}

function connect(){
    console.log("Connected")
    socket = io.connect();
    
}