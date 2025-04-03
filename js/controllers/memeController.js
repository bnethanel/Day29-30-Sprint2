'use strict'

let gElCanvas
let gCtx
let gLastPos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderCanvas()
    renderMeme()
    gElCanvas.addEventListener('click', onMarkLine)

}

function renderMeme() {
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = imgData.url

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px Impact`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.textAlign = 'center'
            gCtx.lineWidth = 1

            const x = gElCanvas.width / 2
            const y = 50 + idx * 50

            line.x = x
            line.y = y
            line.width = gCtx.measureText(line.txt).width
            line.height = line.size


            gCtx.fillText(line.txt, x, y)
            gCtx.strokeText(line.txt, x, y)


            if (idx === meme.selectedLineIdx) {
                const textWidth = gCtx.measureText(line.txt).width
                const padding = 10
                const height = line.size + 10

                gCtx.strokeStyle = 'red'
                gCtx.lineWidth = 2
                gCtx.strokeRect(
                    x - textWidth / 2 - padding,
                    y - line.size,
                    textWidth + padding * 2,
                    height
                )

            }
        })
    }
}

function onMarkLine(ev) {
    const { offsetX, offsetY } = ev

    const meme = getMeme()

    const clickedLine = meme.lines.find((line) => {
        const xStart = line.x - line.width / 2
        const xEnd = line.x + line.width / 2
        const yTop = line.y - line.height
        const yBottom = line.y

        return (
            offsetX >= xStart &&
            offsetX <= xEnd &&
            offsetY >= yTop &&
            offsetY <= yBottom
        )
    })

    if (clickedLine) {
        gMeme.selectedLineIdx = meme.lines.indexOf(clickedLine)
        syncEditorInputs()
        renderMeme()
    }
}



function renderCanvas() {

    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderCanvas()
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderCanvas()
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onSwitchLines() {
    switchLines()
    renderMeme()
    syncEditorInputs()
}

function onAddLines() {
    addLines()
    renderMeme()
}