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

export const getDate =(dateValue, edit=false)=>{
    console.log(dateValue)
    let d = new Date(dateValue);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hour = d.getUTCHours();
    let minute = d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (minute < 10)
        minute = '0' +minute;
    if (hour < 10)
        hour = '0' + hour;  
    if(edit){
        return {
            "date":[year, month, day,].join('-'),
            "time":[hour, minute].join(':')
        }
    }
    return {
      "date":[day, month, year].join('-'),
      "time":[hour, minute].join(':')
    }
  }

const purposes = [
"Initial visit",
"Return visit",
"Manipulations",
"Surgery",
"Tests",
"Ultrasound",
"Vaccination"
];

export const sortedPurposes = purposes.sort();

export const getDataList = (id)=>{
    return(
        <datalist id={id}>
            {sortedPurposes.map((sortedPurpose)=>{
                return(
                    <option value={sortedPurpose}></option>
                )
            })}
        </datalist>
    )
}

export const serverUrl = "https://vetclinic-app-backend-06de29dba66a.herokuapp.com"
/*export const serverUrl = "http://localhost:5000"*/