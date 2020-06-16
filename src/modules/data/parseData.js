function parseUserData(data){
    let user = {
        username: data.username,
        email: data.email,
        school: data.school,
        password: data.password1
    }
    return user;
}
//BRON: Stackoverflow.
function parseSql(data){
    let dataArr = [];
    for(let prop in data){
        if(Object.prototype.hasOwnProperty.call(data, prop)){
            dataArr.push(String(data[prop]));
        }
    }
    console.log(dataArr);
    return dataArr;
}

function duplicateData(data){
    let dataArr = [];
    for(let i =0; i < 2; i++){
        dataArr.push(data);
    }
    return dataArr;
}


module.exports.parseUserData = parseUserData;
module.exports.parseSql = parseSql;
module.exports.duplicateData = duplicateData;