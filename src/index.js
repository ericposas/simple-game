import random from 'random'
import './style.scss'
import { procPlayerControls } from './controls/playerControls'
import { getCssProp } from './helpers/utils'
import { enemyHitEvent, winEvent } from './events/Events'
import {
	winHandler,
	attackHandler
} from './handlers/Handlers'
import {
	buildUI,
	addPlayer,
	declareGlobals
} from './dom/DomFunctions'


window.start = () => {

	let width = 700, height = 500
	let keysDown = []

	declareGlobals()

	// add enemies to stage in random positions
	enemies.forEach((en, i) => {
		stage.appendChild(en.htmlElement)
		en.htmlElement.style.left = random.int(20, 680)+'px'
		en.htmlElement.style.top = random.int(20, 480 - 75)+'px'
		// if (i == 3) en.doThing() // just testing our internal enemy functions..
		// document.addEventListener('enemy hit', enemyHitHandler.bind(en))
	})

	buildUI()
	addPlayer()

	// add listeners
	document.addEventListener('win', winHandler)
	document.addEventListener('player attack', attackHandler)
	document.addEventListener('keydown', e => {
		if (keysDown.indexOf(e.keyCode) < 0) { // if keyCode doesn't exist in keysDown array, add it
			keysDown.push(e.keyCode)
		}
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
	})

	function gameLoop(delta) {

		if (gameState == 'play') {
			if (killCount == enemyCount) { document.dispatchEvent(winEvent) }
			procPlayerControls(keysDown, sword)
			requestAnimationFrame(gameLoop) // update / render
		}

	}

	requestAnimationFrame(gameLoop)

}
