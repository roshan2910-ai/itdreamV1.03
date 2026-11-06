
/* ==========================================
   INSIDE TRACK
   PHASE 6 - RESEARCH LIBRARY ENGINE
========================================== */


/* ==========================================
   1. RESEARCH DOCUMENT DATABASE

   Demonstration records only.
   Replace with verified source records.
========================================== */

const researchDocuments = [

    {
        id: 1,
        title: "History and Evolution of Journalism",
        type: "Research Paper",
        year: 1993,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry for research on the historical development of journalism.",
        keywords: ["journalism", "history", "media"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 2,
        title: "Investigative Journalism and Public Accountability",
        type: "Historical Report",
        year: 1995,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry covering investigative reporting and public accountability.",
        keywords: ["investigation", "accountability", "reporting"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 3,
        title: "The Transformation of Print Media",
        type: "Newspaper",
        year: 2000,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry for historical print media documentation.",
        keywords: ["newspaper", "print media", "history"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 4,
        title: "Political Journalism and Democracy",
        type: "Academic Publication",
        year: 2005,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry for research into political reporting and democratic institutions.",
        keywords: ["politics", "democracy", "media"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 5,
        title: "The Growth of Digital News Media",
        type: "Media Study",
        year: 2010,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry exploring the transition towards digital news platforms.",
        keywords: ["digital media", "internet", "journalism"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 6,
        title: "Social Media and Modern Journalism",
        type: "Research Paper",
        year: 2015,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry for academic research on social media and news reporting.",
        keywords: ["social media", "digital journalism"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 7,
        title: "Journalism During Global Emergencies",
        type: "Historical Report",
        year: 2020,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry for historical reporting during global emergencies.",
        keywords: ["global events", "reporting", "journalism"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 8,
        title: "Media Ethics and the Future of Journalism",
        type: "Academic Publication",
        year: 2026,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry for contemporary research into media ethics.",
        keywords: ["ethics", "media", "future"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 9,
        title: "International Journalism and Global Affairs",
        type: "Reference Material",
        year: 2018,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry for international reporting and global affairs.",
        keywords: ["international", "global affairs"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    },

    {
        id: 10,
        title: "The Changing Role of News Organisations",
        type: "Media Study",
        year: 2023,
        author: "Author to be verified",
        publication: "Publication to be verified",
        description: "Demonstration entry for the study of modern news organisations.",
        keywords: ["news organisations", "media studies"],
        pdfUrl: "",
        sourceUrl: "",
        verified: false
    }

];


/* ==========================================
   2. DOM ELEMENTS
========================================== */

const documentSearch =
    document.getElementById("documentSearch");

const documentCategory =
    document.getElementById("documentCategory");

const documentYear =
    document.getElementById("documentYear");

const documentSort =
    document.getElementById("documentSort");

const documentGrid =
    document.getElementById("documentGrid");

const documentCount =
    document.getElementById("documentCount");

const emptyDocuments =
    document.getElementById("emptyDocuments");

const pagination =
    document.getElementById("pagination");

const previousPage =
    document.getElementById("previousPage");

const nextPage =
    document.getElementById("nextPage");

const pageNumber =
    document.getElementById("pageNumber");

const documentModal =
    document.getElementById("documentModal");

const documentDetails =
    document.getElementById("documentDetails");

const closeDocument =
    document.getElementById("closeDocument");


/* ==========================================
   3. APPLICATION SETTINGS
========================================== */

let currentPage = 1;

const documentsPerPage = 6;


/* ==========================================
   4. DOCUMENT CATEGORY ICONS
========================================== */

const documentIcons = {

    "Research Paper": "RP",

    "Historical Report": "HR",

    "Newspaper": "NP",

    "Academic Publication": "AP",

    "Media Study": "MS",

    "Reference Material": "RM"

};


/* ==========================================
   5. YEAR FILTER
========================================== */

function checkDocumentYear(year, period) {

    if (period === "all") {
        return true;
    }

    if (period === "1993") {
        return year >= 1993 && year <= 1999;
    }

    if (period === "2000") {
        return year >= 2000 && year <= 2009;
    }

    if (period === "2010") {
        return year >= 2010 && year <= 2019;
    }

    if (period === "2020") {
        return year >= 2020 && year <= 2026;
    }

    return false;
}


/* ==========================================
   6. FILTER DOCUMENTS
========================================== */

function getFilteredDocuments() {

    const keyword =
        documentSearch.value.trim().toLowerCase();

    const category =
        documentCategory.value;

    const year =
        documentYear.value;


    let results = researchDocuments.filter(doc => {

        const searchableText = [

            doc.title,

            doc.type,

            doc.author,

            doc.publication,

            doc.description,

            doc.year,

            ...doc.keywords

        ].join(" ").toLowerCase();


        const matchesSearch =
            searchableText.includes(keyword);


        const matchesCategory =
            category === "all" ||
            doc.type === category;


        const matchesYear =
            checkDocumentYear(doc.year, year);


        return (
            matchesSearch &&
            matchesCategory &&
            matchesYear
        );

    });


    if (documentSort.value === "oldest") {

        results.sort((a, b) => a.year - b.year);

    } else if (documentSort.value === "az") {

        results.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    } else {

        results.sort((a, b) => b.year - a.year);

    }

    return results;

}


/* ==========================================
   7. CREATE DOCUMENT CARD
========================================== */

function createDocumentCard(doc) {

    const card = document.createElement("article");

    card.className = "document-card";


    const icon = document.createElement("div");

    icon.className = "document-icon";

    icon.textContent = documentIcons[doc.type] || "DOC";


    const type = document.createElement("span");

    type.className = "document-type";

    type.textContent = doc.type;


    const title = document.createElement("h3");

    title.textContent = doc.title;


    const description = document.createElement("p");

    description.textContent = doc.description;


    const meta = document.createElement("div");

    meta.className = "document-meta";


    const year = document.createElement("span");

    year.textContent = doc.year;


    const author = document.createElement("span");

    author.textContent = doc.author;


    meta.append(year, author);


    const footer = document.createElement("div");

    footer.className = "document-footer";


    const status = document.createElement("span");

    status.textContent = doc.verified
        ? "Verified"
        : "Sample Record";

    status.style.fontSize = "10px";

    status.style.color = "#666666";


    const button = document.createElement("button");

    button.type = "button";

    button.textContent = "View Document →";

    button.addEventListener("click", () => {

        openDocument(doc.id);

    });


    footer.append(status, button);


    card.append(
        icon,
        type,
        title,
        description,
        meta,
        footer
    );

    return card;

}


/* ==========================================
   8. DISPLAY DOCUMENTS
========================================== */

function renderDocuments() {

    const results = getFilteredDocuments();

    const totalRecords = results.length;

    const totalPages = Math.ceil(
        totalRecords / documentsPerPage
    );


    if (totalPages > 0 && currentPage > totalPages) {

        currentPage = totalPages;

    }


    const startIndex =
        (currentPage - 1) * documentsPerPage;


    const visibleDocuments = results.slice(

        startIndex,

        startIndex + documentsPerPage

    );


    documentGrid.replaceChildren();


    visibleDocuments.forEach(doc => {

        documentGrid.appendChild(
            createDocumentCard(doc)
        );

    });


    documentCount.textContent =
        `${totalRecords} Documents`;


    emptyDocuments.hidden =
        totalRecords !== 0;


    documentGrid.hidden =
        totalRecords === 0;


    pagination.hidden =
        totalRecords === 0;


    previousPage.disabled =
        currentPage <= 1;


    nextPage.disabled =
        currentPage >= totalPages;


    pageNumber.textContent =
        `Page ${totalPages === 0 ? 0 : currentPage} of ${totalPages}`;

}


/* ==========================================
   9. VALIDATE EXTERNAL URL
========================================== */

function getSafeURL(value) {

    if (!value) return null;

    try {

        const url = new URL(value, window.location.href);

        if (
            url.protocol === "https:" ||
            url.protocol === "http:"
        ) {

            return url.href;

        }

    } catch {

        return null;

    }

    return null;

}


/* ==========================================
   10. GENERATE CITATION
========================================== */

function generateCitation(doc) {

    return `${doc.author}. (${doc.year}). ${doc.title}. ${doc.publication}.`;

}


/* ==========================================
   11. OPEN DOCUMENT DETAILS
========================================== */

function openDocument(id) {

    const doc = researchDocuments.find(
        item => item.id === id
    );

    if (!doc) return;


    documentDetails.replaceChildren();


    /* TITLE */

    const title = document.createElement("h2");

    title.textContent = doc.title;


    /* INFORMATION */

    const type = document.createElement("p");

    type.textContent = `Document Type: ${doc.type}`;


    const year = document.createElement("p");

    year.textContent = `Publication Year: ${doc.year}`;


    const author = document.createElement("p");

    author.textContent = `Author: ${doc.author}`;


    const publication = document.createElement("p");

    publication.textContent =
        `Publication: ${doc.publication}`;


    const description = document.createElement("p");

    description.textContent = doc.description;


    const verification = document.createElement("p");

    verification.textContent = doc.verified
        ? "Editorial status: Verified"
        : "Editorial status: Demonstration record – verification pending.";


    documentDetails.append(
        title,
        type,
        year,
        author,
        publication,
        description,
        verification
    );


    /* CITATION */

    const citationBox = document.createElement("div");

    citationBox.className = "document-citation";


    const citationTitle = document.createElement("strong");

    citationTitle.textContent = "Suggested Reference";


    const citationText = document.createElement("p");

    citationText.textContent =
        generateCitation(doc);


    const copyButton = document.createElement("button");

    copyButton.type = "button";

    copyButton.textContent = "Copy Citation";


    copyButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                generateCitation(doc)
            );

            copyButton.textContent = "Citation Copied";

        } catch {

            copyButton.textContent =
                "Copy unavailable – select the citation manually";

        }

    });


    citationBox.append(
        citationTitle,
        citationText,
        copyButton
    );

    documentDetails.appendChild(citationBox);


    /* PDF PREVIEW */

    const pdfURL = getSafeURL(doc.pdfUrl);

    if (pdfURL) {

        const viewer = document.createElement("iframe");

        viewer.className = "document-viewer";

        viewer.src = pdfURL;

        viewer.title = `PDF preview: ${doc.title}`;

        viewer.loading = "lazy";

        viewer.referrerPolicy = "no-referrer";

        documentDetails.appendChild(viewer);

    }


    /* ACTION BUTTONS */

    const actions = document.createElement("div");

    actions.className = "document-actions";


    if (pdfURL) {

        const pdfLink = document.createElement("a");

        pdfLink.href = pdfURL;

        pdfLink.target = "_blank";

        pdfLink.rel = "noopener noreferrer";

        pdfLink.textContent = "Open PDF";

        actions.appendChild(pdfLink);

    }


    const sourceURL = getSafeURL(doc.sourceUrl);

    if (sourceURL) {

        const sourceLink = document.createElement("a");

        sourceLink.href = sourceURL;

        sourceLink.target = "_blank";

        sourceLink.rel = "noopener noreferrer";

        sourceLink.textContent = "Original Source";

        actions.appendChild(sourceLink);

    }


    if (actions.children.length > 0) {

        documentDetails.appendChild(actions);

    }


    documentModal.showModal();

}


/* ==========================================
   12. SEARCH EVENT
========================================== */

documentSearch.addEventListener("input", () => {

    currentPage = 1;

    renderDocuments();

});


/* ==========================================
   13. CATEGORY EVENT
========================================== */

documentCategory.addEventListener("change", () => {

    currentPage = 1;

    renderDocuments();

});


/* ==========================================
   14. YEAR EVENT
========================================== */

documentYear.addEventListener("change", () => {

    currentPage = 1;

    renderDocuments();

});


/* ==========================================
   15. SORT EVENT
========================================== */

documentSort.addEventListener("change", () => {

    currentPage = 1;

    renderDocuments();

});


/* ==========================================
   16. PAGINATION
========================================== */

previousPage.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderDocuments();

    }

});


nextPage.addEventListener("click", () => {

    const totalPages = Math.ceil(

        getFilteredDocuments().length /
        documentsPerPage

    );

    if (currentPage < totalPages) {

        currentPage++;

        renderDocuments();

    }

});


/* ==========================================
   17. CLOSE DOCUMENT MODAL
========================================== */

closeDocument.addEventListener("click", () => {

    documentModal.close();

});


documentModal.addEventListener("click", event => {

    if (event.target === documentModal) {

        documentModal.close();

    }

});


/* ==========================================
   18. INITIALIZE LIBRARY
========================================== */

function initializeResearchLibrary() {

    renderDocuments();

    console.log(
        "Inside Track Research Library Loaded Successfully."
    );

}

initializeResearchLibrary();
