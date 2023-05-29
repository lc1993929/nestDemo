import { Injectable } from '@nestjs/common';
import { IWebInit } from './web.interface';
import { PuppeteerService } from './puppeteer.service';
import { sleep } from '/@/util/tools';
import { Page } from 'puppeteer';

@Injectable()
export class JenkinsService implements IWebInit{
    protected page: Page;
    constructor(protected pupSer: PuppeteerService) {
        pupSer.register(this);
    }
    async init() {
        return;
        const page = await this.pupSer.createPage();
        await page.goto('http://192.168.1.14:8080/', {'timeout':1000*30,'waitUntil':'networkidle0'});
        await page.evaluate(async () => {
            (document.querySelector('#j_username') as HTMLInputElement).value = 'devops';
            (document.querySelector('input[name=j_password]') as HTMLInputElement).value = 'xsxdevops';
            (document.querySelector('.submit .jenkins-button--primary') as HTMLButtonElement).click();
        });
        await sleep(1000);
        await page.goto('http://192.168.1.14:8080/job/k8s-bitunix-web-test/', {'timeout':1000*30,'waitUntil':'networkidle0'});
        this.page = page;
        setTimeout(() => {
            this.build();
        }, 1000);
        // await page.focus('#j_username');
        // await page.keyboard.sendCharacter('devops');
        // await page.focus('#j_password');
        // await page.keyboard.sendCharacter('xsxdevops');
        // await page.keyboard.press('Enter');
    }
    async build() {
        this.page.$$eval('.task', res=> {
            //  targetEle: HTMLDivElement = null;
            for(let ele of res) {
                const textEle = ele.querySelector('.task-link-text') as HTMLDivElement;
                if(textEle && textEle.innerText.indexOf('Build Now') !== -1) {
                    
                    try {
                        const link = ele.querySelector('.task-link') as HTMLElement;
                        link.click();
                    } catch (error) {
                        
                    }
                    // const onclickText = link.getAttribute('onclick');
                    // console.log(onclickText);
                    break;
                }
            }
        });
    }
    protected detectStatus() {
        const status = this.page.$eval('.build-row', res=> {
            try {
                const buildId = (res.querySelector('build-link') as HTMLElement).innerText;
                // build-row transitive single-line overflow-checked
                // build-row transitive single-line overflow-checked
                // build-row transitive single-line overflow-checked
            } catch (error) {
                
            }
        });
    }
}