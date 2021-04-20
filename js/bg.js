const body = document.querySelector("body");

const IMG_NUM = 5


function paintImage(imgNumber){
  const image = new Image();
  image.src = `img/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage")
  body.appendChild(image);
}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUM);
  return number;
}

function init(){
  const randomNum = genRandom();
  paintImage(randomNum);
}
init();
setInterval(init,5000);
