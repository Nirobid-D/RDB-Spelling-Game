let wordsByLevel = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
let playerNames = {};
let scoresByPlayer = {};
let usedWordsByLevel = { 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set(), 5: new Set(), 6: new Set() };
let currentLevel = 1;
let currentWord = "";
let currentPlayer = 1;
const CLEAR_DATA_PASSWORD = "RDB";

// Hardcoded CSV data
const csvData = `
Level 1,Level 2,Level 3,Level 4,Level 5,Level 6,Player Number,Player Name
apple,able,abandon,abandon,abundance,abbreviation,1,1
ball,baby,basket,bacteria,brilliant,bizarre,2,2
cat,back,candy,calendar,celebrate,candid,3,3
dog,cake,dolphin,distant,difference,declaration,4,4
egg,dance,enough,economy,emergency,exquisite,5,5
fish,easy,forest,fraction,fortunate,fascinate,6,6
go,farm,giraffe,grateful,generous,gregarious,7,7
hat,gate,horizon,horizon,horizon,hilarious,8,8
ink,hand,island,invisible,inspire,hypothesis,9,9
jet,jump,jungle,journey,jungle,illustrate,10,10
kite,kite,kitchen,kingdom,knowledge,juxtapose,11,11
lion,lamp,library,library,library,knowledge,12,12
man,mice,machine,mysterious,magnitude,latitude,13,13
net,nose,nature,notebook,neighborhood,manipulate,14,14
orange,open,octopus,opinion,organize,necessary,15,15
pen,park,puzzle,possible,persuade,obligatory,16,16
queen,quiz,quietly,quarantine,question,parliament,17,17
rain,race,rainbow,reptile,reliable,quarantine,18,18
sun,shoe,secret,sentence,sensitive,reliable,19,19
tree,tree,together,together,traditional,significant,20,20
umbrella,unit,unique,umbrella,universe,threshold,21,21
van,vase,volcano,volunteer,vocabulary,unpredictable,22,22
water,walk,wonder,whisper,wonderful,variety,23,23
x-ray,yarn,xylophone,xylophone,xylophone,wilderness,24,24
yarn,zoo,yacht,yesterday,yesterday,xenophobia,25,25
zoo,ant,zebra,zoo,zealous,yearning,26,26
ant,bird,acorn,adventure,accumulate,zephyr,27,27
box,coat,bottle,bravery,beneficial,accommodate,28,28
car,door,cactus,capital,cautious,benevolent,29,29
door,egg,dragon,decade,delicate,courageous,30,30
ear,frog,eagle,exercise,essential,dilemma,31,31
fly,gift,feather,fascinate,frequent,elegant,32,32
grape,hill,garden,glimpse,grateful,fascination,33,33
hill,ice,hockey,horizon,harmony,grateful,34,34
ice,jail,iguana,isolate,incredible,harassment,35,35
jump,kite,jacket,jigsaw,justice,incredible,36,36
king,leaf,kettle,kitchen,kinetic,juxtaposition,37,37
leaf,moon,lighthouse,luminous,leisure,kinetic,38,38
moon,nest,monkey,mechanical,mysterious,liberate,39,39
nose,ocean,nightly,neighborhood,nominate,mysterious,40,40
owl,pet,orange,october,obstacle,negligible,41,41
pig,queen,planet,penguin,perform,optimistic,42,42
queen,river,quiver,quiver,question,persistence,43,43
rose,sun,robot,reflection,recovery,quixotic,44,44
star,town,sunset,schedule,strategy,reliable,45,45
train,user,tiger,trouble,transform,sensitive,46,46
up,vote,unicorn,umbrella,unique,turbulent,47,47
vase,wish,village,vacation,visible,ultimate,48,48
whale,year,whistle,whistle,whisper,vivid,49,49
fox,zip,x-ray,xylophone,xenon,withdrawal,50,50
grape,apple,yellow,yacht,yarn,xylophone,51,51
hand,block,zoo,zebra,zebra,yesterday,52,52
ice,cloud,apple,actor,ambitious,zealous,53,53
jar,drive,bridge,brilliant,bilingual,antique,54,54
key,elephant,clover,carpet,courageous,beneficiary,55,55
lamp,fly,dolphin,discover,decision,capable,56,56
mop,grass,excited,envelope,elevate,dedication,57,57
nest,home,fish,fascinate,freedom,empathy,58,58
owl,island,guitar,giraffe,genuine,flourish,59,59
pat,jelly,happy,heroic,horizon,genuine,60,60
queen,kiwi,insect,inspire,include,hypothetical,61,61
rope,lemon,jungle,jungle,jovial,integrity,62,62
sand,mango,kitchen,kaleidoscope,knowledge,jeopardize,63,63
tiger,night,lemur,location,luxurious,kerchief,64,64
unit,ocean,mango,mysterious,motivate,logical,65,65
vase,pen,narrow,natural,navigate,momentous,66,66
wind,queen,ocean,obstacle,objective,nurture,67,67
yarn,rock,peacock,puzzle,precious,overwhelming,68,68
zoo,school,quest,question,question,precision,69,69
all,train,reptile,recovery,reliable,quibble,70,70
big,under,snowman,spectrum,solution,resilient,,
chip,view,trophy,tropical,thriving,strategic,,
duck,wind,underwater,unicorn,understand,tranquility,,
elephant,yellow,violet,variety,variety,unique,,
fish,zebra,whale,wonderful,wilderness,vocabulary,,
goat,bat,xylophone,xenon,xylophone,wonderful,,
hat,cat,yarn,yarn,yacht,xenon,,
ice,dog,zoo,zephyr,zephyr,yearly,,
jungle,ear,afraid,ancient,activity,zeal,,
kitten,fish,biscuit,beautiful,balance,admire,,
lamp,gold,cousin,courage,creative,beneficial,,
milk,hat,dinner,delight,distract,contrast,,
night,ink,eagle,evidence,effort,desperate,,
orange,jack,flame,family,fabric,evidence,,
pencil,kite,glove,glacier,genuine,fluctuate,,
quiet,lion,honey,hiking,harmony,generosity,,
rain,milk,imagine,iceberg,indicate,heritage,,
snow,nut,jellyfish,jungle,jovial,identity,,
tiger,owl,kitchen,kittens,kaleidoscope,jovial,,
under,paint,lizard,lighthouse,legend,kinship,,
vase,quilt,morning,magnet,memorable,liberate,,
worm,rose,nightmare,navigate,nurture,maintain,,
yawn,star,octopus,ocean,obstacle,nurturing,,
zebra,tree,penguin,puzzle,passionate,opportune,,
ant,ugly,quack,recycle,quality,practical,,
bear,van,rocket,sincere,recycle,,,
cup,water,shell,traditional,sculpture,,,
doll,box,turtle,unique,tradition,,,
egg,chair,umbrella,vocabulary,urgent,,,
fish,drum,vivid,whisper,vivid,,,
grape,earth,winter,xenophobia,wholesome,,,
home,fan,xylophone,yogurt,xenon,,,
igloo,giraffe,yawn,zealous,yearly,,,
jump,hand,zebra,artistic,zoo,,,
kite,ice,angle,beneficial,adapt,,,
leaf,jacket,backpack,conclude,benefit,,,
mice,kite,clay,desert,complete,,,
nest,lamp,drum,emergency,drastic,,,
open,monkey,eagle,freedom,examine,,,
pen,nose,frost,generate,frequent,,,
quilt,oven,glue,horizon,genuine,,,
rose,pen,hero,include,horizon,,,
sun,queen,iceberg,justice,innovation,,,
top,rabbit,jewel,knapsack,jungle,,,
ugly,soap,kiosk,lively,keen,,,
vase,tiger,lucky,marble,luminous,,,
whale,umbrella,message,noteworthy,mystery,,,
xylophone,vase,noodle,observe,navigate,,,
yarn,whale,oyster,parallel,opportunity,,,
zipper,x-ray,pencil,quality,persistent,,,
able,yarn,quilt,reliable,question,,,
bread,zoo,raccoon,strength,resolve,,,
clay,angel,space,triumph,strength,,,
dog,bread,telescope,urgent,talent,,,
ear,cloud,unicorn,vivid,unique,,,
fire,duck,vacuum,wonder,versatile,,,
gate,enough,whale,xylophone,wonderful,,,
hill,floor,x-ray,yacht,xylophone,,,
iron,green,yellow,zephyr,youth,,,
jar,house,zipper,accurate,zeal,,,
king,ice,artist,boundary,adaptable,,,
lime,joke,beach,creative,beneficial,,,
moon,kitchen,chicken,determine,courageous,,,
neck,leaf,dough,elevate,detailed,,,
oven,mice,eagle,fantastic,essential,,,
pear,nurse,fountain,genuine,fortunate,,,
quack,orange,garden,highlight,generosity,,,
ribbon,peach,host,identify,historic,,,
sand,quiet,insect,journey,inspire,,,
toys,robot,jungle,kindness,jubilant,,,
user,snake,kaleidoscope,literature,knowledge,,,
visit,toys,lighthouse,mysterious,leadership,,,
wish,umbrella,magnet,neatly,motivate,,,
yolk,vivid,neat,option,noteworthy,,,
zoo,well,octagon,perfect,option,,,
able,extra,puzzle,quantity,perspective,,,
boat,yellow,rainbow,reliable,quality,,,
clocks,zebra,snowflake,significant,respect,,,
dino,bag,triangle,treat,sincere,,,
elephant,camp,upstairs,universe,tactical,,,
fish,dove,violet,victory,universal,,,
giant,edge,whisk,whistle,valuable,,,
horn,fire,xylophone,xylophone,whisper,,,
ice,glue,yard,young,xenon,,,
juice,hill,zebra,zebra,yearn,,,
kite,ice,actor,aggressive,zephyr,,,
love,juice,beetle,blossom,affectionate,,,
monkey,king,cowboy,concept,benevolent,,,
nice,light,desk,diligent,collaborate,,,
ocean,moon,eagle,eagle,discover,,,
purple,night,fountain,fashion,engage,,,
quiet,open,grape,glow,focus,,,
run,pen,height,harmony,genuine,,,
sock,quilt,invite,important,heritage,,,
toy,race,jacket,justice,imagine,,,
umbrella,snow,knot,keynote,jovial,,,
vest,top,lighthouse,loyal,kaleidoscope,,,
wind,unit,mushroom,magnet,literature,,,
yellow,vase,nutmeg,novel,momentum,,,
zoo,wind,orange,optimize,navigate,,,
,xylophone,pearl,practical,overcome,,,
,yarn,quilt,quote,passionate,,,
,zoo,robot,recovery,quintessential,,,
,act,squirrel,strategy,rewarding,,,
,burn,trophy,transmit,survive,,,
,chat,understand,uniform,tolerant,,,
,desk,volcano,vacation,understand,,,
,exit,whistle,wilderness,vivid,,,
,fish,x-ray,extraordinary,wilderness,,,
,grow,yellow,yesterday,xylophone,,,
,hop,zebra,zeal,yarn,,,
,idea,,,zealous,,,
,jelly,,,,,,
,kite,,,,,,
,log,,,,,,
,moon,,,,,,
,nest,,,,,,
,pencil,,,,,,
,quick,,,,,,
,rose,,,,,,
,sand,,,,,,
,tall,,,,,,
,use,,,,,,
,vest,,,,,,
,wand,,,,,,
,x-ray,,,,,,
,yarn,,,,,,
,zone,,,,,,
`;

// Function to parse the hardcoded CSV data
function parseCSV(text) {
    const lines = text.trim().split("\n");
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(",");
        for (let j = 0; j < 6; j++) {
            let word = columns[j].trim();
            if (word) {
                wordsByLevel[j + 1].push(word);
            }
        }
        let playerNumber = columns[6].trim();
        let playerName = columns[7].trim();
        if (playerNumber && playerName) {
            playerNames[playerNumber] = playerName;
        }
    }
    getRandomWord();
}

function getRandomWord() {
    let words = wordsByLevel[currentLevel].filter(word => !usedWordsByLevel[currentLevel].has(word));
    
    if (words.length > 0) {
        currentWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById("spelling-input").value = "";
        document.getElementById("feedback").innerText = "";
    } else {
        currentWord = "";
        document.getElementById("feedback").innerText = "No more words available.";
    }
}

function checkSpelling() {
    let userSpelling = document.getElementById("spelling-input").value;
    let correctSound = document.getElementById("correct-sound");
    let wrongSound = document.getElementById("wrong-sound");
    
    if (userSpelling.toLowerCase() === currentWord.toLowerCase()) {
        document.getElementById("feedback").innerText = "Correct!";
        scoresByPlayer[currentPlayer][currentLevel]++;
        correctSound.play();
        document.getElementById("score").innerText = scoresByPlayer[currentPlayer][currentLevel];
        usedWordsByLevel[currentLevel].add(currentWord); // Mark the word as used
        saveScores();
        getRandomWord();
    } else {
        document.getElementById("feedback").innerText = "Try again!";
        wrongSound.play();
    }
}

function speakWord() {
    let utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.rate = 0.6; // Set the speed to 60% of the normal speed
    window.speechSynthesis.speak(utterance);
}

function nextWord() {
    getRandomWord();
    speakWord();
}

function changeLevel() {
    currentLevel = parseInt(document.getElementById("level-select").value);
    let utterance = new SpeechSynthesisUtterance("You have selected level " + currentLevel);
    window.speechSynthesis.speak(utterance);
    document.getElementById("score").innerText = scoresByPlayer[currentPlayer][currentLevel]; // Update the displayed score
    usedWordsByLevel[currentLevel] = new Set(); // Reset used words when changing levels
    getRandomWord();
}

function changePlayer() {
    currentPlayer = parseInt(document.getElementById("player-select").value);
    if (currentPlayer === 71) { // "CLEAR DATA" option
        clearAllScores();
    } else {
        loadScores();
        document.getElementById("score").innerText = scoresByPlayer[currentPlayer][currentLevel];
        displayPlayerName(); // Display the player’s name
        greetPlayer(); // Greet the player by name
    }
}

function displayPlayerName() {
    let playerName = playerNames[currentPlayer];
    if (playerName) {
        document.getElementById("player-name").innerText = `Player: ${playerName}`;
    } else {
        document.getElementById("player-name").innerText = "Player: Not selected";
    }
}

function greetPlayer() {
    let playerName = playerNames[currentPlayer];
    if (playerName) {
        let utterance = new SpeechSynthesisUtterance(`Welcome Player ${playerName}. Good luck!`);
        window.speechSynthesis.speak(utterance);
    }
}

function saveScores() {
    localStorage.setItem('scoresByPlayer', JSON.stringify(scoresByPlayer));
}

function loadScores() {
    const savedScores = localStorage.getItem('scoresByPlayer');
    if (savedScores) {
        scoresByPlayer = JSON.parse(savedScores);
    }
    if (!scoresByPlayer[currentPlayer]) {
        scoresByPlayer[currentPlayer] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    }
}

function initializePlayerOptions() {
    const playerSelect = document.getElementById("player-select");
    let selectPlayerOption = document.createElement("option");
    selectPlayerOption.value = "";
    selectPlayerOption.text = "Select Player";
    playerSelect.appendChild(selectPlayerOption);
    
    for (let i = 1; i <= 70; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = `Player ${i}`;
        playerSelect.appendChild(option);
    }
    
    let clearDataOption = document.createElement("option");
    clearDataOption.value = 71;
    clearDataOption.text = "CLEAR DATA";
    playerSelect.appendChild(clearDataOption);
}

function initializeLevelOptions() {
    const levelSelect = document.getElementById("level-select");
    let chooseLevelOption = document.createElement("option");
    chooseLevelOption.value = "";
    chooseLevelOption.text = "Choose Level";
    levelSelect.appendChild(chooseLevelOption);

    for (let i = 1; i <= 6; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = `Level ${i}`;
        levelSelect.appendChild(option);
    }
}

function initialize() {
    parseCSV(csvData); // Initialize game with the hardcoded CSV data
    initializePlayerOptions();
    initializeLevelOptions();
    loadScores();
    currentPlayer = parseInt(document.getElementById("player-select").value) || 1;
    getRandomWord();
}

// Function to clear all scores
function clearAllScores() {
    if (confirm("All scores of all players will be deleted. Enter password to confirm.")) {
        let password = prompt("Enter password:");
        if (password === CLEAR_DATA_PASSWORD) {
            localStorage.removeItem('scoresByPlayer');
            scoresByPlayer = {};
            alert("All scores have been cleared.");
            initialize(); // Reinitialize player options and scores
        } else {
            alert("Incorrect password. Scores were not cleared.");
        }
    }
}

// Initialize the game
initialize();
getRandomWord();
