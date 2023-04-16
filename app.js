$(document).ready(function(){
    var playerLevel;
    var playerTier;
    var playerEXP;
    var playerGold;
    var playerTotalHP;
    var playerCurrentHP;
    var playerATK;
    var playerDEF;
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

    $("#adventure").click(function(){
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

    $("#market").click(function(){
        menu = switchMenu("marketplace");
        changeMarket();
    });

        $("#returnM").click(function(){
            menu = switchMenu("main");
        });

    function updatePlayerStats(){
        $("#gold").html("Gold: $" + playerGold);

        levelUpCalc();
        statCalc();

        $("#tier").html("Tier: " + playerTier);
        $("#level").html("Level: " + playerLevel);
        $("#exp").html("Experience: " + playerEXP);
        $("#expReq").html("Experience Required to Level: " + Math.round(Math.pow((playerLevel/0.1), 2)));
    }

    function levelUpCalc(){
        //current (level/0.1)^2 to level
        if (playerEXP > Math.round(Math.pow((playerLevel/0.1), 2))){
            playerEXP -= Math.round(Math.pow((playerLevel/0.1), 2));
            playerLevel++;
            $("#levelMsg2").html("You are now level " + playerLevel + "!");
            menu = switchMenu("levelUp");
        }
    }

    function statCalc(){
        
    }

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
                playerCurrentHP = playerTotalHP;
                $("#monsterLevel").html("Level: " + monsterLevel);
                $("#monHP").html("HP: " + monsterHP);
                $("#playerHP").html("HP: " + playerTotalHP);
        }
    }

    function updateFight(){
        $("#monHP").html("HP: " + monsterHP);
        $("#playerHP").html("HP: " + playerCurrentHP);
    }

    function endFight(){
        if(monsterHP <= 0){
            $("#endMsg1").html("You have killed " + monsterName + ".");
            $("#endMsg2").html("You earn " + monsterGold + " gold and " + monsterEXP + " experience.");
            playerGold += monsterGold;
            playerEXP += monsterEXP;
            menu = switchMenu("endFight");
            updatePlayerStats();
        }
    }

    function changeMarket(){

    }

    function switchMenu(newMenu){
        prevMenu = menu;
        menu = newMenu;
        $(".menus").children().css("display", "none");
        $("." + newMenu).css("display", "block");
        return newMenu;
    }
});