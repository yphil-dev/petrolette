var pageCounter = 1;
var animalContainer = document.getElementById('animal-info');
var btn = document.getElementById('btn');

console.log('ploup');

btn.addEventListener('click', function() {
    
    $.getJSON('animals-1.json', function(data){

        console.log('plup: ' + data[0].name.species);

        var items = [];

        $.each(data, function( key, val ) {
            var sitems = [];
            items += ' : ' + val.name;
            console.log(val)
            // $.each(val.name, function( keyz, valz ) {
            //     sitems += ' : ' + valz.url
            // });
            // items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        console.log('names: ' + items);
        console.log('urls: ' + sitems);

    }).error(function(jqXhr, textStatus, error) {
        alert("ERROR: " + textStatus + ", " + error);
    });
    
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    ourRequest.onload = function() {

        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            console.log('Connected OK');
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);            
        } else {
            console.log('Connected but returned an error');
        }
    };

    ourRequest.onerror = function() {
        console.log('Connect Error');
    };
    
    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3) {
        btn.classList.add('add-me')
    }
});

function renderHTML(data) {
    var htmlString = ''

    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + ' is a ' + data[i].species + ' that likes to eat ';
        for (ii = 0; ii <  data[i].foods.likes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.likes[ii];
            } else {
                htmlString += ' and ' + data[i].foods.likes[ii];
            }
        }

        htmlString += ' and dislikes ';

        for (ii = 0; ii <  data[i].foods.dislikes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii];
            } else {
                htmlString += ' and ' + data[i].foods.dislikes[ii];
            }
        }
        
        
        htmlString += '.</p>';
    }
    
    animalContainer.insertAdjacentHTML('beforeend', htmlString)
}
