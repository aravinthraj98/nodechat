users=[];
function userjoin(username,room,id){
    const user={
        username,
        room,
        id
    }
    users.push(user);
    return user;

}
function getcurrentuser(id){
    return users.find(user => user.id === id)
}
function leftuser(id){
    const index=users.findIndex(user => user.id===id);
    if(index !==-1){
       return  users.splice(index,1);
    }


}
function roomuser(room){
 return users.filter(user=>user.room===room)

}
module.exports={
    userjoin,
    getcurrentuser,
    leftuser,
    roomuser
};