export function getCssProp(el, propName) {
	return getComputedStyle(el).getPropertyValue(propName)
}
