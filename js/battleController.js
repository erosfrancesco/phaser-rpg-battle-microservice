// DEFAULTS
const defaultOnGameOver = scene => {
    // console debug
    console.log("Game over!");
    scene.pause();
};
const defaultOnGameWin = scene => {
    // console debug
    console.log("Game win!");
    scene.pause();
};


function buildBattleController(scene, onGameWin = defaultOnGameWin, onGameOver = defaultOnGameOver) {

    scene.events = { onGameWin, onGameOver };

    scene.battleUpdate = c => scene.checkLose(() => scene.checkWin(c) );
    scene.checkWin  = c => scene.Enemies.size() ? c() : scene.events.onGameWin(scene);
    scene.checkLose = c => scene.Players.size() ? c() : scene.events.onGameOver(scene);

    scene.pause = () => scene.scene.pause();
    scene.resume = () => scene.scene.resume();

    scene.findActorById = id => {
        const actor = scene.Players.find(a => a.id === id);
        if (!actor) {
            return scene.Enemies.find(a => a.id === id);
        }
        return actor;
    }
}


export default buildBattleController;