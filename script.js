/** ????? ??????? — ????? ?????? */
const CHANNEL_LINKS = {
  stories:   "#", // ????: "https://t.me/YourStoriesChannel"
  advice:    "#",
  entertain: "#",
  more:      "#",
};

function openChannel(id){
  const url = CHANNEL_LINKS[id] || "#";
  if(url === "#"){ alert("?????? — ???? ????? ?????? ???."); return; }
  window.open(url, "_blank");
}

/** ????? Canvas: ?????? + Particles */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d",{alpha:true});
let w=0,h=0, t=0;
const particles=[];
function resize(){
  w = canvas.width  = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize); resize();

/** ????? Particles */
const COUNT = Math.min(120, Math.floor((w*h)/22000));
for(let i=0;i<COUNT;i++){
  particles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*1.6+0.4,
    s: Math.random()*0.6+0.3, // ??????
    hue: 330 + Math.random()*40 // ??? ????????? ???????
  });
}

function drawBackground(){
  // ???? ????? ????
  const g = ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0, "#05060a");
  g.addColorStop(1, "#0a1016");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  // ?????? ????? ?????
  for(let i=0;i<3;i++){
    const cx = (Math.cos(t/900 + i)*0.5+0.5)*w;
    const cy = (Math.sin(t/1200 + i)*0.5+0.5)*h;
    const rad = Math.max(w,h)*0.35 + i*80;
    const rg = ctx.createRadialGradient(cx,cy,0,cx,cy,rad);
    rg.addColorStop(0, `rgba(255,111,145,0.06)`);
    rg.addColorStop(1, `rgba(255,111,145,0)`);
    ctx.fillStyle = rg;
    ctx.beginPath(); ctx.arc(cx,cy,rad,0,Math.PI*2); ctx.fill();
  }

  // Particles
  for(const p of particles){
    p.x += Math.cos(t/600 + p.y/240)*p.s;
    p.y += Math.sin(t/700 + p.x/320)*p.s;
    if(p.x<-10) p.x=w+10; if(p.x>w+10) p.x=-10;
    if(p.y<-10) p.y=h+10; if(p.y>h+10) p.y=-10;

    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, 0.7)`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
}

/** ????? ?????? (??????????) */
const follower = document.getElementById("birdFollower");
let mouseX = -100, mouseY = -100;
let fx = mouseX, fy = mouseY;

window.addEventListener("mousemove", (e)=>{
  mouseX = e.clientX;
  mouseY = e.clientY;
});
window.addEventListener("touchmove",(e)=>{
  if(e.touches && e.touches[0]){
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  }
},{passive:true});

function animateFollower(){
  // ???? ???? ???? ??????
  fx += (mouseX - fx)*0.12;
  fy += (mouseY - fy)*0.12;
  follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%,-50%)`;
}

/** Loop */
function loop(){
  t += 16;
  drawBackground();
  animateFollower();
  requestAnimationFrame(loop);
}
loop();

/** ????? ?? ???????? */
document.addEventListener("DOMContentLoaded", ()=>{
  const title = document.getElementById("preview-title");
  const desc  = document.getElementById("preview-desc");
  if(title) title.textContent = "??? ????????? ??????";
  if(desc)  desc.textContent  = "???? ??????? ??????? ??????? ??????? — ?????? ????? ???????.";
});
