// ============================================
// BUSINESS SPOTLIGHTS
// Nkaseim Chamber of Commerce
// ============================================


// Select the HTML container
const spotlightsContainer = document.querySelector(
    "#spotlights-container"
);


// ============================================
// FETCH BUSINESS RECORDS
// ============================================

async function getSpotlights() {

    try {

        // Fetch business records from JSON
        const response = await fetch("data/members.json");

        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Convert response into JavaScript data
        const members = await response.json();

        // Validate JSON data
        if (!Array.isArray(members) || members.length === 0) {
            throw new Error("No business records found.");
        }


        // ============================================
        // SELECT SILVER AND GOLD MEMBERS
        // ============================================

        const eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );


        // ============================================
        // RANDOMLY SHUFFLE MEMBERS
        // ============================================

        const shuffledMembers = [...eligibleMembers];

        for (let i = shuffledMembers.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [shuffledMembers[i], shuffledMembers[j]] =
                [shuffledMembers[j], shuffledMembers[i]];

        }


        // Select up to three businesses
        const selectedMembers = shuffledMembers.slice(0, 3);


        // Display selected businesses
        displaySpotlights(selectedMembers);


    } catch (error) {

        console.error("Spotlights Error:", error);

        spotlightsContainer.innerHTML =
            "<p>Unable to load business spotlights. Please try again later.</p>";

    }

}


// ============================================
// DISPLAY BUSINESS SPOTLIGHT CARDS
// ============================================

function displaySpotlights(members) {

    // Clear previous content
    spotlightsContainer.innerHTML = "";


    // Check if there are eligible businesses
    if (members.length === 0) {

        spotlightsContainer.textContent =
            "No Silver or Gold members available.";

        return;

    }


    // Loop through selected businesses
    members.forEach(member => {

        // ============================================
        // CREATE BUSINESS CARD
        // ============================================

        const card = document.createElement("article");

        card.classList.add("spotlight-card");


        // ============================================
        // BUSINESS IMAGE
        // ============================================

        const image = document.createElement("img");

        image.src = member.image;

        image.alt = `${member.name} business image`;

        image.loading = "lazy";


        // ============================================
        // BUSINESS NAME
        // ============================================

        const name = document.createElement("h3");

        name.textContent = member.name;


        // ============================================
        // BUSINESS DESCRIPTION
        // ============================================

        const description = document.createElement("p");

        description.textContent = member.description;


        // ============================================
        // BUSINESS ADDRESS
        // ============================================

        const address = document.createElement("p");

        address.textContent = member.address;


        // ============================================
        // BUSINESS PHONE NUMBER
        // ============================================

        if (member.phone) {

            const phone = document.createElement("p");

            phone.textContent = `Phone: ${member.phone}`;

            card.appendChild(phone);

        }


        // ============================================
        // BUSINESS WEBSITE
        // ============================================

        if (member.website) {

            const website = document.createElement("a");

            website.href = member.website;

            website.textContent = "Visit Website";

            website.target = "_blank";

            website.rel = "noopener noreferrer";

            card.appendChild(website);

        }


        // ============================================
        // MEMBERSHIP LEVEL
        // ============================================

        const membership = document.createElement("p");

        const membershipNames = {

            1: "Member",

            2: "Silver Member",

            3: "Gold Member"

        };

        membership.textContent =
            membershipNames[member.membership] || "Member";


        // ============================================
        // ADD CONTENT TO BUSINESS CARD
        // ============================================

        card.prepend(
            image,
            name,
            description,
            address
        );

        card.appendChild(membership);


        // ============================================
        // ADD CARD TO HOMEPAGE
        // ============================================

        spotlightsContainer.appendChild(card);

    });

}


// ============================================
// RUN THE FUNCTION
// ============================================

getSpotlights();