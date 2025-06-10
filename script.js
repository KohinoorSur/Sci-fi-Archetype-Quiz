let q = 1;
const total_q = 11;

function show_q(n) {
    for (let i = 1; i <= total_q; i++) {
        document.getElementById('q' + i).classList.add('hidden');
    }
    document.getElementById('q' + n).classList.remove('hidden');

    document.getElementById('back-button').classList.toggle('hidden', n === 1);
    document.getElementById('next-button').classList.toggle('hidden', n === total_q);
    document.getElementById('submit').classList.toggle('hidden', n !== total_q);
}

document.addEventListener('DOMContentLoaded', function() {
document.querySelector('.start-button').addEventListener("click", function() {
    document.getElementById('lands').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    show_q(1);
});
});

document.getElementById('next-button').addEventListener('click', function() {
    if (q < total_q) {
        q++;
        show_q(q);
    }
});

document.getElementById('back-button').addEventListener('click', function() {
    if (q > 1) {
        q--;
        show_q(q);
    }
});

document.getElementById('quiz').addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {
        chosen: 0,
        tyrant: 0,
        survivor: 0,
        machine: 0
    };

    const archetypes = {
        chosen: {
            title: "The Chosen One.",
            description: "The Chosen One is a special hero picked by destiny to save the world or make a big change. They usually have unique powers or traits that develop later and are often helped by mentors or guided by fate.",
            page: "chosen.html"
        },
        tyrant: {
            title: "The Tyrant.",
            description: "The Tyrant is a villain who wants total control and power. They rule harshly and will do anything to get their way, often hurting others and taking away their freedom.",
            page: "tyrant.html"
        },
        survivor: {
            title: "The Survivor.",
            description: "The Survivor is tough and can get through really hard times. They are smart, flexible, and give hope to others by showing that it's possible to make it through tough situations.",
            page: "survivor.html"
        },
        machine: {
            title: "The Machine.",
            description: "The Machine is a character or thing that is all about logic and efficiency, often without emotions. They can be actual machines like robots or AI, or humans who act like machines, focusing on being useful rather than emotional.",
            page: "machine.html"
        }
    };

    for (let i = 1; i <= total_q; i++) {
        const picked = document.querySelector(`input[name="q${i}"]:checked`);
        if (picked) {
            answers[picked.value]++;
        }
    }

    let max_score = -1;
    let result = 'chosen';
    for (const archetype in answers) {
        if (answers[archetype] > max_score) {
            max_score = answers[archetype];
            result = archetype;
        }
    }

    document.getElementById('quiz').style.display = 'none';
    const resultDisplay = document.getElementById('result');
    document.getElementById('result-title').classList.add('White');
    document.getElementById('result-title').innerHTML = `Your Sci-Fi Archetype is: <span class="highlight">${archetypes[result].title.toUpperCase()}</span>`;
    document.getElementById('result-description').textContent = archetypes[result].description;
    document.getElementById('result-link').href = archetypes[result].page;
    document.getElementById('result-link').textContent = `Click - Learn more about '${archetypes[result].title}'`;

    resultDisplay.classList.remove('hidden');
});
