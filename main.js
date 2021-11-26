// main.js
// test comments 12345
/// <reference types="akamai-edgeworkers"/>

import { createResponse } from 'create-response';
import { httpRequest } from 'http-request';
import URLSearchParams from 'url-search-params';
import { logger } from 'log';
import { TextEncoderStream, TextDecoderStream } from 'text-encode-transform';
import { FindAndReplaceStream } from 'find-replace-stream.js';
//import { EdgeKV } from './edgekv.js';


async function getFlag(request) {
	const APIKEY = 'c732386fdda83fb807bc7f8c865272ac';
	const userLocation = request.userLocation;
	const country = userLocation.country;
	const region = userLocation.region;
	const city = userLocation.city;
	const DOMAIN = `http://ddorch.akamaidemo.com/weatherapi/data/2.5/weather?q=${city}&appid=c732386fdda83fb807bc7f8c865272ac&units=imperial`;

	let flag = "";
	let err_msg = "";
	
		  var html = `
            <div class="elementor-widget-container">
			<h3 class="elementor-heading-title elementor-size-default">Thanks for visiting from ${request.userLocation.city ? request.userLocation.city : "N/A"}</h3>
            </div>
		    `;
	      
		  //request.respondWith(200, {}, html);
		  return createResponse(200,{'Vary':"Accept-Language",'X-Served-By':"Duane's EdgeWorker"},html);
		  //return createResponse(200,{},html);
}

export async function responseProvider(request, response) {
	const tosearchfor = 'Maryland';
	const newtext = request.getVariable('PMUSER_USER_LOCATION');
	const howManyReplacements = 1;
	
	return httpRequest(`${request.scheme}://${request.host}${request.url}`).then(response => {
		return createResponse(
			200,
			{'Vary':"Accept-Language",'X-Served-By':"Duane's EdgeWorker"},
			response.body
			.pipeThrough(new TextDecoderStream())
			.pipeThrough(new FindAndReplaceStream(tosearchfor, newtext, howManyReplacements))
			.pipeThrough(new TextEncoderStream())
		);
	});
}

export async function onClientRequest(request) {
    logger.log("adding header to cache key");
    request.setVariable("PMUSER_USER_LOCATION",`${request.userLocation.city}, ${request.userLocation.country}`);
    request.cacheKey.includeHeader('Accept-Language');
    request.cacheKey.includeVariable("PMUSER_USER_LOCATION");
}
