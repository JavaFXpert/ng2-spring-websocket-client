import { AngularWebsocketsDemoPage } from './app.po';

describe('angular-websockets-demo App', function() {
  let page: AngularWebsocketsDemoPage;

  beforeEach(() => {
    page = new AngularWebsocketsDemoPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angular-websockets-demo works!');
  });
});
