let slider = document.querySelector(".slider");
let darkMoon = document.querySelector(".darkMoon");
let lightMoon = document.querySelector(".lightMoon");
let h1 = document.querySelector("h1");
let input = document.querySelector("#search_word");
let pley = document.querySelector(".pleyr img");
let audio = document.querySelector("audio source");
let audio2 = document.querySelector("audio");

let none = document.querySelector(".none");
let orta = document.querySelector(".orta");
let orta2 = document.querySelector(".orta2");
let oxiri = document.querySelector(".oxiri");
let umumiy = document.querySelector(".umumiy");
let link = document.querySelector(".link");

none.style.display = "none";

function getData(soz) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${soz}`)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      if (data[0] == undefined) {
        none.style.display = "inline-block";
        umumiy.style.display = "none";
        pley.style.display = "none";
        orta.style.display = "none";
        orta2.style.display = "none";
        oxiri.style.display = "none";
      } else {
        none.style.display = "none";
        umumiy.style.display = "inline-block";
        pley.style.display = "inline-block";
        orta.style.display = "inline-block";
        orta2.style.display = "inline-block";
        oxiri.style.display = "inline-block";
      }
      if (data[0].meanings.length > 0) {
        showInUi(data[0]);
        ortafun(data[0]);
        ortafun2(data[0]);
        oxir(data[0]);
      }
    });
}

// audio2.play();
function showInUi(data) {
  console.log(data);
  let paudio = data.phonetics.filter((el) => el.audio != "")[0]?.audio;
  audio2.setAttribute("src", paudio);
  pley.onclick = function () {
    console.log(data.phonetics[0].audio);
    audio2.play();
  };
  let ptext = data.phonetics.filter((el) => Boolean(el.text) != false)[0]?.text;
  h1.textContent = data.word;

  document.querySelector(".pley p").textContent = ptext;

  document.querySelector(".pley p").style.display = ptext ? "block" : "none";
  pley.style.display = paudio ? "block" : "none";
}

function ortafun(data) {
  if (data.meanings.length >= 1) {
    for (let i = 0; i < data.meanings.length; i++) {
      let men = data.meanings[i];

      let k = "";
      for (let j = 0; j < men.definitions.length; j++) {
        k += "<li>" + men.definitions[j].definition + "</li>";
      }

      let s = `<div class="Part">
<div class="part">
  <h3>${men.partOfSpeech}</h3>
  <div></div>
</div>
<h2 class="meaning">Meaning</h2>
<ul>
  ${k}
</ul>
</div>

<div class="synonyms">
<p>Synonyms</p>
<h5>${data.meanings[0].synonyms}</h5>
</div>
`;
      orta.innerHTML = s;
    }
  }
}

function ortafun2(data) {
  if (data.meanings.length != 2 && data.meanings[1]) {
    let sum2 = `<div class="Part">
  <div class="part">
    <h3>${data.meanings[1].partOfSpeech}</h3>
    <div></div>
  </div>
  <h2 class="meaning">Meaning</h2>
  <ul>
    <li class='li'> ${data.meanings[1].definitions[0].definition}</li>
  </ul>
  <p class="key">
    ${data.meanings[1].definitions[0].definition}
  </p>
</div>`;
    orta2.innerHTML = sum2;
  }
}

function oxir(data) {
  if (data.meanings.length != 1) {
    let sum2 = `<div class="Part">
  <div class="part">
    <h3>${data.meanings[0].partOfSpeech}</h3>
    <div></div>
  </div>
  <h2 class="meaning">Meaning</h2>
  <ul>
    <li class='li'> ${data.meanings[0].definitions[0].definition}</li>
  </ul>
  <p class="key">
    ${data.meanings[0].definitions[0].definition}
  </p>
</div>`;
    oxiri.innerHTML = sum2;
  }
  link.textContent = data.sourceUrls;
}

input.addEventListener("keyup", (e) => {
  console.log(e);
  if (e.key == "Enter") {
    getData(input.value);
  }
});

slider.addEventListener("click", () => {
  document.body.classList.toggle("darkTheme");
  // darkMoon.classList.toggle("none");
  // lightMoon.classList.toggle("none");
});

let a = document.querySelectorAll(".dropdown-content a");

for (let i = 0; i < a.length; i++) {
  a[i].onclick = function (e) {
    document.body.classList.remove("Sans-Serif");
    document.body.classList.remove("Serif");
    document.body.classList.remove("mono");
    document.body.classList.add(e.target.className);
    console.log(e.target.className);
    // fontOption.classList.add("exit");
  };
  console.log(i);
}
