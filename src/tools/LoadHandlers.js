const { readdirSync } = require('fs'),
    chalk = require('chalk'),
    { settings } = require('../../config.json')

class LoadHandlers {
    constructor(client) {
        this.client = client;
        this.commands = [];
    }

    event() {
        readdirSync('./src/events/').forEach(dir => {
            const events = readdirSync(`./src/events/${dir}`).filter(file => file.endsWith('.js'));

            for (const file of events) {
                try {
                    let ent = require(`../events/${dir}/${file}`),
                        eName = file.split('.')[0];
                    console.log(`${chalk.hex('#32B76C')('EVENT')} ${eName}`);
                    this.client.on(eName, ent.bind(null, this.client))
                } catch (e) {
                    console.log(e);
                }
            }
        })
    }

    slash() {
        const slashs = readdirSync(`./src/commands/`).filter(file => file.endsWith('.js'));
        for (const file of slashs) {
            let pull = require(`../commands/${file}`);
            if (pull.name) {
                this.client.commands.set(pull.name, pull);
                console.log(`${chalk.hex('#32B76C')('COMMAND')} ${file}`);
                this.commands.push(pull);
            } else {
                console.log(`${chalk.hex('#AF0007')('ERROR COMMAND')} ${file}`);
            }
        }
    }

    ready() {
        this.event();
        this.slash();
        return this.client.on('ready', () => this.client.guilds.cache.get(settings.guild).commands.set(this.commands))
    }
}

module.exports = LoadHandlers