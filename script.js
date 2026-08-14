const root=document.documentElement;
const picker=document.querySelector("[data-theme-picker]");
const trigger=picker?.querySelector(".theme-trigger");
const label=picker?.querySelector(".theme-label");
const buttons=picker?.querySelectorAll("[data-theme-value]")||[];
const media=window.matchMedia("(prefers-color-scheme: dark)");
function resolved(choice){return choice==="system"?(media.matches?"dark":"light"):choice}
function apply(choice,persist=true){const safe=["system","light","dark"].includes(choice)?choice:"system";root.dataset.theme=safe;root.dataset.resolvedTheme=resolved(safe);if(label)label.textContent=safe==="system"?"System":safe[0].toUpperCase()+safe.slice(1);buttons.forEach(b=>b.classList.toggle("active",b.dataset.themeValue===safe));if(persist)localStorage.setItem("portfolio-theme",safe)}
apply(localStorage.getItem("portfolio-theme")||"system",false);
media.addEventListener?.("change",()=>{if((root.dataset.theme||"system")==="system")apply("system",false)});
trigger?.addEventListener("click",()=>{const open=picker.classList.toggle("open");trigger.setAttribute("aria-expanded",String(open))});
buttons.forEach(b=>b.addEventListener("click",()=>{apply(b.dataset.themeValue);picker.classList.remove("open");trigger?.setAttribute("aria-expanded","false")}));
document.addEventListener("click",e=>{if(picker&&!picker.contains(e.target)){picker.classList.remove("open");trigger?.setAttribute("aria-expanded","false")}});

const navToggle=document.querySelector(".nav-toggle");
const nav=document.querySelector(".site-nav");
navToggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");navToggle.setAttribute("aria-expanded",String(open))});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");navToggle?.setAttribute("aria-expanded","false")}));

const lightbox=document.querySelector("[data-lightbox-modal]");
const lightboxImg=lightbox?.querySelector("img");
document.querySelectorAll("[data-lightbox]").forEach(btn=>btn.addEventListener("click",()=>{if(!lightbox||!lightboxImg)return;lightboxImg.src=btn.dataset.lightbox;lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}));
function closeBox(){lightbox?.classList.remove("open");lightbox?.setAttribute("aria-hidden","true");document.body.style.overflow=""}
lightbox?.querySelector(".lightbox-close")?.addEventListener("click",closeBox);
lightbox?.addEventListener("click",e=>{if(e.target===lightbox)closeBox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeBox()});
const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();
