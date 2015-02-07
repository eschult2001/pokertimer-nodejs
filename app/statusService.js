// status service

var statusService = exports = module.exports = {};

var statusDb = {
	"mwpt-monthly" : {	
		"id":"mwpt-monthly",
		"currentPlayers": 16,
		"currentLevel": 0,
		"currentTime": 20,
		"totalPlayers": 16,
		"initialStack": 17500,
		"avgStack": 17500,
		"totalChips": 280000,
		"running": true
	}	,
	"PokerLake" : {	
		"id":"PokerLake",
		"currentPlayers": 16,
		"currentLevel": 0,
		"currentTime": 20,
		"totalPlayers": 7,
		"initialStack": 25000,
		"avgStack": 17500,
		"totalChips": 280000,
		"running": true
	}	

}

var tournamentDb = {
	"mwpt-monthly" : {
	    "id": "mwpt-monthly",
	    "name": "MWPT Monthly Tournament",
	    "headerImg": "img/mwpt.png",
	    "levelSeconds": 900,
	    "levels":[
	        {"ante":0, "smallBlind":25,"bigBlind":50},
	        {"ante":0, "smallBlind":50 ,"bigBlind":100},
	        {"ante":0, "smallBlind":100 ,"bigBlind":200},
	        {"ante":25, "smallBlind":100 ,"bigBlind":200},
	        {"ante":50, "smallBlind":200 ,"bigBlind":400},
	        {"ante":75, "smallBlind":300 ,"bigBlind":600},
	        
	        {"break": true, "label":"Chip-up 25s and 50s"},
	        
	        {"ante":100, "smallBlind":400 ,"bigBlind":800},
	        {"ante":200, "smallBlind":600 ,"bigBlind":1200},
	        {"ante":300, "smallBlind":800 ,"bigBlind":1600},
	        {"ante":300, "smallBlind":1000 ,"bigBlind":2000},
	        
	        {"break": true, "label":"Chip-up 100s"},

	        {"ante":500, "smallBlind":1500 ,"bigBlind":"3K"},
	        {"ante":500, "smallBlind":"2K" ,"bigBlind":"4K"},

	        {"break": true, "label":"Chip-up 500s"},

	        {"ante":"1K", "smallBlind":"3K" ,"bigBlind":"6K"},
	        {"ante":"1K", "smallBlind":"4K" ,"bigBlind":"8K"},
	        {"ante":"1K", "smallBlind":"6K" ,"bigBlind":"12K"},
	        {"ante":"1K", "smallBlind":"8K" ,"bigBlind":"16K"},
	        {"ante":"1K", "smallBlind":"10K" ,"bigBlind":"20K"},
	        {"ante":"1K", "smallBlind":"15K" ,"bigBlind":"30K"}
	    ]
	},
	"PokerLake" : {
	    "id": "PokerLake",
	    "name": "Poker At the Lake",
	    "headerImg": "img/mwpt.png",
	    "levelSeconds": 1200,
	    "levels":[
	        {"ante":0, "smallBlind":100 ,"bigBlind":200},
	        {"ante":0, "smallBlind":200 ,"bigBlind":400},
	        {"ante":0, "smallBlind":300 ,"bigBlind":600},
	        
	        {"ante":0, "smallBlind":400 ,"bigBlind":800},
	        {"ante":100, "smallBlind":400 ,"bigBlind":800},
	        {"ante":200, "smallBlind":600 ,"bigBlind":1200},
	        {"ante":300, "smallBlind":800 ,"bigBlind":1600},
	        {"ante":300, "smallBlind":1000 ,"bigBlind":2000},
	        
	        {"break": true, "label":"Chip-up 100s"},

	        {"ante":500, "smallBlind":1500 ,"bigBlind":3000},
	        {"ante":500, "smallBlind":2000 ,"bigBlind":4000},

	        {"break": true, "label":"Chip-up 500s"},

	        {"ante":1000, "smallBlind":3000 ,"bigBlind":6000},
	        {"ante":1000, "smallBlind":4000 ,"bigBlind":8000},
	        {"ante":2000, "smallBlind":6000 ,"bigBlind":12000},
	        {"ante":3000, "smallBlind":8000 ,"bigBlind":16000},
	        {"ante":3000, "smallBlind":10000 ,"bigBlind":20000},
	        {"ante":5000, "smallBlind":15000 ,"bigBlind":30000}
	    ]
	}
}

exports.findStatusById = function(id) {
	return statusDb[id];
}

exports.listStatus = function(id) {
	var response = [];
	for(var id in statusDb) {
		response.push(statusDb[id]);
	}
	return response;
}

exports.findTournamentById = function(id) {
	return tournamentDb[id];
}

exports.listTournaments = function() {
	var response = [];
	for(var t in tournamentDb) {
		response.push(tournamentDb[t]);
	}
	return response;
}

