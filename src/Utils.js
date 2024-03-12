export const getAge = (birthDate)=>{
    const today = new Date();
    const birthDayDate = new Date(birthDate);
    let age = today.getFullYear() - birthDayDate.getFullYear();
    const monthDiff = today.getMonth() - birthDayDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDayDate.getDate())) {
        age--;
    }
    let result = "";
    if(age > 0){
        result += (age+" y.")
    }
    if(monthDiff<0){
        result+= ((result?" ":"")+(12+monthDiff) + " m.")
    }else if(monthDiff>0){
        result += ((result?" ":"")+monthDiff + " m. ")
    }
    return result;
}