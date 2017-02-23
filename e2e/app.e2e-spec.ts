import { FermentationAppPage } from './app.po';

describe('fermentation-app App', () => {
  let page: FermentationAppPage;

  beforeEach(() => {
    page = new FermentationAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
