const moment=require('moment');
function usermessage(username,text,align){
    return {
        username,
        text,
        time:moment().format('hh:mm a'),
        align
    }}

module.exports=usermessage;