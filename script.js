const time = document.getElementById("Time");
const body = document.body
const background_num=4;
let layerOneActive=true;
var i=0;

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
    
    days=(Math.floor(distance/1000/60/60/24)%7)
    hours=String(Math.floor(distance/1000/60/60)%24).padStart(2, '0')
    minutes=String(Math.floor(distance/1000/60)%60).padStart(2, '0')
    seconds=String(Math.floor(distance/1000)%60).padStart(2, '0')

    if(days>5 || (days==5 && hours>= 17)){
        time.innerHTML="Session is in progress! Yayy!! <br> Next session: "+days + " Days, " + hours+ ":" + minutes + ":" + seconds 
    }
    else{
        time.innerHTML=days + " Days, " + hours+ ":" + minutes + ":" + seconds
    }
}

function shiftOpacity() {
  let progress = 0;
  
  let timer = setInterval(function() {
    progress += 0.005;
    
    if (layerOneActive) {
      body.style.setProperty('--bg-opacity', 1 - progress);
      body.style.setProperty('--bga-opacity', progress);  
    } else {
      body.style.setProperty('--bg-opacity', progress);
      body.style.setProperty('--bga-opacity', 1 - progress);
    }

    if (progress >= 1) {
      clearInterval(timer); 
      layerOneActive = !layerOneActive;
    }
  }, 5);
}

function shiftBackground(){
    i=(i+1)%background_num;
    nextbackground="background"+i;
    console.log(nextbackground);

    if(layerOneActive){
        body.style.setProperty("--bga-image", 'url('+nextbackground+'.png)')
    }
    else{
        body.style.setProperty("--bg-image", 'url('+nextbackground+'.png)')
    }

    shiftOpacity()
}

setInterval(timer, 1000);
setInterval(shiftBackground, 10000);