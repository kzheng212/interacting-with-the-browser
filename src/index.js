// Create your game here!
const app = document.getElementById("app");
const guessContainer = document.getElementById("guesses");
let count = 6;
guessContainer.textContent = count;
let gameWon = false;

const imageUrls = [
  "../images/bill-gates.jpg",
  "../images/emma-watson.jpg",
  "../images/taylor-swift.jpg",
];

function randomizeImage() {
  gameWon = false;
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const randomImageUrl = imageUrls[randomIndex];

  // Display the Random Image
  document.getElementById("randomImage").src = randomImageUrl;
  // Extracts Celebrity Name from Img Name
  const lastIndex = randomImageUrl.indexOf(".jpg");
  let celebName = randomImageUrl
    .substring(10, lastIndex)
    .replaceAll("-", " ")
    .toUpperCase();
  //   console.log(celebName);
  // Display the Celebrity Name
  document.getElementById("randomName").textContent = celebName;
}

document
  .getElementById("randomizeButton")
  .addEventListener("click", function () {
    randomizeImage();
    resetGame();
  });

const zodiacList = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const section = app.appendChild(document.createElement("div"));
section.classList.add("grid-container");

for (let i = 0; i < zodiacList.length; i++) {
  const zodiacBtn = section.appendChild(document.createElement("button"));
  zodiacBtn.classList.add("zodiac");
  zodiacBtn.setAttribute("id", zodiacList[i].toLowerCase());
  zodiacBtn.textContent = zodiacList[i].toLowerCase();
}

function resetGame() {
  // Reset guess count
  count = 6;
  guessContainer.textContent = count;

  // Reset styles
  const zodiacButtons = document.querySelectorAll(".zodiac");
  zodiacButtons.forEach((button) => {
    button.style.color = "";
  });

  // Reset the gameWon variable
  gameWon = false;
}

function check(select) {
  if (select.target.classList.contains("zodiac")) {
    let selectedId = select.target.id;
    console.log("ID of selected element:", selectedId);
    let selectedCelebrity = document.getElementById("randomName").textContent;
    console.log(selectedCelebrity);
    if (
      (selectedId === "scorpio" &&
        selectedCelebrity === "Bill Gates".toUpperCase()) ||
      (selectedId === "aries" &&
        selectedCelebrity === "Emma Watson".toUpperCase()) ||
      (selectedId === "sagittarius" &&
        selectedCelebrity === "Taylor Swift".toUpperCase())
    ) {
      gameWon = true;
      window.alert(`Congratulations! You are the winner!`);
      document.getElementById(selectedId).style.color = "limegreen";
      playAgain();
    } else {
      window.alert(`Wrong! Try again!`);
      document.getElementById(selectedId).style.color = "red";
      count--;
      guessContainer.textContent = count;

      if (count === 0) {
        window.alert(`Game Over! You've run out of guesses.`);
        resetGame();
      }
    }
  }
}

// Call resetGame initially to set up the initial state
resetGame();
// Call check to set up the event listener
let zodiacGrid = document.querySelector(".grid-container");
zodiacGrid.addEventListener("click", check);

function playAgain() {
  let userResponse = window.confirm("Do you want to play again?");
  if (userResponse) {
    resetGame();
  } else {
    zodiacGrid.removeEventListener("click", check);
  }
}
