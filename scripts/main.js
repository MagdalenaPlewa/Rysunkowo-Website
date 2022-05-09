import { createItem } from "./DOMConnection.js"

const header = document.querySelector("#header")
const navMenu = document.querySelector(".nav-menu")
const liIds = document.querySelectorAll('[class="nav-menu"] li')
const navUl = document.querySelector('[class="nav-menu"] ul')
const menuBtn = document.querySelector(".menu-btn")
const cancelBtn = document.querySelector(".cancel-btn")
const sectionIds = document.querySelectorAll('section[id]')
const bg = document.querySelector(".bg")
const bgImg = document.querySelector(".bg img")
const arrow = document.querySelector(".arrow")
let sectionIdsArr = [...sectionIds]

let timer

/*Function of respinsive menu*/
function menuBtnListeners(){
    menuBtn.addEventListener("click", () => {
        navMenu.classList.add("visible")
        navUl.classList.add("visible")
        menuBtn.classList.add("visible")
        cancelBtn.classList.add("visible")
    })

    cancelBtn.addEventListener("click", () => {
        navMenu.classList.remove("visible")
        navUl.classList.remove("visible")
        menuBtn.classList.remove("visible")
        cancelBtn.classList.remove("visible")
    })
}

menuBtnListeners()

/*Function changing the content of the page and navigation*/
function sideChanger(){
    liIds.forEach(el => el.addEventListener("click", () => {
        liIds.forEach(el => el.classList.remove("active"))

        navMenu.classList.remove("visible")
        navUl.classList.remove("visible")
        menuBtn.classList.remove("visible")
        cancelBtn.classList.remove("visible")
        bg.classList.add("hidden")
        window.scrollTo(0, 0)

        sectionIdsArr.forEach(el => el.classList.remove("show"))

        const liAttribute = el.dataset.id

        if(liAttribute === "header"){
            header.classList.remove("top")
            bg.classList.remove("hidden")
            el.classList.add("active")
        }

        else{
            for(let i=0; i<sectionIdsArr.length; i++){
                if(liAttribute === sectionIdsArr[i].id){
                    sectionIdsArr[i].classList.add("show")
                    header.classList.add("top")
                    el.classList.add("active")
                }
            }
        }
    }

    ))
}

/*Function of creating an array of images for each gallery*/
function setupGalleryListeners(){
    const galleryArrs = Array.from(document.querySelectorAll('section[id="gallery"] [id]')).map(el => el.children[1])
    const imgArrs = galleryArrs.map(el => Array.from(el.children))

    for(let arr of imgArrs){
        for(let img of arr){
            img.addEventListener("click", (event) => {
                let index = arr.indexOf(img)
                createSliderElems(event, index, arr)
            })
        }
    }
}

setupGalleryListeners()

/*Function of creating a popup image show*/
function createSliderElems(event, index, arr){
    const slider = createItem('div', "showPicture")
    const prev = createItem('div', "fa-solid fa-angle-left")
    const next = createItem('div', "fa-solid fa-angle-right")
    const close = createItem('div', "fas fa-times")
    const prevIcon = createItem('i')
    const nextIcon = createItem('i')
    const closeIcon = createItem('i')

    let imgSrc = event.target.attributes.src.nodeValue

    let imgId= (event.target.dataset.id)

    let newImg = createItem('img', "opacityChange", imgSrc)

    document.body.appendChild(slider)
    slider.appendChild(prev)
    slider.appendChild(next)
    slider.appendChild(close)
    prev.appendChild(prevIcon)
    next.appendChild(nextIcon)
    close.appendChild(closeIcon)
    slider.appendChild(newImg)

    slider.classList.remove("hidden")

    if(index === 0){
        prev.style.display = "none"
    }
    if(index === arr.length-1){
        next.style.display = "none"
    }

    setTimeout(() => {
        newImg.classList.remove("opacityChange")
    }, 200)


        changeSliderImg(prev, next, index, newImg, imgId, arr)


        close.addEventListener("click", () => {
            slider.classList.add("hidden")
            arr.forEach(el => el.removeEventListener("click", function slider(){
            }))
        })
}

/*Function of next and previous image show*/
function changeSliderImg(prev, next, index, newImg, imgId, arr){
    function fadeIn(){
        newImg.classList.add("invisible")
    }

    prev.addEventListener("click", () => {
        function fadeOutPrev(){
            index--
            if(index === 0){
                prev.style.display = "none"
                newImg.setAttribute('src', `/img/${imgId}/${imgId}_0.jpg`)
            }
                next.style.display = "flex"
                newImg.setAttribute('src', `/img/${imgId}/${imgId}_${index}.jpg`)
        }

        fadeIn()
        setTimeout(() => {
            fadeOutPrev()
            setTimeout(() => {
                newImg.classList.remove("invisible")
            }, 100)
        }, 300)

    })

    next.addEventListener("click", () => {
        function fadeOutNext(){
            index++
            if(index === arr.length - 1){
                next.style.display = "none"
                newImg.setAttribute('src', `/img/${imgId}/${imgId}_${index}.jpg`)
            }

                prev.style.display = "flex"
                newImg.setAttribute('src', `/img/${imgId}/${imgId}_${index}.jpg`)

        }

        fadeIn()
        setTimeout(() => {
            fadeOutNext()
            setTimeout(() => {
                newImg.classList.remove("invisible")
            }, 100)
        }, 300)
    })
}

/*Background slider function-------------------------*/
function slider(){
    let number = Math.floor(Math.random() * 10)
    timer = setInterval(() => {
        number++
        if(number >= 4){
            number = 0
        }
        bgImg.setAttribute('src', `/img/slider/bg${number}.jpg`)
    }, 2500)
}

/*------------------------------------------------*/
bgImg.addEventListener("mouseover", () => {
    if(bg.classList.contains("moving")){
        return
    }
    else{
        clearInterval(timer)
        bg.classList.add("moving")
        setTimeout(() => {
        bg.classList.remove("moving")
        slider()
        }, 3000)
    }
})

/*----------------------------------------------*/
arrow.addEventListener("click", () => {
    const divInfo = document.querySelector(".orders .info")
    const infoOffset = divInfo.offsetTop
    window.scrollTo(0, infoOffset+50)
})

/*----------------------------------------------*/

slider()
sideChanger()
