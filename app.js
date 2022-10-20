const express = require('express');
const app = express();
const path = require("path");
const server = require("http").Server(app);
const io = require('socket.io')(server);
server.listen(8082);

const projectId = 'eng-cell-366009';
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
// Instantiates a client
const translate = new Translate({
    projectId
});

app.use("/", express.static(path.join(__dirname, "dist/translator")));


io.on("connection",(socket)=>{
    socket.on('newText',(data)=>{
        console.log(data);
        //do the translation
        quickStart(data.text,data.target,function(translation){
            
            translateObj={
                
                original: data.text,
                translated: translation,
                target: data.target,
            };
            socket.emit('tran',translateObj);
        })
    });
})

async function quickStart(text,target,callback) {
    const [translation] = await translate.translate(text, target);
    callback(translation);
  }

