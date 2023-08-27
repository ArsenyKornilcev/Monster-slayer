function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = {
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
		};
	},
	methods: {
		attackMonster() {
			const attackValue = getRandomValue(5, 12);
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15);
			this.playerHealth -= attackValue;
		},
	},
	computed: {
		monsterBarStyles() {
			return { width: this.monsterHealth + "%" };
		},
		playerBarStyles() {
			return { width: this.playerHealth + "%" };
		},
	},
};

Vue.createApp(app).mount('#game');