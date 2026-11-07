
// ======================================
// MOBILE NAVIGATION
// ======================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

// ======================================
// AUTOMATIC COPYRIGHT YEAR
// ======================================

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// ======================================
// LAST MODIFIED DATE
// ======================================

const lastModified = document.querySelector("#last-modified");

if (lastModified) {
  lastModified.textContent = document.lastModified;
}

const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

// Get the business records from the JSON file
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load business records.");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        membersContainer.textContent =
            "Sorry, the business directory could not be loaded.";
        console.error("Error:", error);
    }
}

// Create and display business cards
function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");


        // Business image
        const image = document.createElement("img");
        image.src = member.image;
        image.alt = `${member.name} business image`;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;


        const name = document.createElement("h3");
        name.textContent = member.name;

        const description = document.createElement("p");
        description.textContent = member.description;

        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;

        const phone = document.createElement("p");
        phone.textContent = member.phone
            ? `Phone: ${member.phone}`
            : "Phone: Not provided";

        const membership = document.createElement("p");
        const membershipNames = {
            1: "Member",
            2: "Silver Member",
            3: "Gold Member"
        };
        membership.textContent =
            `Membership: ${membershipNames[member.membership] || "Member"}`;

        card.append(image, name, description, address, phone, membership);
        membersContainer.appendChild(card);
    });
}

// Switch between Grid and List views
function setView(view) {
    const showGrid = view === "grid";

    membersContainer.classList.toggle("members-grid", showGrid);
    membersContainer.classList.toggle("members-list", !showGrid);

    gridButton.classList.toggle("active", showGrid);
    listButton.classList.toggle("active", !showGrid);

    gridButton.setAttribute("aria-pressed", String(showGrid));
    listButton.setAttribute("aria-pressed", String(!showGrid));
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

// Load the business records when the page opens
getMembers();
