const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLessons(json.data));
};
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);

            clickedBtn.classList.add("active");
            displayLevelWord(data.data);
        });
};

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
const displayWordDetails = (word) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
            <div>
                <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>  
            </div>
            <div>
                <h2 class=" font-bold">Meaning</h2>
                <p>${word.meaning}</p>  
            </div>
            <div>
                <h2 class=" font-bold">Example</h2>
                <p>${word.sentence}</p>  
            </div>
            <div>
                <h2 class=" font-bold">সমার্থক শব্দ গুলো</h2>
                <span class="btn">Syn1</span>
                <span class="btn">Syn1</span>
                <span class="btn">Syn1</span>
            </div>
            `;
    document.getElementById("word_model").showModal();
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="text-center col-span-full rounded py-10 space-y-3 font-Bangla">
                <img class="mx-auto" src="./assets/alert-error.png"/>
                <p class="text-xs font-medium text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-3xl font-bold  ">নেক্সট Lesson এ যান</h1>  
            </div>  
        
        `;
        return;
    }
    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <div class="text-2xl font-bold font-Bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"}/${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায় নি"}"</div>
                <div class="flex justify-between items-center">
                  <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button> 
                  <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button> 
                </div>

            </div>
        `;
        wordContainer.append(card);
    });
};

const displayLessons = (lessons) => {
    // 1. Get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. Get the every lessons
    for (let lesson of lessons) {
        // 3. creat element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                        <i class="fa-solid fa-book-open"></i>Learn-${lesson.level_no}
                        </button>
        
        `;
        levelContainer.append(btnDiv);
    }
};

loadLessons();
