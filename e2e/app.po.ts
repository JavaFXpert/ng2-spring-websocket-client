export class AngularWebsocketsDemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular-websockets-demo-app h1')).getText();
  }
}
