document.getElementById("myButton").addEventListener("click", testing)

async function testing() {
    // const input = document.getElementById("chosenCity");
    console.log('success')
    const response = await axios.get("https://api.spudnik.com:2053/ip");
    console.log(response.data);
}
