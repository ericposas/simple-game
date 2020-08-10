export function Enemy(eyeColHex) {
	let enemy = document.createElement('div')
	enemy.classList.add('enemy')
	let eye1 = document.createElement('div')
	eye1.style.width = '2px'
	eye1.style.height = '2px'
	eye1.style.backgroundColor = eyeColHex
	eye1.style.left = '1px'
	eye1.style.position = 'absolute'
	eye1.style.top = '2px'
	enemy.appendChild(eye1)
	let eye2 = document.createElement('div')
	eye2.style.width = '2px'
	eye2.style.height = '2px'
	eye2.style.backgroundColor = '#fff'
	eye2.style.left = '7px'
	eye2.style.position = 'absolute'
	eye2.style.top = '2px'
	enemy.appendChild(eye2)
	let mouth = document.createElement('div')
	mouth.style.width = '7px'
	mouth.style.height = '1px'
	mouth.style.backgroundColor = eyeColHex
	mouth.style.position = 'absolute'
	mouth.style.left = '2px'
	mouth.style.bottom = '2px'
	enemy.appendChild(mouth)
	this.htmlElement = enemy
	return this
}

Enemy.prototype.doThing = () => {
	console.log('doing a thing')
}
