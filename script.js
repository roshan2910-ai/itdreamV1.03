
/* ==========================================
   INSIDE TRACK
   DIGITAL JOURNALISM MUSEUM
   JavaScript - Phase 2
========================================== */


/* ==========================================
   1. ARCHIVE DATA
========================================== */

const archiveData = [
    {
        year: 1993,
        title: "The Beginning of the Digital Archive",
        category: "Journalism History"
    },
    {
        year: 1995,
        title: "Evolution of Investigative Reporting",
        category: "Investigative Journalism"
    },
    {
        year: 2000,
        title: "Journalism at the Turn of the Century",
        category: "Media History"
    },
    {
        year: 2005,
        title: "The Changing Newsroom",
        category: "Newsroom"
    },
    {
        year: 2010,
        title: "The Rise of Digital Journalism",
        category: "Digital Media"
    },
    {
        year: 2015,
        title: "Social Media and Modern Reporting",
        category: "Digital Media"
    },
    {
        year: 2020,
        title: "Journalism During a Global Crisis",
        category: "Investigative Journalism"
    },
    {
        year: 2026,
        title: "Journalism in the Modern Era",
        category: "Media History"
    }
];


/* ==========================================
   2. GENERATE ARCHIVE YEARS
========================================== */

const archiveGrid = document.querySelector(".archive-grid");

if (archiveGrid) {

    archiveGrid.innerHTML = "";

    for (let year = 1993; year <= 2026; year++) {

        const yearLink = document.createElement("a");

        yearLink.href = `archive.html?year=${year}`;
        yearLink.className = "archive-year";

        yearLink.innerHTML = `
            <h3>${year}</h3>
            <p>Explore Year</p>
        `;

        archiveGrid.appendChild(yearLink);
    }
}


/* ==========================================
   3. ARCHIVE SEARCH
========================================== */

function searchArchive(keyword) {

    const searchTerm = keyword.trim().toLowerCase();

    if (!searchTerm) {
        return archiveData;
    }

    return archiveData.filter(item => {

        return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm) ||
            String(item.year).includes(searchTerm)
        );

    });
}


/* ==========================================
   4. ARCHIVE SEARCH INTERFACE
========================================== */

const searchInput = document.querySelector("#archiveSearch");

const searchResults = document.querySelector("#searchResults");

if (searchInput && searchResults) {

    searchInput.addEventListener("input", function () {

        const results = searchArchive(this.value);

        searchResults.innerHTML = "";

        if (results.length === 0) {

            searchResults.innerHTML =
                "<p>No matching archive records found.</p>";

            return;
        }

        results.forEach(item => {

            const article = document.createElement("article");

            article.className = "search-result";

            const heading = document.createElement("h3");
            heading.textContent = item.title;

            const description = document.createElement("p");
            description.textContent =
                `${item.year} | ${item.category}`;

            article.append(heading, description);
            searchResults.appendChild(article);

        });

    });

}


/* ==========================================
   5. JOURNALIST SEARCH
========================================== */

const journalistSearch =
    document.querySelector("#journalistSearch");

if (journalistSearch) {

    journalistSearch.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const profiles =
            document.querySelectorAll(".profile-card");

        profiles.forEach(profile => {

            const content = profile.textContent.toLowerCase();

            profile.style.display =
                content.includes(keyword) ? "" : "none";

        });

    });

}


/* ==========================================
   6. EXHIBITION FILTER
========================================== */

const exhibitionFilter =
    document.querySelector("#exhibitionFilter");

if (exhibitionFilter) {

    exhibitionFilter.addEventListener("change", function () {

        const selected = this.value.toLowerCase();

        const cards =
            document.querySelectorAll(".exhibition-card");

        cards.forEach(card => {

            const category =
                card.dataset.category?.toLowerCase() || "";

            card.style.display =
                selected === "all" ||
                category === selected ? "" : "none";

        });

    });

}


/* ==========================================
   7. MOBILE NAVIGATION
========================================== */

const navigation = document.querySelector("nav");

const menuButton = document.querySelector("#menuToggle");

if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

        const isOpen =
            navigation.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            navigation.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==========================================
   8. CURRENT YEAR IN FOOTER
========================================== */

const copyright =
    document.querySelector("#copyrightYear");

if (copyright) {
    copyright.textContent = new Date().getFullYear();
}


/* ==========================================
   9. SMOOTH INTERNAL NAVIGATION
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* ==========================================
   10. INITIALIZATION
========================================== */

console.log(
    "Inside Track Museum | JavaScript Loaded Successfully"
);
