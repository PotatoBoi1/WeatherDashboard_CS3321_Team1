document.getElementById("city-input-button").addEventListener("click", getWeatherReport);

async function getWeatherReport() {
    // const input = document.getElementById("chosenCity");
    console.log('success')
    const response = await axios.get("https://api.spudnik.com:2053/ip");
    console.log(response.data);
    createCard(response);
}


// TODO: When button is pushed, add card to to main content
// Bootstrap card: https://getbootstrap.com/docs/4.0/components/card/