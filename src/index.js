// import bible from './bible.min.json';
import ui from './ui.js';
import state from './state';
import 'normalize.css';
import './style.css';
import elements from './elements';
import tableOfContents from './tableOfContents';

let app = () => {
    ui.start_loader()
    return import(
        /* webpackChunkName: "bible" */

        /* webpackMode: "lazy" */
        './bible.min.json'
    )
        .then(({ default: bible }) => {
            console.log(bible)
            ui.list_books(bible);

            state.giveBible(bible)

            // set book to be GEN and chapter to be 1
            state.update('GEN', 1);

            tableOfContents.build(bible);
            ui.end_loader()
        })
        .catch((error) => console.log(error));
};

elements.prev.addEventListener('click', (e) => {
    state.prevChapter();
});

elements.next.addEventListener('click', (e) => {
    state.nextChapter();
});

elements.title.addEventListener('click', (e) => {
    state.update('GEN', 1);
});

elements.current_position.addEventListener('click', (e) => {
    tableOfContents.toggle();
});

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

        case 'Escape':
            tableOfContents.hide();
            break;

        default:
            break;
    }
});

window.addEventListener('load', app);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {})
            .catch((registrationError) => {});
    });
}
