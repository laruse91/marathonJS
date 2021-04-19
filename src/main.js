import Pokemon from './Pokemon.js';
import random from './utils.js';

class Game {
//buttons
    control = document.querySelector('.control');
    logArea = document.querySelector('.log')
//methods
    getPokemon = async (id) => {
        const response = await fetch(
            'https://reactmarathon-api.netlify.app/api/pokemons?random=true',
        );
        const pokemon = await response.json()
        if (pokemon.id === id) await this.getPokemon(id)
        return pokemon
    };
    kick = async (player1Id, player2Id, attackId) => {
        const response = await fetch(
            `https://reactmarathon-api.netlify.app/api/fight?player1id=${player1Id}&attackId=${attackId}&player2id=${player2Id}`,
        );
        return await response.json()
    }
    writeLog = (log) => {
        const p = document.createElement('p')
        p.innerText = log
        this.logArea.insertBefore(p, this.logArea.children[0])
    }
    removePrevGame = () => {
        const attacks = document.querySelectorAll('.control .button')
        const logs = document.querySelectorAll('.log p')

        attacks && attacks.forEach(btn => btn.remove())
        logs && logs.forEach(log => log.remove())
    }
    freezeAttacks = ()=>{
        document.querySelectorAll('.control .button').forEach(btn => btn.disabled = true)
    }
    start = async () => {
        this.removePrevGame()

        const player1 = new Pokemon({
            ...await this.getPokemon(null),
            selector: 'character',
        });
        const player2 = new Pokemon({
            ...await this.getPokemon(player1.id),
            selector: 'enemy',
        });
//create attack buttons
        player1.attacks.forEach(i => {
            const btn = document.createElement('button');
            btn.classList.add('button');
            btn.innerText = i.name;
            const btnCount = countBtn(i.maxCount, btn);

            btn.addEventListener('click', () => {
                btnCount();
                this.kick(player1.id, player2.id, i.id).then(res => {
                    const {kick: {player1: damage1, player2: damage2}} = res
                    player1.changeHP(damage1)
                    player2.changeHP(damage2)
                    this.writeLog(generateLog(player1, player2, damage1))

                    player1.hp.current === 0 || player2.hp.current === 0 && this.freezeAttacks()
                })
            });

            this.control.appendChild(btn);
        });

        function countBtn(count, el) {
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
            const {name, hp: {current, total}} = firstHero;
            const {name: enemyName} = secondHero;
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
            if (secondHero.hp.current === 0) return 'YOU WON'
            if (current === 0) return 'GAME OVER'
            return logs[random(logs.length - 1)];
        }
    }

}

const start = document.querySelector('#start')
const game = new Game();
start.addEventListener('click', () =>game.start())
