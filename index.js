document.getElementById("myButton").addEventListener("click", testing)

function testing() {
    const input = document.getElementById("chosenCity");
    const response = fetch("https://google.com/api/fake_url", {city: input});
    console.log(input);
}
