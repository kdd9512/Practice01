const body = document.querySelector("body");

const IMG_NUM = 5

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `img/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function replaceChild() {
  body.removeChild(body.querySelector("img"));
  const num = genRandom();
  const img = new Image();
  img.src = `img/${num + 1}.jpg`;
  img.classList.add("bgImage");
  body.appendChild(img);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUM);
  return number;
}

function init() {
  const randomNum = genRandom();
  paintImage(randomNum);
}

init();
if (body.querySelector("img") !== null) {
  setInterval(replaceChild, 5000);
}
