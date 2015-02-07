//TODO.. dependency management for howler

var sound = new Howl({
	urls : [ 'audio/amy.mp3', 'audio/amy.ogg' ],
	sprite : {
		"running.true.false" : [ 0, 751 ],  // paused
		"running.false.true" : [ 1063, 829 ], //resumed
		"time.61.60" : [ 2048, 1453 ], // 1 minute
		"time.16.15" : [ 3539, 1970 ], // 15 seconds
		"time.121.120" : [ 5568, 1394 ], // two minutes
		//"begin" : [ 7108, 1043 ],
		"time.1.0" : [ 8284, 600 ], // time
		//zero : [ 9244, 642 ],
		"time.2.1" : [ 9884, 489 ], // one
		"time.3.2" : [ 10374, 500 ],// two
		"time.4.3" : [ 10905, 528 ], //three
		"time.5.4" : [ 11434, 578 ], //four
		"time.6.5" : [ 12013, 713 ], //five
		"time.7.6" : [ 12731, 808 ], //six
		"time.8.7" : [ 13549, 621 ], //seven
		"time.9.8" : [ 14174, 513 ], //eight
		"time.10.9" : [ 14687, 669 ], //nine
		"time.11.10" : [ 15335, 551 ] //ten
	}
});
