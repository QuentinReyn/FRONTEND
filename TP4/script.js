
var destinations = [];

//read source.json file to append destinations array
$.getJSON('source.json',function(data){
var output = '<ul>';  
$.each(data, function(key,val){
 var destination = {};
 destination = {"id":val.id,"destination":val.destination,"image":val.image,"description":val.description,"prix":val.prix}
destinations.push(destination);
});
});

$(document).ready(function () {

  var tbody = $('#destinationsTableBody'),
    headers = ["destination", "image", "description", "prix"];
  //populateDestinationTable();
  $.each(destinations, function (i, destination) {
    appendToDestinationTable(destination);
  });

  function appendToDestinationTable(destination) {
    var imageValue = destination.image.split("'")[1];
    $("#row").append(`      
		<div class="col-md-3 col-xs-12 col-sm-6 destinationContent" id="destination-${destination.id}">
    	<div class="card">
      	<img class="card-img-top destinationData imageVille" src="${imageValue}"  name="image" alt="Card image cap">
				<div class="card-block">
                    <h4 class="card-title destinationData" name="destination">${destination.destination}</h4>
                    <h3 class="card-title destinationData" name="prix">${destination.prix}</h3>
          <p class="card-text destinationData" name="description">${destination.description}</p>
                    <button class="btn">DECOUVRIR</button>
                    <button class="btn btn-primary adminAction" onclick="editDestination(${destination.id})">EDITER</button>
                    <button class="btn btn-primary adminAction" onclick="deleteDestination(${destination.id})">SUPPRIMER</button>
				</div>
		</div>
		</div>
          `);
  }

  //user or admin display
  const user = localStorage.getItem("user");
  
  if(user){
    if(user === 'admin'){
      $(".adminAction").show();
    }
    else{
      $(".adminAction").hide();
    }
  }

  function clearDestinationTable() {
    $("#destinationsTableBody").empty();
  }

  //MENU----------------------------
  var data = {
    menu: [{
      name: 'Accueil',
      link: 'index.html',
      pagename: 'index',
      sub: null
    },
    {
      name: 'Menu',
      link: 'menu.html',
      pagename: 'menu',
      sub: [{
        name: 'Connexion',
        link: 'connexion.html',
        sub: null
      }, {
        name: 'Recherche',
        link: '',
        sub: null
      }, {
        name: 'Assistance',
        link: '',
        sub: null
      }]
    },
    {
      name: 'Services',
      pagename: 'services',
      link: 'services.html',
      sub: [{
        name: 'Information',
        link: '',
        sub: null
      }, {
        name: 'Location',
        link: '',
        sub: null
      }, {
        name: 'Assistance',
        link: '',
        sub: null
      }]
    },
    {
      name: 'Destinations',
      pagename: 'destinations',
      link: 'destinations.html',
      sub: null
    },
    {
      name: 'Visite Virtuelle (audio)',
      pagename: 'audio',
      link: 'audio.html',
      sub: null
    },
    {
      name: 'Visite Virtuelle (vidéo)',
      pagename: 'video',
      link: 'video.html',
      sub: null
    },
    {
      name: 'Contact',
      pagename: 'contact',
      link: 'contact.html',
      sub: null
    }]
  };
  var getMenuItem = function (itemData) {
    var pageName = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split(".")[0];
    var item;
    if (pageName.toLowerCase() == itemData.pagename) {
      item = $("<li>")
        .append(
          $('<a>', {
            href: itemData.link,
            html: itemData.name,
            class: 'active'
          }));
    }
    else {
      item = $("<li>")
        .append(
          $("<a>", {
            href: itemData.link,
            html: itemData.name
          }));
    }
    if (itemData.sub) {
      var subList = $("<ul>");
      $.each(itemData.sub, function () {
        subList.append(getMenuItem(this));
      });
      item.append(subList);
    }
    return item;
  };

  var $menu = $("#menuList");
  $.each(data.menu, function () {
    $menu.append(
      getMenuItem(this)
    );
  });

  //partie 3 crud json

  $('.modal-toggle').click(function (e) {
    e.preventDefault();
    $('.myModal').toggleClass('is-visible');
  });

  //modal add destination
  $('.modal-toggle-save').click(function (e) {
    console.log("oauis");
    var destination = {};
    var destinationInput = $('#destinationName').val();
    var prixInput = $('#prix').val();
    var descriptionInput = $('#description').val();
    var imageInput = $("#imageUrl").val();
    console.log(destinationInput);
    if (destinationInput && prixInput && descriptionInput && imageInput) {
      $(this).serializeArray().map(function (data) {
        destination[data.destination] = data.value;
      });
      var lastDest = destinations[Object.keys(destinations).sort().pop()];
      destination.id = lastDest.id + 1;
      destination.destination = destinationInput;
      destination.prix = prixInput;
      destination.image = `<img src='${imageInput}'></img>`;
      destination.description = descriptionInput;
      console.log(destination);
      addDestination(destination);
      $('.myModal').toggleClass('is-visible');
    } else {
      alert("All fields must have a valid value.");
    }
  })

  function addDestination(destination) {
    destinations.push(destination);
    appendToDestinationTable(destination);
    let fs = require('fs');
    fs.readFile('source.json', (err, file) => {
      let jsonArray = JSON.parse(file);
    
      jsonArray.push(destination);
    
      fs.writeFile('file.json', JSON.stringify(jsonArray));
    });
  }

  $('#loginForm').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: 'script_php.php',
      crossDomain: true,
      data: $(this).serialize(),
      success: function (data) {
        console.log(data);
        if (data == 'admin') {
          alert("Vous etes connecté en tant que " + data);
          localStorage.setItem('user','admin')
        }
        else if (data == 'user') {
          alert("Vous etes connecté ! ");
          localStorage.setItem('user','user')
        }
        else {
          alert('Invalid Credentials');
        }
      }
    });
  });


});

function deleteDestination(id) {
  var action = confirm("Are you sure you want to delete this Destination?");
  destinations.forEach(function (destination, i) {
    if (destination.id == id && action != false) {
      destinations.splice(i, 1);
      $(".row #destination-" + destination.id).remove();
    }
  });
}

function saveDestination() {
  console.log("NONONO");
  var destination = {};
  var destinationInput = $('#destinationName').val();
  var prixInput = $('#prix').val();
  var descriptionInput = $('#description').val();
  var imageInput = $("#imageUrl").val();
  console.log(destinationInput);
  if (destinationInput && prixInput && descriptionInput && imageInput) {
    $(this).serializeArray().map(function (data) {
      destination[data.destination] = data.value;
    });
    var lastDest = destinations[Object.keys(destinations).sort().pop()];
    destination.id = lastDest.id + 1;
    destination.destination = destinationInput;
    destination.prix = prixInput;
    destination.image = `<img src='${imageInput}'></img>`;
    destination.description = descriptionInput;
    console.log(destination);
    destinations.push(destination);
    var imageValue = destination.image.split("'")[1];
    $("#row").append(`      
          <div class="col-md-3 col-xs-12 col-sm-6 destinationContent" id="destination-${destination.id}">
          <div class="card">
            <img class="card-img-top destinationData imageVille" src="${imageValue}"  name="image" alt="Card image cap">
                  <div class="card-block">
                      <h4 class="card-title destinationData" name="destination">${destination.destination}</h4>
                      <h3 class="card-title destinationData" name="prix">${destination.prix}</h3>
                      <p class="card-text destinationData" name="description">${destination.description}</p>
                      <button class="btn btn-primary" onclick="editDestination(${destination.id})">EDITER</button>
                      <button class="btn btn-primary" onclick="deleteDestination(${destination.id})">SUPPRIMER</button>
                  </div>
          </div>
          </div>
            `);
    $('.myModal').toggleClass('is-visible');
  } else {
    alert("All fields must have a valid value.");
  }
}

//modal edit destination
function editDestination(id) {
  destinations.forEach(function (destination, i) {
    if (destination.id == id) {
      var imageValue = destination.image.split("'")[1];
      $('.myModal').toggleClass('is-visible');

      $(".modal-body").empty().append(`<div class='modal-content'>
            <div class='row'>
                <div>
                    <label class="required" for="firstName">Destination City/Country:</label><br />
                    <input id="destinationName" class="input" name="destination" type="text" value="${destination.destination}"
                        size="30" required/><br />
                </div>
                <div>
                    <label class="required" for="lastName">Prix:</label><br />
                    <input id="prix" class="input" name="prix" type="text" value="${destination.prix}" size="30" required /><br />
                </div>
            </div>
            <div class="row">
                <label>Description:</label><br />
                <input id="description" class="input" name="description" rows="7" cols="30" required value="${destination.description}"></input><br />
            </div>
            <div class="row">
                <label>Image:</label><br />
                <input id="imageUrl" class="input" name="image" type="text" value="${imageValue}"/><br />
            </div>
        </div>`);
      $(".modal-footer").empty().append(`
                          <button type="button" type="submit" class="btn btn-primary" onclick="updateDestination(${id})">Save changes</button>
                          <button type="button" class="btn btn-default" onclick="closeModal()">Close</button>
                  `);
    }
  });
}

function closeModal() {
  $('.myModal').toggleClass('is-visible');
}

function updateDestination(id) {
  var msg = "Destination updated successfully!";
  var destination = {};
  destination.id = id;
  destinations.forEach(function (destination, i) {
    if (destination.id == id) {
      var modal = $(".modal-content");
      var inputs = modal.find("input");
      inputs.each(function () {
        var value = $(this).val();
        var attr = $(this).attr("name");
        if (attr == "destination") {
          destination.destination = value;
        } else if (attr == "prix") {
          destination.prix = value;
        } else if (attr == "description") {
          destination.description = value;
        }
        else if (attr == "image") {
          destination.image = value;
        };
      });
      destinations.splice(i, 1);
      destinations.splice(destination.id - 1, 0, destination);
      $("#row > #destination-" + destination.id + " > .card").children(".destinationData").each(function () {
        var attr = $(this).attr("name");
        if (attr == "image") {
          $(this).text(destination.image);
        }
      });
      $("#row > #destination-" + destination.id + " > .card > .card-block").children(".destinationData").each(function () {
        var attr = $(this).attr("name");
        console.log(attr);
        if (attr == "destination") {
          $(this).text(destination.destination);
        } else if (attr == "prix") {
          $(this).text(destination.prix);
        } else if (attr == "description") {
          $(this).text(destination.description);
        }
      });
      $('.myModal').toggleClass('is-visible');
      $(".modal-body").empty().append(`<div class='modal-content'>
            <div class='row'>
                <div>
                    <label class="required" for="firstName">Destination City/Country:</label><br />
                    <input id="destinationName" class="input" name="destination" type="text" value=""
                        size="30" required/><br />
                </div>
                <div>
                    <label class="required" for="lastName">Prix:</label><br />
                    <input id="prix" class="input" name="prix" type="text" value="" size="30" required /><br />
                </div>
            </div>
            <div class="row">
                <label>Description:</label><br />
                <input id="description" class="input" name="description" rows="7" cols="30" required value=""></input><br />
            </div>
            <div class="row">
                <label>Image:</label><br />
                <input id="imageUrl" class="input" name="image" type="text" value=""/><br />
            </div>
        </div>`);
      $(".modal-footer").empty().append(`
                          <button type="button" id="modal-toggle" class="btn btn-primary modal-toggle-save" onclick="saveDestination()">Sauvegarder</button>
                          <button type="button" class="btn btn-default" onclick="closeModal()">Close</button>
                  `);
    }
  });
}


