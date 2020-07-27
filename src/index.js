import bible from './bible.min.json';
import ui from './ui.js';
import state from './state';
import 'normalize.css';
import './style.css';
import elements from './elements';
import tableOfContents from "./tableOfContents"

let app = () => {
    ui.list_books(bible);

    // set book to be GEN and chapter to be 1
    state.update('GEN', 1);

    tableOfContents.build(bible)

};

elements.prev.addEventListener('click', (e) => {
    state.prevChapter();
});

elements.next.addEventListener('click', (e) => {
    state.nextChapter();
});

elements.title.addEventListener("click", e=> {
    state.update("GEN", 1)
})

elements.current_position.addEventListener("click", e=> {
    tableOfContents.toggle()
})

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            e.preventDefault();
            state.nextChapter();
            break;

        case 'ArrowLeft':
            e.preventDefault();
            state.prevChapter();
            break;

        case 'ArrowUp':
            e.preventDefault();
            state.prevBook();
            break;
        case 'ArrowDown':
            e.preventDefault();
            state.nextBook();
            break;
        default:
            break;
    }
});

window.addEventListener('load', app);
