import MagicMenu from "./magicMenu.js";

export default class MagicMenuWrapper extends MagicMenu {

    constructor(scene, player) {
        super(scene);
        this.player = player;
    }

    init(callback = () => {}) {
        this.animationOpen(() => {
            this.parseCommands().forEach(command => this.addMenuItem( command ) );
            this.selectedItem.select();
            callback(this);
        });
    }

    parseCommands() {
        const commands = [];
        while(commands.length < 5) {
            const c = [];
            while(c.length < 2) {
                c.push({ label: "", inactive: true })
            }
            commands.push(c);
        }
        /*
        this.player.Commands.forEach(command => {
            // link action to this menu with proper parameters
            command.argArray = [{menu: this, actor: this.player}];
            commands.push(command);
        });

        while (commands.length < 4) {
            commands.splice(2, 0, { label: "", inactive: true });
        }
        /**/

        return commands;
    }
};
