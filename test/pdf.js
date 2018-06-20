/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const puppeteer = require('puppeteer');

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://mashranalytics.com/report/?re_code=eYIHKTA&sample', {waitUntil: 'networkidle0'});
  // page.pdf() is currently supported only in headless mode.
  // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
  await page.setViewport({ width: 1920, height: 1080 });
  
  await sleep(500);
  
  let height = await page.evaluate(() => document.body.offsetHeight);
  let width = await page.evaluate(() => document.documentElement.offsetWidth);
  console.log("width: ", width,"height: ", height);
  
  await page.pdf({
    path: 'test.pdf',
	width: width + 'px',
	height: height + 'px',
	printBackground: true,
	margin: {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	}
  });

  await browser.close();
})();
