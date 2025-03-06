const getLevelAndXpNeeded = (currentXp: number) => {
	// Prevent negative XP
	currentXp = Math.max(0, currentXp);

	// Base XP needed for each level
	const baseXP = 20;
	const level = Math.floor(currentXp / baseXP) + 1;

	// Calculate XP for current level
	const xpStartOfLevel = (level - 1) * baseXP;
	const xpInCurrentLevel = currentXp - xpStartOfLevel;
	const xpNeeded = baseXP;

	return {
		level,
		xpNeeded,
		xpInCurrentLevel,
		xpForNextLevel: xpNeeded
	};
};

export default getLevelAndXpNeeded;
export { getLevelAndXpNeeded };
