const time = document.getElementById("Time");
const background_image=document.getElementById("background_layer")
const background_num=4;
let layerOneActive=true;
var i=0;

function getNextFriday(date) {
  var result = new Date(date);
  
  const daysUntilFriday = (5 - result.getDay() + 7) % 7 || 7;
  
  result.setDate(result.getDate() + daysUntilFriday);
  result.setHours(17)
  result.setMinutes(0)
  result.setSeconds(0)
  return result;
}

function getCompetDeadline(date=new Date){
  var result = new Date(date);
  
  const daysUntilFriday = (6 - result.getDay()) % 7 || 7;
  
  result.setDate(result.getDate() + daysUntilFriday);
  result.setHours(15)
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

function compatTimer(){
  const currentDate = new Date().getTime()
  ns=getCompetDeadline(currentDate)
  distance=ns-currentDate

  timestr=""

  days=(Math.floor(distance/1000/60/60/24)%7)
  hours=String(Math.floor(distance/1000/60/60)%24).padStart(2, '0')
  if(days>1 || (days==0 && hours>22))
    timestr="Jelenleg nem aktív az esemény!"
  else{
    minutes=String(Math.floor(distance/1000/60)%60).padStart(2, '0')
    seconds=String(Math.floor(distance/1000)%60).padStart(2, '0')
    timestr=timestr+hours+":"+minutes+":"+seconds+" left until judgement."
  }
  
  document.getElementById("event_cd").innerHTML=timestr
}


function shiftBackground() {
    i = (i + 1) % background_num;
    const nextbackground = "background" + i + ".png";

    const fadeLayer = background_image.cloneNode();
    fadeLayer.id = "";
    fadeLayer.className = "bg-crossfade"; 
    fadeLayer.style.backgroundImage = 'url(' + nextbackground + ')';
    
    background_image.parentNode.insertBefore(fadeLayer, background_image.nextSibling);

    void fadeLayer.offsetWidth;
    
    fadeLayer.style.opacity = 1;

    setTimeout(() => {
        background_image.style.backgroundImage = 'url(' + nextbackground + ')';
        fadeLayer.remove();
    }, 1000); 
}

function openNav() {
  document.getElementById("mySidepanel").style.width = "60%";
  document.getElementById("openbtn").setAttribute("hidden", "hidden");
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
  document.getElementById("openbtn").removeAttribute("hidden");
}


setInterval(timer, 1000);
setInterval(shiftBackground, 10000);
setInterval(compatTimer, 1000)