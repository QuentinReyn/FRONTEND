var destinations = [
    { "id":1,"destination": "Espagne", "image": "<img src='assets/images/seville.jpg'></img>", "description": "Séjour de 5 nuits dans un hotel 4 étoiles", "prix": "500€" },
    { "id":2,"destination": "France", "image": "<img src='assets/images/paris.jpg'></img>", "description": "Séjour de 7 nuits dans un hotel 4 étoiles", "prix": "759€" },
    { "id":3,"destination": "Angleterre", "image": "<img src='assets/images/londre.jfif'></img>", "description": "Séjour de 7 nuits dans un hotel 5 étoiles", "prix": "1259€" },
    { "id":4,"destination": "Cuba", "image": "<img src='assets/images/cuba.jfif'></img>", "description": "Séjour de 4 nuits dans un hotel 3 étoiles", "prix": "359€" }
]

$(document).ready(function () {

    var tbody = $('#destinationsTableBody'),
        headers = ["destination", "image", "description", "prix"];
    //populateDestinationTable();

    $.each(destinations, function(i, destination) {
        appendToDestinationTable(destination);
      });

      function appendToDestinationTable(destination) {
        $(".destinations-array > tbody:last-child").append(`
              <tr id="destination-${destination.id}">
                  <td class="destinationData" name="destination">${destination.destination}</td>
                  '<td class="destinationData" name="image">${destination.image}</td>
                  '<td class="destinationData" name="description">${destination.description}</td>
                  '<td class="destinationData" name="prix">${destination.prix}</td>
                  '<td align="center">
                      <button class="btn btn-success form-control">Decouvrir</button>
                  </td>
                     
                  <td align="center">
                  <button class="btn btn-success form-control" onclick="editDestination(${destination.id})">EDIT</button>
                      <button class="btn btn-danger form-control" onclick="deleteDestination(${destination.id})">DELETE</button>
                  </td>
              </tr>
          `);
      }

    // function populateDestinationTable() {
    //     $.each(destinations, function (i, destination) {
    //         var tr = $('<tr>');
    //         var id = destination.id;
    //         $.each(headers, function (i, header) {
    //             $('<td>').html(destination[header]).appendTo(tr);
    //         });
    //         $('<td>').html("<button>Decouvrir</button>").appendTo(tr);
    //         $('<td>').html("<button id='editButton' class='editButton' onclick='editDestination("+id+")'>Editer</button><button class='deleteButton' onclick='deleteDestination("+id+")'>Supprimer</button>").appendTo(tr);
    //         tbody.append(tr);
    //     });
    // }

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
                link: '',
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
    //$menu.menu();

    //partie 3 crud json

    $('.modal-toggle').click(function (e) {
        e.preventDefault();
        $('.modal').toggleClass('is-visible');
    });


    $('.modal-toggle-save').click(function (e) {
        var destination={};
        var destinationInput =  $('#destinationName').val();
        var prixInput = $('#prix').val();
        var descriptionInput =$('#description').val();
        var imageInput =  $("#imageUrl").val();
        console.log(destinationInput);
        if (destinationInput && prixInput && descriptionInput && imageInput) {
          $(this).serializeArray().map(function(data) {
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
          $('.modal').toggleClass('is-visible');
        } else {
          alert("All fields must have a valid value.");
        }
    })

    function addDestination(destination) {
        destinations.push(destination);
        appendToDestinationTable(destination);
      }
    
});

function deleteDestination(id) {
        var action = confirm("Are you sure you want to delete this Destination?");
        destinations.forEach(function(destination, i) {
          if (destination.id == id && action != false) {
            destinations.splice(i, 1);
            $(".destinations-array #destination-" + destination.id).remove();
          }
        });
      }


function editDestination(id) {
        destinations.forEach(function(destination, i) {
          if (destination.id == id) {
             var imageValue =  destination.image.split("'")[1];
             $('.modal').toggleClass('is-visible');
                       
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
	  
	   function saveDestination(){
        console.log("NONONO");
        var destination={};
        var destinationInput =  $('#destinationName').val();
        var prixInput = $('#prix').val();
        var descriptionInput =$('#description').val();
        var imageInput =  $("#imageUrl").val();
        console.log(destinationInput);
        if (destinationInput && prixInput && descriptionInput && imageInput) {
          $(this).serializeArray().map(function(data) {
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
          $(".destinations-array > tbody:last-child").append(`
              <tr id="destination-${destination.id}">
                  <td class="destinationData" name="destination">${destination.destination}</td>
                  '<td class="destinationData" name="image">${destination.image}</td>
                  '<td class="destinationData" name="description">${destination.description}</td>
                  '<td class="destinationData" name="prix">${destination.prix}</td>
                  '<td align="center">
                      <button class="btn btn-success form-control">Decouvrir</button>
                  </td>
                     
                  <td align="center">
                  <button class="btn btn-success form-control" onclick="editDestination(${destination.id})">EDIT</button>
                      <button class="btn btn-danger form-control" onclick="deleteDestination(${destination.id})">DELETE</button>
                  </td>
              </tr>
          `);
          $('.modal').toggleClass('is-visible');
        } else {
          alert("All fields must have a valid value.");
        }
      }
	  
	   function closeModal(){
        $('.modal').toggleClass('is-visible');
      }

      function updateDestination(id) {
        var msg = "Destination updated successfully!";
        var destination = {};
        destination.id = id;
        destinations.forEach(function(destination, i) {
          if (destination.id == id) {
              var modal = $(".modal-content");
              var inputs = modal.find("input");
                inputs.each(function() {
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
              $(".destinations-array #destination-" + destination.id).children(".destinationData").each(function() {
                var attr = $(this).attr("name");
                if (attr == "destination") {
                  $(this).text(destination.destination);
                } else if (attr == "prix") {
                  $(this).text(destination.prix);
                } else if(attr=="description") {
                  $(this).text(destination.description);
                }
                else if(attr=="image") {
                    $(this).text(destination.image);
                  }
              });
              $('.modal').toggleClass('is-visible');
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
    
      
