const bcrypt = require('bcrypt');

async function createUser(userObj){
    try{
        const hashedPassword = await bcrypt.hash(userObj.password);
        userObj.password = hashedPassword;

        console.log (userObj);
        return 201;
    } catch {
        return 500;
    }
}

async function loginUser(userObj){
    //Eerst users ophalen in db
    if(user == null){
        return "Can not find user";
    }
    try{
        if(await bcrypt.compare(userObj.password, user.password)){
            return {user: user, status: 200};
        } else {
            return {status: 400};
        }
    } catch{
        return {status: 500};
    }
}

async function deleteUser(userObj){

}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;