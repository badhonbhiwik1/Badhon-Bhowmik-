const ORIGINAL = {
  name:"Badhon Bhowmik",
  nationality:"Bangladeshi",
  email:"gdbadhonbhowmik@gmail.com",
  phone:"01749757216",
  blood:"A+ 🩸",
  university:"N/A",
  bio:"Turning ideas into experiences, and dreams into reality",
  motto:"Dream. Create. Inspire.",
  about:"My name is Badhon Bhowmik. I am 18 years old boy. I passed my SSC exam from Madhabdi Sati Prasanna Institution. Now, I am reading in HSC at Notre Dame College, Dhaka.",
  facebook:"https://www.facebook.com/share/1QQwdDyytH/",
  whatsapp:"https://wa.me/8801749757216",
  linkedin:"https://www.linkedin.com/in/badhon-bhowmik-21247743",
  youtube:"https://youtube.com/@premikpurush__430",
  tiktok:"https://www.tiktok.com/@shikha.bhowmik"
};

let profile = {...ORIGINAL};

function loadProfile(){
  try{
    const saved = localStorage.getItem("badhonPortfolioProfile");
    if(saved) profile = {...ORIGINAL, ...JSON.parse(saved)};
  }catch(e){ profile = {...ORIGINAL}; }
  renderProfile();
}

function renderProfile(){
  document.getElementById("displayName").textContent=profile.name;
  document.getElementById("photoName").textContent=profile.name.toUpperCase();
  document.getElementById("displayBio").textContent=profile.bio;
  document.getElementById("displayMotto").textContent=profile.motto;
  document.getElementById("aboutText").textContent=profile.about;
  document.getElementById("nationality").textContent=profile.nationality;
  document.getElementById("bloodGroup").textContent=profile.blood;
  setLink("emailLink","mailto:"+profile.email,profile.email);
  setLink("phoneLink","tel:"+profile.phone.replace(/\s/g,""),profile.phone);
  document.getElementById("universityText").textContent=profile.university;
  setHref("facebookLink",profile.facebook);
  setHref("whatsappLink",profile.whatsapp);
  setHref("linkedinLink",profile.linkedin);
  setHref("youtubeLink",profile.youtube);
  setHref("tiktokLink",profile.tiktok);
}

function setLink(id,href,text){
  const el=document.getElementById(id);
  el.href=href;
  el.textContent=text
}

function setHref(id,href){
  document.getElementById(id).href=href
}

function openEditor(){
  const m=document.getElementById("editorModal");
  m.classList.add("open");
  m.setAttribute("aria-hidden","false");

  const fields={
    editName:"name",
    editNationality:"nationality",
    editBio:"bio",
    editMotto:"motto",
    editAbout:"about",
    editBlood:"blood",
    editUniversity:"university",
    editEmail:"email",
    editPhone:"phone",
    editFacebook:"facebook",
    editWhatsapp:"whatsapp",
    editLinkedin:"linkedin",
    editYoutube:"youtube",
    editTiktok:"tiktok"
  };

  Object.entries(fields).forEach(([id,key])=>
    document.getElementById(id).value=profile[key]||""
  );

  document.body.style.overflow="hidden"
}

function closeEditor(){
  document.getElementById("editorModal").classList.remove("open");
  document.body.style.overflow=""
}

function saveProfile(e){
  e.preventDefault();

  const fields={
    editName:"name",
    editNationality:"nationality",
    editBio:"bio",
    editMotto:"motto",
    editAbout:"about",
    editBlood:"blood",
    editUniversity:"university",
    editEmail:"email",
    editPhone:"phone",
    editFacebook:"facebook",
    editWhatsapp:"whatsapp",
    editLinkedin:"linkedin",
    editYoutube:"youtube",
    editTiktok:"tiktok"
  };

  Object.entries(fields).forEach(([id,key])=>
    profile[key]=document.getElementById(id).value.trim()
  );

  localStorage.setItem(
    "badhonPortfolioProfile",
    JSON.stringify(profile)
  );

  renderProfile();
  closeEditor();
  toast("Information saved on this device ✓");
}

function resetProfile(){
  profile={...ORIGINAL};
  localStorage.removeItem("badhonPortfolioProfile");
  renderProfile();
  openEditor();
  toast("Original information restored");
}

function clearSavedData(){
  localStorage.removeItem("badhonPortfolioProfile");
  profile={...ORIGINAL};
  renderProfile();
  closeEditor();
  toast("Saved changes cleared");
}

function toast(message){
  const t=document.createElement("div");
  t.textContent=message;

  t.style.cssText=
    "position:fixed;right:18px;bottom:18px;z-index:100;padding:12px 16px;border:1px solid rgba(255,255,255,.15);border-radius:13px;background:rgba(15,12,30,.94);color:#fff;box-shadow:0 12px 35px rgba(0,0,0,.35);font-size:13px";

  document.body.appendChild(t);
  setTimeout(()=>t.remove(),2400);
}

const wallKey="badhonWallMessages";

function loadWall(){
  const saved=JSON.parse(
    localStorage.getItem(wallKey)||"[]"
  );

  const list=document.getElementById("wallList");
  list.innerHTML="";

  const messages=saved.length
    ?saved
    :[{text:"Awesome design and site!",date:"Welcome"}];

  messages.slice(0,20).forEach(
    m=>addWallItem(m.text,m.date,false)
  );
}

function addWallItem(text,date,save=true){
  const li=document.createElement("li");

  const span=document.createElement("span");
  span.textContent='"'+text+'"';

  const small=document.createElement("small");
  small.textContent="- Visitor";

  li.append(span,small);

  document.getElementById("wallList").prepend(li);

  if(save){
    const arr=JSON.parse(
      localStorage.getItem(wallKey)||"[]"
    );

    arr.unshift({
      text,
      date:new Date().toLocaleDateString()
    });

    localStorage.setItem(
      wallKey,
      JSON.stringify(arr.slice(0,20))
    );
  }
}

function addMessage(){
  const input=document.getElementById("wallInput");

  if(input.value.trim()){
    addWallItem(
      input.value.trim(),
      new Date().toLocaleDateString()
    );

    input.value="";
  }
}

let challengeDay=Number(
  localStorage.getItem("badhonChallengeDay")||1
);

function markChallenge(){
  challengeDay++;

  localStorage.setItem(
    "badhonChallengeDay",
    challengeDay
  );

  document.getElementById("challengeDay").textContent=
    challengeDay;

  toast("Challenge updated ✓")
}

function saveGoals(){
  document.querySelectorAll("[data-goal]").forEach(c=>
    localStorage.setItem(
      "goal_"+c.dataset.goal,
      c.checked
    )
  );
}

function loadGoals(){
  document.querySelectorAll("[data-goal]").forEach(c=>{
    c.checked=
      localStorage.getItem("goal_"+c.dataset.goal)==="true";

    c.addEventListener("change",saveGoals)
  });

  document.getElementById("challengeDay").textContent=
    challengeDay;
}

function switchGame(gameName){
  const games=[
    "cricket",
    "penalty",
    "snake",
    "carrace",
    "pong"
  ];

  games.forEach(g=>
    document.getElementById("game-"+g).style.display=
      g===gameName?"block":"none"
  );

  document.querySelectorAll(".game-tab-btn").forEach((b,i)=>
    b.classList.toggle(
      "active",
      games[i]===gameName
    )
  );
}

/* Cricket */

let cricketBallY=20,
    cricketScore=0,
    cricketWickets=0,
    cricketAnim,
    ballBowled=false;

function drawCricket(){
  const c=document.getElementById("cricketCanvas");
  const x=c.getContext("2d");

  x.clearRect(0,0,c.width,c.height);

  x.fillStyle="#4c2b18";
  x.fillRect(110,0,80,200);

  x.fillStyle="#fff";
  [135,147,159].forEach(v=>
    x.fillRect(v,170,6,25)
  );

  x.fillStyle="#ff4c78";
  x.beginPath();
  x.arc(150,cricketBallY,8,0,Math.PI*2);
  x.fill();
}

function startCricket(){
  if(cricketWickets>=3){
    cricketWickets=0;
    cricketScore=0;

    document.getElementById("cricketWickets").textContent=0;
    document.getElementById("cricketScore").textContent=0;
  }

  cricketBallY=20;
  ballBowled=true;

  cancelAnimationFrame(cricketAnim);

  function move(){
    if(!ballBowled)return;

    cricketBallY+=3;
    drawCricket();

    if(cricketBallY>=170){
      ballBowled=false;
      cricketWickets++;

      document.getElementById("cricketWickets").textContent=
        cricketWickets;

      alert("OUT! Hit the wickets ❌");

      if(cricketWickets>=3)
        alert(
          "Game Over! Total Runs: "+
          cricketScore
        );
    }
    else{
      cricketAnim=requestAnimationFrame(move)
    }
  }

  move();
}

function hitCricketBat(){
  if(!ballBowled)return;

  ballBowled=false;
  cancelAnimationFrame(cricketAnim);

  if(cricketBallY>=120&&cricketBallY<=165){
    const runs=[1,2,4,6][
      Math.floor(Math.random()*4)
    ];

    cricketScore+=runs;

    document.getElementById("cricketScore").textContent=
      cricketScore;

    alert(
      "Great Shot! You scored "+
      runs+
      " runs! 🎉"
    );
  }
  else{
    cricketWickets++;

    document.getElementById("cricketWickets").textContent=
      cricketWickets;

    alert("Missed! Out ❌");

    if(cricketWickets>=3)
      alert(
        "Game Over! Total Runs: "+
        cricketScore
      );
  }

  cricketBallY=20;
  drawCricket();
}

/* Penalty */

let penaltyScore=0;

function drawPenalty(
  keeperPos="center",
  ballPos="center"
){
  const c=document.getElementById("penaltyCanvas");
  const x=c.getContext("2d");

  x.clearRect(0,0,c.width,c.height);

  x.strokeStyle="#fff";
  x.lineWidth=4;

  x.strokeRect(
    50,
    20,
    200,
    80
  );

  let keeperX=135;

  if(keeperPos==="left")
    keeperX=70;

  if(keeperPos==="right")
    keeperX=200;

  x.fillStyle="#9b5cff";
  x.fillRect(
    keeperX,
    40,
    30,
    50
  );

  let bx=140,
      by=160;

  if(ballPos==="left"){
    bx=80;
    by=50
  }

  if(ballPos==="right"){
    bx=210;
    by=50
  }

  if(ballPos==="center"){
    bx=140;
    by=50
  }

  x.fillStyle="#fff";
  x.beginPath();
  x.arc(
    bx,
    by,
    10,
    0,
    Math.PI*2
  );
  x.fill();
}

function shootPenalty(dir){
  const dirs=[
    "left",
    "center",
    "right"
  ];

  const keeper=
    dirs[Math.floor(Math.random()*3)];

  drawPenalty(
    keeper,
    dir
  );

  setTimeout(()=>{
    if(dir!==keeper){
      penaltyScore++;

      document.getElementById(
        "penaltyScore"
      ).textContent=penaltyScore;

      alert("GOAL! 🎉");
    }
    else{
      alert("SAVED! ❌");
    }

    drawPenalty();
  },250)
}

/* Snake */

let snakeCanvas=
      document.getElementById("snakeCanvas"),

    snakeCtx=
      snakeCanvas.getContext("2d"),

    snake=[
      {x:100,y:100}
    ],

    food={
      x:200,
      y:100
    },

    dx=10,
    dy=0,

    snakeScore=0,

    snakeGameInterval;

document.addEventListener(
  "keydown",
  e=>{
    if(
      e.key==="ArrowUp" &&
      dy===0
    ){
      dx=0;
      dy=-10
    }

    if(
      e.key==="ArrowDown" &&
      dy===0
    ){
      dx=0;
      dy=10
    }

    if(
      e.key==="ArrowLeft" &&
      dx===0
    ){
      dx=-10;
      dy=0
    }

    if(
      e.key==="ArrowRight" &&
      dx===0
    ){
      dx=10;
      dy=0
    }
  }
);

function changeSnakeDir(dir){
  if(
    dir==="UP" &&
    dy===0
  ){
    dx=0;
    dy=-10
  }

  if(
    dir==="DOWN" &&
    dy===0
  ){
    dx=0;
    dy=10
  }

  if(
    dir==="LEFT" &&
    dx===0
  ){
    dx=-10;
    dy=0
  }

  if(
    dir==="RIGHT" &&
    dx===0
  ){
    dx=10;
    dy=0
  }
}

function startSnake(){
  snake=[
    {x:100,y:100}
  ];

  dx=10;
  dy=0;
  snakeScore=0;

  document.getElementById(
    "snakeScore"
  ).textContent=0;

  food={
    x:200,
    y:100
  };

  clearInterval(
    snakeGameInterval
  );

  snakeGameInterval=
    setInterval(
      updateSnake,
      100
    );

  drawSnake();
}

function drawSnake(){
  snakeCtx.clearRect(
    0,
    0,
    300,
    200
  );

  snakeCtx.fillStyle="#ff4c78";

  snakeCtx.fillRect(
    food.x,
    food.y,
    10,
    10
  );

  snakeCtx.fillStyle="#55f7b0";

  snake.forEach(p=>
    snakeCtx.fillRect(
      p.x,
      p.y,
      10,
      10
    )
  );
}

function updateSnake(){
  const head={
    x:snake[0].x+dx,
    y:snake[0].y+dy
  };

  if(
    head.x<0 ||
    head.x>=300 ||
    head.y<0 ||
    head.y>=200
  ){
    clearInterval(
      snakeGameInterval
    );

    alert(
      "Hit boundary! Game Over ❌ Score: "+
      snakeScore
    );

    return;
  }

  snake.unshift(head);

  if(
    head.x===food.x &&
    head.y===food.y
  ){
    snakeScore+=10;

    document.getElementById(
      "snakeScore"
    ).textContent=snakeScore;

    food={
      x:Math.floor(Math.random()*29)*10,
      y:Math.floor(Math.random()*19)*10
    };
  }
  else{
    snake.pop();
  }

  drawSnake();
}

/* Car Race */

let carCanvas=
      document.getElementById("carCanvas"),

    carCtx=
      carCanvas.getContext("2d"),

    playerCarX=130,

    carScore=0,

    carGameInterval,

    obstacleY=-50,

    obstacleX=100;

function startCarRace(){
  playerCarX=130;
  carScore=0;
  obstacleY=-50;
  obstacleX=100;

  document.getElementById(
    "carScore"
  ).textContent=0;

  clearInterval(
    carGameInterval
  );

  carGameInterval=
    setInterval(
      updateCarRace,
      50
    );
}

function moveCar(dir){
  if(dir==="LEFT")
    playerCarX-=20;

  if(dir==="RIGHT")
    playerCarX+=20;
}

function updateCarRace(){
  obstacleY+=8;

  if(obstacleY>220){
    obstacleY=-50;

    obstacleX=
      50+
      Math.random()*160;

    carScore+=10;

    document.getElementById(
      "carScore"
    ).textContent=carScore;
  }

  if(
    playerCarX<40 ||
    playerCarX>230
  ){
    clearInterval(
      carGameInterval
    );

    alert(
      "Crashed! Game Over ❌ Score: "+
      carScore
    );

    return;
  }

  if(
    obstacleY>135 &&
    obstacleY<205 &&
    Math.abs(
      playerCarX-obstacleX
    )<28
  ){
    clearInterval(
      carGameInterval
    );

    alert(
      "You hit an obstacle! ❌ Score: "+
      carScore
    );

    return;
  }

  carCtx.clearRect(
    0,
    0,
    300,
    220
  );

  carCtx.fillStyle="#29273b";

  carCtx.fillRect(
    40,
    0,
    220,
    220
  );

  carCtx.fillStyle="#ff4c78";

  carCtx.fillRect(
    30,
    0,
    10,
    220
  );

  carCtx.fillRect(
    260,
    0,
    10,
    220
  );

  carCtx.fillStyle="#3be8ff";

  carCtx.fillRect(
    playerCarX,
    160,
    30,
    45
  );

  carCtx.fillStyle="#ffd54a";

  carCtx.fillRect(
    obstacleX,
    obstacleY,
    30,
    45
  );
}

/* Ping Pong */

let pongCanvas=
      document.getElementById("pongCanvas"),

    pongCtx=
      pongCanvas.getContext("2d"),

    paddleX=110,

    ballX=150,

    ballY=100,

    ballSpeedX=3,

    ballSpeedY=-3,

    pongScore=0,

    pongInterval;

function startPong(){
  paddleX=110;
  ballX=150;
  ballY=100;
  ballSpeedX=3;
  ballSpeedY=-3;
  pongScore=0;

  document.getElementById(
    "pongScore"
  ).textContent=0;

  clearInterval(
    pongInterval
  );

  pongInterval=
    setInterval(
      updatePong,
      30
    );
}

function movePong(dir){
  if(
    dir==="LEFT" &&
    paddleX>0
  )
    paddleX-=25;

  if(
    dir==="RIGHT" &&
    paddleX<220
  )
    paddleX+=25;
}

function updatePong(){
  ballX+=ballSpeedX;
  ballY+=ballSpeedY;

  if(
    ballX<=0 ||
    ballX>=290
  )
    ballSpeedX=-ballSpeedX;

  if(ballY<=0)
    ballSpeedY=-ballSpeedY;

  if(
    ballY>=170 &&
    ballX>=paddleX &&
    ballX<=paddleX+80
  ){
    ballSpeedY=-ballSpeedY;
    pongScore+=5;

    document.getElementById(
      "pongScore"
    ).textContent=pongScore;
  }

  if(ballY>200){
    clearInterval(
      pongInterval
    );

    alert(
      "Missed the ball! Game Over ❌ Score: "+
      pongScore
    );

    return;
  }

  pongCtx.clearRect(
    0,
    0,
    300,
    200
  );

  pongCtx.fillStyle="#3be8ff";

  pongCtx.beginPath();

  pongCtx.arc(
    ballX,
    ballY,
    8,
    0,
    Math.PI*2
  );

  pongCtx.fill();

  pongCtx.fillStyle="#55f7b0";

  pongCtx.fillRect(
    paddleX,
    180,
    80,
    10
  );
}

/* Initialisation */

document.getElementById(
  "year"
).textContent=
  new Date().getFullYear();

loadProfile();
loadWall();
loadGoals();
drawCricket();
drawPenalty();
drawSnake();
