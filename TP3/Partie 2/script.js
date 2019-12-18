
var mapPays = new Map();
mapPays.set("France",["Marne la Vallé", "Coublevie", "Voiron", "Grenoble"]);
mapPays.set("Usa",["Los Angeles", "New-york", "Chicago", "Washington"]);
mapPays.set("Angleterre",["Londres", "Cambridge", "Totenham", "Arsenal"]);
mapPays.set("Espagne",["Barcelone", "Madrid", "Roses", "Jonquera"]);

// PARTIE 3
function chooseVille() {
    if(document.getElementById("chooseDestination").innerHTML != "Ajouter une destination"){
    document.getElementById('choosenVille').hidden = false;
    }
    else{
       ajouterVille();
    }
}

function ajouterVille(){
    var userInput = document.getElementById("choosenVille").value;
   var result =  confirm("Etes vous sûre ?");
   if(result){
    var node = document.createElement("LI");
    var textnode = document.createTextNode(userInput);
    node.appendChild(textnode);
    document.getElementById("listVilles").appendChild(node);
   }
}

function suggestVille() {
    var paysOrigine;
    var userInput = document.getElementById("choosenVille").value;
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
        document.getElementById("displayVilles").innerHTML = "Bienvenue dans le pays : " + paysOrigine + " vous pouvez aussi visiter les lieux suivants : ";
        //listVilles.pop();
        document.getElementById("listVilles").innerHTML = "";
        listVilles.forEach(ville=> {
            var node = document.createElement("LI");
            var textnode = document.createTextNode(ville);
            node.appendChild(textnode);
            document.getElementById("listVilles").appendChild(node);
        });   
        document.getElementById("chooseDestination").innerHTML = "Ajouter une destination";
        return true;
    }
    else {
        alert("Ville non reconnu");
        return false;
    }
}
