moveChanges = {
	'Ancestral X': 
		{
			"Fury Attack"	:	"Scorching Swarm",
			"Scratch"			:	"Breaking Swipe",
			"Fairy Wind"	:	"Spirit Break",
			"Vice Grip"		:	"Tussle",
			"Wing Attack"	:	"Dual Wingbeat",
			"Needle Arm"	:	"Trailblaze",
			"Vine Whip"		:	"Trop Kick",
			"Stomp"				:	"Ground Pound",
			"Horn Attack"	:	"Headlong Rush",
			"Powder Snow"	:	"Ice Hammer",
			"Bind"				:	"Esper Wing",
			"Rolling Kick":	"Fate's Flourish",
			"Rock Throw"	:	"Accelerock",
			"Double Slap"	:	"Steel Beam",
			"Lick"				:	"Aqua Step",
			"Water Gun"		:	"Chilling Water",
			"Pound"				:	"Wave Crash"
		},

	'Blaze Black 2/Volt White 2 Redux':

		{"Sand Tomb": "Accelerock",
		"Horn Drill": "Boomburst",
		"Spike Cannon": "Breaking Swipe",
		"Slam": "Brutal Swing",
		"Luster Purge": "Dazzling Gleam",
		"Round": "Disarming Voice",
		"Sweet Kiss": "Draining Kiss",
		"Vise Grip": "Dual Wingbeat",
		"Bubble": "Esper Wing",
		"Razorwind": "Fire Lash",
		"Constrict": "Infestation",
		"Rolling Kick": "Headlong Rush",
		"Mega Kick": "High Horsepower",
		"Barrage": "Lunge",
		"Mist Ball": "Moonblast",
		"Sacred Fire": "Mystical Fire",
		"Sharpen": "Nuzzle",
		"Submisson": "Play Rough",
		"Comet Punch": "Power-Up Punch",
		"Egg Bomb": "Psychic Fangs",
		"Smelling Salts": "Psyshield Bash",
		"Thrash": "Raging Fury",
		"Metal Sound": "Scorching Sands",
		"Mega Punch": "Smart Strike",
		"Triple Kick": "Triple Axel",
		"Punishment": "Wave Crash"},



	"Renegade Platinum": 
		{"Barrage":     "Draining Kiss",
		"Brine":        "Scald",
		"Constrict":    "Icicle Crash",
		"Horn Drill":   "Drill Run",
		"Lunar Dance":  "Moonblast",
		"Luster Purge": "Dazzling Gleam",
		"Mist Ball":    "Disarming Voice",
		"Sand Tomb":    "Bulldoze",
		"Submission":   "Play Rough",
		"Twister":      "Hurricane",
		"Volt Tackle":  "Wild Charge"},
	
	"Emerald Kaizo": 
		{"Ancientpower":     "Ancient Power",
		"X-scissor":        "X-Scissor",
		"Faint Attack": "Feint Attack"},

		"Sterling Silver": 
    {
        "Defend Order": "HP Bug",
        "Dark Void": "HP Dark",
        "Twister": "HP Dragon",
        "Thunder Shock": "HP Electric",
        "Submission": "HP Fighting",
        "Ember": "HP Fire",
        "Feather Dance": "HP Flying",
        "Astonish": "HP Ghost",
        "Vine Whip": "HP Grass",
        "Mud Sport": "HP Ground",
        "Powder Snow": "HP Ice",
        "Pound": "HP Normal",
        "Sludge": "HP Poison",
        "Psywave": "HP Psychic",
        "Rock Throw": "HP Rock",
        "Iron Defense": "HP Steel",
        "Water Sport": "HP Water",
        "Charge Beam": "Volt Switch",
        "Gust": "Hurricane",
        "Magnitude": "Bulldoze",
        "Horn Drill": "Drill Run",
        "Spider Web": "Electroweb",
        "Slam": "Night Daze",
        "Fury Swipes": "Dual Chop",
        "Rollout": "Accelerock",
        "Fissure": "Headlong Rush"
    }
}

if(typeof CHANGES === 'undefined') {
	
} else {
	moveChanges["NONE"] = CHANGES
}


function placeBsBtn() {
	var importBtn = "<button id='import' class='bs-btn bs-btn-default'>Import</button>";
	$("#import-1_wrapper").append(importBtn);

	$("#import.bs-btn").click(function () {
		var pokes = document.getElementsByClassName("import-team-text")[0].value;
		var name = document.getElementsByClassName("import-name-text")[0].value.trim() === "" ? "Custom Set" : document.getElementsByClassName("import-name-text")[0].value;
		addSets(pokes, name);
	});
}

function ExportPokemon(pokeInfo) {
	var pokemon = createPokemon(pokeInfo);
	var EV_counter = 0;
	var finalText = "";
	finalText = pokemon.name + (pokemon.item ? " @ " + pokemon.item : "") + "\n";
	finalText += "Level: " + pokemon.level + "\n";
	finalText += pokemon.nature && gen > 2 ? pokemon.nature + " Nature" + "\n" : "";
	finalText += pokemon.ability ? "Ability: " + pokemon.ability + "\n" : "";
	if (gen > 2) {
		var EVs_Array = [];
		for (var stat in pokemon.evs) {
			var ev = pokemon.evs[stat] ? pokemon.evs[stat] : 0;
			if (ev > 0) {
				EVs_Array.push(ev + " " + calc.Stats.displayStat(stat));
			}
			EV_counter += ev;
			if (EV_counter > 510) break;
		}
		if (EVs_Array.length > 0) {
			finalText += "EVs: ";
			finalText += serialize(EVs_Array, " / ");
			finalText += "\n";
		}
	}

	var IVs_Array = [];
	for (var stat in pokemon.ivs) {
		var iv = pokemon.ivs[stat] ? pokemon.ivs[stat] : 0;
		if (iv < 31) {
			IVs_Array.push(iv + " " + calc.Stats.displayStat(stat));
		}
	}
	if (IVs_Array.length > 0) {
		finalText += "IVs: ";
		finalText += serialize(IVs_Array, " / ");
		finalText += "\n";
	}

	for (var i = 0; i < 4; i++) {
		var moveName = pokemon.moves[i].name;
		if (moveName !== "(No Move)") {
			finalText += "- " + moveName + "\n";
		}
	}
	finalText = finalText.trim();
	$("textarea.import-team-text").val(finalText);
}

$("#exportL").click(function () {
	ExportPokemon($("#p1"));
});

$("#exportR").click(function () {
	ExportPokemon($("#p2"));
});

function serialize(array, separator) {
	var text = "";
	for (var i = 0; i < array.length; i++) {
		if (i < array.length - 1) {
			text += array[i] + separator;
		} else {
			text += array[i];
		}
	}
	return text;
}

function getAbility(row, species=false) {
	var ability = row[1] ? row[1].trim() : '';


	if (calc.ABILITIES[8].indexOf(ability) !== -1) return ability;
}

function statToLegacyStat(stat) {
	switch (stat) {
	case 'hp':
		return "hp";
	case 'atk':
		return "at";
	case 'def':
		return "df";
	case 'spa':
		return "sa";
	case 'spd':
		return "sd";
	case 'spe':
		return "sp";
	}
}

function getStats(currentPoke, rows, offset) {
	currentPoke.nature = "Serious";
	var currentEV;
	var currentIV;
	var currentAbility;
	var currentNature;
	currentPoke.level = 100;
	for (var x = offset; x < offset + 8; x++) {
		var currentRow = rows[x] ? rows[x].split(/[/:]/) : '';
		var evs = {};
		var ivs = {};
		var ev;
		var j;

		switch (currentRow[0]) {
		case 'Level':
			currentPoke.level = parseInt(currentRow[1].trim());
			break;
		case 'EVs':
			for (j = 1; j < currentRow.length; j++) {
				currentEV = currentRow[j].trim().split(" ");
				currentEV[1] = statToLegacyStat(currentEV[1].toLowerCase());
				evs[currentEV[1]] = parseInt(currentEV[0]);
			}
			currentPoke.evs = evs;
			break;
		case 'IVs':
			for (j = 1; j < currentRow.length; j++) {
				currentIV = currentRow[j].trim().split(" ");
				currentIV[1] = statToLegacyStat(currentIV[1].toLowerCase());
				ivs[currentIV[1]] = parseInt(currentIV[0]);
			}
			currentPoke.ivs = ivs;
			break;

		}
		currentAbility = rows[x] ? rows[x].trim().split(":") : '';
		if (currentAbility[0] == "Ability") {
			currentPoke.ability = currentAbility[1].trim();
		}

		currentNature = rows[x] ? rows[x].trim().split(" ") : '';
		if (currentNature[1] == "Nature") {
			currentPoke.nature = currentNature[0];
		}
	}
	return currentPoke;
}

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

function getItem(currentRow, j) {
	for (;j < currentRow.length; j++) {
		var item = currentRow[j].trim();
		item = item.replace("’", "'");
		if (calc.ITEMS[8].indexOf(item) != -1) {
			return item;
		}
	}
}

function getMoves(currentPoke, rows, offset) {
	var movesFound = false;
	var moves = [];
	for (var x = offset; x < offset + 12; x++) {
		if (rows[x]) {
			if (rows[x][0] == "-") {
				movesFound = true;
				var move = rows[x].substr(2, rows[x].length - 2).replace("[", "").replace("]", "").replace("  ", "");

				console.log(TITLE)
				if (moveChanges[TITLE]) {
					if (moveChanges[TITLE][move]) {
						move = moveChanges[TITLE][move]
						console.log(`changed to ${move}`)
					}
				}
				moves.push(move);
			} else {
				if (movesFound == true) {
					break;
				}
			}
		}
	}
	currentPoke.moves = moves;
	return currentPoke;
}

function addToDex(poke) {
	var dexObject = {};
	if ($("#randoms").prop("checked")) {
		if (GEN8RANDOMBATTLE[poke.name] == undefined) GEN8RANDOMBATTLE[poke.name] = {};
		if (GEN7RANDOMBATTLE[poke.name] == undefined) GEN7RANDOMBATTLE[poke.name] = {};
		if (GEN6RANDOMBATTLE[poke.name] == undefined) GEN6RANDOMBATTLE[poke.name] = {};
		if (GEN5RANDOMBATTLE[poke.name] == undefined) GEN5RANDOMBATTLE[poke.name] = {};
		if (GEN4RANDOMBATTLE[poke.name] == undefined) GEN4RANDOMBATTLE[poke.name] = {};
		if (GEN3RANDOMBATTLE[poke.name] == undefined) GEN3RANDOMBATTLE[poke.name] = {};
		if (GEN2RANDOMBATTLE[poke.name] == undefined) GEN2RANDOMBATTLE[poke.name] = {};
		if (GEN1RANDOMBATTLE[poke.name] == undefined) GEN1RANDOMBATTLE[poke.name] = {};
	} else {
		if (SETDEX_SS[poke.name] == undefined) SETDEX_SS[poke.name] = {};
		if (SETDEX_SM[poke.name] == undefined) SETDEX_SM[poke.name] = {};
		if (SETDEX_XY[poke.name] == undefined) SETDEX_XY[poke.name] = {};
		if (SETDEX_BW[poke.name] == undefined) SETDEX_BW[poke.name] = {};
		if (SETDEX_DPP[poke.name] == undefined) SETDEX_DPP[poke.name] = {};
		if (SETDEX_ADV[poke.name] == undefined) SETDEX_ADV[poke.name] = {};
		if (SETDEX_GSC[poke.name] == undefined) SETDEX_GSC[poke.name] = {};
		if (SETDEX_RBY[poke.name] == undefined) SETDEX_RBY[poke.name] = {};
	}
	if (poke.ability !== undefined) {
		dexObject.ability = poke.ability;
	}


	console.log(`${poke.name} - ${parseInt(poke.ability)}`)
	console.log(pokedex[poke.name]['abilities'][parseInt(poke.ability)])

	if (isInt(poke.ability)) {
		console.log("ability updated")
		dexObject.ability = pokedex[poke.name]['abilities'][parseInt(poke.ability)]
	}
	

	dexObject.level = poke.level;
	dexObject.evs = poke.evs;
	dexObject.ivs = poke.ivs;
	dexObject.moves = poke.moves;
	dexObject.nature = poke.nature;
	dexObject.item = poke.item;
	dexObject.isCustomSet = poke.isCustomSet;
	var customsets;
	if (localStorage.customsets) {
		customsets = JSON.parse(localStorage.customsets);
	} else {
		customsets = {};
	}
	// console.log(poke.nameProp)

	if (!customsets[poke.name]) {
		customsets[poke.name] = {};
	}
	customsets[poke.name]["My Box"] = dexObject;
	if (poke.name === "Aegislash-Blade") {
		if (!customsets["Aegislash-Shield"]) {
			customsets["Aegislash-Shield"] = {};
		}
		customsets["Aegislash-Shield"][poke.nameProp] = dexObject;
	}
	updateDex(customsets);
}

function updateDex(customsets) {
	for (var pokemon in customsets) {
		for (var moveset in customsets[pokemon]) {
			if (!SETDEX_SS[pokemon]) SETDEX_SS[pokemon] = {};
			SETDEX_SS[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_SM[pokemon]) SETDEX_SM[pokemon] = {};
			SETDEX_SM[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_XY[pokemon]) SETDEX_XY[pokemon] = {};
			SETDEX_XY[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_BW[pokemon]) SETDEX_BW[pokemon] = {};
			SETDEX_BW[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_DPP[pokemon]) SETDEX_DPP[pokemon] = {};
			SETDEX_DPP[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_ADV[pokemon]) SETDEX_ADV[pokemon] = {};
			SETDEX_ADV[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_GSC[pokemon]) SETDEX_GSC[pokemon] = {};
			SETDEX_GSC[pokemon][moveset] = customsets[pokemon][moveset];
			if (!SETDEX_RBY[pokemon]) SETDEX_RBY[pokemon] = {};
			SETDEX_RBY[pokemon][moveset] = customsets[pokemon][moveset];
		}
	}
	localStorage.customsets = JSON.stringify(customsets);
}

function addSets(pokes, name) {
	var rows = pokes.split("\n");
	var currentRow;
	var currentPoke;
	var addedpokes = 0;
	for (var i = 0; i < rows.length; i++) {
		currentRow = rows[i].split(/[()@]/);
		for (var j = 0; j < currentRow.length; j++) {
			currentRow[j] = checkExeptions(currentRow[j].trim());
			if (calc.SPECIES[8][currentRow[j].trim()] !== undefined) {
				currentPoke = calc.SPECIES[8][currentRow[j].trim()];
				currentPoke.name = currentRow[j].trim();
				currentPoke.item = getItem(currentRow, j + 1);
				if (j === 1 && currentRow[0].trim()) {
					currentPoke.nameProp = "My Box";
				} else {
					currentPoke.nameProp = "My Box";
				}
				currentPoke.isCustomSet = true;

				if (INC_EM) {
					currentPoke.ability = getAbility(rows[i + 4].split(":"), currentPoke.name);
				} else {
					currentPoke.ability = getAbility(rows[i + 1].split(":"));
				}

				console.log(currentPoke.ability)
				console.log("........")
				
				currentPoke = getStats(currentPoke, rows, i + 1);
				currentPoke = getMoves(currentPoke, rows, i);
				addToDex(currentPoke);
				addedpokes++;
			}
		}
	}
	if (addedpokes > 0) {
		get_box()
		alert("Successfully imported " + addedpokes + " set(s)");
		$(allPokemon("#importedSetsOptions")).css("display", "inline");
	} else {
		alert("No sets imported, please check your syntax and try again");
	}
	 $(".trainer-pok.left-side" ).attr("draggable", "true")
}







function checkExeptions(poke) {
	switch (poke) {
	case 'Aegislash':
		poke = "Aegislash-Shield";
		break;
	case 'Basculin-Blue-Striped':
		poke = "Basculin";
		break;
	case 'Gastrodon-East':
		poke = "Gastrodon";
		break;
	case 'Mimikyu-Busted-Totem':
		poke = "Mimikyu-Totem";
		break;
	case 'Mimikyu-Busted':
		poke = "Mimikyu";
		break;
	case 'Pikachu-Belle':
	case 'Pikachu-Cosplay':
	case 'Pikachu-Libre':
	case 'Pikachu-Original':
	case 'Pikachu-Partner':
	case 'Pikachu-PhD':
	case 'Pikachu-Pop-Star':
	case 'Pikachu-Rock-Star':
		poke = "Pikachu";
		break;
	case 'Vivillon-Fancy':
	case 'Vivillon-Pokeball':
		poke = "Vivillon";
		break;
	case 'Flabébé-White':
	case 'Flabébé-Blue':
	case 'Flabébé-Orange':
	case 'Flabébé-Yellow':
		poke = "Flabébé";
		break;
	case 'Floette-White':
	case 'Floette-Blue':
	case 'Floette-Orange':
	case 'Floette-Yellow':
		poke = "Floette";
		break;
	case 'Florges-White':
	case 'Florges-Blue':
	case 'Florges-Orange':
	case 'Florges-Yellow':
		poke = "Florges";
		break;
	}
	return poke;

}

$("#clearSets").click(function () {
	if (confirm("Are you sure you want to delete your custom sets? This action cannot be undone.")) {
		localStorage.removeItem("customsets");
		alert("Custom Sets successfully cleared. Please refresh the page.");
		$("#importedSetsOptions").hide();
		loadDefaultLists();
	}
});

$("#importedSets").click(function () {
	var pokeID = "p1";
	var showCustomSets = $(this).prop("checked");
	if (showCustomSets) {
		loadCustomList(pokeID);
	} else {
		loadDefaultLists();
	}
});

$(document).ready(function () {
	// customSets;
	placeBsBtn();
	if (localStorage.customsets) {
		customSets = JSON.parse(localStorage.customsets);

		// updateDex(customSets);
		$(allPokemon("#importedSetsOptions")).css("display", "inline");
	} else {
		loadDefaultLists();
	}
});
