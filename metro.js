// HTML5 Metronome

// Global

var upperNumber = document.getElementById('upperNumber');
var lowerNumber = document.getElementById('lowerNumber');
var tempo = document.getElementById('tempo'); 

var globalTempo, globalUpperNumber, globalLowerNumber;

var timer;
var currentBeat;
var intervalTimer = -1;

var audioContext = new webkitAudioContext();
var highSoundBuffer, lowSoundBuffer;

loadAudio();

update();


function loadAudio()
{
var request = new XMLHttpRequest();
request.open('GET', 'histicks.wav', true);
request.responseType = 'arraybuffer';

console.log('requesting audio files');
request.onload = function() 
	{
	audioContext.decodeAudioData(request.response, function(buffer)
		{
			highSoundBuffer = buffer;
		}, 
		function(err) 
		{ 
		console.log('Error in decode: '+err); 
		} 
		);
	}
request.send();

var request2 = new XMLHttpRequest();
request2.open('GET', 'losticks.wav', true);
request2.responseType = 'arraybuffer';

request2.onload = function() 
	{
	audioContext.decodeAudioData(request2.response, function(buffer)
		{
			lowSoundBuffer = buffer;
		}, 
		function(err) 
		{ 
			console.log('Error in decode: '+err); 
		}
		);
	}
request2.send();
}


function playNote(input)
{
var source = audioContext.createBufferSource();
source.buffer = input;
source.connect(audioContext.destination);
source.noteOn(0);

}

function update()
{
	if (intervalTimer > -1)
	{
		clearInterval(intervalTimer);
	}
	
	globalTempo = tempo.value;
	globalUpperNumber = upperNumber.value;
	globalLowerNumber = lowerNumber.value;
	currentBeat = globalUpperNumber+1;
	
	timer = 60/globalTempo;

	intervalTimer = setInterval("beat()", timer*1000); 

}

function beat()
{
	if (currentBeat > globalUpperNumber)
	{
		currentBeat = 1;
		playNote(highSoundBuffer);
	}
	else
	{
		
		playNote(lowSoundBuffer);
	}
	
	// play sound
	console.log(currentBeat);
	currentBeat++;
}


function raiseTempo()
{
	if (tempo.value == 180)
	{
	return false;
	}
	else
	{
	tempo.value++;
	}
	
	update();
}

function decreaseTempo()
{
	if (tempo.value == 1)
	{
	return false;
	}
	else
	{
	tempo.value--;
	}
	update();
}

function decreaseUpperNumber()
{

	if (upperNumber.value == 1)
	{
	return false;
	}
	else
	{
	upperNumber.value--;
	}
	update();
}

function raiseUpperNumber()
{

	if (upperNumber.value == 32)
	{
	return false;
	}
	else
	{
	upperNumber.value++;
	}
	update();
}

function decreaseLowerNumber()
{

	if (lowerNumber.value == 1)
	{
	return false;
	}
	else
	{
	lowerNumber.value--;
	}
	update();
}


function raiseLowerNumber()
{

	if (lowerNumber.value == 32)
	{
	return false;
	}
	else
	{
	lowerNumber.value++;
	}
	update();
}