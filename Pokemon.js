class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
        this.elName = document.getElementById(`name-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({name, type, hp, id, selector, attacks, img}) {
        super(selector);

        this.name = name;
        this.id = id;
        this.type = type;
        this.hp = {current: hp, total: hp};
        this.attacks = attacks;
        this.img = img;

        this.renderPokemon();
        this.renderHP();
    }

    renderPokemon = () => {
        const {elImg, elName, img, name} = this;
        elImg.src = img;
        elName.innerText = name;
    };

    changeHP = (count, callback) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
            alert(`${this.name} проиграл`);
        }
        this.renderHP();
        callback && callback(count);
    };
    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBar();
    };
    renderHPLife = () => {
        const {elHP, hp: {current, total}} = this;
        elHP.innerText = current + '/' + total;
    };
    renderProgressBar = () => {
        const {elProgressbar, hp: {current, total}} = this;
        const percent = current / (total / 100);

        const bar = document.querySelectorAll('.health')
        if (percent > 60) bar.forEach(b=> {
            b.classList.remove('low')
            b.classList.remove('critical')
        })
        if (percent <= 60) bar.forEach(b=>b.classList.add('low'))
        if (percent <= 20 ) bar.forEach(b=>b.classList.add('critical'))

        elProgressbar.style.width = percent + '%';
    };
}

export default Pokemon;
