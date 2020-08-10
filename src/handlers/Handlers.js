import { getCssProp } from '../helpers/utils'


export function winHandler(e) {
	gameState = 'win'
	// show some win grphx
	let bigWin = document.createElement('div')
	bigWin.innerHTML = 'YOU WON!'
	bigWin.id = 'win'
	stage.appendChild(bigWin)
	player.style.display = 'none'
}

export function attackHandler(e) {
	if (Date.now() - lastAttack > 400) { // do nothing is last attack was less than n ms ago
		console.log('player is attacking!')
		// play sword animation class
		if (isFacing === 'right') {
			sword.classList.add('sword-attack-right')
			setTimeout(() => {
				sword.classList.remove('sword-attack-right')
			}, 350)
		} else {
			sword.classList.add('sword-attack-left')
			setTimeout(() => {
				sword.classList.remove('sword-attack-left')
			}, 350)
		}

		enemies.forEach((enemy, i) => {
			// check if player if close enough to hit on y axis (top / bottom)
			if (parseInt(getCssProp(enemy['htmlElement'], 'top')) - parseInt(getCssProp(player, 'top')) < 10 &&
			parseInt(getCssProp(player, 'top')) - parseInt(getCssProp(enemy['htmlElement'], 'top')) < 10) {
				// check if player is close enough to hit on left / right sides
				if (parseInt(getCssProp(enemy['htmlElement'], 'left')) - parseInt(getCssProp(player, 'left')) < 25 &&
				parseInt(getCssProp(enemy['htmlElement'], 'left')) - parseInt(getCssProp(player, 'left')) > 0 &&
				isFacing === 'right') {
					removeEnemyAfterHit(enemy)
				}
				if (parseInt(getCssProp(player, 'left')) - parseInt(getCssProp(enemy['htmlElement'], 'left')) < 25 &&
				parseInt(getCssProp(player, 'left')) - parseInt(getCssProp(enemy['htmlElement'], 'left')) > 0 &&
				isFacing === 'left') {
					removeEnemyAfterHit(enemy)
				}
			}
		})
		//
		lastAttack = Date.now()
	}
}

function removeEnemyAfterHit(enemy) {
	setTimeout(() => {
		// console.log('enemy hit!')
		enemy['htmlElement'].classList.add('enemy-hit')
		setTimeout(() => {
			stage.removeChild(enemy['htmlElement'])
			killCountWords.innerHTML = `monsters vanquished: ${killCount+=1}`
		}, 350)
		// document.dispatchEvent(enemyHitEvent)
	}, 200)
}
