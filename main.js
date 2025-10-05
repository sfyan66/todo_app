let addbtn = document.querySelector("#box1 button");
let inpt = document.querySelector("#box1 input");
let counter = document.querySelector(".counter");
let boxs = document.querySelector(".boxs");
let number = [];
let footer = document.querySelector("footer");
let heit = [];
let pxx = 65.5;
let ext = 200;
let sum = (heit * pxx) + ext;
let tasks = [];
let notasks = [];
function addtask(titleText) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.classList.add("activ");
    let button = document.createElement("button");
    button.classList.add("active")
    let title = document.createElement("p");
    title.classList.add("title")
    let ii = document.createElement("i");
    ii.classList.add("remove");
    ii.style.cursor = "pointer";
    box.appendChild(button);
    box.appendChild(title);
    box.appendChild(ii);
    boxs.appendChild(box);
    title.textContent = titleText;
    inpt.value = "";
    inpt.focus();
    number.push("1");
    heit.push("1");
    counter.textContent = number.length;
    let sum = (heit.length * pxx) + ext;
    footer.style.height = sum + "px";
    let state = "active";
    let titlee = titleText;
    title.addEventListener("click", () => {
        button.click();
    }); 
    button.addEventListener("click", () => {
        button.className = "button";
        title.style.textDecoration = "line-through";
        title.style.color = "hsl(236, 9%, 61%)";
        number.pop();
        counter.textContent = number.length;
        box.classList.remove("activ");
        box.classList.add("finished");
        state = "finished";
    })
    // let task = {
    //     id: Date.now(),
    //     titlee,
    //     state,
    //     createdAt: new Date().toISOString().slice(0,16)
    // };
    // tasks.push(task);
}
async function loadTasks() {
    try {
    let response = await fetch("http://localhost:5000/tasks");
    let data = await response.json(); 
    boxs.innerHTML = "";
    tasks = data;
    renderTasks();
    } catch (error) {
    console.error("error loading tasks:", error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); 
});
function renderTasks() {
    tasks.forEach((task, index) => {
        addtask(task.titlee);
    });
}
async function savetasks() {
    await fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tasks)
    });
};
inpt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addbtn.click();
    }
});
addbtn.addEventListener("click", () => {
    if (inpt.value.trim() !== "") {  
        addtask(inpt.value);
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
// document.querySelector(".drop .save").addEventListener("click", (e) => {
//     if (e.target.className == "box") {
//         let titlee = e.target.querySelector(".title").value;
//         let state = e.target.querySelector(".activ");
//         let statee = state.className 
//         let task = {
//             id: Date.now,
//             titlee,
//             statee,
//         };
//         tasks.push(task);
//     }
// });
async function taskspush(){
    tasks = [];
    let boxes = boxs.querySelectorAll(".box");
    boxes.forEach(tsk => {
        let titlee = tsk.querySelector(".title").textContent;
        let state = tsk.querySelector(".active");
        // let statee = state.className 
        let task = {
            id: Date.now(),
            titlee
            // statee,
        };
        tasks.push(task);
    });
}
document.querySelector(".drop .save").addEventListener("click", () => {
    taskspush();
    savetasks();
});