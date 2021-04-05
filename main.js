const btn = document.getElementById('btn-kick')

const random = (num) => {
    return Math.ceil(Math.random() * num)
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character')
}
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy')
}

const renderHPLife = (hero) => {
    hero.elHP.innerText = `${hero.damageHP}/${hero.defaultHP}`
}
const renderProgressBar = (hero) => {
    hero.elProgressBar.style.width = hero.damageHP + '%'
}
const renderHP = (hero) => {
    renderHPLife(hero)
    renderProgressBar(hero)
}

const changeHP = (count, hero) => {
    if (hero.damageHP<count) {
        hero.damageHP = 0
        alert(`${hero.name} проиграл`)
        btn.disabled = true
    } else {
        hero.damageHP -= count

    }
    renderHP(hero)
}

btn.addEventListener('click', () => {
    changeHP(random(20), enemy)
    changeHP(random(20), character)
    console.log('kick')
})

const init = () => {
    console.log('start game')
    renderHP(character)
    renderHP(enemy)
}


init()