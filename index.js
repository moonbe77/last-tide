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

console.log(moment.locale());

let write = ( m )  => {
    let date = new Date(m[0].date)  
    moment.locale('es');
    let difDate = (lastDate) =>{
        let dif = moment(lastDate).fromNow();        
        console.log(dif)        
        return  dif
    }

    if (m) {
        nodoStatus.innerText =`OK, Ultimo Valor ${difDate(date)}`        
        nodoMarea.innerHTML = `${m[0].altura}`
        nodoTemp.innerHTML = `${m[0].temp}`
        nodoDate.innerHTML = `${date}`
    }
}
