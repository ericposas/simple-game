import { getCssProp } from '../helpers/utils'
import { playerAttackEvent } from '../events/Events'


export function procPlayerControls(keysVar, sword) {

	// create some simple boundaries
	if (parseInt(getCssProp(player, 'left'), 10) < 0) {
		player.style.left = '10px'
	} else if (parseInt(getCssProp(player, 'left'), 10) > 700) {
		player.style.left = '690px'
	} else if (parseInt(getCssProp(player, 'top'), 10) < 0) {
		player.style.top = '20px'
	} else if (parseInt(getCssProp(player, 'top'), 10) > (500 - 75)) {
		player.style.top = (480 - 75)+'px'
	} else {
	// otherwise, process keys down
				if (keysVar.indexOf(39) > -1) { // 'right'
					player.style.left = parseInt(getCssProp(player, 'left'), 10) + speed + 'px'
					isFacing = 'right'
					if (sword.classList.contains('sword-left')) {
						sword.classList.remove('sword-left')
					}
					sword.classList.add('sword-right')
					console.log(isFacing)
				}

				if (keysVar.indexOf(37) > -1) { // 'left'
					player.style.left = parseInt(getCssProp(player, 'left'), 10) - speed + 'px'
					isFacing = 'left'
					if (sword.classList.contains('sword-right')) {
						sword.classList.remove('sword-right')
					}
					sword.classList.add('sword-left')
					console.log(isFacing)
				}

				if (keysVar.indexOf(38) > -1) { // up
					player.style.top = parseInt(getCssProp(player, 'top'), 10) - speed + 'px'
				}

				if (keysVar.indexOf(40) > -1) { // down
					player.style.top = parseInt(getCssProp(player, 'top'), 10) + speed + 'px'
				}

				if (keysVar.indexOf(32) > -1) {
					document.dispatchEvent(playerAttackEvent)
				}

	}

}
