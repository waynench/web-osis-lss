console.log("JS CONNECTED");

/* =========================
   MOBILE NAVBAR
========================= */

const menuToggle =
  document.getElementById("menu-toggle");

const navLinks =
  document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

  });

}

/* =========================
   LIVE VOTE COUNT
========================= */

function loadVotes() {

  fetch(
    "https://script.google.com/macros/s/AKfycbz5H5Pl8stphwzZgDJy6Hd1UKtM0oGERG1GQ7zcrlhL3icnmHW4gpbXWJPKI4fcU0YL/exec",
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache"
    }
  )

  .then(response => response.json())

  .then(data => {

    /* =========================
       ELEMENTS
    ========================== */

    const vote1 =
      document.getElementById("vote1");

    const vote2 =
      document.getElementById("vote2");

    const vote3 =
      document.getElementById("vote3");

    const totalVotes =
      document.getElementById("totalVotes");

    /* kalau bukan halaman voting */
    if (!vote1 || !vote2 || !vote3) {
      return;
    }

    /* =========================
       UPDATE VOTES
    ========================== */

    vote1.innerText = data.paslon1;
    vote2.innerText = data.paslon2;
    vote3.innerText = data.paslon3;

    const total =
      data.paslon1 +
      data.paslon2 +
      data.paslon3;

    if (totalVotes) {
      totalVotes.innerText = total;
    }

    /* =========================
       PERCENTAGE
    ========================== */

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

    /* =========================
       PROGRESS BAR
    ========================== */

    const progress1 =
      document.getElementById("progress1");

    const progress2 =
      document.getElementById("progress2");

    const progress3 =
      document.getElementById("progress3");

    if (progress1)
      progress1.style.width = percent1 + "%";

    if (progress2)
      progress2.style.width = percent2 + "%";

    if (progress3)
      progress3.style.width = percent3 + "%";

    /* =========================
       PERCENT TEXT
    ========================== */

    const percentText1 =
      document.getElementById("percent1");

    const percentText2 =
      document.getElementById("percent2");

    const percentText3 =
      document.getElementById("percent3");

    if (percentText1)
      percentText1.innerText = percent1 + "%";

    if (percentText2)
      percentText2.innerText = percent2 + "%";

    if (percentText3)
      percentText3.innerText = percent3 + "%";

    /* =========================
       LEADING CARD
    ========================== */

    const card1 =
      document.getElementById("card1");

    const card2 =
      document.getElementById("card2");

    const card3 =
      document.getElementById("card3");

    if (card1) card1.classList.remove("leading");
    if (card2) card2.classList.remove("leading");
    if (card3) card3.classList.remove("leading");

    const votes = [
      data.paslon1,
      data.paslon2,
      data.paslon3
    ];

    const maxVote =
      Math.max(...votes);

    if (
      card1 &&
      data.paslon1 === maxVote &&
      maxVote > 0
    ) {
      card1.classList.add("leading");
    }

    if (
      card2 &&
      data.paslon2 === maxVote &&
      maxVote > 0
    ) {
      card2.classList.add("leading");
    }

    if (
      card3 &&
      data.paslon3 === maxVote &&
      maxVote > 0
    ) {
      card3.classList.add("leading");
    }

  })

  .catch(error => {

    console.log(
      "FETCH ERROR:",
      error
    );

  });

}

/* =========================
   RUN ONLY IF VOTE PAGE
========================= */

if (document.getElementById("vote1")) {

  loadVotes();

  setInterval(loadVotes, 5000);

}