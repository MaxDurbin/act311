


function load(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        console.log(data.message)
        document.getElementById("dogpic").src = data.message
    })

}

function enterName(){
    console.log("check")
    addEventListener("keyup", (event) => {
        if('Enter' === event.key){
            fetch('https://api.nationalize.io?name='   +  document.getElementById("enterName").value)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById("result").innerText = data.country[1].country_id
            })


        }
    })
}
