'use strict'
const axios = require('axios');
const http = require('follow-redirects').http;
const wget = require('wget-improved');
const fs = require('fs');

let dir = './downloads/';
const mainUrl = process.argv.slice(2)[0];

init();

function init(){
	if(mainUrl){
		downloadHtmlPage(process.argv.slice(2)[0]);
	}else{
		console.log("Put URL as argument. \nnode <URL> \nEg. 'node https://www.ipla.tv/wideo/serial/Szpilki-na-Giewoncie/5000424'")
	}
}

function getSeriesName(url){
	let urlArray = url.split('/');
	let index = urlArray.indexOf('serial') + 1;
	return urlArray[index]
}

function downloadHtmlPage(url){
	console.log("downloadHtmlPage( " + url + " );");
	axios.get(url, { responseType: 'text' })
		.then(function (response) {
			pharseResponseMainUrlsArray(response.data);
		})
		.catch(function (error) {
			console.log(error);
		})
}

function pharseResponseMainUrlsArray(data){
	let nameOfSeries = getSeriesName(mainUrl);
	dir = "./" + nameOfSeries + "/";
	let listOfUrls = [];

	let stringToReg = `${nameOfSeries}-Odcinek`;
	var regexp = new RegExp( stringToReg,"g");
	var foo = data
	var match, matches = [];

	while ((match = regexp.exec(foo)) != null) {
		matches.push(match.index);
	}

	console.log("Found: " + matches.length + " videos.");

	matches.forEach(index => {
		let url = '';
		let indexNew = index;

		while(data[indexNew] != `"`){
			indexNew--;
		}
		url += data.slice(indexNew+1,index);

		while(data[index] != `"` && data[index] != `?` ){
			url += data[index];
			index++;
		}
		listOfUrls.push(url);
	})
	
	startDownloadArray(listOfUrls);
	
}

function sliceIndexesFromUrlsArray(array){
	let idAndFileName, idsAndFileNames = [];
	array.forEach(element => {
		idAndFileName = element.split("/");
		idsAndFileNames.push(idAndFileName[idAndFileName.length-2],idAndFileName[idAndFileName.length-1]);
	});
	return idsAndFileNames;
}


function startDownloadArray (array) {
	let fileName,idAndFileName,id;
	
	array.forEach(element => {
		idAndFileName = element.split("/");
		fileName = idAndFileName[idAndFileName.length-2];
		id = idAndFileName[idAndFileName.length-1];
		downloadOneVideo(fileName,id);
	});
}

async function downloadOneVideo(fileName, id){
	let httpPath = '';

	axios.get(createDownloadUrl(id)).then(async response => {
			if(response.data.vod.video_hd == null ){
				if( response.data.vod.copies[1].url ){
					httpPath = response.data.vod.copies[1].url;
				}else{
					console.log( id + " = >  ERROR");
				}
			}else{
				httpPath = response.data.vod.video_hd;
			}

			const lastUrl = await getRedirectToEndUrl(httpPath);
			console.log("lastUrl: "+ lastUrl);   

			const status = await downloadFile(lastUrl, fileName);
			console.log("Status: " + status);
		})
		.catch(function (error) {
			// console.log(error);
		})  

}

function downloadFile(url, fileName){
	return new Promise( resolve => {

		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}

		const output = dir + fileName;

		let download = wget.download(url, output);

		download.on('error', function(err) {
			console.log(err);
		});
		download.on('start', function(fileSize) {
			console.log(fileSize);
		});
		download.on('end',async function(fileNameoutput) {
			resolve(fileName + '. DONE.')
		});
		download.on('progress', function(progress) {
			typeof progress === 'number'
			process.stdout.write('Progress: '+progress+'\r');
		});

	});
}

function getRedirectToEndUrl(url){
	return new Promise( resolve => {
		const options = {
			headers: { 'User-Agent': 'Mozilla/5.0' }
		};

		http.get(url,options, function (response) {
			resolve(response.responseUrl) 
		}).on('error', function (err) {
			console.error(err);
		});
	})
}

function createDownloadUrl(id) {
	return "http://getmedia.redefine.pl/vods/get_vod/?cpid=1&ua=mipla_ios/122&media_id=" + id;
}
