import "../src/main.css"

async function loadPage(){
    const response = await fetch("http://localhost:8080/user/me", {
        method:'GET',
        credentials:'include'
    })

    const data = await response.json()
    
    const nameP = document.getElementById("user-name")
    if (response.ok){
        const referralLink = document.getElementById("referral-link")
        const pointsText = document.getElementById("points")
        nameP.textContent = `Olá, ${data.name}`
        const link = `http://localhost:5173/auth.html?ref=${data.id}`
        prepareShareApps(link)
        updatePoints(data.points)
        referralLink.href = link
        referralLink.textContent = link
        pointsText.textContent = data.points
        console.log(data)
    } else{
        window.location.href = "auth.html"
    }
}

async function logout(){
    await fetch("http://localhost:8080/user/logout", {
        method:'POST',
        credentials:'include'
    })

    window.location.href = "auth.html"
}

function updatePoints(points){
    let level = 1 + Math.floor(points/5)
    let pointsInLevel = points % 5
    const circleText = document.getElementById("circle-text")
    circleText.textContent = `Lv. ${level}`
    const circularBar = document.querySelector(".circular-bar")
    circularBar.style.background = `conic-gradient(#4285F4 ${(pointsInLevel/5) * 360}deg, #FFF 0deg)`
    
    let pointsDesc = document.getElementById('points-description')
    if(pointsInLevel == 1){
        pointsDesc.textContent = `Você tem ${points} ponto! Faltam ${5 - pointsInLevel} pontos para o nivel ${level+1}. Ganhe 1 ponto por amigo que se cadastrar!`
    } else if(pointsInLevel == 4){
        pointsDesc.textContent = `Você tem ${points} pontos! Falta ${5 - pointsInLevel} ponto para o nivel ${level+1}. Ganhe 1 ponto por amigo que se cadastrar!`
    } else{
        pointsDesc.textContent = `Você tem ${points} pontos! Faltam ${5 - pointsInLevel} pontos para o nivel ${level+1}. Ganhe 1 ponto por amigo que se cadastrar!`
    }
}

function prepareShareApps(link){
    const shareMessage = `Olá! Estou usando o compartilha+ e achei muito bom. Cadastre-se pelo meu link: ${link}`
    const whatsappButton = document.getElementById("whatsapp-share-btn")
    whatsappButton.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`

    const facebookButton = document.getElementById("facebook-share-btn")
    facebookButton.href = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`

    const telegramButton = document.getElementById("telegram-share-btn")
    telegramButton.href = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareMessage)}`
}

window.addEventListener("DOMContentLoaded", loadPage)

const copyButton = document.getElementById("copy")
copyButton.addEventListener("click", () => {
    copyButton.classList.add("active")
    const text = document.getElementById("referral-link").textContent
    navigator.clipboard.writeText(text)
    setTimeout(() => {
        copyButton.classList.remove("active")
    }, 1000)
})

const shareButton = document.getElementById("share")
shareButton.addEventListener("click", () => {
    const shareContainer = document.querySelector(".share-container")
    shareContainer.classList.toggle("hidden")
})

const logoutBtn = document.getElementById("logout-btn")
logoutBtn.addEventListener("click", logout)