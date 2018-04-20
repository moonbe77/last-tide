let nodoMarea = document.querySelector('#marea')
let nodoTemp = document.querySelector('#temp')
let nodoDate = document.querySelector('#date')

fetch('https://last-tide-pvrmcucimo.now.sh/',{
    method : "GET",
    mode: 'cors'
})
.then( (response) => {
    return response.json()
})
.then(( response) => {
    let marea = response    
    write(marea)
})
.catch(err => {
    console.log(err)
})

let write = ( m )  => {
    if (m) {
        nodoMarea.innerHTML = `Altura: ${m[0].altura} mts`
        nodoTemp.innerHTML = `Temp: ${m[0].temp}°C`
        nodoDate.innerHTML = `date`
    }
}