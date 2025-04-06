'use strict'

let gElCanvas
let gCtx
let gLastPos
let gIsDownload = false

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    goToEditor()
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
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.textAlign = line.align
            gCtx.lineWidth = 1

            const x = line.x || gElCanvas.width / 2
            const y = line.y ?? 50 + idx * 50

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

                let boxX
                if (line.align === 'left') {
                    boxX = x
                } else if (line.align === 'center') {
                    boxX = x - textWidth / 2
                } else if (line.align === 'right') {
                    boxX = x - textWidth
                }

                if (!gIsDownload) {
                    gCtx.strokeStyle = 'lightblue'
                }   else {
                    gCtx.strokeStyle = 'transparent'
                }
                gCtx.lineWidth = 2
                gCtx.strokeRect(
                    boxX - padding,
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

    const clickedLine = meme.lines.find(line => {
        let xStart, xEnd

        if (line.align === 'left') {
            xStart = line.x
            xEnd = line.x + line.width
        } else if (line.align === 'center') {
            xStart = line.x - line.width / 2
            xEnd = line.x + line.width / 2
        } else if (line.align === 'right') {
            xStart = line.x - line.width
            xEnd = line.x
        }

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
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    const size = elContainer.offsetWidth
    gElCanvas.width = size
    gElCanvas.height = size
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

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onSetAlign(align) {
    setAlign(align)
    renderMeme()
}

function onDeleteLine() {
    deleteSelectedLine()
    renderMeme()
    syncEditorInputs()
}

function onMoveLine(dy) {
    moveLine(dy)
    renderMeme()
}

function onDownloadMeme() {
    gIsDownload = true
    renderMeme()
    setTimeout(() => {
        const dataUrl = gElCanvas.toDataURL('image/jpeg')
        const elLink = document.getElementById('download-link')
        elLink.href = dataUrl

        gIsDownload = false
        renderMeme()
        elLink.click()
    }, 1000) 

}