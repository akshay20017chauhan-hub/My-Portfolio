window.addEventListener("load",()=>setTimeout(()=>document.body.classList.add("loaded"),500));

const header=document.getElementById("siteHeader");
const heroLogo=document.getElementById("heroLogo");
function updateScroll(){
  const y=window.scrollY;
  header.classList.toggle("scrolled",y>55);
  if(heroLogo){
    const progress=Math.min(y/520,1);
    heroLogo.style.transform=`translateY(${-18*progress}px) scale(${1-.56*progress})`;
    heroLogo.style.opacity=String(1-.12*progress);
  }
}
window.addEventListener("scroll",updateScroll,{passive:true});
updateScroll();

const reveals=[...document.querySelectorAll(".reveal")];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("in-view");
  });
},{threshold:.12,rootMargin:"0px 0px -45px 0px"});
reveals.forEach((el,i)=>{
  el.style.transitionDelay=(i%6)*.06+"s";
  observer.observe(el);
});

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav-link")];
const activeObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{threshold:.45});
sections.forEach(s=>activeObserver.observe(s));

document.querySelectorAll(".nav-link").forEach(link=>{
  link.addEventListener("click",()=>{
    const nav=document.getElementById("mainNav");
    if(nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const id=a.getAttribute("href");
    const target=id&&id!=="#" ? document.querySelector(id):null;
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth",block:"start"});
    }
  });
});

const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");
if(dot&&ring){
  window.addEventListener("mousemove",e=>{
    dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px";
    ring.animate({left:e.clientX+"px",top:e.clientY+"px"},{duration:220,fill:"forwards"});
  });
  document.querySelectorAll("a,button,.service-card,.project,.tools-cloud span").forEach(el=>{
    el.addEventListener("mouseenter",()=>ring.classList.add("hover"));
    el.addEventListener("mouseleave",()=>ring.classList.remove("hover"));
  });
}
