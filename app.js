$(document).ready(function(){
    var playerLevel = 1;
    var playerTier = 0;
    var playerEXP = 0;
    var playerGold = 0;
    var unusedStatPoints = 0;
    var unusedSkillPoints = 0;
    var playerTotalHP;
    var playerCurrentHP;
    var playerATK;
    var playerDEF;
    var playerSTR = 10;
    var playerDEX = 10;
    var playerINT = 10;
    var playerVIT = 10;
    var playerWIS = 10;
    var monster;
    var monsterName;
    var monsterLevel;
    var monsterEXP;
    var monsterGold;
    var monsterHP;
    var monsterATK;
    var monsterDEF;
    var menu;
    var prevMenu;

    updatePlayerStats();

    //Setting where buttons take you, depth -> indicates nested buttons
    $("#adventure").click(function(){
        updatePlayerStats();
        menu = switchMenu("adventures");
    });

        $("#wolves").click(function(){
            menu = switchMenu("fight");
            setupFight("wolves");
        });

        $("#goblinScout").click(function(){
            menu = switchMenu("fight");
            setupFight("goblinScout");
        });

        $("#returnA").click(function(){
            menu = switchMenu("main");
        });

            $("#basicAttack").click(function(){
                monsterHP -= playerATK - monsterDEF;
                updateFight();
                playerCurrentHP -= monsterATK - playerDEF;
                updateFight();
                endFight();
            });

            $("#flee").click(function(){
                menu = switchMenu("main");
            });

        $("#anotherAdventure").click(function(){
            menu = switchMenu("adventures");
        });

        $("#refight").click(function(){
            menu = switchMenu("fight");
            setupFight(monster);
        });

        $("#returnEF").click(function(){
            menu = switchMenu("main");
        });


    $("#returnL").click(function(){
        menu = switchMenu(prevMenu);
    });

    $("#character").click(function(){
        menu = switchMenu("character");
        updatePlayerStats();
        updateStatsPage();
    });

        $("#manageStats").click(function(){
            menu = switchMenu("statButtons");
            updateStatsPage();
        });

            $("#STRplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerSTR++;
                    unusedStatPoints--;
                }
                updateStatsPage();
            });

            $("#DEXplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerDEX++;
                    unusedStatPoints--;
                }
                updateStatsPage();
            });

            $("#INTplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerINT++;
                    unusedStatPoints--;
                }
                updateStatsPage();
            });

            $("#VITplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerVIT++;
                    unusedStatPoints--;
                }
                updateStatsPage();
            });

            $("#WISplus1").click(function(){
                if(unusedStatPoints > 0) {
                    playerWIS++;
                    unusedStatPoints--;
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
        });

    $("#market").click(function(){
        menu = switchMenu("marketplace");
        changeMarket();
    });

        $("#returnM").click(function(){
            menu = switchMenu("main");
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
        var totalEXP = Math.round(Math.pow(((playerLevel-1)/0.1), 2)) + playerEXP;
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

    function resetStats(){
        if(unusedStatPoints == ((playerLevel - 1) * 5)){
            return;
        }
        if(playerGold >= (playerLevel * 50)){
            playerGold -= (playerLevel * 50);
            playerSTR = 10;
            playerDEX = 10;
            playerINT = 10;
            playerVIT = 10;
            playerWIS = 10;
            unusedStatPoints = ((playerLevel - 1) * 5);
            updatePlayerStats();
        }
    }

    //Calculates if you have enough experience to level up
    function levelUpCalc(){
        //current formula is (level/0.1)^2 to level
        if (playerEXP > Math.round(Math.pow((playerLevel/0.1), 2))){
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
        playerTotalHP = ((playerLevel*25)+100) * (Math.floor(playerLevel/25)+1);
        playerATK = 105;
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
                monsterATK = 5;
                monsterDEF = 2;
                playerCurrentHP = playerTotalHP;
                $("#monsterLevel").html("Level: " + monsterLevel);
                $("#monHP").html("HP: " + monsterHP);
                $("#playerHP").html("HP: " + playerTotalHP);
                break;
            case "goblinScout":
                $("#monsterName").html("Goblin Scout");
                monster = "goblinScout";
                monsterName = "Goblin Scout";
                monsterLevel = 5;
                monsterEXP = Math.floor(Math.random() * 100) + 80;
                monsterGold = Math.floor(Math.random() * 100) + 80;
                monsterHP = 20;
                monsterATK = 25;
                monsterDEF = 3;
                playerCurrentHP = playerTotalHP;
                $("#monsterLevel").html("Level: " + monsterLevel);
                $("#monHP").html("HP: " + monsterHP);
                $("#playerHP").html("HP: " + playerTotalHP);
                break;
            default:
                $("#monsterName").html("Bugged Abomination");
                monster = "buggedAbomination";
                monsterName = "Bugged Abomination (Please Report)";
                monsterLevel = 999;
                monsterEXP = Math.floor(Math.random() * 1000) + 1;
                monsterGold = Math.floor(Math.random() * 1000) + 1;
                monsterHP = 999999;
                monsterATK = 1;
                monsterDEF = 99999;
                playerCurrentHP = playerTotalHP;
                $("#monsterLevel").html("Level: " + monsterLevel);
                $("#monHP").html("HP: " + monsterHP);
                $("#playerHP").html("HP: " + playerTotalHP);
        }
    }

    //Updates mid fight stats like HP
    function updateFight(){
        $("#monHP").html("HP: " + monsterHP);
        $("#playerHP").html("HP: " + playerCurrentHP);
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
});