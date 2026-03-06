import { BasePage } from './BasePage.js';
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { CookieBanner } from '../components/CookieBanner.js';

export class MainPage extends BasePage {
  readonly header = new Header(this.page);
  readonly footer = new Footer(this.page);
  readonly cookieBanner = new CookieBanner(this.page);
}
