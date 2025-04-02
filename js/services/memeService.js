var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics']},
    { id: 2, url: 'img/2.jpg', keywords: ['dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat'] }
]
var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I sometimes eat Falafel',
 size: 20,
 color: 'red'
 }
 ]
}
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

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