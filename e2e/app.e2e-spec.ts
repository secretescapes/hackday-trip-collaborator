import { TripCollaboratorPage } from './app.po';

describe('trip-collaborator App', () => {
  let page: TripCollaboratorPage;

  beforeEach(() => {
    page = new TripCollaboratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
