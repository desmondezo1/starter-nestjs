import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin = require('puppeteer-extra-plugin-stealth');
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import chromium from '@sparticuz/chromium';
import { ConfigService } from '@nestjs/config';

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

@Injectable()
export class PuppeteerService {
  constructor(private config: ConfigService) {}
  private ENV = this.config.get('ENV');

  async likePost({
    platform,
    postUrl,
    username,
    password,
  }: {
    platform: string;
    postUrl: string;
    username: string;
    password: string;
  }) {
    try {
      let browser;
      if (this.ENV === 'local' || !this.ENV) {
        browser = await puppeteer.launch({
          headless: false,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
          ],
        });
      } else {
        browser = await puppeteer.launch({
          headless: chromium.headless,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
          ],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          ignoreHTTPSErrors: true,
        });
      }
      // const browser = await puppeteer.launch({ headless: false });

      const page = await browser.newPage();

      switch (platform) {
        case 'instagram':
          console.log('instagram');
          await page.goto('https://www.instagram.com/accounts/login/', {
            waitUntil: 'networkidle2',
            timeout: 0,
          });
          await page.waitForSelector('input[name="username"]');
          console.log('logging in ...');
          await page.type('input[name="username"]', username);
          await page.waitForTimeout(1901);
          await page.type('input[name="password"]', password);
          await page.waitForTimeout(1901);
          await page.click('button[type="submit"]');
          // await page.waitForNavigation();
          // await page.waitForSelector('a[href="/explore/"]');
          await page.waitForFunction(
            'document.body.textContent.includes("explore")',
          );
          await page.waitForTimeout(3901);
          console.log('login success');
          await page.goto(postUrl, {
            waitUntil: 'networkidle2',
            timeout: 0,
          });
          await page.waitForSelector('button svg[aria-label="Like"]');
          const likeButton = await page.$(
            'div[class="x78zum5"] button:has(svg[aria-label="Like"])',
          );
          // const likeButton = await page.$('button:has(svg[aria-label="Like"])');
          // const likeButton = await page.$('article div div button svg[aria-label="Like"]');
          await likeButton.click();
          const login = await page.$('input[name="username"]');
          if (login) {
            await page.type('input[name="username"]', username);
            await page.type('input[name="password"]', password);
            await page.click('button[type="submit"]');
            await page.goto(postUrl, {
              waitUntil: 'load',
              timeout: 0,
            });
            await page.waitForSelector('button svg[aria-label="Like"]');
            const likeButton = await page.$(
              'button:has(svg[aria-label="Like"])',
            );
            await likeButton.click();
          }

          // await page.click('button svg[aria-label="Like"]');
          await page.waitForTimeout(5501);
          break;

        case 'twitter':
          await page.goto('https://twitter.com/login');
          await page.waitForSelector(
            'input[name="session[username_or_email]"]',
          );
          await page.type('input[name="session[username_or_email]"]', username);
          await page.type('input[name="session[password]"]', password);
          await page.click('div[data-testid="LoginForm_Login_Button"]');
          await page.waitForNavigation();
          await page.goto(postUrl);
          await page.waitForSelector('div[data-testid="like"]');
          await page.click('div[data-testid="like"]');
          break;

        case 'facebook':
          await page.goto('https://www.facebook.com/');
          await page.waitForSelector('input[name="email"]');
          await page.type('input[name="email"]', username);
          await page.type('input[name="pass"]', password);
          await page.click('button[name="login"]');
          await page.waitForNavigation();
          await page.goto(postUrl);
          await page.waitForSelector('div[data-testid="like"]');
          await page.click('div[data-testid="like"]');
          break;

        case 'youtube':
          await page.goto('https://accounts.google.com/signin');
          await page.waitForSelector('input[type="email"]');
          await page.type('input[type="email"]', username);
          await page.click('#identifierNext');
          await page.waitForSelector('input[type="password"]');
          await page.type('input[type="password"]', password);
          await page.click('#passwordNext');
          await page.waitForNavigation();
          await page.goto(postUrl);
          await page.waitForSelector('yt-icon-button[id="like-button"]');
          await page.click('yt-icon-button[id="like-button"]');
          break;

        default:
          console.log('Invalid platform');
      }
      await browser.close();
      return 'liked by ' + username;
    } catch (error) {
      console.log(error);
      return {
        message: username + ' failed to Like post',
        reason: error.message,
      };
    }
  }

  async followAccount({
    accountUrl,
    username,
    password,
  }: {
    accountUrl: string;
    username: string;
    password: string;
  }) {
    try {
      let browser;
      if (this.ENV === 'local' || !this.ENV) {
        browser = await puppeteer.launch({
          headless: false,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            ...chromium.args,
          ],
        });
      } else {
        browser = await puppeteer.launch({
          headless: chromium.headless,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            ...chromium.args,
          ],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          ignoreHTTPSErrors: true,
        });
      }

      // const browser = await puppeteer.launch({ headless: false });
      // const browser = await puppeteer.launch({
      //   headless: chromium.headless,
      //   args: [...chromium.args],
      //   defaultViewport: chromium.defaultViewport,
      //   executablePath: await chromium.executablePath(),
      //   ignoreHTTPSErrors: true,
      // });
      const page = await browser.newPage();
      await page.goto('https://www.instagram.com/accounts/login/');
      await page.waitForSelector('input[name="username"]');
      await page.type('input[name="username"]', username);
      await page.waitForTimeout(1421);
      await page.type('input[name="password"]', password);
      await page.waitForTimeout(1901);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
      await page.goto(accountUrl);
      // class="_acan _acap _acat _aj1-"
      await page.waitForSelector(
        'button > div > div[class="_aacl _aaco _aacw _aad6 _aade"]',
      );
      const followBtn = await page.$(
        'button:has(div[class="_aacl _aaco _aacw _aad6 _aade"])',
      );
      await followBtn.click();
      await page.waitForTimeout(1901);
      await browser.close();
      return `${username} just followed the account!`;
    } catch (error) {
      console.log(error);
      return {
        message: username + ' failed to follow account',
        reason: error.message,
      };
    }
  }

  async commentonPost({
    postUrl,
    username,
    password,
    comment,
  }: {
    postUrl: string;
    username: string;
    password: string;
    comment: string;
  }) {
    try {
      let browser;
      if (this.ENV === 'local' || !this.ENV) {
        browser = await puppeteer.launch({
          headless: false,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            ...chromium.args,
          ],
        });
      } else {
        browser = await puppeteer.launch({
          headless: chromium.headless,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            ...chromium.args,
          ],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          ignoreHTTPSErrors: true,
        });
      }
      // const browser = await puppeteer.launch({ headless: false });
      // const browser = await puppeteer.launch({
      //   headless: chromium.headless,
      //   args: [...chromium.args],
      //   defaultViewport: chromium.defaultViewport,
      //   executablePath: await chromium.executablePath(),
      //   ignoreHTTPSErrors: true,
      // });
      const page = await browser.newPage();
      await page.goto('https://www.instagram.com/accounts/login/');
      await page.waitForSelector('input[name="username"]');
      await page.type('input[name="username"]', username);
      await page.waitForTimeout(1421);
      await page.type('input[name="password"]', password);
      await page.waitForTimeout(1901);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
      await page.goto(postUrl);
      await page.waitForSelector('textarea[placeholder="Add a comment…"]');
      await page.type('textarea[placeholder="Add a comment…"]', comment);
      await page.waitForTimeout(1431);

      const commentBtn = await page.$(
        'form > div[class="_akhn"] > div > div[role="button"]',
      );

      await commentBtn.click();

      // await page.click('div[role="button"][tabindex="0"]:has-text("Post")');
      await page.waitForTimeout(14291);
      await browser.close();
      return `${username} commented`;
      // await page.click('button[type="submit"]');
    } catch (error) {
      console.log(error);
      return {
        message: username + ' failed to comment',
        reason: error.message,
      };
    }
  }
}
