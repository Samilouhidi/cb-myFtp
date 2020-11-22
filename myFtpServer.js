const net = require('net')
const fs = require('fs')
const path = require('path')


if (process.argv.length   !=3){
    return console.log('usage: node myFtpServer.js <port>')
}


else{
    const port = process.argv[2]


    const server = net.createServer((socket) => {

    
    
    let userDir
    let user //utilisateur actuel
    let users = JSON.parse(fs.readFileSync('connect.json'))  //lire le fichier se connect.json pour le convertir en tableau
    let code = '150'  //code pour utilisateur 
    socket.write(code)//envoie du code au client
    
    socket.on('data', (data) => { //Lorsque le serveur recois les donnees du client
        const [directive, parameter] = data.toString().split(' ')
        switch(directive) {
        
            
        
            case 'LIST' :
                if(code != '120'){ //si identifiant non connecté
                   code = '332'
                   socket.write(code)
                }
                else if(parameter) {
                    code = '409'
                    socket.write(`${code}~$(directive)`)
                    code='120'
                }
                else{
                  code = '150'//code pour la deconnexion
                  socket.write(code)  
                }
                break;
            
            case 'PASSWORD' :
                if (userConnected ===0){
                    socket.write('Vous devez etre connecter pour avoir accés a cette commande !')
                }
                else if(userConnected=== 1){
                    socket.write(__dirname);
                }
                break;


            case 'RETR';
                if(userConnected === 0){
                    socket.write('Vous devez etre connecter pour avoir accés a cette commande !')
                }
                else if(userConnected === 0) {
                    rocket.write(__dirname);
                }
                break;
            
                case 'CWD' :
                    if (code !='120'){
                        code ='332'
                        socket.write(code)
                    }
                    else if(data.toString().split(' ').length !=2){
                        code= '409'
                        socket.write(`${code}~{directive}`);
                        code ='120'
                    }
                    break;

                    case 'CWD' :
                        if (code !='120'){
                            code ='332'
                            socket.write(code)
                        }
                        else if(data.toString().split(' ').length !=2){
                            code= '409'
                            socket.write(`${code}~{directive}`);
                            code ='120'
                        }
                        break;    
                        
                        case 'USER' :
                        if (code !='120'){
                            code ='332'
                            socket.write(code)
                            code ='230'
                        }
                        else if(data.toString().split(' ').length >2){
                            code= '332'
                            socket.write(`${code}~{directive}`);
                            code ='120'
                        }
                        break;       
                        
                        case 'HELP' :
                        socket.write('USER  <username>; check if the user exist\nPASS <password>; authenticate the user with a password\n'+
                        'LIST: list the current directory of the server\nCWD <directory>: change the current directory of the server\n'+
                        'RETR <filename>: transfer a copy of the file FILE from the server to the client\n'+
                        'STOR <filename>: transfer a copy of the file FILE from the client to the server\n'+
                        'PWD: display the name of the current directory of the server\n'+
                        'HELP: send helpful information to the client')
                        break;

                        case 'QUIT':
                        socket.write('You have been disconnected.')
                        socket.emit("end")

                        break;

        
        
        
        
        
        }
    })
})


server.listen(port, () => {
    console.log(`Server started at port ${port}`)
  })