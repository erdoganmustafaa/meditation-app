

const song = document.querySelector(".song");
const video = document.querySelector(".vid-container video");
const play = document.querySelector(".play");

const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();

const remainingTimeText = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const changeSoundButtons = document.querySelectorAll(".sound-picker button");

let totalTime = 60;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

function setTimeButtons(){
    timeButtons.forEach(option=>{
        option.addEventListener("click",function(){
            totalTime=this.getAttribute("data-time");
            remainingTimeText=`${Math.floor(totalTime/60)}:${Math.floor(totalTime%60)}`;
            
        })
    });
}

function setSoundAndVideo(){
    changeSoundButtons.forEach(sound=>{
        sound.addEventListener("click",function(){
            song.src=this.getAttribute("data-sound");
            video.src=this.getAttribute("data-video");
            playControl(song);
        })
    })
}

const playControl = (x)=>{
    if(song.paused){
        song.play();
        video.play();
        play.src="./svg/pause.svg";
    }
    else{
        song.pause();
        video.pause();
        play.src="./svg/play.svg";
    }
}
play.addEventListener("click",()=>{
    playControl(song);
   
})
song.ontimeupdate=()=>{
    let currentTime = song.currentTime;
    console.log(currentTime);
    let remainingTime = totalTime - currentTime;

    let remainingSecond = Math.floor(remainingTime%60);
    let remainingMinute = Math.floor(remainingTime/60);

    let circleLoopProcess = outlineLength-(currentTime/totalTime)*outlineLength;
    outline.style.strokeDashoffset=circleLoopProcess;
    remainingTimeText.textContent = `${remainingMinute}:${remainingSecond}`;

    if(currentTime>=totalTime){
        song.pause();
        video.pause();
        song.currentTime=0;
        play.src="./svg/play.svg";
    }

}


