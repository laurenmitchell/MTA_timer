let socket = io();

let mtaData;
let nextTrain;
let nextTrainTime;
let fTime = [];
let mjzTime = [];
let fInfo = [];
let mjzInfo = [];
let mTrainInfo = [];
let index = 0;
let clock1;
let clock2;
let clock3;
let clock4;
let delanceyEssex = 625;
let mtaImg;

function preload() {
  mtaImg = loadImage('MTA.png');
}
function setup(){
  colorMode(RGB, 255, 255, 255, 1);
  //  colorMode(HSB, 360, 100, 100, 100);
    createCanvas(windowWidth, windowHeight);
    //rectMode(CORNER);
    socket.emit('requestData', delanceyEssex);
    socket.on('data', getData);
    frameRate(1);
    //var button = createButton("Click for train times");
    //button.mousePressed(loadTimes);
    clock1 = new Clock(15,8,4);
    clock2 = new Clock(1.6, 8,4);
    clock3 = new Clock(10, 1.5, 6);
    clock4 = new Clock(1.5, 1.5, 6)
}

function windowResized(){
 resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(50);
  image(mtaImg,windowWidth/3,windowHeight/3,400,400);
  //console.log(timeConvert(fTime[0]));
//  console.log(type timeConvert(fTime[0]));
  timeToDeparture(timeConvert(fTime[0]));

  ellipseMode(CORNER);
  //ellipse(windowWidth/50, windowHeight/2.2,windowWidth/3);
  curr_time();
  textSize(35);
  clock1.display();
  clock1.loadTimes("Uptown F arrives at \n" + timeView(timeConvert(fTime[0])));
  clock1.countdown(timeToDeparture(timeConvert(fTime[0])));
  clock1.flashing(fTime[0]);
  clock2.display();
  clock2.loadTimes("Uptown M arrives at \n" +timeView(timeConvert(mjzTime[0])));
  clock2.countdown(timeToDeparture(timeConvert(mjzTime[0])));
  clock2.flashing(mjzTime[0]);
  clock3.display();
  textSize(22);
  clock3.loadTimes("A future F \n arrives at \n" +timeView(timeConvert(fTime[1])));
  clock3.countdown(timeToDeparture(timeConvert(fTime[1])));
  clock4.display();
  clock4.loadTimes("A future M \n arrives at \n" +timeView(timeConvert(mjzTime[1])));
  clock4.countdown(timeToDeparture(timeConvert(mjzTime[1])));
  //console.log(typeof timeToDeparture(timeConvert(fTime[0])));

  // let time = timeToDeparture(timeConvert(fTime[0]));
  // let  array = time.split(":");
  // if(array[0] == 6 && array[1] <=30){
  //   clock1.update();
  // }
  //console.log(array);
  //let seconds = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60) + parseInt(array[2], 10)
  //console.log(seconds);
  // if(timeToDeparture(timeConvert(fTime[0])) <= "02:30"){
  //   console.log("time less than 30 seconds");
  // }

  // if(timeToDeparture(timeToDeparture(timeConvert(fTime[0]))) < ){
  //
  // }

  if(frameCount %30 ===0){
    socket.emit('requestData', delanceyEssex);
  }

}



function getData(data){
  //  console.log(data);
    mtaData = data;
    fTime = [];
    mjzTime = [];
    //nextTrain = data.lines[0].departures.S[0];
    nextTrainTime = new Date(nextTrain*1000);
    //saving north bound F trains
    let fTrainN = mtaData.lines[1].departures.N;
    for(i = 0; i<5; i++){
      fTime.push(fTrainN[i]);
    }

    for(i = 0; i<5; i++){
      let time = fTime[0].time;
      fInfo.push(time);
    }

    // //saving north bound m and j trains
    let mjzTrainN = mtaData.lines[0].departures.N;

    //go through mjz train data and just save mtrain info
    for(i = 0; i<10; i++){
      if(mtaData.lines[0].departures.N[i].routeId == "M"){
        let mTrainN = mtaData.lines[0].departures.N[i];
        mTrainInfo.push(mTrainN);
      }
    }
    //loop through north bound MJ trains and add the next 10 to array
    for(i = 0; i< 5; i++){
      mjzTime.push(mTrainInfo[i]);
    }

    // for(i = 0; i<5; i++){
    //   let time = mjzTime[0].time;
    //   mjzInfo.push(time);
    //
    // }
    //console.log(nextTrainTime);
    let currentTime = new Date();
}

//convert the time from the formatting provided by MTA military time
function timeConvert(nextTrain){
  let nexttime = new Date(nextTrain.time * 1000);
  //get hours and minutes
  let hours = nexttime.getHours();
  let min  = nexttime.getMinutes();
  //console.log(nexttime);
//  return "train arrives at " + hours + ":"+min+".";
  return nexttime;
}
//returns a viewable time
function timeView(time){
  //get hours and minutes
  let nexttime = new Date(time);
  let hours = nexttime.getHours();
  let min  = nexttime.getMinutes();
  //console.log(nexttime);
  return hours + ":"+min+".";
}

function timeToDeparture(nextTrain){
  let currtime = new Date();
  let current_min = currtime.getMinutes();
  let current_hours = currtime.getHours();

  let nextTime = new Date(nextTrain);
  //let trainTime = nextTime.getTime();
  let next_min = nextTime.getMinutes();
  let next_hours = nextTime.getHours();

  let diff = (nextTime - currtime);
  diff = secondsToTime(diff);
  return diff;
}
function secondsToTime(millis){
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}
//parts taken from https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript/9763479

function curr_time()
{
  fill("pink");
  //textFont(clockFont);
  textAlign(CENTER, CENTER);
  textSize(width/15);
  let Hour = hour();
  let min = minute();
  let secs = second()
  let noon = Hour >= 12? " PM" : " AM"
  if(min < 10)
    min = "0"+min
  Hour%=12
  text(Hour+":"+min+":"+secs+noon, width/2, height/8);
  return Hour+":"+min+":"+secs+noon;

}
//refresh on a button

//new Data() = give unix number * 1000
