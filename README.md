## # ZuziaDev-API

# # Kullanmadan önce

API yardımları için [Arkh](https://discord.gg/sBnTXCJCTz) ya da [Rick Code](https://discord.gg/SEzcA5TxTt) sunucularına gelebilirsin.

<hr>

- Kullanım için aşağıyı inceleyin.

```json
{
"apiname":"API name",
"token": "bottoken",
"key":"admin api key"
"aylinktoken":"aylinkkey",
"ipinfo":"ipinfokey",
"webhook":"discord webhook url",
"image":"webhook avatar",
"unplash": "unplash client id" 
}
```

apiname = Api adını yazın örneğin sakura ya da ultimate.<br>
token = Discord bot tokenini yazın.<br>
key = test kodunda kullanacağınız keydir o olmazsa kullanamazsınız.<br>
aylinktoken = [tr.link](https://tr.link)'den aldığınız api keyi yazınız.<br>
ipinfo = [abstractapi.com](https://abstractapi.com)'dan aldığınız apideki keyi yazınız.<br>
webhook = discord webhook urlnizi yazınız.<br>
image = webhook için resim koyunuz.<br>
unplash = [unplash.com](https://unplash.com) sitesinden client idsini yazın <br>

<hr>

- API nin içindekiler.

```json
{
	"information":{
     	"owner":"Zuziâ RodzeN#9988 | 890626326350946364",
     	"Discord Server":{
"Rick Code": "https://discord.gg/SEzcA5TxTt",
"Arkh":"https://discord.gg/sBnTXCJCTz"
},
     	"Discord Bot":"https://discord.com/api/oauth2/authorize?client_id=1060713660286246912&permissions=8&scope=bot%20applications.commands",
     	"Github":"https://github.com/ZuziaDev"
 			   },
    
	"endpoint":[
	"translate":[
		"GET /api/translate?lang=[lang]&text=[text]"
	],
	"currency":[
		"GET /api/currency/all",
		"GET /api/currency/dolar",
		"GET /api/currency/euro",
		"GET /api/currency/sterlin",
		"GET /api/currency/search?q=[currency]"
		   ],
    
	"fun":[
		"GET /api/fun/8ball?lang=[tr/en/de/fr/se]",
		"GET /api/fun/reverse?text=[text]",
		"GET /api/fun/short-url?url=[url]"
	  ],
    
	"earthquake":[
		"GET /api/earthquake/all",
		"GET /api/earthquake/page?number=[number]",
		"GET /api/earthquake/last",
		"GET /api/earthquake/last?region=[region]"
			 ],
    
	"times":[
		"GET /api/time"
		],
    
	"animals":[
        "GET /api/animals?search=[animals]"
                  ],
    
	"anime":[
		"GET /api/anime?search=[anime]",
		"GET /api/anime/sfw?action=[action]",
		"GET /api/anime/nsfw?action=[action]",
        ],
	"music":[
		"GET /api/music/lyrics?=song[song]",
		"GET /api/music/spotify-info?url=[url]"
        ],
    
	"ip_info":[
		"GET /api/ip-info",
		"GET /api/ip-info?ip_address=[ip]"
          ],
    
	"image":[
		"GET /api/image/render?hex=[hex]"
        ]
           ]
}

```
