function postJob(){
    let title = document.getElementById("title").value;
    let company = document.getElementById("company").value;
    let location = document.getElementById("location").value;

    let item = document.createElement("li");
    item.innerText = `${title} — ${company} — ${location}`;

    document.getElementById("jobList").appendChild(item);
}
document.getElementById("postJobButton").addEventListener("click", postJob);