const socket = io()

socket.on('welcome', (data) => {
    console.log(data)
})

socket.on('all-messages', (data) => {
    render(data)
})

function render(data){
    const html = data.map(el => {
        return (`
            <div>
                <strong> ${el.author} </strong> dice
                <em> ${el.text} </em>
            </div>
        `)
    }).join(" ")
    document.getElementById('box').innerHTML = html
}


function addMessage(){
    const message = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    }
    socket.emit('newMessage', message)

    console.log(message)
    return false
}