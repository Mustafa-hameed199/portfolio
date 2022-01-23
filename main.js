let log = console.log;

// 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳  Preloader 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳
const preLoader = document.querySelector(".preloader");

window.addEventListener("load", () => {
    preLoader.style.opacity = "0";
    preLoader.style.transform = "scale(0)";
    setTimeout(() => preLoader.style.display = "none" , 200);


// 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳  Intro 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳

let durationLoader = 3;
let timingFunctionLoader = "cubic-bezier(.74, .06, .4, .92)";

const html = document.querySelector('html');
html.style.setProperty('--loader-duration', durationLoader + 's');
html.style.setProperty('--loader-time-func', timingFunctionLoader);

// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ random img ◻◻◻◻◻◻◻◻

if ([...document.querySelectorAll('.imgs img')]) {
    const imgs = [...document.querySelectorAll('.imgs img')];
    
    let len = imgs.length;
    let random = Math.floor(Math.random() * len);
    
    setInterval(() => {
        imgs.forEach(img => img.classList.remove('active'));
        imgs[random].classList.add('active');
        if (random > -1 && random < len - 1) {
            random++;
        } else {
            random = 0;
        }
    }, 150)
}
// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ loading text animate ◻◻◻◻◻◻◻◻

const loading = document.querySelector('.loading__text');
let load_letters = loading.textContent.split('');

loading.textContent = '';

load_letters.forEach(l => {
    let span = document.createElement('span');
    span.append(l);
    loading.append(span);
})

let spans = [...loading.children];
setTimeout(() => {
    spans.forEach((s , i ) => {
        setTimeout(() => {
            s.classList.add('active')
        }, (i + 1) * ((durationLoader / 2) * 50))
    })

}, (durationLoader * 1000) / 9)
setTimeout(() => {
    spans.forEach((s , i ) => {
        setTimeout(() => {
            s.classList.remove('active')
            s.classList.add('hide')
            let randomX = Math.floor(Math.random() * -60) + 'px';
            let randomY = Math.floor(Math.random() * -60) + 'px';
            s.style.transform = `translate(${randomX},${randomY})`;

        }, (i + 1) * (durationLoader * 15))
    })
}, durationLoader * 1300)

// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ delete intro & add content ◻◻◻◻◻◻◻◻

setTimeout(() => {
    document.querySelector('.block-one').remove();
    document.querySelector('.block-two').remove();
    document.querySelector('.block-three').remove();
    document.querySelector('.loading').remove();
},(durationLoader * 1000) * 2)

setTimeout(() => {
    document.querySelector('.load-content').style.display = 'block';
    bodyPadding();
    syncLinks();
}, (durationLoader * 1000) * 1.8)

})


// 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳  Smooth Scroll Function 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳
function smoothScroll(target , duration) {
    let targetPos = target.offsetTop + 16;
    let startPos = window.pageYOffset;
    let dic = (targetPos + 1) - startPos;
    let startTime = null;

    function animation(currentTime) {
        if (startTime == null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed , startPos , dic , duration);
        window.scrollTo(0 , run);
        if (timeElapsed < duration ) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
}

    function ease(t,b,c,d) {
        t /= d;
        return -c * t*(t-2) + b;
    
    }


// 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳  Header 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳
// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ body padding ◻◻◻◻◻◻◻◻

const header = document.querySelector("header");


function bodyPadding() {
    let h = header.getBoundingClientRect().height;
    document.body.style.paddingTop = h + "px";
}
bodyPadding();

function headerPadding() {
    if (scrollY >= 100 ) {
        header.style.setProperty("--header_padding","1rem");
        header.style.boxShadow = "0 5px 15px -10px rgba(0 0 0 / .3)"
    } else {
        header.style.setProperty("--header_padding","1.5rem");
        header.style.boxShadow = "none"
    }
}
headerPadding();
window.addEventListener("scroll", headerPadding)


// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ nav icon animate & show links ◻◻◻◻◻◻◻◻

const icon = document.querySelector(".nav__icon");
const nav_ul = document.querySelector(".nav__ul");


icon.addEventListener("click",() => {
    icon.classList.toggle("animate");
    icon.classList.toggle("show");
    nav_ul.style.transition = "all .5s ease, z-index 0s .6s ease";
})

function checkScreen() {
    if (window.innerWidth < 768) nav_ul.style.transition = "none" 

    if (window.innerWidth >= 768) {
        if (icon.classList.contains("show")) {
            icon.classList.remove("animate")
            icon.classList.remove("show");
        }
    }   
}

window.addEventListener("resize",() => {
    checkScreen();
    bodyPadding();
})
// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ click links ◻◻◻◻◻◻◻◻

const links = document.querySelectorAll(".nav__ul > * > *");

function scrollToElement(ele) {
    let id = ele.dataset.scroll;
    let section = document.getElementById(id);

    smoothScroll(section ,1500);
}

links.forEach(a => {
    a.addEventListener("click",  (e) => {
        if (e.target.innerHTML == "download cv") return
        
        e.preventDefault();
        icon.classList.remove("animate");
        icon.classList.remove("show");
        links.forEach(el => el.classList.remove("active"));
        a.classList.add("active");
        scrollToElement(e.currentTarget)
    })
})

// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ sync links on scroll ◻◻◻◻◻◻◻◻

const sections = document.querySelectorAll(".sec");


function syncLinks() {
    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop ) {
            let id = sec.getAttribute("id");
            links.forEach(el => el.classList.remove("active"));
            document.querySelector(`[data-scroll = ${id}]`).classList.add("active")
        }
    })
}
syncLinks() 
window.addEventListener("scroll", syncLinks)

// 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳  Home 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳
// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ shapes ◻◻◻◻◻◻◻◻

const home = document.getElementById("home");
const items = document.querySelectorAll(".shapes .item");
const btn = document.querySelector(".home__text .btn");

home.addEventListener("mousemove", (e)=> {
    items.forEach(item => {
        let x = - (e.pageX / (window.innerWidth )) * item.dataset.move;
        let y = - (e.pageY / (window.innerWidth )) * item.dataset.move;
        item.style.transform = `translate(${x}% , ${y}%)`;
        item.style.transition = ".05s ";
    })
})
home.addEventListener("mouseleave" ,()=> {
    items.forEach(el => {
        el.style.transform = "translate(0,0)"
        el.style.transition = ".5s ease-out"
    })
})

// ◻◻◻◻◻◻◻◻◻◻◻◻◻◻ home btn click ◻◻◻◻◻◻◻◻
let work = document.querySelector(" [data-scroll='projects'] ")
btn.addEventListener("click", (e) =>  {
        e.preventDefault();
        scrollToElement(work) 
    }
)

// 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳  Reveal element on scroll 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳
const elements = document.querySelectorAll(".spot");

let options = {
    threshold: .2,
    rootMargin: "0px 0px 0px"
}

let observer = new IntersectionObserver( showElements,options)

function showElements(entries) {
    log(entries)
    entries.forEach(el => {
        if (el.isIntersecting) el.target.classList.add("spotted")
    })
}
elements.forEach(el => observer.observe(el) )

