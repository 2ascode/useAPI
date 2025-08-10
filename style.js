axios
  .get("https://restcountries.com/v3.1/independent?status=true")
  .then((reponse) => {
    const apiReponse = reponse.data;
    const profilBlock = document.querySelector(".profil_block");

    //fonction de pagination
    function pagination(counter, itemNumb) {
      let content = "";
      for (index = counter; index < counter + itemNumb; index++) {
        const apiReponseItem = apiReponse[index];
        let language = apiReponseItem.languages;
        const languageSplit = Object.values(language);

        content += `
                    <div class="profil_item">
                        <div class="profil_top">
                            <img src="${apiReponseItem.flags.svg}" alt="drapeau" class="profil_image">
                            <h3 class="profil_name">${apiReponseItem.name.common}</h3>
                        </div>
                        <img src="${apiReponseItem.coatOfArms.png}" alt="${apiReponseItem.name.common} image" class="profil_content_img">
                        <div class="profil_text">
                            <p>Continent: ${apiReponseItem.region}</p>
                            <p>Capital: ${apiReponseItem.capital}</p>
                            <p>Langue(s): ${languageSplit[0]}</p>
                            <p>Population: ${apiReponseItem.population}</p>
                        </div>
                        <div class="profil_bottom">
                            <img src="img/jaime.png" alt="">
                            <img src="img/commenter.png" alt="">
                            <img src="img/patarger.png" alt="">
                        </div>
                    </div>
                `;
      }
      profilBlock.innerHTML = content;
      const btn = document.querySelectorAll(".btn");

      btn[0].innerHTML = `${(counter + 8) / 8 - 2}`;
      btn[1].innerHTML = `${(counter + 8) / 8 - 1}`;
      btn[2].innerHTML = `${(counter + 8) / 8}`;
      btn[3].innerHTML = `${(counter + 8) / 8 + 1}`;
      btn[4].innerHTML = `${(counter + 8) / 8 + 2}`;

      const actuPage = document.querySelector(".actu_page");
      const start = document.querySelector(".start");
      const previousBtn = document.querySelector(".previous");
      const end = document.querySelector(".end");
      const nextBtn = document.querySelector(".next");

      if (actuPage.textContent <= 2) {
        if (actuPage.textContent <= 1) {
          (btn[0].style.display = "none"),
            (btn[1].style.display = "none"),
            (btn[3].style.display = "flex"),
            (btn[4].style.display = "flex");
        } else {
          (btn[1].style.display = "flex"), (btn[0].style.display = "none");
        }
      } else if (
        actuPage.textContent >= Math.ceil(apiReponse.length / itemNumb - 1)
      ) {
        if (actuPage.textContent < Math.ceil(apiReponse.length / itemNumb)) {
          (btn[4].style.display = "none"), (btn[3].style.display = "flex");
        }
      } else {
        console.log(Math.ceil(apiReponse.length / 8));
        if (actuPage.textContent == Math.ceil(apiReponse.length / 8)) {
          (btn[0].style.display = "flex"),
            (btn[1].style.display = "flex"),
            (btn[3].style.display = "none"),
            (btn[4].style.display = "none");
        } else {
          for (let i = 0; i <= 4; i++) {
            btn[i].style.display = "flex";
          }
        }
      }

      if (actuPage.textContent <= 1) {
        start.classList.toggle("button"),
          (start.disabled = previousBtn.classList.toggle("button")),
          (previousBtn.disabled = true);
      } else {
        start.classList.toggle("button", false), (start.disabled = false);
        previousBtn.classList.toggle("button", false),
          (previousBtn.disabled = false);
      }

      if(actuPage.textContent >=  25){
        end.classList.toggle("button"),end.disabled = 
        nextBtn.classList.toggle("button"), nextBtn.disabled = true
      }else{
          end.classList.toggle("button", false), end.disabled = false
          nextBtn.classList.toggle("button", false),nextBtn.disabled = false
        }

      // Activation de la classe Active au click sur les profil_item
      const itemProfil = profilBlock.querySelectorAll(".profil_item");
      console.log(itemProfil);
      itemProfil.forEach((element, index) => {
        element.addEventListener("click", (e) => {
          itemProfil.forEach((item, i) => {
            if (i == index) {
              item.classList.toggle("active");
            } else {
              item.classList.toggle("active", false);
            }
          });
        });
      });
    }

    let cmpt = 0;
    let itemNumb = 8;
    pagination(cmpt, itemNumb);
    let Length = apiReponse.length;

    function next(i) {
      cmpt = cmpt + itemNumb * i + itemNumb;
      if (cmpt < Length - (Length % itemNumb)) {
        pagination(cmpt, itemNumb);
      } else {
        if (cmpt < Length) {
          pagination(cmpt, Length % itemNumb);
        } else {
          cmpt = Length - (Length % itemNumb);
          return false;
        }
      }
    }

    function previous(i) {
      cmpt = cmpt - itemNumb * i - itemNumb;
      if (cmpt < 0) {
        cmpt = 0;
        return false;
      } else {
        pagination(cmpt, itemNumb);
      }
    }

    //gestion du bouton Début
    const start = document.querySelector(".start");
    start.addEventListener("click", (e) => {
      if (start) {
        pagination(0, itemNumb);
        cmpt = 0;
      }
    });

    //gestion du bouton Précédent
    const previousBtn = document.querySelector(".previous");
    previousBtn.addEventListener("click", (e) => {
      if (previousBtn) {
        previous(0);
      }
    });

    //gestion du bouton pageMinusOne
    const pageMinusOne = document.querySelector(".page_minus_one");
    pageMinusOne.addEventListener("click", (e) => {
      if (pageMinusOne) {
        previous(0);
      }
    });
    //gestion du bouton pageMinusTwo
    const pageMinusTwo = document.querySelector(".page_minus_two");
    pageMinusTwo.addEventListener("click", (e) => {
      if (pageMinusTwo) {
        previous(1);
      }
    });

    //gestion des bouton Suivant
    const nextBtn = document.querySelector(".next");
    nextBtn.addEventListener("click", (e) => {
      if (nextBtn) {
        next(0);
      }
    });

    //gestion des bouton pagePlusOne
    const pagePlusOne = document.querySelector(".page_plus_one");
    pagePlusOne.addEventListener("click", (e) => {
      if (pagePlusOne) {
        next(0);
      }
    });

    //gestion des bouton pagePlusTwo
    const pagePlusTwo = document.querySelector(".page_plus_two");
    pagePlusTwo.addEventListener("click", (e) => {
      if (pagePlusOne) {
        next(1);
      }
    });

    //gestion du bouton Fin
    const end = document.querySelector(".end");
    end.addEventListener("click", (e) => {
      if (end) {
        if (Length % itemNumb == 0) {
          pagination(Length - itemNumb, itemNumb);
        } else {
          pagination(Length - (Length % itemNumb), Length % itemNumb);
          cmpt = Length - (Length % itemNumb);
        }
      }
    });

    //
  })
  .catch((error) => {
    console.log("fetch error:", error);
  });
