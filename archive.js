
/* ==========================================
   INSIDE TRACK
   PHASE 3 - ARCHIVE ENGINE
========================================== */


/* ==========================================
   1. ARCHIVE DATABASE
   Demonstration records only.
   Replace with verified historical records.
========================================== */

const archiveRecords = [
    {
        id: 1,
        year: 1993,
        title: "The Changing Landscape of Journalism",
        category: "Media History",
        journalist: "To be verified",
        publication: "To be verified",
        description: "Demonstration record for the 1993 historical collection.",
        source: "",
        verified: false
    },
    {
        id: 2,
        year: 1995,
        title: "The Evolution of Investigative Reporting",
        category: "Investigative Journalism",
        journalist: "To be verified",
        publication: "To be verified",
        description: "Demonstration record for investigative journalism history.",
        source: "",
        verified: false
    },
    {
        id: 3,
        year: 2000,
        title: "Journalism at the Turn of the Century",
        category: "Media History",
        journalist: "To be verified",
        publication: "To be verified",
        description: "Demonstration record for the year 2000 collection.",
        source: "",
        verified: false
    },
    {
        id: 4,
        year: 2005,
        title: "The Transformation of Newsrooms",
        category: "Society",
        journalist: "To be verified",
        publication: "To be verified",
        description: "Demonstration record for newsroom history.",
        source: "",
        verified: false
    },
    {
        id: 5,
        year: 2010,
        title: "The Rise of Digital Journalism",
        category: "Media History",
        journalist: "To be verified",
        publication: "To be verified",
        description: "Demonstration record for digital media history.",
        source: "",
        verified: false
    },
    {
        id: 6,
        year: 2015,
        title: "Political Reporting in the Digital Era",
        category: "Politics",
        journalist: "To be verified",
        publication: "To be verified",
        description: "Demonstration record for political journalism.",
        source: "",
        verified: false
    },
    {
        id: 7,
        year: 2020,
        title: "Journalism During a Global Crisis",
        category: "International",
        journalist: "To be verified",
        publication: "To be verified",
        description: "Demonstration record for international reporting.",
        source: "",
        verified: false
    },
    {
        id: 8,
        year: 2026,
        title: "The Future of Investigative Journalism",
        category: "Investigative Journalism",
        journalist: "To be verified",
        publication: "To be verified",
        description: "Demonstration record for contemporary journalism.",
        source: "",
        verified: false
    }
];


/* ==========================================
   2. DOM ELEMENTS
========================================== */

const searchInput = document.getElementById("archiveSearch");
const categoryFilter = document.getElementById("categoryFilter");
const sortOrder = document.getElementById("sortOrder");

const yearSelector = document.getElementById("yearSelector");
const allYearsButton = document.getElementById("allYears");

const archiveResults = document.getElementById("archiveResults");
const resultCount = document.getElementById("resultCount");
const resultsTitle = document.getElementById("resultsTitle");
const emptyMessage = document.getElementById("emptyMessage");

const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");

const reportModal = document.getElementById("reportModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");


/* ==========================================
   3. APPLICATION STATE
========================================== */

let selectedYear = null;
let currentPage = 1;

const recordsPerPage = 6;


/* ==========================================
   4. GENERATE YEARS
========================================== */

function generateYears() {

    for (let year = 1993; year <= 2026; year++) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "year-button";
        button.textContent = year;

        button.dataset.year = year;

        button.addEventListener("click", () => {

            selectedYear = year;
            currentPage = 1;

            updateYearButtons();
            renderArchive();

        });

        yearSelector.appendChild(button);
    }
}


/* ==========================================
   5. UPDATE ACTIVE YEAR
========================================== */

function updateYearButtons() {

    document.querySelectorAll(".year-button").forEach(button => {

        const year = Number(button.dataset.year);

        button.classList.toggle(
            "active",
            selectedYear === year
        );

    });

    allYearsButton.classList.toggle(
        "active",
        selectedYear === null
    );
}


/* ==========================================
   6. GET FILTERED RECORDS
========================================== */

function getFilteredRecords() {

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    const category = categoryFilter.value;

    let filtered = archiveRecords.filter(record => {

        const matchesYear =
            selectedYear === null ||
            record.year === selectedYear;

        const matchesCategory =
            category === "all" ||
            record.category === category;

        const searchableText = [
            record.title,
            record.category,
            record.journalist,
            record.publication,
            record.description,
            record.year
        ].join(" ").toLowerCase();

        const matchesSearch =
            searchableText.includes(keyword);

        return (
            matchesYear &&
            matchesCategory &&
            matchesSearch
        );

    });

    if (sortOrder.value === "oldest") {

        filtered.sort((a, b) => a.year - b.year);

    } else {

        filtered.sort((a, b) => b.year - a.year);

    }

    return filtered;
}


/* ==========================================
   7. CREATE REPORT CARD
========================================== */

function createRecordCard(record) {

    const article = document.createElement("article");
    article.className = "record-card";

    const meta = document.createElement("div");
    meta.className = "record-meta";

    const year = document.createElement("span");
    year.className = "record-year";
    year.textContent = record.year;

    const category = document.createElement("span");
    category.className = "record-category";
    category.textContent = record.category;

    meta.append(year, category);

    const title = document.createElement("h3");
    title.textContent = record.title;

    const description = document.createElement("p");
    description.textContent = record.description;

    const footer = document.createElement("div");
    footer.className = "record-footer";

    const status = document.createElement("span");
    status.textContent = record.verified
        ? "Verified record"
        : "Demonstration record";

    const readMore = document.createElement("button");
    readMore.type = "button";
    readMore.className = "read-more";
    readMore.textContent = "View Record →";

    readMore.addEventListener("click", () => {
        openReport(record.id);
    });

    footer.append(status, readMore);

    article.append(meta, title, description, footer);

    return article;
}


/* ==========================================
   8. RENDER ARCHIVE
========================================== */

function renderArchive() {

    const filtered = getFilteredRecords();

    const totalRecords = filtered.length;

    const totalPages = Math.ceil(
        totalRecords / recordsPerPage
    );

    if (totalPages > 0 && currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex =
        (currentPage - 1) * recordsPerPage;

    const visibleRecords = filtered.slice(
        startIndex,
        startIndex + recordsPerPage
    );

    archiveResults.replaceChildren();

    visibleRecords.forEach(record => {

        archiveResults.appendChild(
            createRecordCard(record)
        );

    });

    resultCount.textContent =
        `${totalRecords} records`;

    resultsTitle.textContent =
        selectedYear === null
            ? "All Historical Records"
            : `Archive: ${selectedYear}`;

    emptyMessage.hidden = totalRecords !== 0;

    archiveResults.hidden = totalRecords === 0;

    previousPage.disabled =
        currentPage <= 1;

    nextPage.disabled =
        currentPage >= totalPages;

    pageNumber.textContent =
        `Page ${totalPages === 0 ? 0 : currentPage} of ${totalPages}`;

}


/* ==========================================
   9. OPEN REPORT DETAILS
========================================== */

function openReport(id) {

    const record = archiveRecords.find(
        item => item.id === id
    );

    if (!record) return;

    modalContent.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = record.title;

    const year = document.createElement("p");
    year.textContent = `Year: ${record.year}`;

    const category = document.createElement("p");
    category.textContent = `Category: ${record.category}`;

    const journalist = document.createElement("p");
    journalist.textContent = `Journalist: ${record.journalist}`;

    const publication = document.createElement("p");
    publication.textContent = `Publication: ${record.publication}`;

    const description = document.createElement("p");
    description.textContent = record.description;

    const status = document.createElement("p");
    status.textContent = record.verified
        ? "Editorial status: Verified"
        : "Editorial status: Demonstration record – historical details require verification.";

    const sourceBox = document.createElement("div");
    sourceBox.className = "modal-source";

    const sourceLabel = document.createElement("strong");
    sourceLabel.textContent = "Original source: ";

    sourceBox.appendChild(sourceLabel);

    if (record.source) {

        const sourceLink = document.createElement("a");

        sourceLink.href = record.source;
        sourceLink.textContent = "View original publication";
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener noreferrer";

        sourceBox.appendChild(sourceLink);

    } else {

        sourceBox.append(
            document.createTextNode("Not yet added")
        );

    }

    modalContent.append(
        heading,
        year,
        category,
        journalist,
        publication,
        description,
        status,
        sourceBox
    );

    reportModal.showModal();
}


/* ==========================================
   10. ALL YEARS BUTTON
========================================== */

allYearsButton.addEventListener("click", () => {

    selectedYear = null;
    currentPage = 1;

    updateYearButtons();
    renderArchive();

});


/* ==========================================
   11. SEARCH EVENTS
========================================== */

searchInput.addEventListener("input", () => {

    currentPage = 1;
    renderArchive();

});


/* ==========================================
   12. CATEGORY FILTER
========================================== */

categoryFilter.addEventListener("change", () => {

    currentPage = 1;
    renderArchive();

});


/* ==========================================
   13. SORT RECORDS
========================================== */

sortOrder.addEventListener("change", () => {

    currentPage = 1;
    renderArchive();

});


/* ==========================================
   14. PAGINATION
========================================== */

previousPage.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderArchive();

    }

});


nextPage.addEventListener("click", () => {

    const totalPages = Math.ceil(
        getFilteredRecords().length / recordsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;

        renderArchive();

    }

});


/* ==========================================
   15. CLOSE REPORT MODAL
========================================== */

closeModal.addEventListener("click", () => {

    reportModal.close();

});


reportModal.addEventListener("click", event => {

    if (event.target === reportModal) {
        reportModal.close();
    }

});


/* ==========================================
   16. READ YEAR FROM URL
========================================== */

function readYearFromURL() {

    const params = new URLSearchParams(
        window.location.search
    );

    const year = Number(params.get("year"));

    if (
        Number.isInteger(year) &&
        year >= 1993 &&
        year <= 2026
    ) {

        selectedYear = year;

    }
}


/* ==========================================
   17. INITIALIZE ARCHIVE
========================================== */

function initializeArchive() {

    readYearFromURL();

    generateYears();

    updateYearButtons();

    renderArchive();

    console.log(
        "Inside Track Archive initialized successfully."
    );

}

initializeArchive();
