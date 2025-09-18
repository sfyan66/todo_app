let addbtn = document.querySelector("#box1 button");
let inpt = document.querySelector("#box1 input");
let counter = document.querySelector(".counter");
let number = [];
let footer = document.querySelector("footer");
let heit = [];
let pxx = 65.5;
let ext = 200;
let sum = (heit * pxx) + ext;
inpt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addbtn.click();
    }
});
addbtn.addEventListener("click", () => {
    if (inpt.value.trim() !== "") {  
        let boxs = document.querySelector(".boxs");
        let box = document.createElement("div");
        box.classList.add("box");
        box.classList.add("activ");
        let button = document.createElement("button");
        button.classList.add("active")
        let p = document.createElement("p");
        let ii = document.createElement("i");
        ii.classList.add("remove");
        ii.style.cursor = "pointer"
        box.appendChild(button);
        box.appendChild(p);
        box.appendChild(ii);
        boxs.appendChild(box);
        p.textContent = inpt.value;
        inpt.value = "";
        inpt.focus();
        number.push("1");
        heit.push("1");
        let sum = (heit.length * pxx) + ext;
        footer.style.height = sum + "px";
        counter.textContent = number.length;
        p.addEventListener("click", () => {
            button.click();
        }); 
        button.addEventListener("click", () => {
            button.className = "button";
            p.style.textDecoration = "line-through";
            p.style.color = "hsl(236, 9%, 61%)";
            number.pop();
            counter.textContent = number.length;
            box.classList.remove("activ");
            box.classList.add("finished");
        });
    }
});
document.addEventListener("click", (e) => {
    if(e.target.className == "remove") {
        e.target.parentNode.remove();
        let parent = e.target.parentElement;
        let btn = parent.querySelector("button")
        if(btn.className == "active") {
            number.pop()
            heit.pop()
            counter.textContent = number.length;
            let sum = (heit.length * pxx) + ext;
            footer.style.height = sum + "px";
        }
        
    }
});
let header = document.querySelector("header") 
let change = document.querySelector("header button");
change.addEventListener("click", () => {
    if (change.className == "dark") {
        change.className = "light";
        header.className = "hlight"
        footer.className = "flight"
    }
    else if (change.className == "light") {
        change.className = "dark";
        header.className = "hdark"
        footer.className = "fdark"
    }
});
let all = document.querySelector(".lbox .all");
all.style.color = "hsl(220, 98%, 61%)"
let activee = document.querySelector(".lbox .activee");
let comp = document.querySelector(".lbox .comp");
all.addEventListener("click", () => {
    let finished = document.querySelectorAll(".finished");
    if(finished) finished.forEach(el => {
        el.style.display = "";
    });
    let activ = document.querySelectorAll(".activ");
    if(activ) activ.forEach(el => {
        el.style.display = "";
    });
    all.style.color = "hsl(220, 98%, 61%)";
    activee.style.color = "";
    comp.style.color = "";
});
activee.addEventListener("click", () => {
    let finished = document.querySelectorAll(".finished");
    if(finished) finished.forEach(el => {
        el.style.display = "none";
    });
    let activ = document.querySelectorAll(".activ");
    if(activ) activ.forEach(el => {
        el.style.display = "";
    });
    all.style.color = "";
    activee.style.color = "hsl(220, 98%, 61%)";
    comp.style.color = "";
});
comp.addEventListener("click", () => {
    let finished = document.querySelectorAll(".finished");
    if(finished) finished.forEach(el => {
        el.style.display = "";
    });
    let activ = document.querySelectorAll(".activ");
    if(activ) activ.forEach(el => {
        el.style.display = "none";
    });
    all.style.color = "";
    activee.style.color = "";
    comp.style.color = "hsl(220, 98%, 61%)";
});
let clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    let finished = document.querySelectorAll(".finished");
    if(finished) finished.forEach(el => {
        el.remove();
    });
});