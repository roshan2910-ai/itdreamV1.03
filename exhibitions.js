
/* ==========================================
   INSIDE TRACK
   PHASE 5 - MULTIMEDIA EXHIBITION ENGINE
========================================== */


/* ==========================================
   1. MULTIMEDIA DATABASE

   All current entries are demonstration
   records, not verified historical exhibits.
========================================== */

const exhibitions = [

    {
        id: 1,
        title: "The Evolution of Newspaper Photography",
        category: "photography",
        year: 1993,
        description: "A demonstration collection exploring how photographs document important events and the development of photojournalism.",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 2,
        title: "Front Pages Through History",
        category: "newspapers",
        year: 1995,
        description: "A demonstration collection of historical newspaper front pages and editorial presentation.",
        image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 3,
        title: "Investigative Journalism Documentary",
        category: "documentaries",
        year: 2000,
        description: "A placeholder for documentary films exploring investigative journalism and reporting methods.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 4,
        title: "Voices Behind the Headlines",
        category: "audio",
        year: 2005,
        description: "A planned collection of journalist interviews, oral histories and recorded conversations.",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 5,
        title: "Original Investigative Reports",
        category: "documents",
        year: 2010,
        description: "A planned collection of original reporting documents, scanned publications and research records.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 6,
        title: "The Rise of Digital News Photography",
        category: "photography",
        year: 2015,
        description: "A demonstration collection documenting the transition towards digital photojournalism.",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 7,
        title: "Journalism and Global Events",
        category: "documentaries",
        year: 2020,
        description: "A planned collection of documentary reporting on major global events.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 8,
        title: "Contemporary Media Publications",
        category: "newspapers",
        year: 2026,
        description: "A demonstration collection for contemporary newspaper and digital publication archives.",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 9,
        title: "Oral History of Journalism",
        category: "audio",
        year: 2020,
        description: "A planned oral history collection featuring recorded experiences of journalists.",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    },

    {
        id: 10,
        title: "Historical Press Documents",
        category: "documents",
        year: 2026,
        description: "A planned archive of historical press documents, original publications and editorial records.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
        creator: "To be verified",
        publication: "To be verified",
        source: "",
        mediaUrl: "",
        verified: false
    }

];


/* ==========================================
   2. HTML ELEMENTS
========================================== */

const exhibitionGrid =
    document.getElementById("exhibitionGrid");

const exhibitionSearch =
    document.getElementById("exhibitionSearch");

const yearFilter =
    document.getElementById("yearFilter");

const categoryButtons =
    document.querySelectorAll(".category-button");

const emptyMessage =
    document.getElementById("emptyMessage");

const pagination =
    document.getElementById("pagination");

const previousPage =
    document.getElementById("previousPage");

const nextPage =
    document.getElementById("nextPage");

const pageNumber =
    document.getElementById("pageNumber");

const exhibitionModal =
    document.getElementById("exhibitionModal");

const exhibitionDetails =
    document.getElementById("exhibitionDetails");

const closeExhibition =
    document.getElementById("closeExhibition");


/* ==========================================
   3. APPLICATION STATE
========================================== */

let selectedCategory = "all";

let currentPage = 1;

const itemsPerPage = 6;


/* ==========================================
   4. CATEGORY NAMES
========================================== */

const categoryNames = {

    photography: "Photography",

    newspapers: "Newspapers",

    documentaries: "Documentaries",

    audio: "Audio Archive",

    documents: "Historical Documents"

};


/* ==========================================
   5. FILTER BY YEAR
========================================== */

function matchesYear(itemYear, selectedPeriod) {

    if (selectedPeriod === "all") {
        return true;
    }

    const year = Number(itemYear);

    if (selectedPeriod === "1993") {
        return year >= 1993 && year <= 1999;
    }

    if (selectedPeriod === "2000") {
        return year >= 2000 && year <= 2009;
    }

    if (selectedPeriod === "2010") {
        return year >= 2010 && year <= 2019;
    }

    if (selectedPeriod === "2020") {
        return year >= 2020 && year <= 2026;
    }

    return false;
}


/* ==========================================
   6. FILTER EXHIBITIONS
========================================== */

function getFilteredExhibitions() {

    const keyword =
        exhibitionSearch.value.trim().toLowerCase();

    const selectedYear =
        yearFilter.value;

    let results = exhibitions.filter(item => {

        const searchableText = [

            item.title,

            item.description,

            item.category,

            item.creator,

            item.publication,

            item.year

        ].join(" ").toLowerCase();


        const matchesSearch =
            searchableText.includes(keyword);


        const matchesCategory =
            selectedCategory === "all" ||
            item.category === selectedCategory;


        const matchesSelectedYear =
            matchesYear(item.year, selectedYear);


        return (
            matchesSearch &&
            matchesCategory &&
            matchesSelectedYear
        );

    });

    results.sort((a, b) => b.year - a.year);

    return results;

}


/* ==========================================
   7. CREATE EXHIBITION CARD
========================================== */

function createExhibitionCard(item) {

    const card = document.createElement("article");

    card.className = "exhibition-card";


    /* IMAGE */

    const imageContainer =
        document.createElement("div");

    imageContainer.className = "exhibition-image";


    const image = document.createElement("img");

    image.src = item.image;

    image.alt = item.title;

    image.loading = "lazy";

    image.onerror = () => {

        imageContainer.replaceChildren();

        imageContainer.textContent =
            "Exhibition image unavailable";

    };


    const label = document.createElement("span");

    label.className = "media-label";

    label.textContent =
        categoryNames[item.category];


    imageContainer.append(image, label);


    /* CONTENT */

    const content = document.createElement("div");

    content.className = "exhibition-content";


    const category = document.createElement("small");

    category.textContent =
        categoryNames[item.category];


    const title = document.createElement("h3");

    title.textContent = item.title;


    const description = document.createElement("p");

    description.textContent = item.description;


    /* FOOTER */

    const footer = document.createElement("div");

    footer.className = "exhibition-footer";


    const year = document.createElement("span");

    year.textContent = item.year;


    const button = document.createElement("button");

    button.className = "view-exhibition";

    button.type = "button";

    button.textContent = "View Exhibition →";

    button.addEventListener("click", () => {

        openExhibition(item.id);

    });


    footer.append(year, button);

    content.append(category, title, description, footer);

    card.append(imageContainer, content);

    return card;

}


/* ==========================================
   8. DISPLAY EXHIBITIONS
========================================== */

function renderExhibitions() {

    const results = getFilteredExhibitions();

    const totalPages = Math.ceil(
        results.length / itemsPerPage
    );


    if (totalPages > 0 && currentPage > totalPages) {

        currentPage = totalPages;

    }


    const startIndex =
        (currentPage - 1) * itemsPerPage;


    const visibleItems = results.slice(
        startIndex,
        startIndex + itemsPerPage
    );


    exhibitionGrid.replaceChildren();


    visibleItems.forEach(item => {

        exhibitionGrid.appendChild(
            createExhibitionCard(item)
        );

    });


    emptyMessage.hidden = results.length !== 0;

    exhibitionGrid.hidden = results.length === 0;

    pagination.hidden = results.length === 0;


    previousPage.disabled = currentPage <= 1;

    nextPage.disabled =
        currentPage >= totalPages;


    pageNumber.textContent =
        `Page ${totalPages === 0 ? 0 : currentPage} of ${totalPages}`;

}


/* ==========================================
   9. CATEGORY BUTTON EVENTS
========================================== */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {

            item.classList.remove("active");

        });


        button.classList.add("active");

        selectedCategory =
            button.dataset.category;

        currentPage = 1;

        renderExhibitions();

    });

});


/* ==========================================
   10. SEARCH EVENT
========================================== */

exhibitionSearch.addEventListener("input", () => {

    currentPage = 1;

    renderExhibitions();

});


/* ==========================================
   11. YEAR FILTER
========================================== */

yearFilter.addEventListener("change", () => {

    currentPage = 1;

    renderExhibitions();

});


/* ==========================================
   12. PAGINATION
========================================== */

previousPage.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderExhibitions();

    }

});


nextPage.addEventListener("click", () => {

    const totalPages = Math.ceil(
        getFilteredExhibitions().length / itemsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;

        renderExhibitions();

    }

});


/* ==========================================
   13. OPEN EXHIBITION DETAILS
========================================== */

function openExhibition(id) {

    const item = exhibitions.find(
        exhibit => exhibit.id === id
    );

    if (!item) return;


    exhibitionDetails.replaceChildren();


    /* EXHIBITION IMAGE */

    const image = document.createElement("img");

    image.className = "modal-image";

    image.src = item.image;

    image.alt = item.title;


    /* TITLE */

    const title = document.createElement("h2");

    title.textContent = item.title;


    /* DESCRIPTION */

    const description = document.createElement("p");

    description.textContent = item.description;


    /* METADATA */

    const metadata =
        document.createElement("div");

    metadata.className = "modal-metadata";


    const category = document.createElement("p");

    category.textContent =
        `Collection: ${categoryNames[item.category]}`;


    const year = document.createElement("p");

    year.textContent = `Year: ${item.year}`;


    const creator = document.createElement("p");

    creator.textContent =
        `Creator: ${item.creator}`;


    const publication = document.createElement("p");

    publication.textContent =
        `Publication: ${item.publication}`;


    const verification = document.createElement("p");

    verification.textContent = item.verified
        ? "Editorial status: Verified"
        : "Editorial status: Demonstration record – historical verification pending.";


    metadata.append(
        category,
        year,
        creator,
        publication,
        verification
    );


    exhibitionDetails.append(
        image,
        title,
        description,
        metadata
    );


    /* OPTIONAL VIDEO */

    if (
        item.category === "documentaries" &&
        item.mediaUrl
    ) {

        const video = document.createElement("video");

        video.controls = true;

        video.preload = "metadata";

        video.style.width = "100%";

        video.style.marginTop = "20px";

        const source = document.createElement("source");

        source.src = item.mediaUrl;

        source.type = "video/mp4";

        video.appendChild(source);

        exhibitionDetails.appendChild(video);

    }


    /* OPTIONAL AUDIO */

    if (
        item.category === "audio" &&
        item.mediaUrl
    ) {

        const audio = document.createElement("audio");

        audio.controls = true;

        audio.preload = "metadata";

        audio.style.width = "100%";

        audio.style.marginTop = "20px";

        audio.src = item.mediaUrl;

        exhibitionDetails.appendChild(audio);

    }


    /* ORIGINAL SOURCE */

    if (item.source) {

        try {

            const sourceURL = new URL(item.source);

            if (
                sourceURL.protocol === "https:" ||
                sourceURL.protocol === "http:"
            ) {

                const sourceLink =
                    document.createElement("a");

                sourceLink.className = "modal-source";

                sourceLink.href = sourceURL.href;

                sourceLink.target = "_blank";

                sourceLink.rel = "noopener noreferrer";

                sourceLink.textContent =
                    "View Original Source →";

                exhibitionDetails.appendChild(sourceLink);

            }

        } catch {

            console.warn("Invalid exhibition source URL.");

        }

    }


    exhibitionModal.showModal();

}


/* ==========================================
   14. CLOSE MODAL
========================================== */

closeExhibition.addEventListener("click", () => {

    exhibitionModal.close();

});


exhibitionModal.addEventListener("click", event => {

    if (event.target === exhibitionModal) {

        exhibitionModal.close();

    }

});


/* ==========================================
   15. INITIALIZE MUSEUM
========================================== */

function initializeExhibitions() {

    renderExhibitions();

    console.log(
        "Inside Track Multimedia Museum Loaded Successfully."
    );

}

initializeExhibitions();
