/*
im gonna use the pokeapi.co rest api to GET me some data to display and have some fancy information about pokemon for users to veiw

i should remember to cache results. if i have fetched once i should use it to its full extent before fetching again.
as patryk showed base info was easy to fetch but the image needed an additional request

todo:
make an utility fetch function?
get some poke info
display some pokeinfo

-   -   -   -   -   -   -   -   -   -
main goal to ahcieve is this:
3 card state rest hover clicked.
when card is hoverd over base info like hp type is shown expanded in a transition over the image
-   -   -   -   -   -   -   -   -   -


|   |   |   |   |   |   |   |   |   |
big end goal is this one
when clicked the card image moves left and hover is instead expanded in a transition to the right at the bottom showing stats
right side of card is expanded and more info is shown like flavor text favorit berry and weight moves and such
|   |   |   |   |   |   |   |   |   |


so card container div
name id
image
symbols

on hover symbols expand into base stat information
hover has container with list of info inside.

i fear my pokemon card assembler function thing is gonna be a mess and very heavy
OH WELL time to learn

*/

const pokeContainerEL = document.getElementById("pokemaincontainer")

async function apiGet(url){
    const request = await fetch(url)
    if(!request.ok){
        //need some debug info here and expand this to a proper try catch with maybe some attempt again exponential timer thing
    }
    const data = request.json()
    return data
}

async function consolelog(){
    let mordata = await apiGet("https://pokeapi.co/api/v2/pokemon?offset=0&limit=3")
    for (const iterator of mordata) {
        console.log(iterator.name)
    }
}

//consolelog()

async function pokemonTest(){
    pokemonData = await apiGet("https://pokeapi.co/api/v2/pokemon?offset=0&limit=9")
    const pageMeat = pokemonData.results
    let arrayOfPokemon = []
    for (const meat of pageMeat) {
        arrayOfPokemon.push(await pokemonCard(meat))
    }
    pokeContainerEL.append(...arrayOfPokemon)
}

pokemonTest()

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

    const title = document.createElement("p")
    title.textContent = name
    const picture = document.createElement("img")
    const singlePokeData = await apiGet(url)
    picture.src = singlePokeData.sprites.other["official-artwork"].front_default
    picture.alt = name
    
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