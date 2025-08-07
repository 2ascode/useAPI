axios
  .get("https://restcountries.com/v3.1/independent?status=true")
  .then((reponse) => {
    
    const apiReponse = reponse.data;
    const profilBlock = document.querySelector(".profil_block");

    function pagination(counter, supCounter) {
      let content = "";
      for (index = counter; index < supCounter; index++) {
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
    }
    
    let cmpt = 0;
    let supCmpt = cmpt+8
    pagination(cmpt, supCmpt)

    const previousBtn = document.querySelector(".previous");
    const nextBtn = document.querySelector(".next");

    nextBtn.addEventListener("click", e=> {
        cmpt = cmpt + 8;
        supCmpt = cmpt+8

        if(cmpt <= 191){
        pagination(cmpt, supCmpt);
        }else{
            cmpt = 192
            supCmpt = 195
        pagination(cmpt, supCmpt)
      }
    });

    previousBtn.addEventListener("click", e=> {
      supCmpt = cmpt;
      cmpt = supCmpt - 8
      if(cmpt >= 0){
          pagination(cmpt, supCmpt);
      }else{
        cmpt = 0
        supCmpt = 8
        pagination(cmpt, supCmpt)
      }
    });
  })
  .catch((error) => {
    console.log("fetch error:", error);
  });
