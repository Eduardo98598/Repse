process.env.PUPPETEER_DOWNLOADS_PATH = './node_modules/puppeteer-core/.local-chromium';

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://repse.stps.gob.mx/app/');
  await page.waitForSelector('iframe');
  
  const frameElement = await page.$('iframe');
  const frame = await frameElement.contentFrame();

  await frame.evaluate(() => {
    document.documentElement.requestFullscreen();
  });

  const content = await frame.content();

  await browser.close();

  res.send(content);
});

app.listen(3000, () => {
  console.log('Servidor Express.js en ejecución en el puerto 3000');
});
