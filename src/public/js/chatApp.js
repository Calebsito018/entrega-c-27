const socketClient = io();

const welcomeUser = document.getElementById("welcomeUser"); //parrafo que contendrá una bienvenida para el usuario
let nickname
//sweetalert pidiendo el user y lo guarda en la variable de arriba
swal.fire({
    title: "Bienvenido",
    input: "text",
    confirmButtonColor: "#254053",
    inputAttributes: {
        placeholder: "Identifícate con un apodo"
    },
    allowOutsideClick: false,
    inputValidator: (value)=>{
        if(!value){
            return "Un apodo es necesario para continuar"
        }
    }
}).then((apodo)=>{
    nickname = apodo.value
    if(nickname){
        welcomeUser.innerText = `Conectado como: ${nickname}`
        welcomeUser.classList.add('nickname-green');
    }else{
        welcomeUser.innerText = "Necesitas ingresar un apodo"
        welcomeUser.classList.add('nickname-red');
    }
    socketClient.emit('newUser',nickname) //emito ese apodo a mi app.js
})

// Envío de usuario y mensaje que entran por el sweetalert y el form
const messageForm = document.getElementById("messageForm");
messageForm.onsubmit = (e)=>{
    e.preventDefault();
    const message = document.getElementById('message').value;
    socketClient.emit('chatMessage', { user:nickname, message });
    document.getElementById('message').value = '';
};

// renderizo los mensajes a los usuarios conectados
socketClient.on('returnMessage', (messageData) => {
    const messages = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `<span>${messageData.user}</span>: ${messageData.message}`;
    messages.appendChild(newMessage);
});
//recibo nombre de user y devuelvo notificacion a los users
socketClient.on('userConnected', user => {
    Toastify({
        text: `${user} se ha unido al chat`,
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
});