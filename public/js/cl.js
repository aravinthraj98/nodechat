const socket=io();
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
console.log(username);
socket.emit('joinroom',{username,room});
const chatmsg= document.querySelector('#mybox');
socket.on('roomusers',message=>{
    document.getElementById('roomname').innerHTML=message[0].room+'<br>'+'NO-OF-USERS:'+message.length;
    

    document.querySelector('.roomuser').innerHTML='';
    let user=message.find(user => user.id === socket.id).id;
    console.log(user+'hi');
    
    for(i of message){
       let color='white';
     if(i.id==user){
         color='green';
     }
     const x =document.createElement('INPUT');
    x.setAttribute('type','text');
   
    x.value='  '+i.username[0];
    x.readOnly=true;
    x.style.borderRadius='50px';
    x.style.borderColor='grey';
    x.style.backgroundColor='grey';   
    x.style.width='30px';
    x.style.height='30px';
    x.style.fontSize='18px';
    x.style.marginRight='10px'

  
    const div=document.createElement('i');
    div.style.color=color;
    div.innerHTML=i.username+'<br>';
    document.querySelector('.roomuser').appendChild(x);


    document.querySelector('.roomuser').appendChild(div);}

})

socket.on('message',message=>{

    console.log(message);
   chatmessage(message,'blue');
   chatmsg.scrollTop=chatmsg.scrollHeight;

});
socket.on('message1',message=>{
    chatmessage(message,'green');
    chatmsg.scrollTop=chatmsg.scrollHeight-chatmsg.clientHeight;

})
const chatform=document.getElementById('chat');

chatform.addEventListener("submit",e =>

{
   
    e.preventDefault()
    const msg=e.target.elements.msg.value;
    socket.emit('chatMessage',msg)
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

    
});
function chatmessage(message,color){
    const div=document.createElement('b');
    div.style.color=color;
    div.style.textAlign=message.align;
    if(message.align=='right'){
        message.username='YOU';
    }

    div.innerHTML=`<p style='background-color:lightgrey;border-radius:10px;margin-left:15px;margin-right:25px;padding:5px;'>${message.username} 
    <br><b style='color:black;padding:10px;'>${message.text}&nbsp;</b><br><v style='font-size:10px;color:grey;'>${message.time}</v></p>`;
    document.querySelector('.chat-msg').appendChild(div);
  
  


}
