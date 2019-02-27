const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com';
const $ = require('cheerio');

puppeteer
    .launch()
    .then(function (browser) {
        return browser.newPage();
    })
    .then(function (page) {
        return page.goto(url).then(function () {
            return page.content();
        });
    })
    .then(function (html) {
        $('h2', html).each(function (i) {
            console.log(i + ": " + $(this).text());
        });
    })
    .catch(function (error){
        console.log(error);
    })
    .finally((browser) => {
        browser.close();
    })
