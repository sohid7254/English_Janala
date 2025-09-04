const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLessons(json.data));
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
                        <button class="btn btn-outline btn-primary">
                        <i class="fa-solid fa-book-open"></i>Learn-${lesson.level_no}
                        </button>
        
        `;
        levelContainer.append(btnDiv)
    }
};
loadLessons();
