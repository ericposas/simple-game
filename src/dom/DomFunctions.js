import { Enemy } from '../enemies/Enemy'


export function addPlayer() {
	// add player
	let player = document.createElement('div')
	player.setAttribute('id', 'player')
	let sword = document.createElement('div')
	sword.setAttribute('id', 'sword')
	player.appendChild(sword)
	stage.appendChild(player)
	player.style.left = '40px'
	player.style.top = '100px'
}

export function buildUI() {
	// make UI
	let ui = document.createElement('div')
	ui.id = 'ui'
	stage.appendChild(ui)
	let killCountContainer = document.createElement('div')
	killCountContainer.id = 'kill-count'
	window.killCountWords = document.createElement('div')
	killCountWords.id = 'kill-count-words'
	killCountContainer.appendChild(killCountWords)
	killCountWords.innerHTML = `monsters vanquished: ${killCount}`
	ui.appendChild(killCountContainer)
}

export function declareGlobals() {
	// global vars
	window.lastAttack = 0
	window.killCount = 0
	window.enemyCount = 10
	window.isFacing = 'right'
	window.speed = 2
	window.gameState = 'play'
	window.stage = document.getElementById('stage')

	// create some dummy enemies, store in array
	window.enemies = new Array(enemyCount).fill(1).map(en => {
		return new Enemy('#fff')
	})
}
