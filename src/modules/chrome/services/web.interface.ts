import { Page, Browser} from 'puppeteer';
export interface IWebInit {
    init(): void | Promise<void>;
}