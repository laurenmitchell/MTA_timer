class Clock{
  constructor(widthPos, heightPos,size){
    this.x = widthPos;
    this.y = heightPos;
    //size depedent on arrial time
    this.size = width/size;
    this.r = random(100,255);
    this.g = random(40,80);
    this.b = random(200,255);
    this.pulseSpeed = 0.1;
    this.maxSize = random(100,150);


    //this.color = (random(100,255), random(40,80), random(200,255));
    //this.color = (255, 77, 243)
  }

  update(){

  }

  display(widthPos, heightPos){
    fill(this.r, this.g, this.b, 80);
    ellipse(width/this.x,height/this.y, this.size);
    //loadTimes();

  }
  loadTimes(data){
    fill('white');
    textAlign(CENTER);
    if(width/this.x < width/2){
      //text(data, this.x , this.y, this.x +50, this.y +100);
      textAlign(CENTER, CENTER);
      text(data, width/(this.x)-15, height/this.y + this.size/2 -28, 400, 100);

    }
    else{
      textAlign(CENTER, CENTER);
      text(data, width/(this.x)-15, height/(this.y) + this.size/2-28, 400, 100);

    }

    //text("Uptown F " + timeView(timeConvert(fTime[0])),this.x+70, this.y, this.x + 175, this.y + 100);
    //text("Uptown M " + timeView(timeConvert(mjzTime[0])), this.x, windowHeight/2, windowWidth/8 + 75, windowHeight/2+ 100);

  }

  countdown(data){
    push();
      if(mouseX >= width/this.x && mouseX <= width/this.x + this.size && mouseY > height/this.y){
          noStroke();
          fill(237,109,53);
          ellipseMode(CORNER);
          ellipse(width/this.x, height/this.y, this.size);
          textSize(30);
          fill('black');
          if(width/this.x <width/3){
            text("Arriving in \n"+ data, width/(this.x), height/this.y + this.size/2 -28, 300, 100);
          }
          else{
            text("Arriving in \n"+ data, width/(this.x ), height/(this.y) + this.size/2 -28, 300, 100);
          }
          //text("Uptown F " + timeConvert(fTime[0]), windowWidth/55, windowHeight/4, windowWidth/10 + 110, windowHeight/1.5 + 100);
        }
      pop();

    }

    flashing(trainTime){
      let temp_time = timeToDeparture(timeConvert(trainTime));
      let  array = temp_time.split(":");
      if(array[0] == 0 && array[1] <=30){
        this.size = this.maxSize * sin(frameCount *this.pulseSpeed)+this.maxSize+200;
      }
    }

}
