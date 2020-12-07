let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');


let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentPlaying = true;

const isBot = (door) => {
  if(door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
}

const playdoor = (door) => {
  // 这个function起作用是因为numClosedDoors是个global variable
  numClosedDoors--; 
  if (numClosedDoors === 0) {
    gameOver('win');
  }else if (isBot(door)) {
    gameOver('lose');
  }
}

const randomChoreDoorGenerator = () =>{
    const choreDoor = Math.floor(Math.random()*numClosedDoors);
    if(choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
      } else if (choreDoor === 1) { 
        openDoor2 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor3 = spaceDoorPath;
      } else {
        //   注意else使用的方式
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
      }
}


// 注意这里是door1不是doorImage1 
door1.onclick = () =>{
    if(currentPlaying && !isClicked(doorImage1)){
      doorImage1.src = openDoor1;
      playdoor(door1);
    }  
}

door2.onclick = () =>{
    if(currentPlaying && !isClicked(doorImage2)){
    doorImage2.src = openDoor2;
    playdoor(door2);
    }
}

door3.onclick = () =>{
    if(currentPlaying && !isClicked(doorImage3)){
    doorImage3.src = openDoor3;
    playdoor(door3);
    }
}

startButton.onclick = () =>{
  if(!currentlyPlaying) {
    startRound();
  }
  
}

const startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  currentPlaying = true;
  startButton.innerHTML = 'Good Luck';
  randomChoreDoorGenerator();
}

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
  } else {
    startButton.innerHTML = 'Game over! Play again?'
  }
  currentPlaying = false;
  // 这个不设置即使显示game over,还是可以把三扇门都打开后显示you win
}

// 在此处需要call，则开始设置初始化条件
startRound();