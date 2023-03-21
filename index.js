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

async function pokemonTest(){
    pokemonData = await apiGet("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    const pageMeat = pokemonData.results
    let arrayOfPokemon = []
    for (const meat of pageMeat) {
        arrayOfPokemon.push(await pokemonCardMaker(meat))
    }
    pokeContainerEL.append(...arrayOfPokemon)
}

pokemonTest()

async function pokemonCardMaker(obj){
    const {name, url} = obj
    const title = document.createElement("p")
    title.textContent = name
    const picture = document.createElement("img")
    const singlePokeData = await apiGet(url)
    picture.src = singlePokeData.sprites.other["official-artwork"].front_default
    picture.alt = name
    const card = document.createElement("div")
    card.className = "card"

    card.append(title,picture)
    return card
}