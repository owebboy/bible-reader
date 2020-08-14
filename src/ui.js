import state from './state';
import elements from './elements';

const ui = {
    list_books: (bible) => {
        for (let [key, value] of Object.entries(bible)) {
            ui.list_item(elements.books_idx, key, 1, key, value.short);
        }
    },

    build_nav: (prev, next) => {
        if (prev) {
            elements.prev.textContent = `${prev.book} ${prev.chapter}`;
        } else {
            elements.prev.textContent = null
        }

        if (next) {
            elements.next.textContent = `${next.book} ${next.chapter}`;
        } else {
            elements.next.textContent = null
        }
    },

    list_chapters: (bible, book) => {
        let chapters = document.createDocumentFragment();

        for (let cid of Object.keys(bible[book].chapters)) {
            ui.list_item(chapters, book, cid, cid, cid);
        }

        elements.chapters_idx.innerHTML = '';
        elements.chapters_idx.append(chapters);
    },

    set_active: (book, chapter) => {
        elements.books_idx.childNodes.forEach((elem) =>
            elem.classList.remove('active')
        );
        elements.chapters_idx.childNodes.forEach((elem) =>
            elem.classList.remove('active')
        );

        let book_idx = document.querySelector(`[data-id="${book}"]`);
        book_idx.classList.add('active');

        let chapter_idx = document.querySelector(`[data-id="${chapter}"]`);
        chapter_idx.classList.add('active');
    },

    set_pos: (book, chapter) => {
        elements.current_position.textContent = `${book} ${chapter}`;
    },

    scroll: (book, chapter) => {
        const b = document.querySelector(`[data-id="${book}"]`);
        const c = document.querySelector(`[data-id="${chapter}"]`);

        b.scrollIntoView(true, {
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
        c.scrollIntoView(true, {
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    },

    set_book_heading: (bible, book) => {
        elements.chapter_heading.textContent = bible[book].long;
    },

    list_item: (parent, bookid, chapterid, id, title) => {
        let item = document.createElement('div');
        item.classList.add('list-item');
        item.dataset.id = id;
        item.textContent = title;

        item.addEventListener('click', (e) => {
            state.update(bookid, chapterid);
        });

        parent.appendChild(item);
    },

    build_chapter: (verses) => {
        let chapter = document.createDocumentFragment();

        for (let [vid, verse] of Object.entries(verses)) {
            chapter.appendChild(ui.build_verse(vid, verse));
        }

        elements.verses.innerHTML = '';
        elements.verses.append(chapter);
    },

    build_verse: (id, verse) => {
        let v = document.createElement('div');
        v.classList.add('verse');
        v.dataset.id = id;

        let vid = document.createElement('div');
        vid.classList.add('verse-id');
        vid.textContent = id;
        v.appendChild(vid);

        let content = document.createElement('div');
        content.classList.add('verse-content');
        content.textContent = verse

        // let verseVerse = document.createElement('span')
        // verseVerse.classList.add("verse-verse")
        // verseVerse.textContent = verse
        // verseVerse.addEventListener("click", e => {
        //     verseVerse.style.borderBottom = "1px dotted"
        // })

        // content.appendChild(verseVerse)

        // word.addEventListener("mouseenter", (e) => {
        //       let words = document.querySelectorAll(
        //         `[data-word="${word.dataset.word}"]`
        //       );
        //       words.forEach((e) => {
        //         e.style.backgroundColor = `royalblue`;
        //         e.style.color = `white`;
        //       });
        //     });
        //     word.addEventListener("mouseleave", (e) => {
        //       let words = document.querySelectorAll(
        //         `[data-word="${word.dataset.word}"]`
        //       );
        //       words.forEach((e) => {
        //         e.style.backgroundColor = `white`;
        //         e.style.color = null;
        //       });
        //     });
        v.appendChild(content);

        return v;
    },
};

export default ui;
