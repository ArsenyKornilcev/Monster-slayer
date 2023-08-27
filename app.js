function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = {
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
		};
	},
	methods: {
		attackMonster() {
			this.currentRound++;
			const attackValue = getRandomValue(5, 12);
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15);
			this.playerHealth -= attackValue;
		},
		specialAttackMonster() {
			this.currentRound++;
			const attackValue = getRandomValue(10, 25);
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		healPlayer() {
			this.currentRound++;
			const healValue = getRandomValue(9, 20);
            if(healValue + this.playerHealth >= 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
		},
	},
	computed: {
		monsterBarStyles() {
			return {
				width: this.monsterHealth < 0 ? 0 : this.monsterHealth + "%",
			};
		},
		playerBarStyles() {
			return {
				width: this.playerHealth < 0 ? 0 : this.playerHealth + "%",
			};
		},
		mayUsedSpecialAttack() {
			return this.currentRound % 3 !== 0;
		},
	},
};

Vue.createApp(app).mount('#game');