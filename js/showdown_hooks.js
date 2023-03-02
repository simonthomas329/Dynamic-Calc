function load_js() {

  var head= document.getElementsByTagName('head')[0];
  var script= document.createElement('script');
  script.src= './js/shared_controls.js?0b3ea005';
  head.appendChild(script);
}

function get_trainer_names() {
    var all_poks = SETDEX_BW
    var trainer_names = [] 

    for (const [pok_name, poks] of Object.entries(all_poks)) {
        var pok_tr_names = Object.keys(poks)
        for (i in pok_tr_names) {
           var trainer_name = pok_tr_names[i]
           var sub_index = poks[trainer_name]["sub_index"]
           trainer_names.push(`${pok_name} (${trainer_name})[${sub_index}]`) 
        }      
    }
    return trainer_names
}

function get_custom_trainer_names() {
    var all_poks = SETDEX_BW
    var trainer_names = [] 

    for (const [pok_name, poks] of Object.entries(all_poks)) {
        var pok_tr_names = Object.keys(poks)
        for (i in pok_tr_names) {
           var trainer_name = pok_tr_names[i]
           var sub_index = poks[trainer_name]["sub_index"]

           if (poks[trainer_name]['ivs'] && poks[trainer_name]['ivs']['at'] > 0 && sub_index == 0) {
                trainer_names.push([poks[trainer_name]["level"], `${pok_name} (${trainer_name})[${sub_index}]`]) 
           }     
        }      
    }

    return trainer_names.sort(function (a,b) {
        if (a[0] < b[0]) {
            return -1
        }
        if (a[0] > b[0]) {
            return 1
        }
        return 0
    })
}

function get_similar_trainers() {
     if (typeof customLeads === "undefined") {
        return
    }

    var level = parseInt($("#levelR1").val())
    var similar = []
    for (n in customLeads) {
        if (customLeads[n][0] >= level && customLeads[n][0] <= level + 3) {
            var tr_info = customLeads[n][1].slice(0,-3)

            var tr_name = tr_info.split("(")[1].slice(0, -1)
            similar.push([tr_name, tr_info])
        }
    }
    return similar
}

function get_box() {
    var names = get_trainer_names()

    var box = []

    var box_html = ""

    for (i in names) {
        if (names[i].includes("My Box")) {
            box.push(names[i].split("[")[0])

            var pok_name = names[i].split(" (")[0].toLowerCase().replace(" ","-").replace(".","").replace(".","").replace("’","")
            var pok = `<img class="trainer-pok left-side" src="./img/pokesprite/${pok_name}.png" data-id="${names[i].split("[")[0]}">`

            box_html += pok
        }   
    }

    $('.player-poks').html(box_html)
    return box
}

function get_trainer_poks(trainer_name)
{
    var all_poks = SETDEX_BW
    var matches = []

    var og_trainer_name = trainer_name.split(/Lvl \d+ /)[1]

    console.log(trainer_name)

    if (og_trainer_name) {
        og_trainer_name = og_trainer_name.replace(/.?\)/, "")
    }

    console.log(og_trainer_name)
    for (i in TR_NAMES) {

        if (TR_NAMES[i].includes(og_trainer_name)) {
            if (og_trainer_name.split(" ").at(-1) == TR_NAMES[i].split(" ").at(-2) || (og_trainer_name.split(" ").at(-2) == TR_NAMES[i].split(" ").at(-2))) {
               matches.push(TR_NAMES[i])
            }    
        }
    }
    return matches
}





// only phase 1
function get_next_in_g3() {
    if (typeof CURRENT_TRAINER_POKS === "undefined") {
        return
    }

    var type_names = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice",
             "Fighting", "Poison", "Ground", "Flying", "Psychic",
             "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy","None"]

    var type_chart = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1,1],
            [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1,1],
            [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1,1],
            [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1,1],
            [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1,1],
            [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1,1],
            [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5,1],
            [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2,1],
            [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1,1],
            [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1,1],
            [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1,1],
            [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5,1],
            [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1,1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 1,1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0,1],
            [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 0.5,1],
            [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2,1],
            [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1,1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    var ranked_trainer_poks = []
    

    var trainer_poks = CURRENT_TRAINER_POKS

    var trainer_poks_copy = JSON.parse(JSON.stringify(trainer_poks))
    var player_type1 = $('.type1').first().val()
    var player_type1_index = type_names.indexOf(player_type1)
    var player_type2 = $('.type2').first().val() 
    

    var player_pok = $('.set-selector.player')[1].value.substring(0, $('.set-selector.player')[1].value.indexOf(" ("))


    if (player_type2 == ""){
        player_type2 = player_type1
    }
    var player_type2_index = type_names.indexOf(player_type2)


    var dead_mon_type1 = $('.type1').last().val()
    var dead_mon_type2 = $('.type2').last().val()
    if (dead_mon_type2 == "") {
        dead_mon_type2 = dead_mon_type1
    }

    // get type chart
    var type_info = get_type_info([player_type1, player_type2])

    // get mons with SE moves and sort by type matchup and trainer order
    var se_mons = []
    var se_status_mons = []
    var stab_mons = []
    var se_indexes = []


    // check for se non status moves
    for (i in trainer_poks) {
        var pok_name = trainer_poks[i].split(" (")[0]
        var tr_name = trainer_poks[i].split(" (")[1].replace(")", "").split("[")[0]
        var type1 = pokedex[pok_name]["types"][0]
        var type1_index = type_names.indexOf(type1)


        var type2 = pokedex[pok_name]["types"][1] || type1
        var type2_index = type_names.indexOf(type2)

        var pok_data = SETDEX_BW[pok_name][tr_name]
        var sub_index = parseInt(trainer_poks[i].split(" (")[1].replace(")", "").split("[")[1].replace("]", ""))

        var effectiveness = 10

        effectiveness = Math.floor(effectiveness * type_chart[player_type1_index][type1_index])
        effectiveness = Math.floor(effectiveness * type_chart[player_type1_index][type2_index])
        effectiveness = Math.floor(effectiveness * type_chart[player_type2_index][type1_index])
        effectiveness = Math.floor(effectiveness * type_chart[player_type2_index][type2_index])


        // check moves for SE
        var isSE = false
        var isSEStatus = false
        var isStab = false
        var statusPushed = false
        var stabPushed = false


        // if has SE move, add to list of SE mons and break, if has SE status move, add to list of SE status mons and keep searching
        for (j in pok_data["moves"]) {

            var mov_data = moves[pok_data["moves"][j]]

            if (!mov_data) {
                continue
            }

            if (type_info[mov_data["type"]] >= 2) {
                if (mov_data['category'] == "Status") {
                    isSEStatus = true
                } else {
                    isSE = true
                }
            }

            if (mov_data["type"] == dead_mon_type1 || mov_data["type"] == dead_mon_type2 ) {
                isStab = true
            }

            if (isSE) {  
                se_mons.push([trainer_poks[i], 0, "", sub_index, pok_data["moves"]], effectiveness)
                se_indexes.push(sub_index)

                // remove from se_status if found se move after already pushing to se_status
                if (statusPushed) {
                    se_status_mons.pop()
                }
                if (stabPushed) {
                    stab_mons.pop()
                }
                break
            } else if (isSEStatus && !statusPushed) {
                se_status_mons.push([trainer_poks[i], 0, "", sub_index, pok_data["moves"]], effectiveness)
                statusPushed = true

                if (stabPushed) {
                    stab_mons.pop()
                }
               
            } else if (isStab) {
                stab_mons.push([trainer_poks[i], 0, "", sub_index, pok_data["moves"]], effectiveness)
                stabPushed = true
            }  else {

            }     
        }
    }
    return [se_mons, se_status_mons, stab_mons]
}

function get_next_in_g4() {
    if (typeof CURRENT_TRAINER_POKS === "undefined") {
        return
    }

    var ranked_trainer_poks = []
    

    var trainer_poks = CURRENT_TRAINER_POKS
    var trainer_poks_copy = JSON.parse(JSON.stringify(trainer_poks))
    var player_type1 = $('.type1').first().val()
    var player_type2 = $('.type2').first().val() 
    var player_pok = $('.set-selector.player')[1].value.substring(0, $('.set-selector.player')[1].value.indexOf(" ("))

    if (player_type2 == ""){
        player_type2 = player_type1
    }

    // get type chart
    var type_info = get_type_info([player_type1, player_type2])

    // get mons with SE moves and sort by type matchup and trainer order
    var se_mons = []
    var se_indexes = []

    for (i in trainer_poks) {
        var pok_name = trainer_poks[i].split(" (")[0]
        var tr_name = trainer_poks[i].split(" (")[1].replace(")", "").split("[")[0]
        var type1 = pokedex[pok_name]["types"][0]
        var type2 = pokedex[pok_name]["types"][1] || type1
        var pok_data = SETDEX_BW[pok_name][tr_name]
        var sub_index = parseInt(trainer_poks[i].split(" (")[1].replace(")", "").split("[")[1].replace("]", ""))

        var effectiveness = type_info[type1] + type_info[type2]
        if (effectiveness == 8) {
            effectiveness = 1.75
        }
        // check moves for SE
        var isSE = false
        for (j in pok_data["moves"]) {
            var mov_data = moves[pok_data["moves"][j]]

            if (!mov_data) {
                continue
            }

            if (mov_data["type"] == "Ground" && "Skarmory,Aerodactyl,Zapdos,Crobat,Moltres".includes(player_pok)){
                isSE = true
            }

            if (mov_data["type"] == "Electric" && "Gastrodon,Swampert,Whishcash,Quagsire,Marshtomp".includes(player_pok)){
                isSE = true
            }

            if (player_pok == "Altaria" && mov_data["type"] == "Dragon") {
                isSE = true
            }

            if (player_pok == "Mawile" && mov_data["type"] == "Poison") {
                isSE = true
            }

            if (player_pok == "Girafarig" && mov_data["type"] == "Ghost") {
                isSE = true
            }

            if (type_info[mov_data["type"]] >= 2) {
                isSE = true
            }

            if (isSE) {   
                se_mons.push([trainer_poks[i], 0, "asdfasadf", sub_index, pok_data["moves"], effectiveness])
                se_indexes.push(sub_index)
                break
            }           
        }
    }

    // sort rest of mons by using other mons moves with current mon stats
    var other_mons = []

    var currentHp = parseInt($('.current-hp').first().val())

    var p1info = $("#p1");
    var p2info = $("#p2");
    var p1 = createPokemon(p1info);
    var p2 = createPokemon(p2info);
    var p1field = createField();
    var p2field = p1field.clone().swap();

    for (i in trainer_poks) {
        var pok_name = trainer_poks[i].split(" (")[0]
        var tr_name = trainer_poks[i].split(" (")[1].replace(")", "").split("[")[0]
        var type1 = pokedex[pok_name]["types"][0]
        var type2 = pokedex[pok_name]["types"][1] || type1
        var pok_data = SETDEX_BW[pok_name][tr_name]
        var sub_index = parseInt(trainer_poks[i].split(" (")[1].replace(")", "").split("[")[1].replace("]", ""))

        if (se_indexes.includes(sub_index)) {
            continue
        }

        p2 = createPokemon(p2info, pok_data["moves"])
        var results = calculateAllMoves(4, p1, p1field, p2, p2field, false)[1];

        var highestDamage = 0
        for (n in results) {
            var dmg = 0
            if (typeof results[n].damage === 'number') {
                dmg = results[n].damage
            } else {
                dmg = results[n].damage[0]
            }
            // console.log(dmg)

            if (dmg > highestDamage) {
                highestDamage = dmg
            }
            if (highestDamage >= currentHp) {
                highestDamage = 1000
            }   
        }
        other_mons.push([trainer_poks[i], 0, "asdfasadf", sub_index, pok_data["moves"], highestDamage])
    }
    console.log(se_mons.sort(sort_trpoks_g4).concat(other_mons.sort(sort_trpoks_g4)))
    return(se_mons.sort(sort_trpoks_g4).concat(other_mons.sort(sort_trpoks_g4)))
}


function get_next_in_cfru() {
    // AI mon can kill = +4
    // AI mon does resist/immune to all moves = +4
    // AI mon can revenge kill = +2 (All of them added gives the highest score of +10)

    // AI mon hits super effective on player mon (Only counts if AI doesn't OH-KO) = +1
    // AI mon weak to one of your moves aka player got Super Effective move on AI mon = -1

    // Notes:
    // *AI mon can kill: The AI rolls, in this instance, between 93% and 100% of the maximum damage a move can do to you. 
    //  So over 50% chance to OHKO will be enough for the AI to always "see" a KO on you. 
    // *It’s either “resists/immune to all player’s moves” +4 or nothing, it’s not that each resisted move gives a +1! 
    // *A resisted move doing more than 50% to the AI isnt treated as such (no +4).
    // *It's -1 regardless of how many moves you have that are Super Effective to the AI's mon!
    // *If you OHKO with a neutral move, that’s not even a negative! (just a "0")
    // *Getting OHKO’d doesn’t matter to AI, only super effective moves do!
    // *Getting OHKO’d does play more of a role for AI Switching BEFORE they even lose a mon! 

    // A few (niche) additions to the SwitchInList:

    // AI mon Walls you = +2
    // This is a weaker statement than AI resists all moves. It applies when you hit the AI for neutral damage. 
    // The AIs defense also needs to be greater than your offense (If you are a special attacker, the AIs SpD > Your SpA, If you are a physical attacker, AIs Def > Your Att)

    if (typeof CURRENT_TRAINER_POKS === "undefined") {
        return
    }

    var ranked_trainer_poks = []
    var trainer_poks = CURRENT_TRAINER_POKS
    var trainer_poks_copy = JSON.parse(JSON.stringify(trainer_poks))
    var player_type1 = $('.type1').first().val()
    var player_type2 = $('.type2').first().val() 
    var player_pok = $('.set-selector.player')[1].value.substring(0, $('.set-selector.player')[1].value.indexOf(" ("))

    if (player_type2 == ""){
        player_type2 = player_type1
    }

    // get type chart
    var type_info = get_type_info([player_type1, player_type2])




    var currentHp = parseInt($('.current-hp').first().val())

    var p1info = $("#p1");
    var p2info = $("#p2");
    var p1 = createPokemon(p1info);
    var p2 = createPokemon(p2info);
    var p1field = createField();
    var p2field = p1field.clone().swap();

    for (i in trainer_poks) {
        var pok_name = trainer_poks[i].split(" (")[0]
        var tr_name = trainer_poks[i].split(" (")[1].replace(")", "").split("[")[0]
        var type1 = pokedex[pok_name]["types"][0]
        var type2 = pokedex[pok_name]["types"][1] || type1
        var pok_data = SETDEX_BW[pok_name][tr_name]
        var sub_index = parseInt(trainer_poks[i].split(" (")[1].replace(")", "").split("[")[1].replace("]", ""))

        if (se_indexes.includes(sub_index)) {
            continue
        }

        p2 = createPokemon(p2info, pok_data["moves"])
        var results = calculateAllMoves(4, p1, p1field, p2, p2field, false)[1];

        var highestDamage = 0
        for (n in results) {
            var dmg = 0
            if (typeof results[n].damage === 'number') {
                dmg = results[n].damage
            } else {
                dmg = results[n].damage[0]
            }
            // console.log(dmg)

            if (dmg > highestDamage) {
                highestDamage = dmg
            }
            if (highestDamage >= currentHp) {
                highestDamage = 1000
            }   
        }
        other_mons.push([trainer_poks[i], 0, "asdfasadf", sub_index, pok_data["moves"], highestDamage])
    }



}

function get_current_in() {
    var setInfo = $('.set-selector')[3].value
    var pok_name = setInfo.split(" (")[0]
    var tr_name = setInfo.split(" (")[1].replace(")", "").split("[")[0]

    return SETDEX_BW[pok_name][tr_name]
}

function get_next_in() {

    if (switchIn == 4) {
        return get_next_in_g4()
    }

    if (typeof CURRENT_TRAINER_POKS === "undefined") {
        return
    }

    var trainer_poks = CURRENT_TRAINER_POKS
    var player_type1 = $('.type1').first().val()
    var player_type2 = $('.type2').first().val() 

    if (player_type2 == ""){
        player_type2 = player_type1
    }

    var type_info = get_type_info([player_type1, player_type2])

    var ranked_trainer_poks = []

    for (i in trainer_poks) {
        var pok_name = trainer_poks[i].split(" (")[0]
        var tr_name = trainer_poks[i].split(" (")[1].replace(")", "").split("[")[0]
        var strongest_move_bp = 0
        var strongest_move = "None"
        var sub_index = trainer_poks[i].split(" (")[1].replace(")", "").split("[")[1].replace("]", "")


        var pok_data = SETDEX_BW[pok_name][tr_name]

        for (j in pok_data["moves"]) {
            var mov_data = moves[pok_data["moves"][j]]

            if (!mov_data) {
                continue
            }

            var bp = mov_data["bp"] * type_info[mov_data["type"]]
            
            if (bp > strongest_move_bp) {
                strongest_move_bp = bp
                strongest_move = pok_data["moves"][j]
            }
            else if (bp == strongest_move_bp) {
                strongest_move += (", " + pok_data["moves"][j])
            } else {

            }
        }
        ranked_trainer_poks.push([trainer_poks[i], strongest_move_bp, strongest_move, sub_index, pok_data["moves"]])
    }
    return ranked_trainer_poks.sort(sort_trpoks)
}

function sort_trpoks(a, b) {
    if (a[1] === b[1]) {
        return (b[3] > a[3]) ? -1 : 1;
    }
    else {
        return (b[1] < a[1]) ? -1 : 1;
    }
}

function sort_trpoks_g4(a, b) {
    if (a[5] === b[5]) {
        return (b[3] > a[3]) ? -1 : 1;
    }
    else {
        return (b[5] < a[5]) ? -1 : 1;
    }
}

function get_type_info(pok_types) {
    if (pok_types[1] == pok_types[0]) {
        pok_types[1] = "None"
    }

    var type_name = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice",
             "Fighting", "Poison", "Ground", "Flying", "Psychic",
             "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy","None"]

    var result = {}

    var types = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1,1],
            [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1,1],
            [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1,1],
            [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1,1],
            [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1,1],
            [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1,1],
            [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5,1],
            [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2,1],
            [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1,1],
            [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1,1],
            [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1,1],
            [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5,1],
            [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1,1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1,1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0,1],
            [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5,1],
            [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2,1],
            [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1,1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    if (type_chart != 6) {
        types[13][16] = 1
        types[15][16] = 1
    }

    var type1 = type_name.indexOf(pok_types[0])
    var type2 = type_name.indexOf(pok_types[1])

    for (i in types) {
        result[type_name[i]] = (types[i][type1] * types[i][type2])
    }

    return result
}

$(document).ready(function() {
   params = new URLSearchParams(window.location.search)
   SETDEX_BW = null
   TR_NAMES = null

   npoint = `https://api.npoint.io/${params.get('data')}`

   if (params.get('data').includes("Pokeweb")) {
    npoint = `http://fishbowlweb.cloud:3000/${params.get('data').split("Pokeweb-")[1]}_calc.json`
   }
   jsonMoves = moves

   var g =  parseInt(params.get('gen'));
   $.get(npoint, function(data){
        npoint_data = data

        SETDEX_BW = data["formatted_sets"]
        SETDEX_ADV = data["formatted_sets"]
        SETDEX_DPP = data["formatted_sets"]
        SETDEX_SM = data["formatted_sets"]
        SETDEX_SS = data["formatted_sets"]
        SETDEX_XY = data["formatted_sets"]
        TR_NAMES = get_trainer_names()
        
        jsonMoves = data["moves"]
        var jsonMove

        if (!jsonMoves["Explosion"]["e_id"]){
            $("#show-ai").hide()
        }

        for (move in moves) {

            if (jsonMoves[move]) {
                jsonMove = jsonMoves[move]
            } else {
                continue //skip unsupported moves like hidden power
            }

            var move_id = move.replace(/-|,|'| /g, "").toLowerCase()

            moves[move]["bp"] = jsonMove["basePower"]
            
            MOVES_BY_ID[g][move_id].basePower = jsonMove["basePower"]



            moves[move]["type"] = jsonMove["type"]
            MOVES_BY_ID[g][move_id].type = jsonMove["type"]

            moves[move]["category"] = jsonMove["category"]
            MOVES_BY_ID[g][move_id].category = jsonMove["category"]

            if (moves[move]["e_id"]) {
                moves[move]["e_id"] = jsonMove["e_id"]
            } 

            

            if (moves[move]["multihit"]) {
                moves[move]["multihit"] = jsonMove["multihit"]
            }
        }

        var jsonPoks = data["poks"]
        var jsonPok 
      
        for (pok in pokedex) {

            if (jsonPoks[pok]) {
                jsonPok = jsonPoks[pok]
            } else {
                continue //skip weird smogon pokemon and arceus forms
            }
            pokedex[pok]["bs"] = jsonPok["bs"]
            pokedex[pok]["types"] = jsonPok["types"]
        }
        load_js() 
        customSets = JSON.parse(localStorage.customsets);
        updateDex(customSets)   
        get_box()
        customLeads = get_custom_trainer_names()    
   })

   $(document).on('click', '.trainer-pok.right-side, .sim-trainer', function() {
        var set = $(this).attr('data-id')
        $('.opposing').val(set)
        $('.opposing').change()
        $('.opposing .select2-chosen').text(set)
   })


   $(document).on('change', '.calc-select', function() {
        location.href = $('.calc-select option:selected').attr('data-source')
   })

   $(document).on('click', '#show-mid', function() {
        $('.panel-mid').toggle()
        $('.panel:not(.panel-mid)').toggleClass('third')
   })

   $(document).on('click', '#show-ai', function() {
        $("#ai-container").toggle()

   })

   $(document).on('click', '.results-right label', function() {
        
        var move = $(".results-right .visually-hidden:checked + .btn").text()
        if (move == "") {
            return
        }

        var effect_code = parseInt(jsonMoves[move]["e_id"])
        console.log(effect_code)

        var ai_content = expertAI[effect_code]

        ai_html = ""
        
        ai_html += `<h2>${move} AI</h2><br>`

        for (n in ai_content) {
            ai_html += ai_content[n].replace("\t", "&ensp;")
            ai_html += "<br>"
        }
        $("#ai-container").html(ai_html)
   })

   $(document).on('click', '#img-toggle', function() {
        $('#battle-bg,.poke-sprite, #trainer-sprite').toggle()
   })

   $(document).on('change', '.current-hp', function() {
        $($('.set-selector')[1]).change()
   })

   $(document).on('click', '.trainer-pok.left-side', function() {
        var set = $(this).attr('data-id')
        $('.player').val(set)

        $('.player').change()
        $('.player .select2-chosen').text(set)
        get_box()
   })

   SOURCES = {"9aa37533b7c000992d92": "Blaze Black/Volt White",
   "11c4eeca5a94f8edf413": "Blaze Black 2/Volt White 2 Redux",
   "da1eedc0e39ea07b75bf": "Vintage White",
   "bd7fc78f8fa2500dfcca": "Renegade Platinum",
   "6eaddfad52c62f0d869b": "Sacred Gold/Storm Silver",
   "9e7113f0ee22dad116e1": "Platinum Redux 5.2 TC6"
    }

    if (SOURCES[params.get('data')]) {
        TITLE = SOURCES[params.get('data')]
        $('.genSelection').hide()
        $('#rom-title').text(TITLE).show()
    }
})