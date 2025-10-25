let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function display(){
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((t,i)=>{
        list.innerHTML += `
        <li class="${t.complete?'complete':''}">
            ${t.name}
            <div>
                <button class="comp-btn" onclick="complete(${i})">✓</button>
                <button class="edit-btn" onclick="editTask(${i})">✎</button>
                <button class="del-btn" onclick="delTask(${i})">🗑</button>
            </div>
        </li>`;
    });
}
display();

function addTask(){
    let data = document.getElementById("taskInput").value;
    if(data.trim()===""){ alert("Empty!"); return; }

    tasks.push({name:data, complete:false});
    save();
    display();
    document.getElementById("taskInput").value="";
}

function delTask(i){
    tasks.splice(i,1);
    save();
    display();
}

function editTask(i){
    let newTask = prompt("Edit Task:", tasks[i].name);
    if(newTask.trim()===""){alert("Invalid!");return;}
    tasks[i].name = newTask;
    save();
    display();
}

function complete(i){
    tasks[i].complete = !tasks[i].complete;
    save();
    display();
}

function save(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
document.getElementById("addBtn").onclick = addTask;
document.getElementById("taskInput").onkeypress = function(e){
    if(e.key==="Enter"){ addTask(); }
};