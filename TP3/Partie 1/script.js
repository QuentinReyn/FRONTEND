var randomNumber = Math.floor(Math.random() * 11);
var essais = 1;
function myFunction() {
    var txt = "";
    if (essais < 4) {
        var userAnswer = prompt("Entrez un nombre 0 and 10:", "0");
        console.log(randomNumber + " " + userAnswer);
        switch (true) {
            case "": txt = "Veuillez renseigner un nombre";
                break;
            case userAnswer < randomNumber: txt = "C'est plus";
                break;
            case userAnswer > randomNumber: txt = "Cest moins";
                break;
            case userAnswer == randomNumber: txt = "Vous avez trouvée la réponse ! ";
                //je reload la page pour reset les essais et le chiffre aleatoire
                break;
        };
        document.getElementById("demo").textContent = txt;
        document.getElementById("essais").textContent = "Essai actuel : " + essais;
        essais++;
    }
    if (essais == 4 && userAnswer != randomNumber) {
        document.getElementById("demo").innerHTML = "Nombre d'essais maximales atteint";
    }
}

function reset() {
    randomNumber = Math.floor(Math.random() * 11);
    essais = 1;
    document.getElementById("demo").textContent = "";
    document.getElementById("essais").textContent = "";
}


//PARTIE 2

var mapPays = new Map();
mapPays.set("France",["Marne la Vallé", "Coublevie", "Voiron", "Grenoble"]);
mapPays.set("Usa",["Los Angeles", "New-york", "Chicago", "Washington"]);
mapPays.set("Angleterre",["Londres", "Cambridge", "Totenham", "Arsenal"]);
mapPays.set("Espagne",["Barcelone", "Madrid", "Roses", "Jonquera"]);

function myAlert() {
    var paysOrigine;
    var userInput = document.getElementById("ville").value;
    var isVille;
    console.log(userInput);
    for (var [clé, valeur] of mapPays.entries()) {
        valeur.forEach(ville => {
            if(ville == userInput){
                isVille = true;
                paysOrigine = clé;
            }
        })
      }
  /*   mapPays.values().forEach(listVilles => {
        listVilles.forEach(ville => {
            if (ville == userInput) {
                isVille = true;              
            }
        })
    }); */

    if (isVille) {
        alert("Bienvenue dans le pays : " + paysOrigine);
        return true;
    }
    else {
        alert("Ville non reconnu");
        return false;
    }
}



