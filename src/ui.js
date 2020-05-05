import state from "./state";

const elements = {
    books_idx: document.querySelector(".books_idx"),
    chapters_idx: document.querySelector(".chapters_idx"),
    verses_idx: document.querySelector(".verses_idx"),
    chapter_heading: document.querySelector(".chapter_heading"),
    verses: document.querySelector(".verses"),
    current_position: document.querySelector(".current_position")
}


const ui = {

    list_books: (bible) => {
        for (let [key, value] of Object.entries(bible)) {
            ui.list_item(elements.books_idx, key, 1, key, value.short)
        }
    },

    list_chapters: (bible, book) => {

        let chapters = document.createDocumentFragment()

        for(let cid of Object.keys(bible[book].chapters)) {
            ui.list_item(chapters, book, cid, cid, cid)
        }

        elements.chapters_idx.innerHTML = ""
        elements.chapters_idx.append(chapters)
    },

    set_active: (book, chapter) => {

        elements.books_idx.childNodes.forEach(elem => elem.classList.remove("active"))
        elements.chapters_idx.childNodes.forEach(elem => elem.classList.remove("active"))

        let book_idx = document.querySelector(`[data-id="${book}"]`)
        book_idx.classList.add("active")

        let chapter_idx = document.querySelector(`[data-id="${chapter}"]`)
        chapter_idx.classList.add("active")
    },

    set_pos: (book, chapter) => {
        elements.current_position.textContent = `${book} ${chapter}`
    },

    set_book_heading: (bible, book) => {
        elements.chapter_heading.textContent = bible[book].long
    },

    list_item: (parent, bookid, chapterid, id, title) => {

        let item = document.createElement("div")
        item.classList.add("list-item")
        item.dataset.id = id
        item.textContent = title

        item.addEventListener("click", e => {
            state.update(bookid, chapterid)
        })

        parent.appendChild(item)

    },


    build_chapter: (verses) => {

        let chapter = document.createDocumentFragment()

        for(let [vid, verse] of Object.entries(verses)) {
            chapter.appendChild(ui.build_verse(vid, verse))
        }

        elements.verses.innerHTML = ""
        elements.verses.append(chapter)
    },

    build_verse: (id, verse) => {

        let v = document.createElement("div")
        v.classList.add("verse")
        v.dataset.id = id

        let vid = document.createElement("div")
        vid.classList.add("verse-id")
        vid.textContent = id
        v.appendChild(vid)

        let content = document.createElement("div")
        content.classList.add("verse-content")
        content.textContent = verse
        v.appendChild(content)

        return v
    }

    

}

export default ui