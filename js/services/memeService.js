var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['cat'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Write Your Input',
            size: 30,
            color: 'white',
            font: 'impact',
            align: 'center'
        },
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    return txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function switchLines() {
    gMeme.selectedLineIdx >= gMeme.lines.length - 1 ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx++
}

function addLines() {
    const newLine = {
        txt: 'Add input',
        size: 30,
        color: 'white',
        font: 'impact',
        align: 'center'
        
    }

    gMeme.lines.push(newLine)
}

function resetMemeLines() {
    gMeme.lines = [
        {
            txt: 'Add input',
            size: 30,
            color: 'white',
            font: 'impact',
            align: 'center'
        }
    ]
    gMeme.selectedLineIdx = 0
}

function syncEditorInputs() {
    const line = getMeme().lines[getMeme().selectedLineIdx]
    document.querySelector('input[type="text"]').value = line.txt
    document.getElementById('color-picker').value = rgbToHex(line.color)
}

function rgbToHex(color) {
    const ctx = document.createElement('canvas').getContext('2d')
    ctx.fillStyle = color
    return ctx.fillStyle 
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setAlign(align) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.align = align

    if (align === 'left') line.x = 20
    else if (align === 'right') line.x = gElCanvas.width - 20
    else line.x = gElCanvas.width / 2
}

function deleteSelectedLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function moveLine(dy) {
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}