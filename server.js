const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const client = new Discord.Client();

const PREFIX = '!';
client.login('TOKEN');

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
        case "k":
        case "kulo_zgadulo_czy":
            /*request({
                method: 'GET',
                url: 'http://pro.nets.pl/ramka.php?ciach=ciach&ilosc=13&odp1=Tak&odp2=Nie&odp3=Nie%20wiem&odp4=Raczej%20nie&odp5=Pewnie,%20%C5%BCe%20tak&odp6=Przemy%C5%9Bl%20to%20jeszcze&odp7=Zr%C3%B3b%20to!&odp8=Zapomnij%20o%20tym&odp9=Uda%20Ci%20si%C4%99&odp10=Nie%20r%C3%B3b%20tego&odp11=Zaryzykuj!%20Raz%20sie%20%C5%BCyje&odp12=Id%C5%BA%20na%20ca%C5%82o%C5%9B%C4%87!&odp13=Zapytaj%20ponownie%20p%C3%B3%C5%BAniej'
            }, (err, res, body) => {
                    if (err) return console.error(err);
                    let $ = cheerio.load(body);
                    let title = $('font');
                    message.reply(` ${title.text().replace(/(\r\n|\n|\r)/gm, "").substring(4).toLowerCase()}`);
                    console.log(`Kula zgadula odpowiedziala ${title.text().replace(/(\r\n|\n|\r)/gm, "").substring(4).toLowerCase()}`);
            });*/
            let answ = ['mój wywiad donosi: NIE', 'wygląda dobrze', 'kto wie?', 'zapomnij o tym', 'tak - w swoim czasie', 'prawie jak tak', 'nie teraz', 'to musi poczekać', 'mam pewne wątpliwości', 'możesz na to liczyć', 'zbyt wcześnie aby powiedzieć', 'daj spokój', 'absolutnie', 'chyba żatrujesz?', 'na pewno nie', 'zrób to', 'prawdopodobnie', 'dla mnie rewelacja', 'na pewno tak'];
            min = Math.ceil(0);
            max = Math.floor(18);
            val = Math.floor(Math.random() * (max - min)) + min;
            message.reply(`${answ[val]}`);
            console.log(`Kula zgadula odpowiedziala ${answ[val]}`);
            break;
        default:
            message.reply(`komenda ${command[0]} nie istenieje. Dostepne komendy:\n\t1. !p lub !play [link] - odtwarza piosenke z linku.\n\t2. !pid lub !playid [id] - odtwarza piosenke z youtube po id.\n\t3. !s lub !stop - zatrzymuje odtwarzanie piosenki.\n\t4. !e lub !search [slowa kluczowe] - wyszukuje piosenke z youtube po tytule.\n\t5. !l lub !list [slowa kluczowe] - wyszukuje piosenke z youtube po tytule i wyswietla jej pelny tytul oraz id.\n\t6. !k lub !kulo_zgadulo_czy [dowolny teskt] - niech zadecyduje los!`);
            console.log("Bledna komenda.");
            break;
    }
});
