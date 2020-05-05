import ui from "./ui";
import bible from './bible.min.json'

const state = {

    book: null,
    chapter: null,

    update: (book, chapter) => {

        state.book = book
        state.chapter = chapter

        ui.list_chapters(bible, book)
        ui.set_active(book, chapter)
        ui.set_pos(book, chapter)
        ui.set_book_heading(bible, book)

        ui.build_chapter(bible[book].chapters[chapter])

    },

    nextChapter: () => {
        // get the current position
        let chaptersOfBook = Object.keys(bible[state.book].chapters)

        let idx = chaptersOfBook.indexOf(state.chapter.toString())
        let nextChapter = chaptersOfBook[idx + 1]

        if(idx + 1 > chaptersOfBook.length - 1) {
            state.nextBook()
        } else {
            state.update(state.book, nextChapter)
        }
    },

    prevChapter: () => {
        let chaptersOfBook = Object.keys(bible[state.book].chapters)

        let idx = chaptersOfBook.indexOf(state.chapter.toString())
        let nextChapter = chaptersOfBook[idx - 1]

        if(idx - 1 < 0) {
            state.prevBook(true)
        } else {
            state.update(state.book, nextChapter)
        }
    },

    nextBook: () => {
        let bids = Object.keys(bible)

        let idx = bids.indexOf(state.book)
        if(idx > -1 && idx < bids.length - 1) {
            // console.log(, state.book)
            let nextBook = bids[idx+1]

            state.update(nextBook, 1)
        }
    },

    prevBook: (last_chapter = false) => {
        let bids = Object.keys(bible)

        let idx = bids.indexOf(state.book)
        if(idx > 0 && idx < bids.length) {
            // console.log(, state.book)
            let prevBook = bids[idx-1]
            let chapter = 1
            if (last_chapter) {
                chapter = Object.keys(bible[prevBook].chapters)[Object.keys(bible[prevBook].chapters).length - 1]
            }

            state.update(prevBook, chapter)
        }
    }

}

export default state