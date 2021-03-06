import BaseComponent from "../../src/components/BaseComponent";

let assert = require('assert')
let MockBrowser = require('mock-browser').mocks.MockBrowser;
let mock = new MockBrowser();

describe('BaseComponent', () => {
  before(() => {
    global.document = mock.getDocument()
  })
  describe('#constructor', () => {
    it('should create a base element', () => {
      let component = new BaseComponent()
      assert.notEqual(component, undefined)
      assert.equal(component.id, undefined)
      assert.deepEqual(component.options, {})
      assert.equal(component.htmlTag, undefined)
    })
    it('should apply html id', () => {
      let component = new BaseComponent({
        id: 'test'
      })
      assert.equal(component.id, 'test')
    })
    it('should apply classes', () => {
      let component = new BaseComponent({
        classes: ['htmlElm', 'test']
      })
      assert.equal(component.classes.length, 2)
    })
    it('should add custom css', () => {
      let component = new BaseComponent({
        css: {
          color: 'red'
        }
      })
      assert.equal(component.render().style.color, 'red')
    })
    it('should add attributes', () => {
      let component = new BaseComponent({
        attributes: {
          href: 'http://eladisawesome.com'
        }
      })
      component.htmlTag = 'a'
      assert.equal(component.render().href, 'http://eladisawesome.com/')
    })
  })
  describe('#render', () => {
    it('should render a paragraph', () => {
      let component = new BaseComponent()
      component.htmlTag = 'p'
      assert.equal(component.render().outerHTML, '<p></p>')
    })
    it('should render a paragraph with an id', () => {
      let component = new BaseComponent({
        id: 'testParagraph'
      })
      component.htmlTag = 'p'
      assert.equal(component.render().outerHTML, '<p id="testParagraph"></p>')
    })
    it('should render a paragraph with html classes', () => {
      let component = new BaseComponent({
        classes: ['test', 'alsotest']
      })
      component.htmlTag = 'p'
      assert.equal(component.render().outerHTML, '<p class="test alsotest"></p>')
    })
    it('should render a paragraph with html classes and id', () => {
      let component = new BaseComponent({
        id: 'testid',
        classes: ['test', 'alsotest']
      })
      component.htmlTag = 'p'
      assert.equal(component.render().outerHTML, '<p class="test alsotest" id="testid"></p>')
    })
    it('should render a self terminating element', () => {
      let component = new BaseComponent({
      })
      component.htmlTag = 'br'
      assert.equal(component.render().outerHTML, '<br>')
    })
    it('should render a child element', () => {
      let component = new BaseComponent({
      })
      let child = new BaseComponent({
      })
      component.htmlTag = 'div'
      child.htmlTag = 'p'
      let html = component.render({}, () => {
        return child.render()
      })
      assert.equal(html.outerHTML, '<div><p></p></div>')
    })
  })
  describe('#registerEvents', () => {
    it('should add click event to element', () => {
      let clickResult = null
      let component = new BaseComponent({
        events: {
          click: (e) => {
            clickResult = 'hi'
          }
        }
      })
      component.render().click()
      assert.equal(clickResult, 'hi')
    })
  })
})
