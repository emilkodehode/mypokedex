import createPageElement from "./createPageElement.js"

async function pkmnPageBuilder(url, target){
    const pokemonData = await apiGet(url)
    const pageMeat = pokemonData.results
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
//one pokemoncardmaker one pokemoncardhover and one pokemoncardclicked i think that is a good way to go
async function pokemonCard(obj){
    const {name, url} = obj

    const card = document.createElement("div")
    card.className = "card"
    card.addEventListener("mouseenter", (e)=>{hoverClassToggle(e)})
    card.addEventListener("mouseleave", (e)=>{hoverClassToggle(e)})


    const title = createPageElement("p", {"textContent": name})
    const singlePokeData = await apiGet(url)
    const picture = createPageElement("img", {src: singlePokeData.sprites.other["official-artwork"].front_default,alt: name})
    
    const pokemonContainer = document.createElement("div")
    pokemonContainer.className = "containerpokemon"

    const info = pokemonCardHover(singlePokeData)
    pokemonContainer.append(info, picture)

    const sampletext = document.createElement("p")
    sampletext.textContent = `i am a little ${name}`

    card.append(title,pokemonContainer, sampletext)
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