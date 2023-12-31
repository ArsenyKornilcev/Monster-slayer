function getRandomValue(max, min) {
	return Math.floor(Math.random() * (max - min) + min);
}

const app = {
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
			winner: null,
			logMessages: [],
		};
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
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				this.winner = "draw";
			} else if (value <= 0) {
				this.winner = "monster";
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				this.winner = "draw";
			} else if (value <= 0) {
				this.winner = "player";
			}
		},
	},
	methods: {
		attackMonster() {
			const attackValue = getRandomValue(5, 12);
			this.monsterHealth -= attackValue;
			this.increaseRound();
			this.addLogMessage("Player", "attack", attackValue);
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15);
			this.playerHealth -= attackValue;
			this.addLogMessage("Monster", "attack", attackValue);
		},
		specialAttackMonster() {
			const attackValue = getRandomValue(10, 25);
			this.monsterHealth -= attackValue;
			this.increaseRound();
			this.addLogMessage("Player", "special attack", attackValue);
		},
		healPlayer() {
			const healValue = getRandomValue(9, 20);
			if (healValue + this.playerHealth >= 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healValue;
			}
			this.increaseRound();
			this.addLogMessage("Player", "heal", healValue);
		},
		increaseRound() {
			this.currentRound++;
			this.attackPlayer();
		},
		startGame() {
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.currentRound = 0;
			this.winner = null;
		},
		surrender() {
			this.winner = "monster";
			this.logMessages = [];
		},
		addLogMessage(who, what, value) {
			this.logMessages.unshift({
				who: who,
				what: what,
				value: value,
			});
		},
	},
};

Vue.createApp(app).mount("#game");
