const main = () => {
  const searchElement = document.querySelector("#searchElement");
  const buttonSearchElement = document.querySelector("#searchButtonElement");
  const clubListElement = document.querySelector("#clubList");

  // const onButtonSearchClicked = () => {
  //   DataSource.searchClub(searchElement.value)
  //     .then(renderResult)
  //     .catch(fallbackResult);
  // };

  const Delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const onButtonSearchClicked = async () => {
    clubListElement.innerHTML = '<div id="loader"><div class="lds-dual-ring"></div></div>'
    await Delay(2000)
    try {
      const result = await DataSource.searchClub(searchElement.value);
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  const renderResult = results => {
    clubListElement.innerHTML = "";
    results.forEach(function (club) {

      const { name, fanArt, description } = club;

      const clubElement = document.createElement("div");
      clubElement.setAttribute("class", "club");

      clubElement.innerHTML = `<img class="fan-art-club" src="${fanArt}" alt="Fan Art"> \n 
        <div class="club-info" \n
        <h2> ${name} </h2> \n
        <p> ${description} </p>
        </div>;
        `;
      clubListElement.appendChild(clubElement);
    });
  };

  const fallbackResult = message => {
    clubListElement.innerHTML = "";
    clubListElement.innerHTML += `<h2 class="placeholder">  ${message} </h2>`;
  };

  buttonSearchElement.addEventListener("click", onButtonSearchClicked);

};
