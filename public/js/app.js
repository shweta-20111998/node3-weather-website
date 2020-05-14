//import { response } from "express"

console.log('client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle'),then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// }



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

messageone.textContent = "from java script"

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'loading...'
    messagetwo.textContent = ''
    fetch('/weather?address='+location),then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageone.textContent(data.error)
        }
        else{
            messageone.textContent(data.location)
            messagetwo.textContent(data.forecast)
            console.log(data.location)
            console.log(data.forecast)
        }
        
    })
})
})