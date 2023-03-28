'use strict'
function createPageElement(tag = "div", props = {}){
    let element = document.createElement(tag)
    for (const prop of Object.entries(props)) {
        const [key,value] = prop
        element[key] = value
    }
    return element
}
export default createPageElement