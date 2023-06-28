/*                                                                      MODÜLLER                                                                                   */
const express = require('express');
const app = express()
const Canvas = require('canvas')
const { Database } = require('nukleon')
const tcmbdoviz = require('tcmb-doviz');
const malScraper = require('mal-scraper');
const lyricsFinder = require('lyrics-finder');
const fetch = require('isomorphic-unfetch')
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch)
const axios = require('axios');
const art = require("ascii-art");
const neko = require('nekos-fun')
const animals = require('animals-api');
const imdb = require("name-to-imdb");
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const { Client, GatewayIntentBits, Partials, EmbedBuilder, Colors, version, MessageAttachment} = require("discord.js");
const { translate } = require('@vitalets/google-translate-api');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel],
});
/*                                                                      MODÜLLER                                                                                   */
/*                                                                      TANIMLAR                                                                                   */
const ayarlar = require('./ayarlar.json')
const deneme = require("./main/8ball.json")
const hook = new Webhook(ayarlar.webhook);
hook.setUsername(ayarlar.apiname);
hook.setAvatar(ayarlar.image);
/*                                                                      TANIMLAR                                                                                   */
/*                                                                     EXPRESS API                                                                                 */
app.get('/endpoint', (req, res)=>{
res.sendFile(__dirname + "/index.json")
})
/*                                                                      TRANSLATE                                                                                  */
app.get('/api/translate',async (req, res)=>{
	let lang = req.query.lang
	let txt = req.query.text
	if(!lang) = return res.json({"hata": "Dili girmen lazım!});
	if(!text) = return res.json({"hata": "Yazıyı girmen lazım!});
	const { text } = await translate(txt, { to: lang });
     res.json({
 "translated": text
})
/*                                                                      TRANSLATE                                                                                  */
/*                                                                        DOVİZ                                                                                    */
app.get('/api/currency/',async (req, res)=>{
     res.json({"dolar": "/api/currency/dolar","euro": "/api/currency/euro","sterlin": "/api/currency/sterlin", "all": "/api/currency/all", "search": "/api/currency/search?q="})
    })
app.get('/api/currency/all',async (req, res)=>{
    const data = await tcmbdoviz.getData()
    res.json({data})
    })
app.get('/api/currency/search',async (req, res)=>{
    if(!req.query.q){
        const data = await tcmbdoviz.getData()
    res.json({data})
    } else {
    const exchangeRate = await tcmbdoviz.getExchangeRate(req.query.q)
    res.json({"name": exchangeRate.name, "code": exchangeRate.code, "buying": exchangeRate.buying, "selling": exchangeRate.selling})
        }
    })
app.get('/api/currency/dolar',async (req, res)=>{
    const exchangeRate = await tcmbdoviz.getExchangeRate('USD')
    res.json({"name": exchangeRate.name, "code": exchangeRate.code, "buying": exchangeRate.buying, "selling": exchangeRate.selling})
    })
app.get('/api/currency/euro',async (req, res)=>{
    const exchangeRate = await tcmbdoviz.getExchangeRate('EUR')
    res.json({"name": exchangeRate.name, "code": exchangeRate.code, "buying": exchangeRate.buying, "selling": exchangeRate.selling})
    })
app.get('/api/currency/sterlin',async (req, res)=>{
    const exchangeRate = await tcmbdoviz.getExchangeRate('GBP')
    res.json({"name": exchangeRate.name, "code": exchangeRate.code, "buying": exchangeRate.buying, "selling": exchangeRate.selling})
    })
/*                                                                        DOVİZ                                                                                    */
/*                                                                        GAMES                                                                                    */
app.get('/api/fun/8ball:lang?',async (req, res)=>{
let lang = req.query.lang
    if(!lang){
        res.json({"error": "Please write a language."})
    } else if(lang === "tr"){
    let test = deneme.tr
    let tr = test[Math.floor(Math.random() * test.length)]
    res.json({"response": tr})
    } else if(lang === "en"){
    let test = deneme.en
    let en = test[Math.floor(Math.random() * test.length)]
    res.json({"response": en})
    } else if(lang === "de"){
    let test = deneme.de
    let de = test[Math.floor(Math.random() * test.length)]
    res.json({"response": de})
    } else if(lang === "fr"){
    let test = deneme.fr
    let fr = test[Math.floor(Math.random() * test.length)]
    res.json({"response": fr})
    } else if(lang === "es"){
    let test = deneme.es
    let es = test[Math.floor(Math.random() * test.length)]
    res.json({"response": es})
    }
    })

app.get('/api/fun/reverse:text?',async (req, res)=>{
    let text = req.query.text
    let reverse = [...text].reverse().join(""); 
    res.json({response: reverse})
    })
app.get('/api/fun/short-url:url?',async (req, res)=>{
    let url = req.query.url
    if(!url){
        res.json({error: "You have to enter the link of the abbreviation."})
    } else {
     axios.get('https://ay.live/api/?api=' + ayarlar.aylinktoken + '&url=' + url +'&ct=1')
     				.then(response => {
       				let data = response.data
                    res.json({shortenedUrl: data?.shortenedUrl}) 
     			})
                      .catch(error => {
                    res.json({"error": "An error occurred, please try again later."})
   				 const embed = new MessageBuilder()
				.setAuthor('Short Url Error')
				.setColor(Colors.Red)
				.setThumbnail(image)
				.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
				.setTimestamp();
				hook.send(embed);
    			});
        }
    			})
/*                                                                        GAMES                                                                                    */
/*                                                                      EARTHQUAKE                                                                                  */
app.get('/api/earthquake/all',async (req, res)=>{
axios.get('https://api.berkealp.net/kandilli/index.php?all')
     				.then(response => {
       				let data = response.data
                    res.json({data}) 
     			})
                      .catch(error => {
                    res.json({"error": "An error occurred, please try again later."})
   				 const embed = new MessageBuilder()
				.setAuthor('Earthquake(All) Error')
				.setColor(Colors.Red)
				.setThumbnail(image)
				.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
				.setTimestamp();
				hook.send(embed);
    			});
      
    			})
app.get('/api/earthquake/page:number?',async (req, res)=>{
    if(!req.query.number){
        res.json({error:"You have to enter a page number."})
    } else {
     axios.get('https://api.berkealp.net/kandilli/index.php?page=' + req.query.number)
     				.then(response => {
       				let data = response.data
                    res.json({data}) 
     			})
                      .catch(error => {
                    res.json({"error": "An error occurred, please try again later."})
   				 const embed = new MessageBuilder()
				.setAuthor('Earthquake(Page) Error')
				.setColor(Colors.Red)
				.setThumbnail(image)
				.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
				.setTimestamp();
				hook.send(embed);
    			});
        }
    			})
app.get('/api/earthquake/last',async (req, res)=>{
    if(!req.query.region){
     axios.get('https://api.berkealp.net/kandilli/index.php?last')
     				.then(response => {
       				let data = response.data
                    res.json({data}) 
     			})
                      .catch(error => {
                    res.json({"error": "An error occurred, please try again later."})
   				 const embed = new MessageBuilder()
				.setAuthor('Earthquake(Last) Error')
				.setColor(Colors.Red)
				.setThumbnail(image)
				.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
				.setTimestamp();
				hook.send(embed);
    			});
        } else {
            axios.get('https://api.berkealp.net/kandilli/index.php?last=' + req.query.region)
     				.then(response => {
       				let data = response.data
                    res.json({response}) 
     			})
                      .catch(error => {
                    res.json({"error": "An error occurred, please try again later."})
   				 const embed = new MessageBuilder()
				.setAuthor('Earthquake(Last=x) Error')
				.setColor(Colors.Red)
				.setThumbnail(image)
				.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
				.setTimestamp();
				hook.send(embed);
    			});
        }
    			})
/*                                                                      EARTHQUAKE                                                                                  */
/*                                                                        TİMES                                                                                    */
app.get('/api/time', (req, res) => {
    let timestamp = Math.floor(Date.now()/1000)
    let time = Date.now()
    res.json({
      sec: timestamp,
      milisec: time
    })
})
/*                                                                        TİMES                                                                                    */
/*                                                                       ANİMALS                                                                                   */
app.get('/api/animals', async (req, res)=>{
    res.json({response:"SOON"})
})
/*                                                                       ANİMALS                                                                                   */
/*                                                                        ANİME                                                                                    */
app.get('/api/anime:search?',async (req, res)=>{
    let rodzi = req.query.search
    if(!rodzi){
        res.json({"error": "You must enter an anime name."})
              } else {
                  malScraper.getInfoFromName(rodzi)
  .then((data) => res.json(data)
    )
 .catch(err => {
const embed = new MessageBuilder()
.setAuthor('Anime Search Error')
.setColor(Colors.Red)
.setThumbnail(image)
.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
.setTimestamp();
hook.send(embed);
       })
              }
    })
app.get('/api/anime/sfw:action?',async (req, res)=>{
    let rodzi = req.query.action
    if(!rodzi){
        res.json({"error": "You have to enter an action command."})
              } else { 
                  if( rodzi === "kiss" || rodzi === "lick" || rodzi === "hug" || rodzi === "baka" || rodzi === "cry" || rodzi === "poke" || rodzi === "smug" || rodzi === "slap" || rodzi === "tickle" || rodzi === "pat" || rodzi === "laugh" || rodzi === "feed" || rodzi === "cuddle") {
                axios.get(`http://api.nekos.fun:8080/api/${rodzi}`)
     				.then(response => {
       				let data = response.data
                    res.json({"image": data?.image}) })
                      .catch(error => {
                    res.json({"error": "An error occurred, please try again later."})
    const embed = new MessageBuilder()
.setAuthor('Anime SFW Error')
.setColor(Colors.Red)
.setThumbnail(image)
.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
.setTimestamp();
hook.send(embed);
    });
                  } else {
                      res.json({"error": "Incorrect use of action params.", "params": "kiss, kick, hug, baka, cry, poke, smug, slap, tickle, pat, laugh, feed, cuddle"})
                  }
              }
    })
app.get('/api/anime/nsfw:action?',async (req, res)=>{
    let rodzi = req.query.action
    if(!rodzi){
        res.json({"error": "You have to enter an action command."})
              } else { 
                  if( rodzi === "4k" || rodzi === "ass" || rodzi === "boobs" || rodzi === "cum" || rodzi === "feet" || rodzi === "hentai" || rodzi === "wallpapers" || rodzi === "spank" || rodzi === "lesbian" || rodzi === "lewd" || rodzi === "pussy" || rodzi === "bj" || rodzi === "blowjob") {
      				axios.get(`http://api.nekos.fun:8080/api/${rodzi}`)
     				.then(response => {
       				let data = response.data
                    res.json({"image": data?.image}) })
                      .catch(error => {
                        res.json({"error": "An error occurred, please try again later."})
    const embed = new MessageBuilder()
.setAuthor('Anime NSFW Error')
.setColor(Colors.Red)
.setThumbnail(image)
.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
.setTimestamp();
hook.send(embed);
    });
                  } else {
                      res.json({"error": "Incorrect use of action params.", "actions": "4k, ass, bj, blowjob, boobs, cum, feet, hentai, wallpapers, spank, lesbian, lewd, pussy"})
              }
              }
    })
/*                                                                        ANİME                                                                                    */
/*                                                                        TESTS                                                                                    */
app.get('/api/test', async(req, res) => {
    if(req.query.key == ayarlar.key) return res.json({test:req.query.feed});
    res.json({"error":"There is no such GET."})
})
/*                                                                        TESTS                                                                                    */
/*                                                                        MUSIC                                                                                    */
app.get('/api/music/lyrics:song?',async(req, res) => {
(async function(artist, title) {
    let lyrics = await lyricsFinder(artist, title) || "Not Found!";
   
res.json({lyrics: lyrics});
})(req.query.song);
})

app.get('/api/music/spotify-info:url?', (req, res) => {
  getPreview(req.query.url)
  .then(data => res.send(data))
    .catch(error => {
    const embed = new MessageBuilder()
.setAuthor('Spotify Info Error')
.setColor(Colors.Red)
.setThumbnail(image)
.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
.setTimestamp();
hook.send(embed);
})
    
})

/*                                                                        MUSIC                                                                                    */
/*                                                                       IP-INFO                                                                                   */
app.get('/api/ip-info', (req, res)=>{
    
    if(!req.query.ip_address){
    axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=' + ayarlar.ipinfo)
    .then(response => {
        let data = response.data
        let timezone = data.timezone
        let connection = data.connection
        res.json({
            ip_address: data.ip_address,
            city: data.city,
            city_geoname_id: data.city_geoname_id,
            region: data.region,
            region_iso_code: data.region_iso_code,
            region_geoname_id: data.region_geoname_id,
            postal_code: data.postal_code,
            country: data.country,
            country_code: data.country_code,
            country_geoname_id: data.country_geoname_id,
            country_is_eu: data.country_is_eu,
            continent: data.continent,
            continent_code: data.continent_code,
            continent_geoname_id: data.continent_geoname_id,
            longitude: data.longitude,
            latitude: data.latitude,
            security: {
                is_vpn: data.security.is_vpn
            },
            timezone:{
               	name: timezone.name,
               	abbreviation: timezone.abbreviation,
               	gmt_offset: timezone.gmt_offset, 
               	current_time: timezone.current_time,
               	is_dst: timezone.is_dst
            },
            flag:{
                emoji: data.flag.emoji,
                unicode: data.flag.unicode,
            },
            currency:{
                currency_name: data.currency.currency_name,
                currency_code: data.currency.currency_code
            },
            connection:{
                autonomous_system_number: connection.autonomous_system_number,
                autonomous_system_organization: connection.autonomous_system_organization,
                connection_type: connection.connection_type,
                isp_name: connection.isp_name,
                organization_name: connection.organization_name,
            }
        })
    })
    .catch(error => {
           const embed = new MessageBuilder()
.setAuthor('IP Info Error')
.setColor(Colors.Red)
.setThumbnail(image)
.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
.setTimestamp();
hook.send(embed);
    });
        } else {
    axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key='+ ayarlar.ipinfo +'&ip_address=' + req.query.ip_address)
    .then(response => {
        let data = response.data
        let timezone = data.timezone
        let connection = data.connection
        res.json({
            ip_address: data.ip_address,
            city: data.city,
            city_geoname_id: data.city_geoname_id,
            region: data.region,
            region_iso_code: data.region_iso_code,
            region_geoname_id: data.region_geoname_id,
            postal_code: data.postal_code,
            country: data.country,
            country_code: data.country_code,
            country_geoname_id: data.country_geoname_id,
            country_is_eu: data.country_is_eu,
            continent: data.continent,
            continent_code: data.continent_code,
            continent_geoname_id: data.continent_geoname_id,
            longitude: data.longitude,
            latitude: data.latitude,
            security: {
                is_vpn: data.security.is_vpn
            },
            timezone:{
               	name: timezone.name,
               	abbreviation: timezone.abbreviation,
               	gmt_offset: timezone.gmt_offset, 
               	current_time: timezone.current_time,
               	is_dst: timezone.is_dst
            },
            flag:{
                emoji: data.flag.emoji,
                unicode: data.flag.unicode,
            },
            currency:{
                currency_name: data.currency.currency_name,
                currency_code: data.currency.currency_code
            },
            connection:{
                autonomous_system_number: connection.autonomous_system_number,
                autonomous_system_organization: connection.autonomous_system_organization,
                connection_type: connection.connection_type,
                isp_name: connection.isp_name,
                organization_name: connection.organization_name,
            }
        })
    })
    .catch(error => {
           const embed = new MessageBuilder()
.setAuthor('IP Info Error')
.setColor(Colors.Red)
.setThumbnail(image)
.setDescription('Büyük ihtimal sistemde olmayan birşey arandı.')
.setTimestamp();
hook.send(embed);
    });
        }
})

/*                                                                       IP-INFO                                                                                   */
/*                                                                        IMAGE                                                                                    */
app.get('/api/image/render',async (req, res) => {
    let hex = req.query
    if(!hex.hex){
        res.json({error: "You must enter a hex code."})
    } else {
const canvas = Canvas.createCanvas(256, 256);
        const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://apiv1.spapi.ga/image/render?hex=' + hex.hex);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        const buffer = canvas.toBuffer('image/png');
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(buffer); 
}
    
})

/*                                                                        IMAGE                                                                                    */
/*                                                                     EXPRESS API                                                                                 */
app.get('/*', (req, res) =>{
    res.json({"error":"There is no such GET."})
})

app.listen(25979, () => {
  console.log("API çalışıyor.")

const embed = new MessageBuilder()
.setAuthor('Aktifim')
.setColor(Colors.Blurple)
.setThumbnail(image)
.setDescription(`📊 Hafıza Kullanımı: **${(
    process.memoryUsage().heapUsed /
    1024 /
    512
  ).toFixed(2)}Mb**
 
  📊 NodeJS Sürümü: **${process.version}**
  📊 DiscordJS Sürümü: **v${version}**

`)
.setTimestamp();
hook.send(embed);
})

client.login(ayarlar.token)
