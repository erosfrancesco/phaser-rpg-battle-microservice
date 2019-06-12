// ATB SYSTEM

const _default_max = 1055;
function ComputeAtbDelta(actor) {
    // ATB Delta computation
    return actor.isAlly() ? ( 2 + actor.getVelocity() ) : ( actor.getVelocity() );
}


function PlayerTurnSystem(actor, inactive = false) {
    this.actor = actor;
    this.max = _default_max;
    this.counter = 0;
    this.inactive = inactive;
    this.computeDelta = ComputeAtbDelta;

    this.events = {
        onReady:  c => c(),
        onUpdate: c => c()
    };

    this.flags = {
        ready: false
    };

    this.update = () => {
        if (this.inactive && this.flags.ready) { 
            return; 
        }

        this.counter += this.computeDelta(this.actor);
        
        if (this.counter >= this.max) { 
            this.counter = this.max;
            this.flags.ready = true;
            this.events.onReady(foo => {});
            return;
        }

            
        this.events.onUpdate(foo => {});
    }

    this.stop = () => {
        this.reset();
        this.pause();
    }

    this.reset = () => {
        this.flags.ready = false;
        this.counter = 0;
    }

    this.pause = () => {
        this.inactive = true;
    }

    this.start = () => {
        this.inactive = false;
    }
};

export default PlayerTurnSystem;