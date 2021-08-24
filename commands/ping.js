// const i = 3;

// module.exports = {
   // i,
   // a: 4
// }

const command = {
    name: 'ping',
    description: 'pings this butt',
    syntax: "k!ping",
    // async will allow us to use the await keyword
    execute: async function(message, args) {
        // use try and catch to deal w smthn that returns a promise
        try {
            const message = await message.channel.send('pong');
            console.log(message.content); // logs content of msg (which is pong)
            console.log(message.channel.name); // logs name of channel
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = command

//module.exports = {
    //the stuff
//}