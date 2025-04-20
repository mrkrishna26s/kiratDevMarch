function createDomElement(data){
    var parentElement = document.getElementById("mainArea1"); // performing this operation is expensive so we use virtual DOM that react is using
    var currentChildren = Array.from(parentElement.children);
    console.log(currentChildren);
    let added = 0, deleted =0, updated =0;
    data.forEach(function(item){
        var existingChild = currentChildren.find(function (child){
            return child.dataset.id === String(item.id);
        });
        if(existingChild){
            updated++;
            existingChild.children[0].innerHTML = item.title;
            existingChild.children[1].innerHTML= item.description;
            currentChildren= currentChildren.filter(function(child){
                return child != existingChild;
            });
        }else{
            added++;
            var childElement = document.createElement("div");
            childElement.dataset.id = item.id;

            var grandChildElement1 = document.createElement("span");
            grandChildElement1.innerHTML = item.title;

            var grandChildElement2 = document.createElement("span")
            grandChildElement2.innerHTML = item.description;

            var grandChildElement3 = document.createElement("button");
            grandChildElement3.innerHTML = "delete";
            grandChildElement3.setAttribute("onclick", "deleTodo(" + item.id +")");

            parentElement.appendChild(childElement);


            childElement.appendChild(grandChildElement1);
            childElement.appendChild(grandChildElement2);
            childElement.appendChild(grandChildElement3);
            parentElement.appendChild(childElement);
        }
    });
    currentChildren.forEach(function(child){
        var stillPresent = data.dind(function(item){
            return child.dataset.id === String(item.id);
        });
        if(stillPresent){
            deleted ++;
            parentElement.removeChild(child);
        }
    });
    console.log(added);
    console.log(deleted);
    console.log(updated)
}


window.setInterval(()=> {
    const  todos = [];
    var count = Math.floor(Math.random()*10);
    var val = count;
    for(let i =0; i< count; i++){
        todos.push({
            title: `go to gym ${val}`,
            description: "go to gym from 5",
            id: i+1
            
        })
        val= val+1;
    }
    createDomElement(todos)
},1000);