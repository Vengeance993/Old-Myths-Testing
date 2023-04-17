$(document).ready(function(){
    var playerLevel = 1;
    var playerTier = 0;
    var playerEXP = 0;
    var playerGold = 0;
    var unusedStatPoints = 5;
    var unusedSkillPoints = 2;
    var playerSTR = 10;
    var playerDEX = 10;
    var playerINT = 10;
    var playerVIT = 10;
    var playerWIS = 10;

    var playerTotalHP;
    var playerCurrentHP;
    var playerTotalMana;
    var playerCurrentMana;
    var playerATK;
    var playerDEF;

    var monster;
    var monsterName;
    var monsterLevel;
    var monsterEXP;
    var monsterGold;
    var monsterHP;
    var monsterMana;
    var monsterATK;
    var monsterDEF;

    var menu;
    var prevMenu;

    checkSave();
    loadData();
    updatePlayerStats();
    menu = switchMenu("main");
    setInterval(function(){
        saveData();
    }, 10000);

    //Setting where buttons take you, depth -> indicates nested buttons
    $("#adventure").click(function(){
        updatePlayerStats();
        menu = switchMenu("adventures");
        console.log("Go to Adventures Screen");
    });

        $("#wolves").click(function(){
            menu = switchMenu("fight");
            setupFight("wolves");
            console.log("Go to Wolf Fight Screen");
        });

        $("#goblinScout").click(function(){
            menu = switchMenu("fight");
            setupFight("goblinScout");
            console.log("Go to Goblin Scout Fight Screen");
        });

        $("#returnA").click(function(){
            menu = switchMenu("main");
            console.log("Go to Town Screen");
        });

            $("#basicAttack").click(function(){
                console.log("Damage is "  + (playerATK - monsterDEF));
                monsterHP -= playerATK - monsterDEF;
                console.log("Monster HP is " + monsterHP);
                updateFight();
                console.log("Check if Fight is Over");
                endFight();

                console.log("Damage is " + (monsterATK - playerDEF));
                playerCurrentHP -= monsterATK - playerDEF;
                console.log("Player HP is " + playerCurrentHP);
                updateFight();
                console.log("Check if Fight is Over");
                endFight();
            });

            $("#flee").click(function(){
                menu = switchMenu("main");
                console.log("Go to Town Screen");
            });

        $("#anotherAdventure").click(function(){
            menu = switchMenu("adventures");
            console.log("Go to Adventures Screen");
        });

        $("#refight").click(function(){
            menu = switchMenu("fight");
            setupFight(monster);
            console.log("Fight Same Monster");
        });

        $("#returnEF").click(function(){
            menu = switchMenu("main");
            console.log("Go to Town Screen");
        });


    $("#returnL").click(function(){
        menu = switchMenu(prevMenu);
        console.log("Go to Previous Screen");
    });

    $("#character").click(function(){
        menu = switchMenu("character");
        console.log("Go to Character Screen");
        updatePlayerStats();
        updateStatsPage();
    });

        $("#manageStats").click(function(){
            menu = switchMenu("statButtons");
            console.log("Go to Stats Screen");
            updateStatsPage();
        });

            $("#STRplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerSTR++;
                    unusedStatPoints--;
                    console.log("Increase STR by 1");
                }
                updateStatsPage();
            });

            $("#DEXplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerDEX++;
                    unusedStatPoints--;
                    console.log("Increase DEX by 1");
                }
                updateStatsPage();
            });

            $("#INTplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerINT++;
                    unusedStatPoints--;
                    console.log("Increase INT by 1");
                }
                updateStatsPage();
            });

            $("#VITplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerVIT++;
                    unusedStatPoints--;
                    console.log("Increase VIT by 1");
                }
                updateStatsPage();
            });

            $("#WISplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerWIS++;
                    unusedStatPoints--;
                    console.log("Increase WIS by 1");
                }
                updateStatsPage();
            });

            $("#resetStats").click(function(){
                resetStats();
                updateStatsPage();
            });

            $("#returnS").click(function(){
                menu = switchMenu("character");
            });

        $("#returnC").click(function(){
            menu = switchMenu("main");
            console.log("Go to Town Screen");
        });

    $("#market").click(function(){
        menu = switchMenu("marketplace");
        changeMarket();
    });

        $("#returnM").click(function(){
            menu = switchMenu("main");
            console.log("Go to Town Screen");
        });

    $("#save").click(function(){
        saveData();
    });

    $("#load").click(function(){
        loadData();
    });

    $("#delete").click(function(){
        deleteData();
    });

    //Updates player related stats that need often updates like exp and gold
    function updatePlayerStats(){
        $("#gold").html("Gold: $" + playerGold);

        levelUpCalc();
        statCalc();

        $("#tier").html("Tier: " + playerTier);
        $("#level").html("Level: " + playerLevel);
        $("#exp").html("Experience: " + playerEXP);
        $("#expReq").html("Experience Required to Level: " + Math.round(Math.pow((playerLevel/0.1), 2)));
    }

    //Updates stats and unallocated stats points on managae stats page
    function updateStatsPage(){
        $("#playerLevel").html("Level: " + playerLevel);
        $("#playerEXPtoLevel").html("Experience to level: " + Math.round(Math.pow((playerLevel/0.1), 2)));
        var totalEXP = 0;
        for(let i = 1; i <= playerLevel-1; i++){
            totalEXP += Math.round(Math.pow((i/0.1), 2)) + playerEXP;
        }
        $("#playerTotalEXP").html("Total Experience: " + totalEXP);

        $("#unusedStatPoints").html("Unallocated Stat Points: " + unusedStatPoints);
        $("#unusedStatPoints2").html("Unallocated Stat Points: " + unusedStatPoints);
        $("#STR").html("STR: " + playerSTR);
        $("#STR2").html("STR: " + playerSTR);
        $("#DEX").html("DEX: " + playerDEX);
        $("#DEX2").html("DEX: " + playerDEX);
        $("#INT").html("INT: " + playerINT);
        $("#INT2").html("INT: " + playerINT);
        $("#VIT").html("VIT: " + playerVIT);
        $("#VIT2").html("VIT: " + playerVIT);
        $("#WIS").html("WIS: " + playerWIS);
        $("#WIS2").html("WIS: " + playerWIS);

        $("#resetStats").html("Pay " + (playerLevel * 50) + " gold to reset stats");
    }

    //Resets stats if you have the gold
    function resetStats(){
        if(unusedStatPoints == ((playerLevel - 1) * 5)){
            console.log("No Stats Points Spent: No Reset");
            return;
        }
        if(playerGold >= (playerLevel * 50)){
            console.log("Reseting Stats for " + (playerLevel * 50) + " gold.");
            playerGold -= (playerLevel * 50);
            playerSTR = 10;
            playerDEX = 10;
            playerINT = 10;
            playerVIT = 10;
            playerWIS = 10;
            unusedStatPoints = (playerLevel * 5);
            updatePlayerStats();
        }
    }

    //Calculates if you have enough experience to level up
    function levelUpCalc(){
        //current formula is (level/0.1)^2 to level
        if (playerEXP > Math.round(Math.pow((playerLevel/0.1), 2))){
            console.log("Enough Experience to level, going from " + playerLevel + " to " + (playerLevel+1));
            playerEXP -= Math.round(Math.pow((playerLevel/0.1), 2));
            playerLevel++;
            unusedStatPoints += 5;
            unusedSkillPoints += 2;
            $("#levelMsg2").html("You are now level " + playerLevel + "!");
            menu = switchMenu("levelUp");
        }
    }

    //Calculates stats that rely on level or stats
    function statCalc(){
        playerTotalHP = ((playerLevel * 15) * (Math.floor(playerLevel/25) + 1) + (playerVIT * 20));
        playerTotalMana = ((playerLevel * 15) * (Math.floor(playerLevel/25) + 1) + (playerINT * 20));
        playerATK = 125;
        playerDEF = 5;
    }

    //Function sets up a fight using the name of monster as parameter, each monster is a switch case
    function setupFight(monsterParam){
        switch(monsterParam) {
            case "wolves":
                $("#monsterName").html("Wolf");
                monster = "wolves";
                monsterName = "Wolf";
                monsterLevel = 1;
                monsterEXP = Math.floor(Math.random() * 5) + 1;
                monsterGold = Math.floor(Math.random() * 5) + 1;
                monsterHP = 10;
                monsterMana = 100;
                monsterATK = 5;
                monsterDEF = 2;
                playerCurrentHP = playerTotalHP;
                $("#monsterLevel").html("Level: " + monsterLevel);
                $("#monHP").html("HP: " + monsterHP);
                $("#monMana").html("Mana: " + monsterMana);
                $("#playerHP").html("HP: " + playerTotalHP);
                $("#playerMana").html("Mana: " + playerTotalMana);
                break;
            case "goblinScout":
                $("#monsterName").html("Goblin Scout");
                monster = "goblinScout";
                monsterName = "Goblin Scout";
                monsterLevel = 5;
                monsterEXP = Math.floor(Math.random() * 100) + 80;
                monsterGold = Math.floor(Math.random() * 100) + 80;
                monsterHP = 20;
                monsterMana = 200;
                monsterATK = 25;
                monsterDEF = 3;
                playerCurrentHP = playerTotalHP;
                $("#monsterLevel").html("Level: " + monsterLevel);
                $("#monHP").html("HP: " + monsterHP);
                $("#monMana").html("Mana: " + monsterMana);
                $("#playerHP").html("HP: " + playerTotalHP);
                $("#playerMana").html("Mana: " + playerTotalMana);
                break;
            default:
                $("#monsterName").html("Bugged Abomination");
                monster = "buggedAbomination";
                monsterName = "Bugged Abomination (Please Report)";
                monsterLevel = 999;
                monsterEXP = Math.floor(Math.random() * 1000) + 1;
                monsterGold = Math.floor(Math.random() * 1000) + 1;
                monsterHP = 999999;
                monsterMana = 999999;
                monsterATK = 1;
                monsterDEF = 99999;
                playerCurrentHP = playerTotalHP;
                $("#monsterLevel").html("Level: " + monsterLevel);
                $("#monHP").html("HP: " + monsterHP);
                $("#monMana").html("Mana: " + monsterMana);
                $("#playerHP").html("HP: " + playerTotalHP);
                $("#playerMana").html("Mana: " + playerTotalMana);
        }
    }

    //Updates mid fight stats like HP
    function updateFight(){
        $("#monHP").html("HP: " + monsterHP);
        $("#monMana").html("Mana: " + monsterMana);
        $("#playerHP").html("HP: " + playerCurrentHP);
        $("#playerMana").html("Mana: " + playerCurrentMana);
    }

    //Checks if a player or monster died in the fight
    function endFight(){
        if(monsterHP <= 0){
            $("#endMsg1").html("You have killed " + monsterName + ".");
            $("#endMsg2").html("You earn " + monsterGold + " gold and " + monsterEXP + " experience.");
            playerGold += monsterGold;
            playerEXP += monsterEXP;
            menu = switchMenu("endFight");
            updatePlayerStats();
        }
        if(playerCurrentHP <= 0){
            var lostGold = (playerLevel * (Math.floor(Math.random() * 10) + 1));
            $("#endMsg1").html("You have been killed by " + monsterName + ".");
            $("#endMsg2").html("You lose " + lostGold + " gold.");
            playerGold -= lostGold;
            if(playerGold < 0) {
                playerGold = 0;
            }
            menu = switchMenu("endFight");
            updatePlayerStats();
        }
    }

    function changeMarket(){

    }

    //Switches menues and stores previous menu
    function switchMenu(newMenu){
        prevMenu = menu;
        menu = newMenu;
        $(".menus").children().css("display", "none");
        $("." + newMenu).css("display", "block");
        return newMenu;
    }

    function checkSave(){
        if(localStorage.getItem("save") == null){
            console.log("No Save Detected: Making Empty Save");
            var save = {
                playerLevel: 0,
                playerTier: 0,
                playerEXP: 0,
                playerGold: 0,
                unusedStatPoints: 5,
                unusedSkillPoints: 3,
                playerSTR: 10,
                playerDEX: 10,
                playerINT: 10,
                playerVIT: 10,
                playerWIS: 10
            }
    
            localStorage.setItem("save",JSON.stringify(save));
        }
    }

    function saveData(){
        console.log("Saving Game");
        var save = {
            playerLevel: playerLevel,
            playerTier: playerTier,
            playerEXP: playerEXP,
            playerGold: playerGold,
            unusedStatPoints: unusedStatPoints,
            unusedSkillPoints: unusedSkillPoints,
            playerSTR: playerSTR,
            playerDEX: playerDEX,
            playerINT: playerINT,
            playerVIT: playerVIT,
            playerWIS: playerWIS
        }

        localStorage.setItem("save",JSON.stringify(save));
    }

    function loadData(){
        console.log("Loading Save Game");
        var savegame = JSON.parse(localStorage.getItem("save"));
        if (typeof savegame.playerLevel !== "undefined") playerLevel = savegame.playerLevel;
        if (typeof savegame.playerTier !== "undefined") playerTier = savegame.playerTier;
        if (typeof savegame.playerEXP !== "undefined") playerEXP = savegame.playerEXP;
        if (typeof savegame.playerGold !== "undefined") playerGold = savegame.playerGold;
        if (typeof savegame.unusedStatPoints !== "undefined") unusedStatPoints = savegame.unusedStatPoints;
        if (typeof savegame.unusedSkillPoints !== "undefined") unusedSkillPoints = savegame.unusedSkillPoints;
        if (typeof savegame.playerSTR !== "undefined") playerSTR = savegame.playerSTR;
        if (typeof savegame.playerDEX !== "undefined") playerDEX = savegame.playerDEX;
        if (typeof savegame.playerINT !== "undefined") playerINT = savegame.playerINT;
        if (typeof savegame.playerVIT !== "undefined") playerVIT = savegame.playerVIT;
        if (typeof savegame.playerWIS !== "undefined") playerWIS = savegame.playerWIS;
        updatePlayerStats();
    }

    function deleteData(){
        console.log("Deleting Save Game");
        localStorage.removeItem("save");
        checkSave();
        updatePlayerStats();
    }
});

