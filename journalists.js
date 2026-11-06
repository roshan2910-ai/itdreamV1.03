
/* ==========================================
   INSIDE TRACK - JOURNALIST DIRECTORY
   PHASE 4
========================================== */


/* ==========================================
   1. JOURNALIST DATABASE
========================================== */

const journalists = [

    {
        id: 1,
        name: "Journalist Example 01",
        specialization: "Investigative Journalism",
        publication: "Publication to be verified",
        careerStart: "1993",
        nationality: "To be researched",
        image: "",
        biography: "Demonstration profile. Add a verified professional biography, career history and documented journalistic contributions.",
        achievements: [],
        reports: [],
        timeline: [
            {
                year: "1993",
                event: "Career milestone to be researched."
            },
            {
                year: "2000",
                event: "Professional contribution to be researched."
            }
        ],
        verified: false
    },

    {
        id: 2,
        name: "Journalist Example 02",
        specialization: "Political Journalism",
        publication: "Publication to be verified",
        careerStart: "2000",
        nationality: "To be researched",
        image: "",
        biography: "Demonstration profile. Replace with verified biographical and professional information.",
        achievements: [],
        reports: [],
        timeline: [],
        verified: false
    },

    {
        id: 3,
        name: "Journalist Example 03",
        specialization: "International Reporting",
        publication: "Publication to be verified",
        careerStart: "2005",
        nationality: "To be researched",
        image: "",
        biography: "Demonstration profile. Add verified international reporting experience and original source references.",
        achievements: [],
        reports: [],
        timeline: [],
        verified: false
    },

    {
        id: 4,
        name: "Journalist Example 04",
        specialization: "Business Journalism",
        publication: "Publication to be verified",
        careerStart: "2010",
        nationality: "To be researched",
        image: "",
        biography: "Demonstration profile. Add a researched professional history.",
        achievements: [],
        reports: [],
        timeline: [],
        verified: false
    },

    {
        id: 5,
        name: "Journalist Example 05",
        specialization: "Broadcast Journalism",
        publication: "Publication to be verified",
        careerStart: "2015",
        nationality: "To be researched",
        image: "",
        biography: "Demonstration profile. Add verified broadcasting and reporting history.",
        achievements: [],
        reports: [],
        timeline: [],
        verified: false
    },

    {
        id: 6,
        name: "Journalist Example 06",
        specialization: "Photojournalism",
        publication: "Publication to be verified",
        careerStart: "2020",
        nationality: "To be researched",
        image: "",
        biography: "Demonstration profile. Add verified photographic work and professional history.",
        achievements: [],
        reports: [],
        timeline: [],
        verified: false
    }

];


/* ==========================================
   2. HTML ELEMENTS
========================================== */

const journalistGrid =
    document.getElementById("journalistGrid");

const journalistSearch =
    document.getElementById("journalistSearch");

const specializationFilter =
    document.getElementById("specializationFilter");

const journalistSort =
    document.getElementById("journalistSort");

const profileCount =
    document.getElementById("profileCount");

const noProfiles =
    document.getElementById("noProfiles");

const journalistModal =
    document.getElementById("journalistModal");

const profileDetails =
    document.getElementById("profileDetails");

const closeProfile =
    document.getElementById("closeProfile");


/* ==========================================
   3. FILTER JOURNALISTS
========================================== */

function getJournalists() {

    const keyword =
        journalistSearch.value.trim().toLowerCase();

    const specialization =
        specializationFilter.value;

    let results = journalists.filter(person => {

        const searchableText = [
            person.name,
            person.specialization,
            person.publication,
            person.biography
        ].join(" ").toLowerCase();

        const matchesSearch =
            searchableText.includes(keyword);

        const matchesSpecialization =
            specialization === "all" ||
            person.specialization === specialization;

        return matchesSearch && matchesSpecialization;

    });

    if (journalistSort.value === "az") {

        results.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else {

        results.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    }

    return results;
}


/* ==========================================
   4. CREATE JOURNALIST CARD
========================================== */

function createJournalistCard(person) {

    const card = document.createElement("article");

    card.className = "journalist-card";

    const photo = document.createElement("div");

    photo.className = "journalist-photo";

    const image = document.createElement("img");

    image.alt = `Portrait of ${person.name}`;

    image.loading = "lazy";

    if (person.image) {

        image.src = person.image;

        image.onerror = () => {
            photo.replaceChildren();
            photo.classList.add("photo-placeholder");
            photo.textContent = "Portrait unavailable";
        };

    } else {

        photo.classList.add("photo-placeholder");
        photo.textContent = "Portrait not added";

    }

    if (person.image) {
        photo.appendChild(image);
    }

    const info = document.createElement("div");

    info.className = "journalist-info";

    const specialization = document.createElement("small");

    specialization.textContent = person.specialization;

    const name = document.createElement("h3");

    name.textContent = person.name;

    const publication = document.createElement("p");

    publication.textContent =
        person.publication;

    const button = document.createElement("button");

    button.className = "profile-button";

    button.type = "button";

    button.textContent = "Explore Biography →";

    button.addEventListener("click", () => {

        openJournalistProfile(person.id);

    });

    info.append(
        specialization,
        name,
        publication,
        button
    );

    card.append(photo, info);

    return card;
}


/* ==========================================
   5. DISPLAY JOURNALIST DIRECTORY
========================================== */

function renderJournalists() {

    const results = getJournalists();

    journalistGrid.replaceChildren();

    results.forEach(person => {

        journalistGrid.appendChild(
            createJournalistCard(person)
        );

    });

    profileCount.textContent =
        `${results.length} Profiles`;

    noProfiles.hidden = results.length !== 0;

    journalistGrid.hidden = results.length === 0;

}


/* ==========================================
   6. CREATE PROFILE TIMELINE
========================================== */

function createTimeline(timeline) {

    const container = document.createElement("div");

    if (!timeline.length) {

        const message = document.createElement("p");

        message.textContent =
            "Career milestones have not yet been added.";

        container.appendChild(message);

        return container;
    }

    timeline.forEach(item => {

        const event = document.createElement("div");

        event.className = "timeline-item";

        const year = document.createElement("strong");

        year.textContent = item.year;

        const description = document.createElement("p");

        description.textContent = item.event;

        event.append(year, description);

        container.appendChild(event);

    });

    return container;
}


/* ==========================================
   7. OPEN JOURNALIST PROFILE
========================================== */

function openJournalistProfile(id) {

    const person = journalists.find(
        item => item.id === id
    );

    if (!person) return;

    profileDetails.replaceChildren();

    const name = document.createElement("h2");

    name.textContent = person.name;

    const specialization = document.createElement("p");

    specialization.textContent =
        `Specialization: ${person.specialization}`;

    const publication = document.createElement("p");

    publication.textContent =
        `Publication: ${person.publication}`;

    const career = document.createElement("p");

    career.textContent =
        `Career started: ${person.careerStart}`;

    const nationality = document.createElement("p");

    nationality.textContent =
        `Nationality: ${person.nationality}`;

    const biographyHeading = document.createElement("h3");

    biographyHeading.textContent = "Biography";

    const biography = document.createElement("p");

    biography.textContent = person.biography;

    const timelineHeading = document.createElement("h3");

    timelineHeading.textContent = "Career Timeline";

    const timeline = createTimeline(person.timeline);

    const achievementHeading = document.createElement("h3");

    achievementHeading.textContent =
        "Awards & Achievements";

    const achievements = document.createElement("ul");

    if (person.achievements.length) {

        person.achievements.forEach(item => {

            const li = document.createElement("li");

            li.textContent = item;

            achievements.appendChild(li);

        });

    } else {

        const li = document.createElement("li");

        li.textContent =
            "Verified achievements have not yet been added.";

        achievements.appendChild(li);

    }

    const reportHeading = document.createElement("h3");

    reportHeading.textContent = "Selected Reports";

    const reports = document.createElement("ul");

    if (person.reports.length) {

        person.reports.forEach(item => {

            const li = document.createElement("li");

            li.textContent = item;

            reports.appendChild(li);

        });

    } else {

        const li = document.createElement("li");

        li.textContent =
            "Verified report references have not yet been added.";

        reports.appendChild(li);

    }

    const verification = document.createElement("p");

    verification.textContent = person.verified
        ? "Editorial status: Verified"
        : "Editorial status: Demonstration profile – verification pending.";

    profileDetails.append(
        name,
        specialization,
        publication,
        career,
        nationality,
        biographyHeading,
        biography,
        timelineHeading,
        timeline,
        achievementHeading,
        achievements,
        reportHeading,
        reports,
        verification
    );

    journalistModal.showModal();

}


/* ==========================================
   8. SEARCH EVENT
========================================== */

journalistSearch.addEventListener("input", () => {

    renderJournalists();

});


/* ==========================================
   9. SPECIALIZATION FILTER
========================================== */

specializationFilter.addEventListener("change", () => {

    renderJournalists();

});


/* ==========================================
   10. SORTING
========================================== */

journalistSort.addEventListener("change", () => {

    renderJournalists();

});


/* ==========================================
   11. CLOSE PROFILE
========================================== */

closeProfile.addEventListener("click", () => {

    journalistModal.close();

});


journalistModal.addEventListener("click", event => {

    if (event.target === journalistModal) {

        journalistModal.close();

    }

});


/* ==========================================
   12. INITIALIZE
========================================== */

function initializeJournalists() {

    renderJournalists();

    console.log(
        "Inside Track Journalist Directory Loaded."
    );

}

initializeJournalists();
