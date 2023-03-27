import createPageElement from "./createPageElement.js"
import apiGet from "./apiGet.js"
import navigationUrls from "../data/pkmUrls.js"
import typeIcons from "../data/pkmTypeIcons.js"

async function pkmnPageBuilder(url, target){
    const pokemonData = await apiGet(url)
    const pageMeat = pokemonData.results
    navigationUrls.setUrls(pokemonData)
    while(target.childElementCount > 0){
        target.removeChild(target.lastChild)
    }
    let arrayOfPokemon = []
    for (const meat of pageMeat) {
        arrayOfPokemon.push(await pokemonCard(meat))
    }
    target.append(...arrayOfPokemon)
}

function hoverClassToggle(e){
    e.target.classList.toggle("hover");
    e.target.querySelector(".hover-info").classList.toggle("hidden")
}

//i get all the info i need to make what i want here but i probably should split it into on maker for each state of a card
//one pokemoncardmaker one pokemoncardhover and one pokemoncardclicked
async function pokemonCard(obj){
    const {name, url} = obj

    const card = document.createElement("div")
    card.className = "card"
    card.addEventListener("mouseenter", (e)=>{hoverClassToggle(e)})
    card.addEventListener("mouseleave", (e)=>{hoverClassToggle(e)})


    const title = createPageElement("p", {"textContent": name})
    const singlePokeData = await apiGet(url)
    const picture = createPageElement("img", {src: singlePokeData.sprites.other["official-artwork"].front_default,alt: name})
    
    const typesContainer = createPageElement("div", {className: "typescontainer"})
    let types = []
    for (let i = 0; i < singlePokeData.types.length; i++) {
        const typeName = singlePokeData.types[i].type.name
        const typeEl = createPageElement("div", {className:"typeicon"})
        const typePic = createPageElement("img", {src: typeIcons.src[typeName]})
        typeEl.style.backgroundColor = typeIcons.color[typeName]
        const typeText = createPageElement("p", {textContent: typeName})
        typeEl.append(typeText,typePic)
        types.push(typeEl)
    }
    typesContainer.append(...types)
    const pokemonContainer = document.createElement("div")
    pokemonContainer.className = "containerpokemon"

    const info = pokemonCardHover(singlePokeData)
    pokemonContainer.append(info, picture)


    card.append(title,pokemonContainer, typesContainer)
    return card
}

function pokemonCardHover(obj){
    const {stats} = obj
    const detailsContainer = document.createElement("div")
    detailsContainer.className = "hover-info hidden"
    
    const listEl = document.createElement("ul")
    for (const stat of stats) {
        let listItem = document.createElement("li")
        listItem.innerText = `${stat.stat.name} / ${stat.base_stat}`
        listEl.append(listItem)
    }
    detailsContainer.append(listEl)
    return detailsContainer
}

export default pkmnPageBuilder