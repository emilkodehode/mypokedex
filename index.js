'use strict'
import createPageElement from "./modules/createPageElement.js"
import pkmnPageBuilder from "./modules/pkmnPageBuilder.js"
import apiGet from "./modules/apiGet.js"
import navigationUrls from "./data/pkmUrls.js"
/*
im gonna use the pokeapi.co rest api to GET me some data to display and have some fancy information about pokemon for users to veiw

i should remember to cache results. if i have fetched once i should use it to its full extent before fetching again.

i am fetching and getting everyhting i need so i should update everything but what is everything

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

i get nature 

i need to find some pokemon nature/type symbols link em fetch or something and make some array correspodning to that so i can change the background color of the cards
*/

const pokeContainerEL = document.getElementById("pokemaincontainer")
const navEl = document.getElementById("nav-bar")

function navBar(targetEL){
    const previousBtn = createPageElement("button", {"textContent": "previous"})
    const homeBtn = createPageElement("button", {"textContent": "home"})
    const nextBtn = createPageElement("button", {"textContent": "next"})
    const searchEl = createPageElement("input", {"type": "text", "placeholder": "minimum 3 letters"})

    previousBtn.addEventListener("click",()=>{pkmnPageBuilder(navigationUrls.previous, pokeContainerEL)})
    homeBtn.addEventListener("click",()=>{pkmnPageBuilder(navigationUrls.default, pokeContainerEL)})
    nextBtn.addEventListener("click",()=>{pkmnPageBuilder(navigationUrls.next, pokeContainerEL)})
    targetEL.append(previousBtn,homeBtn,nextBtn)
}
navBar(navEl)


pkmnPageBuilder(navigationUrls.default, pokeContainerEL)


