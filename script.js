const time = document.getElementById("Time")

function getNextFriday(date = new Date()) {
  var result = new Date(date);
  
  const daysUntilFriday = (5 - result.getDay() + 7) % 7 || 7;
  
  result.setDate(result.getDate() + daysUntilFriday);
  result.setHours(17)
  result.setMinutes(0)
  result.setSeconds(0)
  return result;
}

function timer () {
    const currentDate = new Date().getTime()
    nf=getNextFriday(currentDate)
    distance=nf-currentDate
    
    days=Math.floor(distance/1000/60/60/24)
    hours=Math.floor(distance/1000/60/60)%24
    minutes=Math.floor(distance/1000/60)%60
    seconds=Math.floor(distance/1000)%60

    if(days>5 || (days==5 && hours>= 17)){
        time.innerHTML="Session is in progress! Yayy!! <br> Next session: "+days + " Days, " + hours+ ":" + minutes + ":" + seconds 
    }
    else{
        time.innerHTML=days + " Days, " + hours+ ":" + minutes + ":" + seconds
    }
}

setInterval(timer, 1000)