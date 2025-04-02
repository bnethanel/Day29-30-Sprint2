'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.image-gallery')

    const strHTMLs = gImgs.map(img => {
        return `<img src="${img.url}" class="gallery-img" onclick="onImgSelect(${img.id})">`
    })

    elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    resetMemeLines()
    renderMeme()
    goToEditor()
}
