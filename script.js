const axios = require('axios');
const wget = require('wget-improved');
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;

let list = [  	
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-51/7777b85643c71af5f50e0ba47806d5ef",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-52/7777489307a359709a04a0161729d67f",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-50/777725be74fd234845c0a53d4517e693",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-49/77774462eadd3d89e425a19e531709d1",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-48/7777722ea9a6abeec3c48c040c541e97",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-47/777746eae474ea686f0f6c6ccc50e9a0",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-46/777752e04f30012428edfa91b71cf641",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-45/77773194cad9bb0cb5fc8c173a8ad468",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-44/7777b0fd4104ebcd61012435e074720a",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-43/7777952d667ce9db027100da758cc5ef",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-42/77771949f53634c0120cc1dea1775928",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-41/77779d1d66b334e15cf927e27b2a011a",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-4/5001447/Szpilki-na-Giewoncie-Odcinek-40/7777da295a5e20100daadc6b651208d3",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-39/7777f0f83c71e1d4c2252b128ba1d6cb",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-38/777792007c9240344a06e2efb2c4ad07",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-37/77774578b51995d793be5a7f679f0332",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-36/7777a736d828d45b51fe574ad68d6784",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-35/777743cdd430ff29dca0fb54191421f4",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-34/7777422bfe6beef125c8a99232a9ce39",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-33/7777834463017a18af2f49807c21cd95",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-32/7777e129e28642f91f382a841a3ff02c",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-31/7777f3c5f666ba5e18e64c5066abd34c",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-30/77771be72e0d61993bb307641ddee319",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-29/7777783573245d0b22b9136a3fbbe051",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-28/7777db2633498d15f76235f74419545f",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-3/5001078/Szpilki-na-Giewoncie-Odcinek-27/7777496e4351276e9fce96e978aa1837",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-26/937e526f6c229ac26a05e6accac310af",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-26/5a70fb6651aea25ffd2d446c959a34f3",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-25/bc3b9553a9ce62392e3991f5337a0fbc",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-24/4ea44eb94e560a013d6e454720ec51d6",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-23/5e9d2028168509093df2ac2e744f7964",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-22/c6b50afcf9a203ad7e436ffac0317d6b",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-21/3b039df51f9197defe3adcf255cadd01",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcienk-20/7e840faaee7d311f7e93767d8a029d1c",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-19/19cdb709dddf6a99fa3fe1955473bdbc",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-18/cba21cae20d45dd65abeb72d665db233",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-17/253409cec5695255f354e5c0ab56e04f",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-16/9eb5000c14626d66116a94081577273f",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-15/0e92fb55a76939081c47b032fa878cf5",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-2/5000425/Szpilki-na-Giewoncie-Odcinek-14/7935564ff0ff555add64b7ae7d0c714b",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-13/786ac9dd7dd3fe64b594869976797ec2",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-12/fc0de833215e79102dc8b329d06aad49",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-11/d5f3c6fc8c86b6ca0da0caf3cb4e71bc",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-10/f92c9c1688f5867a37f959e4d0383d8c",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-9/ba5c2eff331bab2f0d288ee5975121df",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-8/6e98e9df6c5e755e6a3df57b27d2ae37",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-7/f9f1e42d6e9935fbcf51d0ae34b73f72",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-6/355e367a6948a278237c4a43cec841ea",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-5/15ef0f1b4da06a7e63d9b6057d7fce5e",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-4/2636a39f087163c3dbc1e626bfa729f0",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-3/39f082841dfc04ef1aadadb53f8330df",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-2/e78d29c39f3fa6989fdc4b6b2601dabb",
"https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424/Sezon-1/5000159/Szpilki-na-Giewoncie-Odcinek-1/672c30808788215c906217b31cefa0e9"
];

let hrefList = [];
getUrls();

let argUrl = process.argv.slice(2);

if(argUrl){
	getUrls(argUrl)
}

function getUrls(argUrl){
	axios.get(argUrl+"")
	  .then(function (response) {
	    // handle success
	    // response = querySelectorAll(".list-element__link");
	    console.log(response);
	    var list = response;
	    console.log(list[0]);
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	  });
}
// start(list);

function start(list) {

	for(var i = 0 ; i< list.length ; i++) {
		var start = new Date()
		let pices = list[i].split("/");
		let fileName = ""
		let httpPath = ""

		axios.get('http://getmedia.redefine.pl/vods/get_vod/?cpid=1&ua=mipla_ios/122&media_id='+pices[pices.length-1])
	  .then(response => {
	  		if(response.data.vod.video_hd == null ){
	  			if( response.data.vod.copies[1].url ){
	    			httpPath = response.data.vod.copies[1].url;
	  			}else{
		    		console.log( pices[pices.length-2] + " = >  ERROR");
	  			}
	  		}else{
	    		 httpPath = response.data.vod.video_hd;
	  		}

	  		fileName = pices[pices.length-2];

	  		console.log(fileName + " => " + httpPath)

	  		const options = {
			  headers: { 'User-Agent': 'Mozilla/5.0' }
			};

  			http.get(httpPath, options ,function (response) {
  				console.log(response.responseUrl);

  				const output = './tmp/' + fileName + '.mp4';

				const options = {};

				let download = wget.download(response.responseUrl, output, options);

				download.on('error', function(err) {
				    console.log(err);
				});
				download.on('start', function(fileSize) {
				    console.log(fileSize);
				});
				download.on('end', function(output) {
				    console.log(output);
				});
				download.on('progress', function(progress) {
				    typeof progress === 'number'
				    // code to show progress bar
				    var dots = progress
					process.stdout.write('Progress: '+dots+'\r');
				});

			}).on('error', function (err) {
			  console.error("asd" + err);
			});

	  		var end = new Date() - start

  			console.info('Execution time: %dms', end)
			
	  })
	  .catch(error => {
	    // console.log(error);
	  });
	}

}


// var list = document.querySelectorAll(".list-element__link");
// list[4].href
// for(var i = 0 ; i< list.length ; i++) {console.log( list[i].href);