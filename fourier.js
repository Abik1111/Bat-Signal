let time = 0;
let wave = [];
let x = 0;
let y = 0;
function setup() {
    createCanvas(1000, 1000);
    valuesX = [];
    valuesY = [];
    const skip=5;
    for (let i = 0; i < datapoints.length; i+=skip) {
        valuesX.push(datapoints[i].x);
        valuesY.push(datapoints[i].y);
        // angle=map(i,0,100,0,TWO_PI)
        // valuesX[i]=50*cos(angle)
        // valuesY[i]=50*sin(angle)
    }
    opX = dft(valuesX);
    opY = dft(valuesY);
    opX.sort((a,b)=>b.amp-a.amp)
    opY.sort((a,b)=>b.amp-a.amp)
}
function draw() {
    background(0);
    x = 0;
    y = 0;

    let vx=drawCircles(700,200,opX, 0);
    let vy=drawCircles(200,700,opY,HALF_PI);
    let v=createVector(vx.x,vy.y);

    wave.unshift(v);
    

    /*This was made to print the outline of the end point of the cirle there itself 
    instead of drawing the waveform*/
    // beginShape();
    // noFill();
    // for(let j=0;j<wavex.length;j++){
    //     vertex(wavex[j],wavey[j]);
    // }
    // endShape();


    // translate(400, 400);
    line(vx.x,vx.y,v.x,v.y);//for the x coordinates
    line(vy.x,vy.y,v.x,v.y);//for the y coordinates
    beginShape();
    // strokeWeight(7);
    fill(255);
    for (let i = 0; i < wave.length; i++) {
        vertex(wave[i].x, wave[i].y);
    }

    endShape();
    if (time > TWO_PI) {
        time=0;
        wave=[];
    }

    time += (2 * PI) / opX.length;


}
function drawCircles(x, y, op, rotation) {//op refers to a single frequency obtained from the fourier transform
    
    for (let iter = 0; iter < op.length; iter++) {
        stroke(255,100);
        noFill();
        let radius = op[iter].amp;
        let freq = op[iter].freq;
        let phase = op[iter].phase;
        ellipse(x, y, radius * 2);
        let x_prev = x;
        let y_prev = y;
        x = radius * cos(rotation + (time * freq + phase)) + x;
        y = radius * sin(rotation + (time * freq + phase)) + y;

        fill(255);
        // ellipse(x,y,8);
        line(x_prev, y_prev, x, y);
    }

    return createVector(x,y);

}