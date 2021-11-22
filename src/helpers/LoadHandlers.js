const { readdirSync } = require('fs');

class LoadHandlers {
    constructor(client) {
        this.client = client;
    }

    event() {
        readdirSync("./src/events/").forEach(dir => {
            const events = readdirSync(`./src/events/${dir}`).filter(file => file.endsWith('.js'));

            for (const file of events) {
                let ent = require(`../events/${dir}/${file}`),
                    eName = file.split(".")[0];
                console.log(`EVENT: ${eName}`);
                this.client.on(eName, ent.bind(null, this.client))
            }
        })
    }

    ready() {
        return this.event();
    }
}

module.exports = LoadHandlers