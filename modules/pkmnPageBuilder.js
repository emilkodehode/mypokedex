'use strict'
import createPageElement from "./createPageElement.js"
import apiGet from "./apiGet.js"
import navigationUrls from "../data/pkmUrls.js"
import typeColor from "../data/pkmTypeIcons.js"

async function pkmnPageBuilder(arrayData, target){
    const pokemonData = await arrayData
    navigationUrls.setUrls(pokemonData)
    while(target.childElementCount > 0){
        target.removeChild(target.lastChild)
    }
    let arrayOfPokemon = []
    for (const pkmn of pokemonData.results) {
        arrayOfPokemon.push(await pokemonCard(pkmn))
    }
    target.append(...arrayOfPokemon)
}

function hoverClassToggle(e){e.target.querySelector(".details-text").classList.toggle("hidden")}


//i get all the info i need to make what i want here but i probably should split it into on maker for each state of a card
//one pokemoncardmaker one pokemoncardhover and one pokemoncardclicked
async function pokemonCard(objWithPkmnUrl){
    const {url} = objWithPkmnUrl
    const singlePokeData = await apiGet(url)
    
    // const moreInfo = await pokemonCardClick(singlePokeData)
    
    const card = document.createElement("div")
    card.className = "card"
    card.style.zIndex = "0"
    card.addEventListener("mouseenter", (e)=>{hoverClassToggle(e)})
    card.addEventListener("mouseleave", (e)=>{hoverClassToggle(e)})
    card.addEventListener("click", function(){
        this.querySelector(".additional-details-text").classList.toggle("additional-hidden")
        if(this.style.zIndex === "0"){
            this.style.zIndex = "3"
        }
        else{
            this.style.zIndex = "0"
        }
    })

    
    const cardHeader = createPageElement("div", {className: "card-header"})
    const headerId = createPageElement("p", {textContent: singlePokeData.id})
    const headerName = createPageElement("p", {textContent: singlePokeData.name})
    cardHeader.append(headerId, headerName)
    
    const picture = createPageElement("img", {src: singlePokeData.sprites.other["official-artwork"].front_default,
    alt: `Image depicting the Pokèmon ${singlePokeData.name} with number ID ${singlePokeData.id}`})
    
    const typesContainer = createPageElement("div", {className: "types-container"})
    let types = []
    for (let i = 0; i < singlePokeData.types.length; i++) {
        const typeName = singlePokeData.types[i].type.name
        const typeEl = createPageElement("div", {className:"type-icon"})
        const typePic = createPageElement("img", {src: typeColor.src[typeName]})
        typeEl.style.backgroundColor = typeColor.colorIcon[typeName]
        const typeText = createPageElement("p", {textContent: typeName})
        typeEl.append(typeText,typePic)
        types.push(typeEl)
        card.style.backgroundColor = typeColor.colorCard[singlePokeData.types[0].type.name]
    }


    typesContainer.append(...types)
    const pokemonContainer = document.createElement("div")
    pokemonContainer.className = "pkmn-details"
    
    const info = pokemonCardHover(singlePokeData)
    pokemonContainer.append(info, picture)
    
    
    card.append(cardHeader,pokemonContainer, typesContainer, await pokemonCardClick(singlePokeData))
    return card
}

function pokemonCardHover(obj){
    const {stats} = obj
    const detailsContainer = document.createElement("div")
    detailsContainer.className = "details-text hidden"
    detailsContainer.style.backgroundColor = typeColor.colorCard[obj.types[0].type.name]

    let statArray = []
    for (const stat of stats) {
        const statInfoText = createPageElement("p", {textContent: stat.stat.name, className: "base-stat"})
        const statInfoNum = createPageElement("p", {textContent: stat.base_stat, className: "base-stat"})
        statArray.push(statInfoText,statInfoNum)
    }
    detailsContainer.append(...statArray)
    return detailsContainer
}

export default pkmnPageBuilder

/*
click and this div is shown styling dictates changes. so a transition to fill the screen on card clicked
flavor text are shown the card goes to the left and more info appear right side for now lets worry about just getting more info to show up
class additionaldetails
*/
async function pokemonCardClick(obj){
    const weight = obj.weight
    const name = obj.name
    const flavorSrc = await apiGet(obj.species.url)
    let flavorWords = "something is missing"
    if(flavorSrc.flavor_text_entries[0] !== undefined){
        flavorWords = flavorSrc.flavor_text_entries[0].flavor_text
    }
    //flavor text egg group weight height 
    //get some flavor text and items and stuff

    //some falvor text need to be found by correct language key:value this needs to be fixed
    //const flavorWords = correctFalvorText(flavorSrc.flavor_text_entries)
    const additionalDetailsContainer = createPageElement("div", {className: "additional-details-text additional-hidden"})
    additionalDetailsContainer.textContent = `${name} weighs ${weight} flavortext wip src ${flavorWords}`
    return additionalDetailsContainer
}

function correctFalvorText(flavorTextEntries){
    let correctText = ""
    while (correctText === ""){
        let i = 0;
            if(flavorTextEntries[i].language.name === "en"){
                correctText = flavorTextEntries[i].flavor_Text
                console.log(typeof correctText)
            }
        i++
        }
    return correctText
}