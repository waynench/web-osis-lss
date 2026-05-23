console.log("JS CONNECTED");

/* MOBILE NAVBAR */

const menuToggle =
  document.getElementById("menu-toggle");

const navLinks =
  document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});

function loadVotes() {

  fetch("https://script.google.com/macros/s/AKfycbz5H5Pl8stphwzZgDJy6Hd1UKtM0oGERG1GQ7zcrlhL3icnmHW4gpbXWJPKI4fcU0YL/exec", {
     method: "GET",
  mode: "cors",
  cache: "no-cache"
  })

    .then(response => response.json())

    .then(data => {

      document.getElementById("vote1").innerText = data.paslon1;

      document.getElementById("vote2").innerText = data.paslon2;

      document.getElementById("vote3").innerText = data.paslon3;

const total =
  data.paslon1 +
  data.paslon2 +
  data.paslon3;

document.getElementById("totalVotes").innerText = total;

const percent1 =
  total > 0
    ? ((data.paslon1 / total) * 100).toFixed(1)
    : 0;

const percent2 =
  total > 0
    ? ((data.paslon2 / total) * 100).toFixed(1)
    : 0;

const percent3 =
  total > 0
    ? ((data.paslon3 / total) * 100).toFixed(1)
    : 0;

document.getElementById("progress1").style.width =
  percent1 + "%";

document.getElementById("progress2").style.width =
  percent2 + "%";

document.getElementById("progress3").style.width =
  percent3 + "%";

document.getElementById("percent1").innerText =
  percent1 + "%";

document.getElementById("percent2").innerText =
  percent2 + "%";

document.getElementById("percent3").innerText =
  percent3 + "%";

      document.getElementById("card1").classList.remove("leading");
      document.getElementById("card2").classList.remove("leading");
      document.getElementById("card3").classList.remove("leading");

      const votes = [
        data.paslon1,
        data.paslon2,
        data.paslon3
      ];

      const maxVote = Math.max(...votes);

      if (data.paslon1 === maxVote && maxVote > 0) {
        document.getElementById("card1").classList.add("leading");
      }

      if (data.paslon2 === maxVote && maxVote > 0) {
        document.getElementById("card2").classList.add("leading");
      }

      if (data.paslon3 === maxVote && maxVote > 0) {
        document.getElementById("card3").classList.add("leading");
      }

    });

}

loadVotes();

setInterval(loadVotes, 5000);