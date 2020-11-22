const fs = require('fs');
const net = require('net');
const readline = require('readline');
const client = new net.Socket()




client.connect(port, host, () => {   //Connect client to server
    console.log('Connected')
  })
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
      rl.on('line', (input) => { 
        console.log(`>> ${input}`)
            client.write(input)
  });
client.on('data', (data) => {
  console.log(data.toString())
})
client.on("end", (data) => {
  process.exit(0)
})