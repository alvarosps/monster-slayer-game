const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            round: 0,
            winner: null,
            logs: []
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }
            return {
                width: this.monsterHealth + '%'
            }
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return {
                width: this.playerHealth + '%'
            }
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
                this.addLogMessage("It's", 'a draw!');
            } else if (value <= 0) {
                this.winner = 'monster';
                this.addLogMessage('Monster', 'won!')
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
                this.addLogMessage("It's", 'a draw!');
            } else if (value <= 0) {
                this.winner = 'player';
                this.addLogMessage('You', 'won!');
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.logs = [];
        },
        attackMonster() {
            const damage = getRandomNumber(5,12);

            this.monsterHealth -= damage;
            this.addLogMessage('Player', 'attacked', damage);

            this.attackPlayer();
            this.round++;
        },
        attackPlayer() {
            const damage = getRandomNumber(8,15);
            this.playerHealth -= damage;
            this.addLogMessage('Monster', 'attacked', damage);
        },
        specialAttackMonster() {
            const damage = getRandomNumber(10,25);
            this.monsterHealth -= damage;
            this.addLogMessage('Player', 'used Special Attack', damage);

            this.attackPlayer();

            this.round++;
        },
        healPlayer() {
            const healValue = getRandomNumber(8,20);
            if (this.playerHealth + healValue > 100) this.playerHealth = 100;
            else this.playerHealth += healValue;

            this.addLogMessage('Player', 'healed', healValue);

            this.attackPlayer();

            this.round++;
        },
        addLogMessage(who, what, value) {
            if (value !== undefined) this.logs.unshift(who + ' ' + what + ' for ' + value);
            else this.logs.unshift(who + ' ' + what);
        },
        surrender() {
            this.winner = 'monster';
            this.addLogMessage('You', 'surrendered');
        }
    }
});

app.mount('#game')