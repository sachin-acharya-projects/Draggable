import "../css/style.scss"
import "../css/Draggable.scss"

let cards = document.querySelectorAll(".card")
let moving = false
let offsetX,
    offsetY,
    prevX,
    prevTime,
    card = null
let lastZindex = 1

// When Clicked on the Card
cards.forEach((card_, index) => {
    let newIndex = index + 1
    card_.style.setProperty("--index", newIndex % 2 == 0 ? -newIndex : newIndex)
    card_.setAttribute("data-index", index)
    card_.addEventListener("mousedown", (e) => {
        moving = true
        card_.style.transformOrigin = e.clientX + ", " + e.clientY
        offsetX = e.clientX - card_.getBoundingClientRect().left
        offsetY = e.clientY - card_.getBoundingClientRect().top

        card_.classList.toggle("active")
        card_.style.cursor = "grabbing"
        card_.style.zIndex = lastZindex

        prevX = e.clientX
        prevTime = Date.now()

        card = card_
    })
})

// When Mouse starts moving
document.addEventListener("mousemove", (e) => {
    if (!moving) return
    card.style.top = e.clientY - offsetY + "px"
    card.style.left = e.clientX - offsetX + "px"

    const currentTime = Date.now()
    const deltaTime = currentTime - prevTime
    const deltaX = e.clientX - prevX
    const velocity = Math.abs(deltaX / deltaTime)
    const maxTilt = 20
    const tiltAngle = Math.min(velocity * maxTilt, maxTilt)

    if (deltaX > 0) card.style.transform = `rotate(${tiltAngle}deg)`
    else card.style.transform = `rotate(-${tiltAngle}deg)`

    prevX = e.clientX
    prevTime = currentTime
})

document.onmouseup = () => {
    moving = false
    if (card) {
        card.classList.toggle("active")
        card.style.cursor = "grab"
        card.style.transform = "none"
        // card.style.zIndex = ++lastZindex

        // if (lastZindex > 1000) {
        //     lastZindex = 1
        // }
        ++lastZindex
        if (lastZindex > 1000) {
            lastZindex = 1
        }
    }
}
