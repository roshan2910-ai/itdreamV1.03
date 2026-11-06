
/* ==========================================
   INSIDE TRACK
   PHASE 7 - ADMIN DASHBOARD ENGINE
========================================== */


/* ==========================================
   1. DATABASE CONFIGURATION

   DEMO MODE:
   Records are stored in browser localStorage.
   This is NOT a production database.
========================================== */

const STORAGE_KEY = "insideTrackAdminRecords";
const SETTINGS_KEY = "insideTrackAdminSettings";

const collectionNames = {
    archive: "Historical Archive",
    journalists: "Journalists",
    exhibitions: "Exhibitions",
    research: "Research Library"
};


/* ==========================================
   2. LOAD RECORDS
========================================== */

function loadRecords() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return [];

        const records = JSON.parse(saved);

        return Array.isArray(records) ? records : [];

    } catch (error) {

        console.error("Could not load records:", error);

        return [];

    }

}

let records = loadRecords();


/* ==========================================
   3. SAVE RECORDS
========================================== */

function saveRecords() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(records)
        );

        return true;

    } catch (error) {

        console.error("Could not save records:", error);

        showToast("Storage unavailable. Changes were not saved.");

        return false;

    }

}


/* ==========================================
   4. HTML ELEMENTS
========================================== */

const navItems =
    document.querySelectorAll(".nav-item");

const adminViews =
    document.querySelectorAll(".admin-view");

const pageTitle =
    document.getElementById("pageTitle");

const contentModal =
    document.getElementById("contentModal");

const contentForm =
    document.getElementById("contentForm");

const closeModal =
    document.getElementById("closeModal");

const cancelForm =
    document.getElementById("cancelForm");

const adminSearch =
    document.getElementById("adminSearch");

const adminFilter =
    document.getElementById("adminFilter");

const statusFilter =
    document.getElementById("statusFilter");

const recordsTable =
    document.getElementById("recordsTable");

const tableEmpty =
    document.getElementById("tableEmpty");

const toast =
    document.getElementById("toast");


/* ==========================================
   5. TOAST NOTIFICATION
========================================== */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* ==========================================
   6. NAVIGATION
========================================== */

const viewTitles = {

    overview: "Dashboard Overview",

    content: "All Content",

    archive: "Historical Archive",

    journalists: "Journalist Management",

    exhibitions: "Exhibition Management",

    research: "Research Library",

    settings: "Website Settings"

};


function showView(viewName) {

    adminViews.forEach(view => {

        view.classList.toggle(
            "active",
            view.id === `view-${viewName}`
        );

    });


    navItems.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.view === viewName
        );

    });


    pageTitle.textContent =
        viewTitles[viewName] || "Dashboard";


    document.getElementById("sidebar")
        .classList.remove("open");


    if (viewName === "overview") {

        renderDashboard();

    }

    if (viewName === "content") {

        renderTable();

    }

    if (collectionNames[viewName]) {

        renderCollectionSummary(viewName);

    }

}


navItems.forEach(button => {

    button.addEventListener("click", () => {

        showView(button.dataset.view);

    });

});


/* ==========================================
   7. MOBILE SIDEBAR
========================================== */

document.getElementById("menuToggle")
    .addEventListener("click", () => {

        document.getElementById("sidebar")
            .classList.toggle("open");

    });


/* ==========================================
   8. DASHBOARD STATISTICS
========================================== */

function renderDashboard() {

    const total = records.length;

    const published = records.filter(
        item => item.status === "Published"
    ).length;

    const drafts = records.filter(
        item => item.status === "Draft"
    ).length;

    const pending = records.filter(
        item => item.verification === "Pending"
    ).length;


    document.getElementById("totalRecords")
        .textContent = total;

    document.getElementById("publishedRecords")
        .textContent = published;

    document.getElementById("draftRecords")
        .textContent = drafts;

    document.getElementById("pendingRecords")
        .textContent = pending;


    renderRecentRecords();

}


/* ==========================================
   9. RECENT RECORDS
========================================== */

function renderRecentRecords() {

    const container =
        document.getElementById("recentRecords");

    container.replaceChildren();


    const recent = [...records]

        .sort((a, b) => b.updatedAt - a.updatedAt)

        .slice(0, 5);


    if (!recent.length) {

        const message = document.createElement("p");

        message.textContent =
            "No content added yet. Start by creating your first record.";

        message.className = "table-empty";

        container.appendChild(message);

        return;

    }


    recent.forEach(record => {

        const item = document.createElement("div");

        item.className = "recent-item";


        const info = document.createElement("div");

        const title = document.createElement("strong");

        title.textContent = record.title;

        const category = document.createElement("small");

        category.textContent =
            collectionNames[record.type] || record.type;

        info.append(title, category);


        const status = document.createElement("span");

        status.className =
            `status ${record.status.toLowerCase()}`;

        status.textContent = record.status;


        item.append(info, status);

        container.appendChild(item);

    });

}


/* ==========================================
   10. COLLECTION SUMMARY
========================================== */

function renderCollectionSummary(type) {

    const target = document.getElementById(
        `${type}Summary`
    );

    if (!target) return;


    target.replaceChildren();


    const collectionRecords = records.filter(
        item => item.type === type
    );


    const published = collectionRecords.filter(
        item => item.status === "Published"
    ).length;


    const drafts = collectionRecords.filter(
        item => item.status === "Draft"
    ).length;


    const verified = collectionRecords.filter(
        item => item.verification === "Verified"
    ).length;


    const summary = document.createElement("div");

    summary.className = "collection-summary";


    const values = [

        ["Total Records", collectionRecords.length],

        ["Published", published],

        ["Drafts", drafts],

        ["Verified", verified]

    ];


    values.forEach(([label, value]) => {

        const box = document.createElement("div");

        const number = document.createElement("strong");

        number.textContent = value;

        const text = document.createElement("span");

        text.textContent = label;

        box.append(number, text);

        summary.appendChild(box);

    });


    target.appendChild(summary);

}


/* ==========================================
   11. OPEN ADD CONTENT FORM
========================================== */

function openAddForm(type = "archive") {

    contentForm.reset();

    document.getElementById("recordId").value = "";

    document.getElementById("recordType").value = type;

    document.getElementById("recordYear").value = 2026;

    document.getElementById("formTitle")
        .textContent = "Add New Record";


    contentModal.showModal();

}


/* ==========================================
   12. OPEN EDIT FORM
========================================== */

function openEditForm(id) {

    const record = records.find(
        item => item.id === id
    );

    if (!record) return;


    document.getElementById("recordId").value =
        record.id;

    document.getElementById("recordType").value =
        record.type;

    document.getElementById("recordTitle").value =
        record.title;

    document.getElementById("recordYear").value =
        record.year;

    document.getElementById("recordAuthor").value =
        record.author;

    document.getElementById("recordPublication").value =
        record.publication;

    document.getElementById("recordCategory").value =
        record.category;

    document.getElementById("recordDescription").value =
        record.description;

    document.getElementById("recordImage").value =
        record.image;

    document.getElementById("recordMedia").value =
        record.media;

    document.getElementById("recordSource").value =
        record.source;

    document.getElementById("recordStatus").value =
        record.status;

    document.getElementById("recordVerification").value =
        record.verification;


    document.getElementById("formTitle")
        .textContent = "Edit Museum Record";


    contentModal.showModal();

}


/* ==========================================
   13. SAVE NEW OR UPDATED RECORD
========================================== */

contentForm.addEventListener("submit", event => {

    event.preventDefault();


    const id =
        document.getElementById("recordId").value;


    const existing = records.find(
        item => item.id === id
    );


    const record = {

        id: id || (
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
                ? window.crypto.randomUUID()
                : `record-${Date.now()}`
        ),

        type: document.getElementById("recordType").value,

        title: document.getElementById("recordTitle").value.trim(),

        year: Number(document.getElementById("recordYear").value),

        author: document.getElementById("recordAuthor").value.trim(),

        publication: document.getElementById("recordPublication").value.trim(),

        category: document.getElementById("recordCategory").value.trim(),

        description: document.getElementById("recordDescription").value.trim(),

        image: document.getElementById("recordImage").value.trim(),

        media: document.getElementById("recordMedia").value.trim(),

        source: document.getElementById("recordSource").value.trim(),

        status: document.getElementById("recordStatus").value,

        verification: document.getElementById("recordVerification").value,

        updatedAt: Date.now()

    };


    if (
        !record.title ||
        !record.description ||
        !Number.isInteger(record.year) ||
        record.year < 1993 ||
        record.year > 2026
    ) {

        showToast("Please check the required fields and year.");

        return;

    }


    if (record.status === "Published" &&
        record.verification !== "Verified") {

        showToast("Verify the source before publishing.");

        return;

    }


    if (existing) {

        records = records.map(item =>
            item.id === id ? record : item
        );

    } else {

        records.unshift(record);

    }


    if (!saveRecords()) {

        records = loadRecords();

        return;

    }


    contentModal.close();

    contentForm.reset();

    refreshDashboard();

    showToast(
        existing
            ? "Record updated successfully."
            : "New record added successfully."
    );

});


/* ==========================================
   14. DELETE RECORD
========================================== */

function deleteRecord(id) {

    const record = records.find(
        item => item.id === id
    );

    if (!record) return;


    const confirmed = window.confirm(
        `Are you sure you want to delete "${record.title}"?`
    );


    if (!confirmed) return;


    const previousRecords = [...records];

    records = records.filter(
        item => item.id !== id
    );


    if (!saveRecords()) {

        records = previousRecords;

        return;

    }


    refreshDashboard();

    showToast("Record deleted successfully.");

}


/* ==========================================
   15. RENDER CONTENT TABLE
========================================== */

function renderTable() {

    const keyword =

        document.getElementById("adminSearch")
            .value.trim().toLowerCase();


    const collection =

        document.getElementById("adminFilter").value;


    const status =

        document.getElementById("statusFilter").value;


    const filtered = records.filter(record => {

        const searchable = [

            record.title,

            record.author,

            record.publication,

            record.description,

            record.year

        ].join(" ").toLowerCase();


        const matchesSearch =
            searchable.includes(keyword);


        const matchesCollection =
            collection === "all" ||
            record.type === collection;


        const matchesStatus =
            status === "all" ||
            record.status === status;


        return (
            matchesSearch &&
            matchesCollection &&
            matchesStatus
        );

    });


    recordsTable.replaceChildren();


    filtered.forEach(record => {

        const row = document.createElement("tr");


        const fields = [

            record.title,

            collectionNames[record.type],

            record.year

        ];


        fields.forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value ?? "";

            row.appendChild(cell);

        });


        /* PUBLICATION STATUS */

        const statusCell = document.createElement("td");

        const statusBadge = document.createElement("span");

        statusBadge.className =
            `status ${record.status.toLowerCase()}`;

        statusBadge.textContent = record.status;

        statusCell.appendChild(statusBadge);

        row.appendChild(statusCell);


        /* VERIFICATION STATUS */

        const verificationCell =
            document.createElement("td");

        const verificationBadge =
            document.createElement("span");

        verificationBadge.className =
            `status ${record.verification.toLowerCase()}`;

        verificationBadge.textContent =
            record.verification;

        verificationCell.appendChild(verificationBadge);

        row.appendChild(verificationCell);


        /* ACTIONS */

        const actionCell = document.createElement("td");

        const actions = document.createElement("div");

        actions.className = "table-actions";


        const editButton = document.createElement("button");

        editButton.type = "button";

        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {

            openEditForm(record.id);

        });


        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {

            deleteRecord(record.id);

        });


        actions.append(editButton, deleteButton);

        actionCell.appendChild(actions);

        row.appendChild(actionCell);


        recordsTable.appendChild(row);

    });


    tableEmpty.hidden = filtered.length !== 0;

}


/* ==========================================
   16. REFRESH DASHBOARD
========================================== */

function refreshDashboard() {

    renderDashboard();

    renderTable();

    Object.keys(collectionNames).forEach(type => {

        renderCollectionSummary(type);

    });

}


/* ==========================================
   17. GLOBAL BUTTON ACTIONS
========================================== */

document.addEventListener("click", event => {

    const addButton = event.target.closest(
        '[data-action="add-content"]'
    );


    if (addButton) {

        const type =
            addButton.dataset.type || "archive";

        openAddForm(type);

        return;

    }


    const sectionButton = event.target.closest(
        "[data-section]"
    );


    if (sectionButton) {

        showView(sectionButton.dataset.section);

        return;

    }


    const viewButton = event.target.closest(
        "[data-view]"
    );


    if (viewButton) {

        showView(viewButton.dataset.view);

    }

});


/* ==========================================
   18. CLOSE CONTENT MODAL
========================================== */

function closeContentModal() {

    contentModal.close();

}


closeModal.addEventListener(
    "click",
    closeContentModal
);


cancelForm.addEventListener(
    "click",
    closeContentModal
);


contentModal.addEventListener("click", event => {

    if (event.target === contentModal) {

        closeContentModal();

    }

});


/* ==========================================
   19. CONTENT SEARCH AND FILTERS
========================================== */

adminSearch.addEventListener("input", renderTable);

adminFilter.addEventListener("change", renderTable);

statusFilter.addEventListener("change", renderTable);


/* ==========================================
   20. WEBSITE SETTINGS
========================================== */

function loadSettings() {

    try {

        const saved = JSON.parse(
            localStorage.getItem(SETTINGS_KEY)
        );

        if (!saved || typeof saved !== "object") return;

        document.getElementById("museumName").value =
            saved.museumName || "Inside Track";

        document.getElementById("founderName").value =
            saved.founderName || "Meetu Jain";

        document.getElementById("startYear").value =
            saved.startYear || 1993;

        document.getElementById("endYear").value =
            saved.endYear || 2026;

    } catch (error) {

        console.error("Settings could not be loaded:", error);

    }

}


document.getElementById("settingsForm")
    .addEventListener("submit", event => {

        event.preventDefault();


        const settings = {

            museumName:
                document.getElementById("museumName").value.trim(),

            founderName:
                document.getElementById("founderName").value.trim(),

            startYear:
                Number(document.getElementById("startYear").value),

            endYear:
                Number(document.getElementById("endYear").value)

        };


        if (
            !settings.museumName ||
            !settings.founderName ||
            settings.startYear > settings.endYear
        ) {

            showToast("Please check your museum settings.");

            return;

        }


        try {

            localStorage.setItem(
                SETTINGS_KEY,
                JSON.stringify(settings)
            );

            showToast("Museum settings saved successfully.");

        } catch (error) {

            showToast("Could not save settings.");

        }

    });


/* ==========================================
   21. INITIALIZE ADMIN DASHBOARD
========================================== */

function initializeAdmin() {

    loadSettings();

    refreshDashboard();

    showView("overview");

    console.log(
        "Inside Track Admin Dashboard Initialized."
    );

}


initializeAdmin();
