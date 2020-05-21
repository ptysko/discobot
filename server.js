const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const client = new Discord.Client();

const PREFIX = '!';
client.login('token');

client.on('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}`);
});

client.on('message', async message => {
    if (!message.guild) return;
    if (!message.content.startsWith(PREFIX)) return;

    var command = message.content.substring(PREFIX.length).split(' ');
    console.log(command);
    switch (command[0]) {
        case "p":
        case "play":
            var url = command[1];
            if (!url) {
                message.reply("podaj link do piosenki!");
                console.log("Nie podano linku do piosenki.");
            }
            else if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.play(ytdl(url, { filter: 'audioonly' }));
                console.log(`Odtwarzanie ${url}.`);
            } else {
                message.reply("najpierw wbij na kanal glosowy!");
                console.log("Uzytkownik nie byl w kanale glosowym.");
            }
            break;
        case "s":
        case "stop":
            try {
                const connection = await message.member.voice.channel.leave();
                console.log("Zatrzymano odtwarzanie piosenki. Bot opuscil kanal glosowy.");
            } catch (e) {
                console.log("Uzytkownik nie byl w kanale glosowym.");
            }
            break;
        case "e":
        case "search":
            var kw = command.slice(1, command.length).join(' ');
            if (!kw) {
                message.reply("podaj co chcesz wyszukac!");
                console.log("Nie podano slow kluczowych.");
            }
            else {
                var video = await yts(kw);
                var url = video.videos[0]["url"];
                console.log(`Z slow kluczowych ${kw} znaleziono filmik ${url}`);
                if (!url) {
                    message.reply("nie znalazlem takiej piosenki.");
                    console.log("Nie znaleziono piosenki.");
                }
                else if (message.member.voice.channel) {
                    const connection = await message.member.voice.channel.join();
                    connection.play(ytdl(url, { filter: 'audioonly' }));
                    message.reply(`znalazlem piosenke ${url}. Dobrej zabawy!`);
                    console.log(`Znaleziono ${url}`);
                }
                else {
                    message.reply("najpierw wbij na kanal glosowy!");
                    console.log("Uzytkownik nie byl w kanale glosowym.");
                }
            }
            break;
        case "l":
        case "list":
            var kw = command.slice(1, command.length).join(' ');
            if (!kw) {
                message.reply("podaj co chcesz wyszukac!");
                console.log("Nie podano slow kluczowych.");
            }
            else {
                var video = await yts(kw);
                if (!video) {
                    message.reply("nic nie znalazlem.");
                    console.log("Nie znaleziono piosenki.");
                }
                else {
                    message.reply(`znalazlem:\n1. ${video.videos[0]["title"]}\n^id: ${video.videos[0]["videoId"]}\n2. ${video.videos[1]["title"]}\n^id: ${video.videos[1]["videoId"]}\n3. ${video.videos[2]["title"]}\n^id: ${video.videos[2]["videoId"]}\n4. ${video.videos[3]["title"]}\n^id: ${video.videos[3]["videoId"]}`);
                    console.log(`Znaleziono:\n1. ${video.videos[0]["title"]}\n^id: ${video.videos[0]["videoId"]}\n2. ${video.videos[1]["title"]}\n^id: ${video.videos[1]["videoId"]}\n3. ${video.videos[2]["title"]}\n^id: ${video.videos[2]["videoId"]}\n4. ${video.videos[3]["title"]}\n^id: ${video.videos[3]["videoId"]}`);
                }
            }
            break;
        case "pid":
        case "playid":
            var url = "https://www.youtube.com/watch?v=" + command[1];
            if (!url) {
                message.reply("podaj id piosenki!");
                console.log("Nie podano id piosenki.");
            }
            else if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.play(ytdl(url, { filter: 'audioonly' }));
                message.reply(`odtwarzam piosenke ${url}. Dobrej zabawy!`);
                console.log(`Odtwarzanie ${url}.`);
            } else {
                message.reply("najpierw wbij na kanal glosowy!");
                console.log("Uzytkownik nie byl w kanale glosowym.");
            }
            break;
        case "s":
        case "stop":
            try {
                const connection = await message.member.voice.channel.leave();
                console.log("Zatrzymano odtwarzanie piosenki. Bot opuscil kanal glosowy.");
            } catch (e) {
                console.log("Uzytkownik nie byl w kanale glosowym.");
            }
            break;
        default:
            message.reply(`komenda ${command[0]} nie istenieje. Dostepne komendy:\n     1. !p lub !play [link] - odtwarza piosenke z linku.\n     2. !pid lub !playid [id] - odtwarza piosenke z youtube po id.\n     3. !s lub !stop - zatrzymuje odtwarzanie piosenki.\n     4. !e lub !search [slowa kluczowe] - wyszukuje piosenke z youtube po tytule.\n     5. !l lub !list [slowa kluczowe] - wyszukuje piosenke z youtube po tytule i wyswietla jej pelny tytul oraz id.`);
            console.log("Bledna komenda.");
            break;
    }
});
