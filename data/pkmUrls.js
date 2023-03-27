const navigationUrls = {
    default: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=6",
    next: "",
    previous: "",
    setUrls(data){
        const {next, previous} = data
        this.next = next || this.default
        this.previous = previous || this.default
        console.log(this.next, this.previous)
    }
}
export default navigationUrls