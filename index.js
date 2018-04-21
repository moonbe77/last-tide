let nodoMarea = document.querySelector('#marea')
let nodoTemp = document.querySelector('#temp')
let nodoDate = document.querySelector('#date')
let nodoStatus = document.querySelector('#status')

fetch('https://last-tide-pvrmcucimo.now.sh/',{
    method : "GET",
    mode: 'cors'
})
.then( (response) => {
    nodoStatus.innerText ="Cargando..."
    return response.json()
})
.then(( response) => {
    let marea = response    
    write(marea)
})
.catch(err => {
    nodoStatus.innerText = err  
    console.log(err)
})

let write = ( m )  => {
    let date = new Date(m[0].date)
    console.log(date);
    if (m) {
        nodoStatus.innerText ="ok"        
        nodoMarea.innerHTML = `${m[0].altura}`
        nodoTemp.innerHTML = `${m[0].temp}`
        nodoDate.innerHTML = `${date}`
    }
}
