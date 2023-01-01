"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
	const $searchButton = document.querySelector("#search")
	$searchButton.addEventListener("click", processInput)

	const $previousButton = document.querySelector("#previous")
	const $nextButton = document.querySelector("#next")

	$previousButton.addEventListener("click", processPrevious)
	$nextButton.addEventListener("click", processNext)
}



function processInput(e) {
	e.preventDefault()
	let $index = document.querySelector("#index").value;
	loadExtraInfoOnPokemon($index)
}


function processPrevious(e) {
	e.preventDefault()
	let $index = document.querySelector("#index").value;
	$index--

	document.querySelector("#index").value = $index
	loadExtraInfoOnPokemon($index);
}

function processNext(e) {
	e.preventDefault()
	let $index = document.querySelector("#index").value;
	$index++

	document.querySelector("#index").value = $index
	loadExtraInfoOnPokemon($index);
}



function loadExtraInfoOnPokemon(index) {
	fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`)
		.then((response) => response.json())
		.then((json) => {
			gatherData(json, index)
		})
}


// ! GATHER ALL THE DATA

function gatherData(json, index) {
	// console.log(json);
	const name = json.name;
	const moves = json.moves;
	const image = json.sprites.front_default

	makeChangesToHTML(index, name, moves, image)
}




// ! MAKE CHANGES TO HTML


function makeChangesToHTML(index, name, moves, image) {
	const outputName = document.querySelector("#name");
	const outputMoves = document.querySelector("#moves");
	
	renderInfo(name, moves, outputName, outputMoves)
	renderTitles(index, name, moves)
	renderImage(image, name)
}



function renderImage(URL, name) {
	const $imageArea = document.querySelector("#image-area")
	let image = 
	`
		<img src="${URL}" alt="photo of ${name}">
	
	`

	$imageArea.innerHTML = " "
	$imageArea.insertAdjacentHTML("beforeend", image)
}



function renderTitles(index, name, moves) {
	const $titleName = document.querySelector("#name-title")
	const $titleMoves = document.querySelector("#move-title")

	$titleName.innerHTML = `${index}: ${name}`
	$titleMoves.innerHTML = `(total ${moves.length}): `
}



function renderInfo(name, moves, outputName, outputMoves) {
	outputName.innerHTML = " ";
	outputName.innerHTML += `<li>${name}</li>`;

	outputMoves.innerHTML = " ";
			
	moves.forEach(
		(move) =>
			(outputMoves.innerHTML += `<p>${move.move.name}</p>`)
		);
}