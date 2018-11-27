

var DOM = document.getElementById("main")

getcurrency();


function getcurrency() {
    $.ajax({
        method: "GET",
        url: 'https://api.coingecko.com/api/v3/coins?per_page=20&page=2',
        // url: 'https://api.coingecko.com/api/v3/coins/list',
        dataType: 'json',
        success: function (response) {
            console.log(response)
            draw(response);

        },
        error: function (error) {
            //console.log(error)
        }
    })
}

function getinfo(id) {
    $.ajax({
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/"+id,
        dataType: 'json',
        success: function (response) {
            console.log(response)
            moreinfo(response);

        },
        error: function (error) {
            //console.log(error)
        }
    })
}




function draw(response) {
    DOM.innerHTML = "";
    for (let index = 0; index < response.length; index++) {
        id = index
        DOM.appendChild(card(response[index], index));
      
    }
}


function card(response , index) {

    var card = document.getElementsByName("template")[document.getElementsByName("template").length - 1].cloneNode(true);
    card.id = response.symbol;
    

    //u need to fix this in order to del from the array as well
    card.style.display = "inline-block";
    card.querySelector("#title").innerHTML = response.symbol;
    card.querySelector("#name").innerHTML = response.name;
    card.querySelector("#collapse").attributes.getNamedItem("data-target").value = "#collapser" + card.id;
    card.querySelector("#collapseExample").id = "collapser" + card.id;
    //card.querySelector("#contentcol").id = "coll" + card.id;

    return card;
}

function moreinfo(result) {
    
    var content =  document.getElementById("collapser"+result.symbol);
    console.log(content.childNodes)
    content.childNodes.innerHTML = result.image.thumb;
}

