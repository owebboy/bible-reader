import elements from "./elements"
import state from "./state"


const tableOfContents = {

    build: (bible) => {

        const dom = document.createElement("div")
        dom.classList.add("books")

        const exitWrapper = document.createElement("div")
        exitWrapper.classList.add("toc-exit")
        const exit = document.createElement("i")
        exit.classList.add("fal", "fa-times-circle")
        exitWrapper.addEventListener("click", e => {
            tableOfContents.hide()
        })
        exitWrapper.appendChild(exit)
        dom.append(exitWrapper)

        for (let [key, value] of Object.entries(bible)) {

            const book = document.createElement("div")
            book.classList.add("book")

            const bookTitle = document.createElement("div")
            bookTitle.classList.add("book-title")
            bookTitle.textContent = value.short
            book.appendChild(bookTitle)

            const bookChapters = document.createElement("div")
            bookChapters.classList.add("book-chapters")
            for(let chapter of Object.keys(value.chapters)) {
                
                const bookChapter = document.createElement("div")
                bookChapter.classList.add("book-chapter")

                if(key == state.book && chapter == state.chapter) {
                    bookChapter.classList.add("active")   
                }

                bookChapter.dataset.book = key
                bookChapter.dataset.chapter = chapter
                bookChapter.textContent = chapter

                bookChapter.addEventListener("click", e => {
                    state.update(bookChapter.dataset.book, bookChapter.dataset.chapter)
                    tableOfContents.hide()
                })

                bookChapters.append(bookChapter)
            }
            book.appendChild(bookChapters)

            dom.appendChild(book)


        }

        elements.tableOfContents.appendChild(dom)
    },

    setActive: (book, chapter) => {
        const current_active = document.querySelector(`.book-chapters > .active`)
        if(current_active) {
            current_active.classList.remove("active")
        }
        
        const elem = document.querySelector(`[data-book="${book}"][data-chapter="${chapter}"]`)
        if(elem) {
            elem.classList.add("active")
        }
    },

    toggle: () => {
        if(elements.tableOfContents.classList.contains("toc_active")) {
            tableOfContents.hide()
        } else {
            tableOfContents.show()
        }
    },

    show: () => {
        elements.tableOfContents.classList.add("toc_active")
    },

    hide: () => {
        elements.tableOfContents.classList.remove("toc_active")
    }
}

export default tableOfContents