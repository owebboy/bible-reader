import ui from './ui';
import tableOfContents from "./tableOfContents"

const state = {
    book: null,
    chapter: null,
    bible: null,

    giveBible(bible) {
        state.bible = bible
    },

    update: (book, chapter) => {
        state.book = book;
        state.chapter = chapter;

        ui.list_chapters(state.bible, book);
        ui.set_active(book, chapter);
        ui.set_pos(book, chapter);
        ui.set_book_heading(state.bible, book);

        ui.build_chapter(state.bible[book].chapters[chapter]);

        ui.build_nav(state.getPrev(), state.getNext());

        ui.scroll(book, chapter)

        tableOfContents.setActive(book, chapter)
    },

    getNext: () => {
        // get the current position
        let chaptersOfBook = Object.keys(state.bible[state.book].chapters);

        let idx = chaptersOfBook.indexOf(state.chapter.toString());
        let nextChapter = chaptersOfBook[idx + 1];

        if (idx + 1 > chaptersOfBook.length - 1) {
            // get next book's first chapter
            let bids = Object.keys(state.bible);
            let bidx = bids.indexOf(state.book);
            if (bidx > -1 && bidx < bids.length - 1) {
                let nextBook = bids[bidx + 1];
                return {
                    book: nextBook,
                    chapter: 1,
                };
            } else {
                return null;
            }
        } else {
            // return this books next chapter
            return {
                book: state.book,
                chapter: nextChapter,
            };
        }
    },

    getPrev: () => {
        let chaptersOfBook = Object.keys(state.bible[state.book].chapters);

        let idx = chaptersOfBook.indexOf(state.chapter.toString());
        let prevChapter = chaptersOfBook[idx - 1];

        if (idx - 1 < 0) {
            // get prev chapter's last book
            let bids = Object.keys(state.bible);

            let bidx = bids.indexOf(state.book);
            if (bidx > 0 && bidx < bids.length) {
                let prevBook = bids[bidx - 1];

                let chapter = Object.keys(state.bible[prevBook].chapters)[
                    Object.keys(state.bible[prevBook].chapters).length - 1
                ];
                return {
                    book: prevBook,
                    chapter: chapter,
                };
            }

            return null;
        } else {
            return {
                book: state.book,
                chapter: prevChapter,
            };
        }
    },

    nextChapter: () => {
        // get the current position
        let chaptersOfBook = Object.keys(state.bible[state.book].chapters);

        let idx = chaptersOfBook.indexOf(state.chapter.toString());
        let nextChapter = chaptersOfBook[idx + 1];

        if (idx + 1 > chaptersOfBook.length - 1) {
            state.nextBook();
        } else {
            state.update(state.book, nextChapter);
        }
    },

    prevChapter: () => {
        let chaptersOfBook = Object.keys(state.bible[state.book].chapters);

        let idx = chaptersOfBook.indexOf(state.chapter.toString());
        let prevChapter = chaptersOfBook[idx - 1];

        if (idx - 1 < 0) {
            state.prevBook(true);
        } else {
            state.update(state.book, prevChapter);
        }
    },

    nextBook: () => {
        let bids = Object.keys(state.bible);

        let idx = bids.indexOf(state.book);
        if (idx > -1 && idx < bids.length - 1) {
            let nextBook = bids[idx + 1];

            state.update(nextBook, 1);
        }
    },

    prevBook: (last_chapter = false) => {
        let bids = Object.keys(state.bible);

        let idx = bids.indexOf(state.book);
        if (idx > 0 && idx < bids.length) {
            // console.log(, state.book)
            let prevBook = bids[idx - 1];
            let chapter = 1;
            if (last_chapter) {
                chapter = Object.keys(state.bible[prevBook].chapters)[
                    Object.keys(state.bible[prevBook].chapters).length - 1
                ];
            }

            state.update(prevBook, chapter);
        }
    },
};

export default state;
