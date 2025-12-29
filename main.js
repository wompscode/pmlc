/*
    This code sucks! It works tho
*/

const default_data = [{
    "id": 1,
    "name": "PLAYER_1",
    "life": 20,
    "poison_counters": 0,
    "flip": 0,
    "active": false,
    "counter_element": null,
    "counter_element_1": null,
    "name_element": null,
    "player_element": null
}, {
    "id": 2,
    "name": "PLAYER_2",
    "life": 20,
    "poison_counters": 0,
    "flip": 0,
    "active": false,
    "counter_element": null,
    "counter_element_1": null,
    "name_element": null,
    "player_element": null
}, {
    "id": 3,
    "name": "PLAYER_3",
    "life": 20,
    "poison_counters": 0,
    "flip": 0,
    "active": false,
    "counter_element": null,
    "counter_element_1": null,
    "name_element": null,
    "player_element": null
}, {
    "id": 4,
    "name": "PLAYER_4",
    "life": 20,
    "poison_counters": 0,
    "flip": 0,
    "active": false,
    "counter_element": null,
    "counter_element_1": null,
    "name_element": null,
    "player_element": null
}];

let players;

let autosaveBox;
let pCounter; 
let saveButton;
let dark_theme = false;
let auto_save = true;

function toggleTheme(button) {
    internalToggleTheme();
    button.innerText = dark_theme ? "☀️" : "🌙";
}

function internalToggleTheme() {
    dark_theme = !dark_theme;
    updateTheme();
}

function updateTheme() {
    document.querySelector("#darkCSS").disabled = !dark_theme;
    document.querySelector("#lightCSS").disabled = dark_theme;
}
document.addEventListener('DOMContentLoaded', function() {
    // thingy
    loadData();

    autosaveBox = document.querySelector("#autosave");
    pCounter = document.querySelector("#pcount");
    saveButton = document.querySelector("#saveButton");

    players.forEach(element => {
        element.counter_element = document.querySelector(`#counter_${element.id}`);
        element.counter_element_1 = document.querySelector(`#pcon_${element.id}`);
        element.name_element = document.querySelector(`#name_${element.id}`);
        element.player_element = document.querySelector(`#player_${element.id}`);
        
        update(element.id - 1)
    });

    setData();
    change();

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dark_theme = true;
        updateTheme();
        document.querySelector("#themeButton").innerText = dark_theme ? "☀️" : "🌙";
    }

});

function change() {
    switch(pCounter.value) {
        case "2":
            players[0].player_element.classList.add("fullheight");
            players[1].player_element.classList.add("fullheight");
            players[2].player_element.classList.add("disable");
            players[3].player_element.classList.add("disable");
            break;
        case "3":
            players[0].player_element.classList.remove("fullheight");
            players[1].player_element.classList.remove("fullheight");
            players[2].player_element.classList.remove("disable");
            players[3].player_element.classList.add("disable");
            break;
        case "4":
            players[0].player_element.classList.remove("fullheight");
            players[1].player_element.classList.remove("fullheight");
            players[2].player_element.classList.remove("disable");
            players[3].player_element.classList.remove("disable");
            break;
    }
    saveData();
}

function update(player) {
    if(auto_save == true) 
    {
        console.log("triggered")
        saveData();
    } else {
        console.log("??")
    }
    
    if(players[player].counter_element != null) 
    {
        players[player].counter_element.innerText = players[player].life;
        if(players[player].life <= 0) {
            players[player].counter_element.classList.add("dead");
        } else {
            players[player].counter_element.classList.remove("dead");
        }
    }
    
    if(players[player].counter_element_1 != null) 
    {
        players[player].counter_element_1.innerText = players[player].poison_counters;
    }

    if(players[player].name_element != null) 
    {
        players[player].name_element.innerText = players[player].name;
    }
    if(players[player].player_element != null) {
        switch(players[player].flip) {
            case 0:
                players[player].player_element.classList.remove("flip180");
                break;
            case 1:
                players[player].player_element.classList.add("flip180");
                break;
        }
    }
}

function clearData() {
    localStorage.clear();
}

function dataChange() {
    auto_save = autosaveBox.checked;
    if(auto_save == true) {
        saveButton.classList.add("disable");
    } else {
        saveButton.classList.remove("disable");
    }
    saveData();
}

function resetGame() {
    players.forEach(element => {
        element.life = 20;
        element.poison_counters = 0;
        update(element.id - 1);
    });
}

function saveData() {
    console.log("saved")
    localStorage.setItem("mtg-life_data", JSON.stringify(players));
    localStorage.setItem("mtg-life_autosave", auto_save);
    localStorage.setItem("mtg-life_players", pCounter.value);
}

function loadData() {
    let data = localStorage.getItem("mtg-life_data");

    if(data != null) 
    {
        console.log("loaded data");
        players = JSON.parse(data);
    } else {
        console.log("no data");
        players = structuredClone(default_data);
        saveData();
    }
}

function setData() {
    auto_save = localStorage.getItem("mtg-life_autosave") == 'true' || true;
    pCounter.value = localStorage.getItem("mtg-life_players") || 2;
    
    if(auto_save == true) {
        saveButton.classList.add("disable");
    } else {
        saveButton.classList.remove("disable");
    }
}

function increase(player, poison) {
    if(poison == true) 
    {
        players[player - 1].poison_counters += 1;
    } else {
        players[player - 1].life += 1;
    }
    update(player - 1);
}

function decrease(player, poison) {
    if(poison == true) {
        players[player - 1].poison_counters -= 1;
    } else {
        players[player - 1].life -= 1;
    }
    update(player - 1);
}

function setName(player) {
    let s = prompt("Player name (empty = no change)?");

    if(s.trim() != "" && s != null) {
        players[player - 1].name = s;
        update(player - 1);
    }
}

function flip(player) {
    switch(players[player - 1].flip) {
        case 0:
            players[player - 1].flip = 1;
            update(player - 1);
            break;
        case 1:
            players[player - 1].flip = 0;
            update(player - 1);
            break;
    }
}