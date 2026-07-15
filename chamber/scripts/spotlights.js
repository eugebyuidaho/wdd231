const spotlightContainer = document.querySelector("#spotlight-cards");
const membersUrl = "data/members.json";

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    displaySpotlights(data.members);
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function displaySpotlights(members) {
  const qualified = members.filter(member => member.membershipLevel >= 2);

  const shuffled = qualified.sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, 3);

  spotlightContainer.innerHTML = "";

  chosen.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    const levelNames = ["Member", "Silver", "Gold"];
    const levelLabel = levelNames[member.membershipLevel - 1];

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
      <h3>${member.name}</h3>
      <p>${member.phone}</p>
      <p>${member.address}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <span class="membership">${levelLabel}</span>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();