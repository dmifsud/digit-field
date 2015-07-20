describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://127.0.0.1:5401');

    expect(element(by.css('h1')).getText()).toBe('Demo');
  });
});
