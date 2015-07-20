describe('Demo test', function() {
  it('should update data properly according to user input', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://127.0.0.1:5401');

    expect(element(by.css('h1')).getText()).toBe('Demo');

    element(by.css('.floatmask-background')).sendKeys('10')
      .then(function(){
        expect(element(by.css('.floatmask-top')).getAttribute('value')).toBe('10');
        expect(element(by.css('.floatmask-bottom')).getAttribute('placeholder')).toBe('0.10');
        expect(element(by.id('test-output')).getText()).toBe('0.1');
        return element(by.css('.floatmask-background')).sendKeys('0');
      })
      .then(function(){
        expect(element(by.css('.floatmask-top')).getAttribute('value')).toBe('1.00');
        expect(element(by.css('.floatmask-bottom')).getAttribute('placeholder')).toBe('1.00');
        expect(element(by.id('test-output')).getText()).toBe('1');
        return element(by.css('.floatmask-background')).sendKeys('000');
      })
      .then(function(){
        expect(element(by.css('.floatmask-top')).getAttribute('value')).toBe('1,000.00');
        expect(element(by.css('.floatmask-bottom')).getAttribute('placeholder')).toBe('1,000.00');
        expect(element(by.id('test-output')).getText()).toBe('1000');
      });

  });
});
