var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.000,

    addToScore: function (amount) {
        this.score += amount;
        this.totalScore += amount;
        display.updateScore();
    },

    getScorePerSecond: function () {
        var scorePerSecond = 0;
        for (i = 0; i < building.name.length; i++) {
            scorePerSecond += building.income[i] * building.count[i];
        }
        return scorePerSecond;
    }
};

// Creating Buildings
var building = {
    name: [
        "Work-term Student",
        "Captain | Co-Captain",
        "Developer",
        "Senior Member",
        "Verafin Fairy"
    ],
    image: [
        "workterm.gif",
        "captain.gif",
        "developer.gif",
        "senior_member.gif",
        "verafin_fairy.gif"
    ],
    count: [0, 0, 0, 0, 0],
    income: [
        1,
        15,
        155,
        1555,
        15555

    ],
    cost: [
        100,
        1000,
        10000,
        100000,
        1000000
    ],

    purchase: function (index) {
        if (game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index] += 1;
            this.cost[index] = Math.ceil(this.cost[index] * 1.10);
            display.updateScore();
            display.updateShop();
            // display.updateUpgrades();
        }
    }
};

// Creating Building Cursor/Clicker Upgrades
// var upgrade = {
//     name: [
//         "Stone Cursors",
//         "Bronze Cursors",
//         "Golden Cursors",
//         "Stone Clicker",
//         // Oven Upgrades
//         "Medium Oven",
//         "Industrial Oven"

//     ],
//     description: [
//         "Cursors are twice as efficient!",
//         "Cursors are twice as efficient!",
//         "Cursors are twice as efficient!",
//         "The mouse is twice as efficient!",
//         // Oven Upgrades
//         "Ovens are twice as efficient!",
//         "Ovens are twice as efficient!"
//     ],
//     image: [
//         "stone_cursor.gif",
//         "bronze_cursor.gif",
//         "golden_cursor.gif",
//         "stone_clicker.gif",
//         // Oven Images
//         "medium_oven.gif",
//         "industrial_oven.gif"
//     ],
//     type: [
//         "building",
//         "building",
//         "building",
//         "click",
//         // Oven Upgrades
//         "building",
//         "building"
//     ],
//     cost: [
//         300,
//         500,
//         700,
//         300,
//         // Oven Upgrades
//         400,
//         600
//     ],
//     buildingIndex: [
//         0,
//         0,
//         0,
//         -1,
//         // Oven Upgrades
//         1,
//         1
//     ],
//     requirement: [
//         1,
//         5,
//         10,
//         1,
//         // Oven Upgrades
//         1,
//         5
//     ],
//     bonus: [
//         2,
//         2,
//         2,
//         2,
//         // Oven Upgrades
//         2,
//         2
//     ],
//     purchased: [
//         false,
//         false,
//         false,
//         false,
//         false,
//         false
//     ],


//     purchase: function (index) {
//         if (!this.purchased[index] && game.score >= this.cost[index]) {
//             if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
//                 game.score -= this.cost[index];
//                 building.income[this.buildingIndex[index]] *= this.bonus[index];
//                 this.purchased[index] = true;

//                 display.updateUpgrades();
//                 display.updateScore();
//             } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
//                 game.score -= this.cost[index];
//                 game.clickValue *= this.bonus[index];
//                 this.purchased[index] = true;

//                 display.updateUpgrades();
//                 display.updateScore();
//             }
//         }
//     }
// };

// Adding achievements
var achievement = {
    name: [
        "Not much, but it's honest work!",
        "Rookie Numbers",
        "A Click a Day...",
        "Working Automated?",
        "There must be a bug?",
        "Your Finger Hurt Yet?"
    ],
    description: [
        "Recruit 1 work-term student!",
        "Close 5 ETL Cases!",
        "Click *Close Case* 10 times!",
        "Click *Close Case* 25 times!",
        "Close 100 ETL Cases!",
        "Click 1000 times!"
    ],
    image: [
        "workterm_award.png",
        "award.png",
        "award.png",
        "award.png",
        "award.png",
        "award.png"
    ],
    type: [
        "building",
        "score",
        "click",
        "click",
        "score",
        "click"
    ],
    requirement: [
        1,
        5,
        10,
        25,
        100,
        1000
    ],
    objectIndex: [
        0,
        -1,
        -1,
        -1,
        -1,
        -1
    ],
    awarded: [false, false, false, false, false, false],

    earn: function (index) {
        this.awarded[index] = true;
    }
};

// Displaying all the information for the game
var display = {
    updateScore: function () {
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
        document.title = game.score + " Cases Closed!";
    },
    updateShop: function () {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase(' + i + ')"><tr><td id="image"><img src="images/' + building.image[i] + '"></td><td id="nameAndCost"><p>' + building.name[i] + '</p><p><span>' + building.cost[i] + '</span> ~Total Cases Closed to Unlock</p></td><td id="amount"><span>' + building.count[i] + '</span></td></tr></table>';
        }
    },
    // updateUpgrades: function () {
    //     document.getElementById("upgradeContainer").innerHTML = "";
    //     for (i = 0; i < upgrade.name.length; i++) {
    //         if (!upgrade.purchased[i]) {
    //             if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
    //                 document.getElementById("upgradeContainer").innerHTML += '<img src="images/' + upgrade.image[i] + '" title="' + upgrade.name[i] + ' &#10; ' + upgrade.description[i] + ' &#10; (' + upgrade.cost[i] + ' pizzas)" onclick="upgrade.purchase(' + i + ')">';
    //             } else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
    //                 document.getElementById("upgradeContainer").innerHTML += '<img src="images/' + upgrade.image[i] + '" title="' + upgrade.name[i] + ' &#10; ' + upgrade.description[i] + ' &#10; (' + upgrade.cost[i] + ' pizzas)" onclick="upgrade.purchase(' + i + ')">';

    //             }
    //         }
    //     }
    // },
    updateAchievements: function () {
        document.getElementById("achievementContainer").innerHTML = "";
        for (i = 0; i < achievement.name.length; i++) {
            if (achievement.awarded[i]) {
                document.getElementById("achievementContainer").innerHTML += '<img src="images/' + achievement.image[i] + '" title="' + achievement.name[i] + ' &#10; ' + achievement.description[i] + '">';
            }
        }
    }
};

// function to save the state of the game
function saveGame() {
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        // upgradePurchased: upgrade.purchased,
        achievementAwarded: achievement.awarded
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

// function to load the saved state
function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
        // if (typeof savedGame.upgradePurchased !== "undefined") {
        //     for (i = 0; i < savedGame.upgradePurchased.length; i++) {
        //         upgrade.purchased[i] = savedGame.upgradePurchased[i];
        //     }
        // }
        if (typeof savedGame.achievementAwarded !== "undefined") {
            for (i = 0; i < savedGame.achievementAwarded.length; i++) {
                achievement.awarded[i] = savedGame.achievementAwarded[i];
            }
        }
    }
}

// function to reset game progress 
function resetGame() {
    if (confirm("Are you sure you would like to reset your progress?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function fadeOut(element, duration, finalOpacity, callback) {
    let opacity = 1;

    let elementFadingInterval = window.setInterval(function () {
        opacity -= 50 / duration;

        if (opacity <= finalOpacity) {
            clearInterval(elementFadingInterval);
            callback();
        }
        element.style.opacity = opacity;
    }, 50);
}

function createNumberOnClicker(event) {
    // Grab the clicker
    let clicker = document.getElementById("clicker");

    // Grab the position on where the clicker was clicked
    let clickerOffset = clicker.getBoundingClientRect();
    let position = {
        x: event.pageX - clickerOffset.left + randomNumber(-5, 5),
        y: event.pageY - clickerOffset.top
    };

    // Create the number
    let element = document.createElement("div");
    element.textContent = "+" + game.clickValue;
    element.classList.add("number", "unselectable");
    element.style.left = position.x + "px";
    element.style.top = position.y + "px";

    // Add the number to the clicker
    clicker.appendChild(element);

    // Slowly rise the element to top of the screen
    let movementInterval = window.setInterval(function () {
        if (typeof element == "undefined" && element == null) clearInterval(movementInterval);
        position.y--;
        element.style.top = position.y + "px";
    }, 10);

    // Slowly fade number out
    fadeOut(element, 3000, 0, function () {
        element.remove();
    });
}



document.getElementById("clicker").addEventListener("click", function (event) {
    game.totalClicks++;
    game.addToScore(game.clickValue);

    createNumberOnClicker(event);
}, false);

// functions that executes when window loads
window.onload = function () {
    loadGame();
    display.updateScore();
    display.updateShop();
    // display.updateUpgrades();
    display.updateAchievements();
};

// Update score
setInterval(function () {
    for (i = 0; i < achievement.name.length; i++) {
        if (achievement.type[i] == "score" && game.totalScore >= achievement.requirement[i]) achievement.earn(i);
        else if (achievement.type[i] == "click" && game.totalClicks >= achievement.requirement[i]) achievement.earn(i);
        else if (achievement.type[i] == "building" && building.count[achievement.objectIndex[i]] >= achievement.requirement[i]) achievement.earn(i);
    }
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    display.updateScore();
    display.updateAchievements();
}, 1000); // 1000ms = 1 second

setInterval(function () {
    display.updateScore();
    // display.updateUpgrades();
}, 10000);

// use ctrl + s to save
window.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.which == 83) { //ctrl + s
        event.preventDefault();
        saveGame();
    }
}, false);