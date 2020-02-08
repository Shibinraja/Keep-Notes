let create = document.getElementById("btn-create");
let deleted = document.getElementById("btn-delete");
let read = document.getElementById("btn-read");
let update = document.getElementById("btn-update");


function list(make, read, updating, trash){

    
    make.addEventListener("click", function(){
        let id = document.getElementById("user").value
        let ListName = document.getElementById("List").value    
        let user = document.getElementById("UserName").value
        let Date = document.getElementById("date").value
        var json = {id, ListName, user , Date};
        console.log(json);

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "http://localhost:6060/Keepnotes");

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(json))
})

    read.addEventListener("click", function(){

        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            var details = JSON.parse(xhttp.responseText);
            // console.log(details);
            Table = document.getElementById("tb");
            
            details.map((ele , i)=>{
                Trow = document.createElement("tr")
                ID = document.createElement("td");
                ListName = document.createElement("td");
                user = document.createElement("td");
                Dates = document.createElement("td");
                Edit = document.createElement("td");
                Delete = document.createElement("td");
                Edit.innerHTML = `<img src="./edit-24px.svg"/>`
                Edit.setAttribute("style", "cursor:pointer")
                Delete.innerHTML = `<img src="./delete-24px.svg">`
                Delete.setAttribute("style", "cursor:pointer")
                Delete.setAttribute("onclick", "deletebtn()")
                ID.innerText = ele.id;
                ListName.innerText = ele.ListName;
                user.innerText = ele.user;
                Dates.innerText = ele.Date;
                Trow.appendChild(ID);
                Trow.appendChild(ListName);
                Trow.appendChild(user);
                Trow.appendChild(Dates);
                Trow.appendChild(Edit);
                Trow.appendChild(Delete);

                Table.appendChild(Trow);

                Edit.onclick= function(){
                    document.getElementById("user").value = ele.id;
                    document.getElementById("List").value = ele.ListName;
                    document.getElementById("UserName").value = ele.user;
                    document.getElementById("date").value = ele.Date;
                }

                Delete.onclick = function(){


                    let id = document.getElementById("user").value= ele.id;   
                    let ListName = document.getElementById("List").value = ele.ListName;
                    let user = document.getElementById("UserName").value = ele.user;
                    let Date = document.getElementById("date").value = ele.Date;
                    var json = {id, ListName, user , Date};
                    console.log(json)


                    let xhr = new XMLHttpRequest();

                    xhr.open("POST", "http://localhost:6060/delete");

                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.send(JSON.stringify(json))
                    
                }

            })
        
        };

        };

        xhttp.open("GET", "http://localhost:6060/Details", true);

        xhttp.send();

    });


    updating.addEventListener("click", function(){

        let id = document.getElementById("user").value
        let ListName = document.getElementById("List").value    
        let user = document.getElementById("UserName").value
        let Date = document.getElementById("date").value
        var json = {id, ListName, user , Date};

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "http://localhost:6060/Keepnotes2");

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(json))
    });

    trash.addEventListener("click", function(){
        
        let id = document.getElementById("user").value
        let ListName = document.getElementById("List").value    
        let user = document.getElementById("UserName").value
        let Date = document.getElementById("date").value
        var json = {id, ListName, user , Date};

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "http://localhost:6060/deleteall");

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(json))

    });
}

list(create ,read, update ,deleted)