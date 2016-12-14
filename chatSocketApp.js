
var soloUsers = [];
var connectedUsers = [];
var clients = {};

exports.start = function(sockets, app) {
	sockets.on('connection', function(socket) {
		clients[socket.id] = socket;
		
		
		var partner;
		var partnerSocket;
		
		socket.on('findPartner', function (data) {
			var currUser = {
				socket: socket,
				socketId: socket.id,
				name: data.name,
				role: data.role
			};
			
		  
		  console.log('soloUsers: '+soloUsers.length);
		  for(var i = 0; i < soloUsers.length; i++){
			  var tmpUser = soloUsers[i];
			  console.log(tmpUser.role);
			  console.log(currUser.role);
			  console.log('currUser: '+socket.id);
			  console.log('tmpUser: '+tmpUser.socketId);
			  if(tmpUser.role != currUser.role && tmpUser.socketId){
				 
				 partnerSocket = clients[tmpUser.socketId];
				 
				 soloUsers.splice(i, 1);
				 
				 if (partnerSocket) {
					partner = tmpUser;
					break;
				  }
			  }
		  }
		  
		  if(partner){
			  socket.partner = partner;
			  partnerSocket.partner = currUser;
			  
			  socket.partnerSocket = partner.socket;
			  partnerSocket.partnerSocket = currUser.socket;
			  
			  socket.inlist = false;
			  partnerSocket.inlist = false;
			  
			  socket.emit("foundUser", partner.name);
			  socket.partnerSocket.emit("foundUser", currUser.name);

		  }else{
			 if (socket.partner) {							
			  delete socket.partner;
			}

			if (!socket.inlist) {
			  socket.inlist = true;
			  soloUsers.push(currUser);
			}
			console.log("No one");
			socket.emit('empty');  
		  }
		  
		  
		});
		
		socket.on('sendMsg', function(data){
			//sockets.emit('newMsg', data);
			if(socket.partnerSocket){
				socket.partnerSocket.emit('newMsg', data);
				socket.emit('newMsg', data);
			}
			
		});
		
	});
};