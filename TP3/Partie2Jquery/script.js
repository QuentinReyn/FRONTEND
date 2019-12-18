$(document).ready(function(){


});


var mapPays = new Map();
mapPays.set("France",["Marne la Vallé", "Coublevie", "Voiron", "Grenoble"]);
mapPays.set("Usa",["Los Angeles", "New-york", "Chicago", "Washington"]);
mapPays.set("Angleterre",["Londres", "Cambridge", "Totenham", "Arsenal"]);
mapPays.set("Espagne",["Barcelone", "Madrid", "Roses", "Jonquera"]);

// PARTIE 3
function chooseVille() {
    if($("#chooseDestination").text() != "Ajouter une destination"){
    $("#choosenVille").removeAttr('hidden');
    }
    else{
       ajouterVille();
    }
}



function ajouterVille(){
   
    var userInput =  $("#choosenVille").val();
    var result =  confirm("Etes vous sûre ?");
   if(result){
    var node = document.createElement("LI");
    var textnode = document.createTextNode(userInput);
    node.appendChild(textnode);
    $("#listVilles").append(node);
   }
}

function suggestVille() {
    var paysOrigine;
    var userInput = $("#choosenVille").val();
    var isVille;
    var listVilles;
    console.log(userInput);
    for (var [clé, valeur] of mapPays.entries()) {
        valeur.forEach(ville => {
            if(ville == userInput){
                isVille = true;
                paysOrigine = clé;
                listVilles = valeur;
            }
        })
      }

    if (isVille) {
        $('#displayVilles').text('Bienvenue dans le pays : ' + paysOrigine + ' vous pouvez aussi visiter les lieux suivants : ');
        $("#listVilles").text("");
        listVilles.forEach(ville=> {
            var node = document.createElement("LI");
            var textnode = document.createTextNode(ville);
            node.appendChild(textnode);
            $("#listVilles").append(node);
        });   
        $("#chooseDestination").text("Ajouter une destination");
        return true;
    }
    else {
        alert("Ville non reconnu");
        return false;
    }
}
