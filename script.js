// Array of character data with image URLs
const characters = [
    {
        name: "Izuku Midoriya",
        gender: "Male",
        quirk: "One For All",
        hairColor: "Green",
        occupation: "Student",
        fightingStyle: "Hand-to-Hand",
        eyeColor: "Green",
        status: "Alive",
        affiliation: "UA High",
        image: "img/midoriya.webp" // Replace with actual URL
    },
    {
        name: "Katsuki Bakugo",
        gender: "Male",
        quirk: "Explosion",
        hairColor: "Blonde",
        occupation: "Student",
        fightingStyle: "Explosive",
        eyeColor: "Red",
        status: "Alive",
        affiliation: "UA High",
        image: "img/bakugo.webp" // Replace with actual URL
    },
    {
        name: "All Might",
        gender: "Male",
        quirk: "One For All",
        hairColor: "Blonde",
        occupation: "Hero",
        fightingStyle: "Hand-to-Hand",
        eyeColor: "Blue",
        status: "Retired",
        affiliation: "UA High",
        image: "img/allmight.webp" // Replace with actual URL
    },
    {
        name: "Himiko Toga",
        gender: "Female",
        quirk: "Transform",
        hairColor: "Blonde",
        occupation: "Villain",
        fightingStyle: "Stealth",
        eyeColor: "Brown",
        status: "Alive",
        affiliation: "Villain Alliance",
        image: "img/toga.webp" // Replace with actual URL
    },
    {
        name: "All For One",
        gender: "Male",
        quirk: "All For One",
        hairColor: "Black",
        occupation: "Villain",
        fightingStyle: "Varied",
        eyeColor: "Red",
        status: "Alive",
        affiliation: "League of Villains",
        image: "img/allforone.webp" // Replace with actual URL
    },
    {
        name: "Shoto Todoroki",
        gender: "Male",
        quirk: "Half-Cold Half-Hot",
        hairColor: "Red and White",
        occupation: "Student",
        fightingStyle: "Mixed",
        eyeColor: "Grey",
        status: "Alive",
        affiliation: "UA High",
        image: "img/todoroki.webp" // Replace with actual URL
    }
];

// Randomly select a character
let selectedCharacter = characters[Math.floor(Math.random() * characters.length)];
let attempts = 0;

// Populate autocomplete dropdown
const autocompleteResults = document.getElementById('autocompleteResults');

function populateAutocomplete() {
    autocompleteResults.innerHTML = '';
    const query = document.getElementById('guessInput').value.toLowerCase();
    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(query)
    );
    filteredCharacters.forEach(character => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <span>${character.name}</span>
        `;
        item.addEventListener('click', () => {
            document.getElementById('guessInput').value = character.name;
            autocompleteResults.classList.add('hidden');
        });
        autocompleteResults.appendChild(item);
    });
    autocompleteResults.classList.remove('hidden');
}

document.getElementById('guessInput').addEventListener('input', populateAutocomplete);

// Hide autocomplete results when clicking outside
document.addEventListener('click', (event) => {
    if (!document.querySelector('.autocomplete').contains(event.target)) {
        autocompleteResults.classList.add('hidden');
    }
});

// Function to check traits
function checkTraits(guessedCharacter) {
    const traits = ['gender', 'quirk', 'hairColor', 'occupation', 'fightingStyle', 'eyeColor', 'status', 'affiliation'];
    
    // Construct the result table with the guessed character's image
    let row = `
        <tr>
            <td rowspan="2" style="width: 120px;">
                <img src="${guessedCharacter.image}" alt="${guessedCharacter.name}" style="width: 100px; height: auto; border-radius: 5px;">
            </td>
            <td colspan="2">
                <table class="result-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Guessed Character</th>
                            <th>Selected Character</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    traits.forEach(trait => {
        const expected = guessedCharacter[trait]; // The guessed character's trait
        const result = selectedCharacter[trait];  // The actual character's trait
        row += `<tr>
            <td>${trait.charAt(0).toUpperCase() + trait.slice(1)}</td>
            <td>${expected}</td>
            <td class="${expected.toLowerCase() === result.toLowerCase() ? 'result-green' : 'result-red'}">
                ${expected.toLowerCase() === result.toLowerCase() ? '✔️' : '❌'}
            </td>
        </tr>`;
    });

    row += `</tbody></table></td></tr>`;
    document.getElementById('resultsContainer').innerHTML += row;
}

// Function to check the guess
function checkGuess() {
    const userGuess = document.getElementById('guessInput').value.trim();
    const guessedCharacter = characters.find(character => character.name.toLowerCase() === userGuess.toLowerCase());

    if (guessedCharacter) {
        attempts++;
        checkTraits(guessedCharacter);

        if (guessedCharacter.name.toLowerCase() === selectedCharacter.name.toLowerCase()) {
            document.getElementById('finalResult').textContent = `Congratulations! You guessed the character in ${attempts} attempts.`;
            document.getElementById('finalResult').classList.remove('hidden');
            document.getElementById('submitBtn').classList.add('hidden');
            document.getElementById('restartBtn').classList.remove('hidden');
        }
    } else {
        alert('Please select a valid character from the list.');
    }
}

// Function to restart the game
function restartGame() {
    selectedCharacter = characters[Math.floor(Math.random() * characters.length)];
    document.getElementById('guessInput').value = '';
    document.getElementById('resultsContainer').innerHTML = '';
    document.getElementById('finalResult').classList.add('hidden');
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('restartBtn').classList.add('hidden');
}

// Event listeners
document.getElementById('submitBtn').addEventListener('click', checkGuess);
document.getElementById('restartBtn').addEventListener('click', restartGame);
