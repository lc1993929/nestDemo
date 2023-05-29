import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { Subject } from 'rxjs';
import { v4 } from 'uuid';
import { IWebInit } from './web.interface';
import { Config } from '/@/config';
@Injectable()
export class PuppeteerService {
    public web$: Subject<any> = new Subject();
    protected pageCount = 0;
    public pageCountChange = new Subject();
    protected pages: Map<string, Page> = new Map();
    protected browser: Browser;
    protected webs: IWebInit[] = [];
    constructor() {
        if(Config.chrome.start) {
            puppeteer.launch({
                headless: false //要看演示可以使用false
            }).then(async browser => {
                this.browser = browser;
                for(let item of this.webs) {
                    item.init();
                }
                // this.browser.pages()
                // // this.browser.on('')
                // const page = await browser.newPage();
                // await page.goto('https://www.baidu.com/');
                // await page.type('#kw', '贝尔塔猫');
                // await page.click('#su');
            //   await browser.close();
                // page.evaluate(() => {
                //     console.log(window);
                //     // window.addEventListener('')
                // });
            })
        }
    }
    protected async _countPageDetected() {
        setInterval(() => {
            this.browser.pages().then(res => {
                const currentCount = res.length;
                if(currentCount !== this.pageCount) {
                    this.pageCount = currentCount;
                    this.pageCountChange.next(this.pageCount);
                }
            });
        }, 1000)
    }
    public register(ser: IWebInit) {
        this.webs.push(ser);
    }
    public async createPage() {
        const id = v4();
        const page = await this.browser.newPage();
        this.pages.set(id, page);
        page.on('close', () => {
            this.pages.delete(id);
        });
        return page;
    }
}