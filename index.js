'use strict'
import createPageElement from "./modules/createPageElement.js"
import pkmnPageBuilder from "./modules/pkmnPageBuilder.js"
import apiGet from "./modules/apiGet.js"
import navigationUrls from "./data/pkmUrls.js"
/*
im gonna use the pokeapi.co rest api to GET me some data
display some data and have some fancy information about pokemon for users to veiw

if i have fetched once i should use it to its full extent before fetching again anything new.

todo:
done: make an utility fetch function?
done: get some poke info
done: display some pokeinfo on hover
done: get pokemonsymbol correspodning to type

search funtionality
more transitions
better styling
make the big click event

-   -   -   -   -   -   -   -   -   -
main goal to ahcieve is this:
2 card state being netrual and mousehover.
when card is hoverd over base info like hp type is shown expanded in a transition over the image
-   -   -   -   -   -   -   -   -   -

|   |   |   |   |   |   |   |   |   |
big end goal is this one
when clicked the card image moves left and hover is instead expanded in a transition to the right at the bottom showing stats
right side of card is expanded and more info is shown like flavor text favorit berry and weight moves and such
|   |   |   |   |   |   |   |   |   |

i fear my pokemon card assembler function thing is gonna be a mess and very heavy
OH WELL time to learn

mah font of chice just gonna put it here
https://fonts.google.com/share?selection.family=Allerta%20Stencil%7CDelicious%20Handrawn%7CNothing%20You%20Could%20Do%7CPlay
if i want to i could use this fancy title thingy i had a textgenerator make
https://fontmeme.com/permalink/230328/e2e185b65a33eaf27a6f038497dae996.png
*/

const pokeContainerEL = document.getElementById("pokemain-container")
const navEl = document.getElementById("nav-bar")

function navBar(targetEL){
    const previousBtn = createPageElement("button", {"textContent": "previous"})
    const homeBtn = createPageElement("button", {"textContent": "home"})
    const nextBtn = createPageElement("button", {"textContent": "next"})
    const searchEl = createPageElement("input", {"type": "text", "placeholder": "minimum 3 letters..."})

    previousBtn.addEventListener("click",()=>{pkmnPageBuilder(apiGet(navigationUrls.previous), pokeContainerEL)})
    homeBtn.addEventListener("click",()=>{pkmnPageBuilder(apiGet(navigationUrls.default), pokeContainerEL)})
    nextBtn.addEventListener("click",()=>{pkmnPageBuilder(apiGet(navigationUrls.next), pokeContainerEL)})
    searchEl.addEventListener("keyup",(e)=>{
        searchPokemon(e.target.value)
    })
    targetEL.append(previousBtn,homeBtn,nextBtn,searchEl)
}
navBar(navEl)

pkmnPageBuilder(apiGet(navigationUrls.default), pokeContainerEL)

async function searchPokemon(input){
    if(input.length <= 2)return
    //get pokemon list of all names if search typed character is included in pokemon list of names return all of those
    //this should be a varibale to includes growth in list of available pokemons
    const everyPokemon = await apiGet(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1281`)
    const searchResult = everyPokemon.results.filter(pkmnName => pkmnName.name.includes(input))
    everyPokemon.results = searchResult
    pkmnPageBuilder(everyPokemon, pokeContainerEL)
}
