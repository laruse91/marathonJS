const btn = document.getElementById('btn-kick')

function getElById(id) {
    return document.getElementById(id)
}

const random = (num) => {
    return Math.ceil(Math.random() * num)
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: getElById('health-character'),
    elProgressBar: getElById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBar: renderProgressBar
}
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: getElById('health-enemy'),
    elProgressBar: getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBar: renderProgressBar
}

function renderHPLife() {
    this.elHP.innerText = `${this.damageHP}/${this.defaultHP}`
}
function renderProgressBar() {
    this.elProgressBar.style.width = this.damageHP + '%'
}
function changeHP(count) {
    this.damageHP -= count
    if (this.damageHP <= 0) {
        this.damageHP = 0
        alert(`${this.name} проиграл`)
        btn.disabled = true
    }
    this.renderHP()
}

function renderHP() {
    this.renderHPLife()
    this.renderProgressBar()
}

btn.addEventListener('click', () => {
    enemy.changeHP(random(20))
    character.changeHP(random(20))
    console.log('kick')
})
const init = () => {
    console.log('start game')
    character.renderHP()
    enemy.renderHP()
}


init()