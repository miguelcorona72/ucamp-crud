//document.addEventListener('DOMContentLoaded', () => {// Espera a que cargue nuestro contenido html ...

// valida los inputs de la forma antes de ingresar informacion
function validateForm(){
    var name = document.getElementById("name").value;
    var color = document.getElementById("color").value;
    var type = document.getElementById("type").value;
    var depth = document.getElementById("depth").value;
    var weight = document.getElementById("weight").value;

if(name == ""){
    alert("Se requiere nombre");
    return false;
}

if(color == ""){
    alert("Se requiere color");
    return false;
}

if(type == ""){
    alert("Se requiere tipo");
    return false;
}

if(depth == ""){
    alert("Se requiere profundidad");
    return false;
}

if(weight == ""){
    alert("Se requiere el peso");
    return false;
}
else if(weight < 1){
    alert("El peso debe ser número positivo mayor a 1 onza");
    return false;
}

return true;
}

// funcion para mostrar informacion de local storage
function showData(){
    var lureList;
    if(localStorage.getItem("lureList") == null){
        lureList = [];
    }
    else{
        lureList = JSON.parse(localStorage.getItem("lureList"));
    }

    var html = "";

    lureList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.color + "</td>";
        html += "<td>" + element.type + "</td>";
        html += "<td>" + element.depth + "</td>";
        html += "<td>" + element.weight + "</td>";
        html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Eliminar</button><button onclick="updateData('+index+')" class="btn btn-warning m-2">Editar</button></td>';
        html +="</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Carga toda la informacion de local storage cuando el documento o la pagina cargue
document.onload = showData();

// funcion para agregar informacion a local storage
function AddData(){
    // si se valida la forma
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var color = document.getElementById("color").value;
        var type = document.getElementById("type").value;
        var depth = document.getElementById("depth").value;
        var weight = document.getElementById("weight").value;

        var lureList;
        if(localStorage.getItem("lureList") == null) {
            lureList = [];
        } else
            lureList = JSON.parse(localStorage.getItem("lureList"));
        }

        lureList.push({
            name : name,
            color : color,
            type : type,
            depth : depth,
            weight : weight,
        });

        localStorage.setItem("lureList", JSON.stringify(lureList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("color").value = "";
        document.getElementById("type").value = "";
        document.getElementById("depth").value = "";
        document.getElementById("weight").value = "";
    }

// funcion para borrar o eliminar informacion de local storage
function deleteData(index){
    var lureList;
    if (localStorage.getItem("lureList") == null) {
        lureList = [];
    } else {
        lureList = JSON.parse(localStorage.getItem("lureList"));
    }

    lureList.splice(index, 1);
    localStorage.setItem("lureList", JSON.stringify(lureList));
    showData();

}

// funcion para actualizar/modificar/editar información de local storage
function updateData(index){
    // el boton de agregar se escondera y aparecera el boton de editar para actualizar la información en local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var lureList;
    if (localStorage.getItem("lureList") == null) {
        lureList = [];
    } else {
        lureList = JSON.parse(localStorage.getItem("lureList"));
    }

    document.getElementById("name").value = lureList[index].name;
    document.getElementById("color").value = lureList[index].color;
    document.getElementById("type").value = lureList[index].type;
    document.getElementById("depth").value = lureList[index].depth;
    document.getElementById("weight").value = lureList[index].weight;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            lureList[index].name = document.getElementById("name").value;
            lureList[index].color = document.getElementById("color").value;
            lureList[index].type = document.getElementById("type").value;
            lureList[index].depth = document.getElementById("depth").value;
            lureList[index].weight = document.getElementById("weight").value;

            localStorage.setItem("lureList", JSON.stringify(lureList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("color").value = "";
            document.getElementById("type").value = "";
            document.getElementById("depth").value = "";
            document.getElementById("weight").value = "";

            // Boton editar se escondera y aparecera boton agregar
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

        }
    }


}

//});
