let addbtn = document.querySelector("#box1 button");
let inpt = document.querySelector("#box1 input");
let counter = document.querySelector(".counter");
let number = [];
let footer = document.querySelector("footer");
let heit = [];
let pxx = 65.5;
let ext = 200;
let sum = (heit * pxx) + ext;
addbtn.addEventListener("click", () => {
    if (inpt.value.trim() !== "") {  
        let boxs = document.querySelector(".boxs");
        let box = document.createElement("div");
        box.classList.add("box");
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
        number.push("1");
        heit.push("1");
        let sum = (heit.length * pxx) + ext;
        footer.style.height = sum + "px";
        counter.textContent = number.length;
        button.addEventListener("click", () => {
            button.className = "button";
            p.style.textDecoration = "line-through";
            p.style.color = "hsl(235, 16%, 43%)";
            number.pop();
            counter.textContent = number.length;
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
