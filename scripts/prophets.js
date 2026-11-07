// 1 & 2. Declare the URL of the JSON resource
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// 3. Select the HTML div element with an id of "cards"
const cards = document.querySelector('#cards');

// 4, 5, 6, 7. Create an async function to fetch and check data
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();

    // Call displayProphets and pass the array of prophets
    displayProphets(data.prophets);
}

// 11 & 12. Define a function expression using an arrow function to process the array
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements for the card
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const portrait = document.createElement('img');

        // Populate text content
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Set image attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append elements to card
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // Append card to cards container
        cards.appendChild(card);
    });
};

// Call the main function to run the fetch
getProphetData();