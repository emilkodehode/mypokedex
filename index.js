'use strict'
import createPageElement from "./modules/createPageElement.js"
import pkmnPageBuilder from "./modules/pkmnPageBuilder.js"
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
const navEl = document.getElementById("nav-bar")

const navigationUrls = {
    default: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=9",
    next: "",
    previous: "",
    setUrls(data){
        const {next, previous} = data
        this.next = next || this.default
        this.previous = previous || this.default
    }
}

function navBar(){
    const previousBtn = createPageElement("button", {"textContent": "previous"})
    const homeBtn = createPageElement("button", {"textContent": "home"})
    const nextBtn = createPageElement("button", {"textContent": "next"})
    const searchEl = createPageElement("input", {"type": "text", "placeholder": "minimum 3 letters"})

    previousBtn.addEventListener("click",)
}

function updateNavUrls(){
    //whut to do
}

async function apiGet(url){
    const request = await fetch(url)
    if(!request.ok){
        //need some debug info here and expand this to a proper try catch with maybe some attempt again exponential timer thing
    }
    const data = request.json()
    return data
}

pkmnPageBuilder()