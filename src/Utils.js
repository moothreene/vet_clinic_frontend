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

export const getDate =(dateValue)=>{
    let d = new Date(dateValue);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return {
      "date":[day, month, year].join('-'),
      "time":[hour, minute].join(':')
    }
  }

export const serverUrl = "https://vetclinic-app-backend-06de29dba66a.herokuapp.com/"