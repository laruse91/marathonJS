class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
    this.elImg = document.getElementById(`img-${name}`);
    this.elName = document.getElementById(`name-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, type, hp, selector, attacks = [], img }) {
    super(selector);

    this.name = name;
    this.type = type;
    this.hp = { current: hp, total: hp };
    this.attacks = attacks;
    this.img = img;

    this.renderPokemon();
    this.renderHP();
  }
  renderPokemon = () => {
    const { elImg, elName, img, name } = this;
    elImg.src = img;
    elName.innerText = name;
  };

  changeHP = (count, callback) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      alert(`${this.name} проиграл`);
      btn.disabled = true;
    }
    this.renderHP();
    callback && callback(count);
  };

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressBar();
  };

  renderHPLife = () => {
    const {
      elHP,
      hp: { current, total },
    } = this;
    elHP.innerText = current + '/' + total;
  };

  renderProgressBar = () => {
    const {
      elProgressbar,
      hp: { current, total },
    } = this;
    const procent = current / (total / 100);

    elProgressbar.style.width = procent + '%';
  };
}
export default Pokemon;
