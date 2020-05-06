import bible from './bible.min.json'
import ui from './ui.js'
import state from "./state"
import './style.scss';


let app = () => {

    console.log(Object.keys(bible).length)
    
    ui.list_books(bible)

    // set book to be GEN and chapter to be 1
    state.update("GEN", 1)

    console.log(state.getNext())
    console.log(state.getPrev())
}

window.addEventListener("keydown", e => {
    
    switch (e.key) {
        case "ArrowRight":
            e.preventDefault()
            state.nextChapter()
            break;

        case "ArrowLeft":
            e.preventDefault()
            state.prevChapter()
            break;
    
        case "ArrowUp":
            e.preventDefault()
            state.prevBook()
            break;
        case "ArrowDown":
            e.preventDefault()
            state.nextBook()
            break;
        default:
            break;
    }
})
window.addEventListener("load", app)