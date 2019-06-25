
function setBattleTurnSequence(scene) {

    /* PLAYERS */
        scene.Players.stack.events.onStart = (item, c) => {
            // on start turn
            // console debug
            //console.log("start player turn", item.name, item);

            // const menu = scene.Menus.build("Fight", item);
            // scene.Menus.load(menu);
            // scene.Menus.selectedMenu.init(() => {});

            // const {x, y, displayWidth, displayHeight} = item.Sprite;
            // const options = {x, y: y - displayHeight / 2};
            // item.indicator = scene.stores.BattleObjects.create("PlayerIndicator", options);

            c();
            return item;
        };

        scene.Players.stack.events.onRemove = (item, c) => {
            // on end turn
            // console debug
            //console.log("end player turn", item.name)

            // if (item.indicator) {
            //     item.indicator.destroy();
            // }
            item.Turn.reset();
            //scene.Menus.forEach(menu => scene.Menus.unload());
            c();
            return item;
        };

        scene.Players.stack.events.onResolve = (item, c) => {
            // onstart
            // console debug
            //console.log("compute action for", item.name);
            item.onSelectedTargets = c;
            //scene.Menus.forEach(menu => scene.Menus.unload());
            return item;
        };
    /**/


    /* ENEMIES */
        scene.Enemies.stack.events.onStart = (item, c) => {
            // on start turn
            // console debug
            console.log("start enemy turn", item.name, name);
            c();
            return item;
        };
        
        scene.Enemies.stack.events.onRemove = (item, c) => {
            // on end turn
            // console debug
            console.log("end enemy turn", item.name)
            
            scene.turnExecutionQueue.add(item, undefined, undefined, (item, next) => {
                // console debug
                console.log("checked if dead")
                scene.turnExecutionQueue.events.onRemove(item, () => { 
                    // console debug
                    console.log("reset turn");
                    item.Turn.reset();
                    next();
                    c();
                });
            });

            return false;
        };


        scene.Enemies.stack.events.onResolve = (item, c) => {
            // onstart
            // console debug
            console.log("compute action for", item.name);

            item.AI(scene, item, () => {
                // console debug
                console.log("executing ai for", item.name)
                c();
            });
            return item;
        };
    /**/



    /* ACTIONS */
        scene.turnExecutionQueue.events.onStart = (item, next) => {
            // onstart
            // console debug
            console.log("build action of", item.name);
            
            // check if the actor has died
            // const executor = scene.findActorById(item.id);
            // if (!executor) {
            //     item.executingAction = false;
            //     next();
            //     return false;
            // }

            /*
            // this must be done by the action itself
            const target = scene.findActorById(item.executingAction.target);
            if (!target) {
                item.executingAction = false;
                next();
                return false;
            }
            /**/

            next();
            return item;
        };

        scene.turnExecutionQueue.events.onResolve = (item, next) => {
            // onresolve
            // console debug
            console.log("resolve action of", item.name);

            // checks
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //console.log("check if actor is dead")
            //item.executingAction.resolve(next);
            next();
            return item;
        };

        scene.turnExecutionQueue.events.onRemove = (item, next) => {
            // onremove
            // console debug
            console.log("end action of", item.name);
            item.executingAction = false;

            next();
            return item;
        };
    /**/
};


export default setBattleTurnSequence;