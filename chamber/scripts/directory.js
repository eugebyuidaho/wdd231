const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const url = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.innerHTML = "<p>Unable to load member information at this time.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    const levelNames = ["Member", "Silver", "Gold"];
    const levelLabel = levelNames[member.membershipLevel - 1];

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <p>${member.description}</p>
      <span class="membership">${levelLabel}</span>
    `;

    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
  gridButton.classList.add("active-view");
  listButton.classList.remove("active-view");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
  listButton.classList.add("active-view");
  gridButton.classList.remove("active-view");
});

getMembers();