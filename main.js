import Pokemon from './Pokemon.js';
import random from './utils.js';

class Game {
  getRandomPokemon = async () => {
    const response = await fetch(
      'https://reactmarathon-api.netlify.app/api/pokemons?random=true',
    );
    const data = await response.json();
    return data;
  };

  start = async () => {
    const hero = await this.getRandomPokemon();
    const enemy = await this.getRandomPokemon();

    const player1 = new Pokemon({
      ...hero,
      selector: 'character',
    });

    const player2 = new Pokemon({
      ...enemy,
      selector: 'enemy',
    });

    const control = document.querySelector('.control');

    player1.attacks.forEach(i => {
      const btn = document.createElement('button');
      btn.classList.add('button');
      btn.innerText = i.name;
      const btnCount = countBtn(i.maxCount, btn);

      btn.addEventListener('click', () => {
        btnCount();
      });
      console.log(btn);

      control.appendChild(btn);
    });

    function countBtn(count = 6, el) {
      const innerText = el.innerText;
      el.innerText = `${innerText} (${count})`;

      return function () {
        count--;
        if (count === 0) {
          el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
      };
    }

    function generateLog(firstHero, secondHero, count) {
      const {
        name,
        hp: { current, total },
      } = firstHero;
      const { name: enemyName } = secondHero;

      const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${current}/${total}]`,
        `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${current}/${total}]`,
        `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}, [${current}/${total}]`,
        `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. -${count}, [${current}/${total}]`,
        `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. -${count}, [${current}/${total}]`,
        `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника -${count}, [${current}/${total}]`,
        `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. -${count}, [${current}/${total}]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. -${count}, [${current}/${total}]`,
      ];

      return logs[random(logs.length - 1)];
    }
  };
}

const game = new Game();
game.start();
