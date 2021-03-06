import HeaderComponent from "../../../src/components/typography/headerComponent";
let assert = require('assert')
let MockBrowser = require('mock-browser').mocks.MockBrowser;
let mock = new MockBrowser();

describe('HeaderComponent', () => {
  before(() => {
    global.document = mock.getDocument()
  })
  describe('#constructor', () => {
    it('should render an empty H1 tag', () => {
      let component = new HeaderComponent()
      assert.equal(component.render().tagName, 'H1')
      assert.equal(component.render().innerText, undefined)
    })
    it('should render an H1 tag with text', () => {
      let component = new HeaderComponent({
        text: 'hello there'
      })
      assert.equal(component.render().innerText, 'hello there')
    })
    it('should apply default styleguide', () => {
      let component = new HeaderComponent({
        text: 'hello there'
      })
      assert.equal(component.render().classList.contains('uprightHeader'), true)
      assert.equal(component.render().classList.contains('typography'), true)
    })
  })
})
