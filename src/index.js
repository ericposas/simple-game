import * as d3 from 'd3'
import './style.scss'
import { procPlayerControls } from './controls/playerControls'
import { getCssProp } from './helpers/utils'
// import Events from './events/Events'


window.start = () => {

	// init
	let keysDown = []
	let lastAttack = 0
	window.isFacing = 'right'

	let player = document.getElementById('player')
	let sword = document.getElementById('sword')
	let enemy = document.getElementById('enemy')
	player.style.left = '40px'
	enemy.style.left = '140px'
	player.style.top = enemy.style.top = '100px'

	function attackHandler(e) {
		if (Date.now() - lastAttack > 500) { // do nothing is last attack was less than n ms ago
			console.log('player is attacking!')
			// play sword animation class
			if (isFacing === 'right') {
				sword.classList.add('sword-attack-right')
				setTimeout(() => {
					sword.classList.remove('sword-attack-right')
				}, 500)
			} else {
				sword.classList.add('sword-attack-left')
				setTimeout(() => {
					sword.classList.remove('sword-attack-left')
				}, 500)
			}
			// check if player if close enough to hit on y axis (top / bottom)
			if (parseInt(getCssProp(enemy, 'top')) - parseInt(getCssProp(player, 'top')) < 5 &&
					parseInt(getCssProp(player, 'top')) - parseInt(getCssProp(enemy, 'top')) < 5) {
						// check if player is close enough to hit on left / right sides
						if (parseInt(getCssProp(enemy, 'left')) - parseInt(getCssProp(player, 'left')) < 20 &&
						parseInt(getCssProp(enemy, 'left')) - parseInt(getCssProp(player, 'left')) > 0 &&
						isFacing === 'right') {
							console.log('enemy hit!')
						}
						if (parseInt(getCssProp(player, 'left')) - parseInt(getCssProp(enemy, 'left')) < 20 &&
						parseInt(getCssProp(player, 'left')) - parseInt(getCssProp(enemy, 'left')) > 0 &&
						isFacing === 'left') {
							console.log('enemy hit!')
						}
			}
			//
			lastAttack = Date.now()
		}
	}

	document.addEventListener('player attack', attackHandler)
	document.addEventListener('keydown', e => {
		if (keysDown.indexOf(e.keyCode) < 0) { // if keyCode doesn't exist in keysDown array, add it
			keysDown.push(e.keyCode)
		}
		console.log(keysDown)
		// keyDown = e.keyCode
		// console.log(e.keyCode)
	})
	// Our player would stop moving if we had two keys down,
	// and suddenly lifted off of one key. Storing the simultaneous
	// keys in an array solves this issue, since we check for the
	// existence of each keyCode and remove that specific one instead
	// of simply setting a 'keyDown' var to null.
	document.addEventListener('keyup', e => {
		if (keysDown.indexOf(e.keyCode) > -1) {
			keysDown =
				[]
				.concat(keysDown.slice(0, keysDown.indexOf(e.keyCode)))
				.concat(keysDown.slice(keysDown.indexOf(e.keyCode)+1, keysDown.length))
		}
		console.log(keysDown)
	})


	function gameLoop(delta) {

		procPlayerControls(keysDown, sword)

		requestAnimationFrame(gameLoop) // update / render

	}

	requestAnimationFrame(gameLoop)

}
