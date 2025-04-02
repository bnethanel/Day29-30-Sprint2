'use strict'

function goToEditor() {
    document.querySelector('.image-gallery').style.display = ('none')
    document.querySelector('.meme-editor').style.display = ('grid')
}

function goToGallery() {
    document.querySelector('.meme-editor').style.display = ('none')
    document.querySelector('.image-gallery').style.display = ('flex')
    renderGallery()
}