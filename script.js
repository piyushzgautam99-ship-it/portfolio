const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll("[data-target]")];
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const workCards = [...document.querySelectorAll(".work-card")];
const workCount = document.getElementById("work-count");
const searchInput = document.getElementById("project-search");

let activeFilter = "all";

function setActiveScreen(target) {
  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.id === target);
  });

  navButtons.forEach((button) => {
    const isMatch = button.dataset.target === target;
    button.classList.toggle("is-active", isMatch);
  });

  const nextScreen = document.getElementById(target);
  if (nextScreen) {
    nextScreen.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateWorkCount(visibleCount) {
  workCount.textContent = `${visibleCount} ITEM(S)`;
}

function filterProjects() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  workCards.forEach((card) => {
    const tags = card.dataset.tags;
    const text = card.innerText.toLowerCase();
    const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
    const matchesQuery = !query || text.includes(query);
    const shouldShow = matchesFilter && matchesQuery;

    card.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) {
      visibleCount += 1;
    }
  });

  updateWorkCount(visibleCount);
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;
    if (target) {
      setActiveScreen(target);
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((chip) => chip.classList.toggle("is-active", chip === button));
    filterProjects();
  });
});

searchInput.addEventListener("input", filterProjects);
updateWorkCount(workCards.length);
