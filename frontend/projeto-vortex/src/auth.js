import "../src/auth.css"

const toggleContainerButton = document.getElementById("toggle-container-button")
const toggleContainer = document.querySelector(".toggle-container")
const toggleContainerH1 = document.getElementById("toggle-container-h1")
const toggleContainerH3 = document.getElementById("toggle-container-h3")

const mobileSignInBtn = document.getElementById("mobile-sign-in")
const mobileSignUpBtn = document.getElementById("mobile-sign-up")
const signInContainer = document.querySelector(".sign-in")
const registerContainer = document.querySelector(".register")

const mediaQueryDesktop = window.matchMedia('(min-width: 1000px)')
const mediaQueryMobile = window.matchMedia('(max-width: 1000px)')

const signInBtn = document.getElementById("sign-in-btn")
const registerBtn = document.getElementById("register-btn")


let isSignInPage = true 

window.addEventListener("DOMContentLoaded", async () => {
    if (mediaQueryDesktop.matches){
        signInContainer.classList.remove("hidden")
        registerContainer.classList.remove("hidden")
    } else{
        signInContainer.classList.remove("hidden")
        registerContainer.classList.add("hidden")    
    }
    
    await document.fonts.ready;
    
    requestAnimationFrame(() => {
        document.body.classList.remove("no-transitions")
        document.body.classList.remove("hidden")
        document.body.classList.add("page-ready")
    })
})

toggleContainerButton.addEventListener("click", () => {
    toggleContainerH1.classList.add("content-hidden")
    toggleContainerH3.classList.add("content-hidden")
    toggleContainerButton.classList.add("content-hidden")
    toggleContainer.classList.toggle("transition")

    setTimeout(() => {
        if(isSignInPage){
            toggleContainerH1.textContent = "Bem vindo!"
            toggleContainerH3.textContent = "Já tem uma conta? Entre para usar o website"
            toggleContainerButton.textContent = "Entrar"
        } else{
            toggleContainerH1.textContent = "Olá!"
            toggleContainerH3.textContent = "Ainda não tem uma conta? Cadastre-se para usar o website"
            toggleContainerButton.textContent = "Cadastre-se"
        }
        isSignInPage = !isSignInPage
    }, 200)

})

toggleContainer.addEventListener("transitionend", () => {
    toggleContainerH3.classList.remove("content-hidden")
    toggleContainerButton.classList.remove("content-hidden")
    toggleContainerH1.classList.remove("content-hidden")
})


mobileSignInBtn.addEventListener("click", () => {
    mobileSignInBtn.style.borderColor = "#000"
    mobileSignUpBtn.style.borderColor = "#CCC"
    signInContainer.classList.remove("hidden");
    registerContainer.classList.add("hidden");

})

mobileSignUpBtn.addEventListener("click", () => {
    mobileSignInBtn.style.borderColor = "#CCC"
    mobileSignUpBtn.style.borderColor = "#000"
    signInContainer.classList.add("hidden");
    registerContainer.classList.remove("hidden");
})

mediaQueryDesktop.addEventListener("change", () => {
    if(mediaQueryDesktop.matches){
        signInContainer.classList.remove("hidden")
        registerContainer.classList.remove("hidden")
        console.log(mediaQueryDesktop, mediaQueryDesktop.matches)
    } else{
        signInContainer.classList.remove("hidden")
        registerContainer.classList.add("hidden")
    }
})

registerBtn.addEventListener("click", register)
signInBtn.addEventListener("click", signIn)

const signInEyeBtn = document.getElementById("sign-in-eye-btn")
signInEyeBtn.addEventListener("click", () =>{
    const input = document.getElementById("sign-in-password")
    if(input.getAttribute("type") == "password"){
        input.setAttribute("type", "text")
        signInEyeBtn.src = "hide.png"
    } else{
        input.setAttribute("type", "password")
        signInEyeBtn.src = "view.png"
    }
})

const registerEyeBtn = document.getElementById("register-eye-btn")
registerEyeBtn.addEventListener("click", () => {
    const input = document.getElementById("register-password")
    if(input.getAttribute("type") == "password"){
        input.setAttribute("type", "text")
        registerEyeBtn.src = "hide.png"
    } else{
        input.setAttribute("type", "password")
        registerEyeBtn.src = "view.png"
    }
})

async function register() {
    const registerName = document.getElementById("register-name").value
    const registerEmail = document.getElementById("register-email").value
    const registerPassword = document.getElementById("register-password").value
    const registerErrorP = document.getElementById("register-error")
    let ref = new URLSearchParams(window.location.search).get("ref")
    
    if(registerName == ""){
        showError(registerErrorP, "Insira seu nome")
        return
    } else if(!/@.+$/.test(registerEmail) || !/\..+$/.test(registerEmail)){
        showError(registerErrorP, "Insira um endereço de email válido")
        return
    } else if(registerPassword == ""){
        showError(registerErrorP, "Insira sua senha")
        return
    } else if(registerPassword.length < 8){
        showError(registerErrorP, "A senha deve ter pelo menos 8 caracteres")
        return
    } else{
        registerErrorP.style.display = "none"
    }

    const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({email:registerEmail, password:registerPassword, name:registerName, referrerId: ref ? Number(ref) : 0})
    })
    
    const data = await response.json()
    if(response.ok){
        registerErrorP.style.display = "none"
        window.location.href = "index.html"
    } else{
        showError(registerErrorP, data.error)
    }
}

async function signIn() {
    const signInEmail = document.getElementById("sign-in-email").value
    const signInPassword = document.getElementById("sign-in-password").value
    const signInErrorP = document.getElementById("sign-in-error")

    if(!/@.+$/.test(signInEmail) || !/\..+$/.test(signInEmail)){
        showError(signInErrorP, "Insira um endereço de email válido")
        return
    } else if(signInPassword == ""){
        showError(signInErrorP, "Insira sua senha")
        return
    } else if(signInPassword.length < 8){
        showError(signInErrorP, "A senha deve ter pelo menos 8 caracteres")
        return
    } else{
        signInErrorP.style.display = "none"
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({email:signInEmail, password: signInPassword})
    })

    const data = await response.json()

    if(response.ok){
        signInErrorP.style.display = "none"
        window.location.href = "index.html"
    } else{
        showError(signInErrorP, data.error)
    }
}

function showError(element, message){
    element.style.display = "block"
    element.textContent = message
}