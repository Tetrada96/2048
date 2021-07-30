let heading = document.querySelector('.play__heading')
let score = document.querySelector('.play__score')
let wrapper = document.querySelector('.play__wrapper')
let miniWrapper = document.querySelector('.play__mini-wrapper')
let button = document.querySelector('.play__button')
let direction = document.querySelector('.play__direction')
let up = document.querySelector('.play__direction-up')
let right = document.querySelector('.play__direction-right')
let down = document.querySelector('.play__direction-down')
let left = document.querySelector('.play__direction-left')


button.addEventListener('click', startGame, {once: true})


function able(el) {
    el.setAttribute('disabled', 'true')
}
function disable(el) {
    el.setAttribute('disabled', 'false')
}

function show(el) {
    el.classList.remove('hide')
}

function hide(el) {
    el.classList.add('hide')

}

function startGame() {
    able(direction)
    hide(heading)
    miniWrapper.innerHTML = ''
    show(score)
    button.textContent = 'Закончить игру'
    createSquare()
    show(direction)
    
}

function createSquare() {
    if (miniWrapper.getElementsByClassName('play__number').length < 16) {
        let leftNum = [0, 100, 200 ,300]
        let number = [2, 4, 8]
        let rand = Math.floor(Math.random() * leftNum.length)
        let randContent = Math.floor(Math.random() * number.length)
        let box = document.createElement('div')

        box.style.height = box.style.width = 100 +'px'
        box.style.position = 'absolute'
        box.style.left = leftNum[rand] + 'px'
        box.style.top = leftNum[rand] + 'px'
        box.textContent = number[randContent]
        box.classList.add('play__number') 
        miniWrapper.insertAdjacentElement('afterbegin', box)
        button.addEventListener('click', endGame)
        moveSquare()} else endGame()    
}

function moveSquare() {
    let box = document.querySelectorAll('.play__number')
    
    up.addEventListener('click', function Up(event) {
        event.stopPropagation();
        for(let i=0; i<box.length;i++) {
            box[i].style.top = 0}
        console.log(event.currentTarget)
        createSquare()
        up.removeEventListener('click', Up);
    }, {once: true})
    
    right.addEventListener('click', function Right(event) {
        event.stopPropagation();
        for(let i=0; i<box.length;i++) {
            box[i].style.left = 300 +'px'}
        console.log(event.currentTarget)
        createSquare()  
        right.removeEventListener('click', Right);
    }, {once: true})
    down.addEventListener('click', function Down(event) {
        event.stopPropagation();
        for(let i=0; i<box.length;i++) {
            box[i].style.top = 300 + 'px'}
        console.log(event.currentTarget)
        createSquare()
        down.removeEventListener('click', Down);
    }, {once: true})
    left.addEventListener('click', function Left(event) {
        event.stopPropagation();
        for(let i=0; i<box.length;i++) {
            box[i].style.left = 0}
        console.log(event.currentTarget)
        createSquare()
        left.removeEventListener('click', Left);
    }, {once: true})
    
    
}


function endGame() {
    button.textContent = 'Начать игру'
    hide(direction)
    miniWrapper.innerHTML = ''
    show(heading)
    button.addEventListener('click', startGame, {once: true})
}





