import StyleGuide from "../styleguide/styleguide";
export default class BaseComponent {
  constructor (options = {}) {
    this.options = options
    this.htmlTag = null
    this.id = options.id
    this.classes = options.classes || []
    this.elm = null
    this.events = options.events || {}
    this.componentName = null
    this.defaultStyleGuideName = null
    this.css = options.css || {}
    this.attributes = options.attributes || {}
    this.renderOptions = {}
    this.childCallback = () => { return null}
  }
  _applyStyleGuide () {
    if (this.defaultStyleGuideName && StyleGuide.hasOwnProperty(this.defaultStyleGuideName)) {
      StyleGuide[this.defaultStyleGuideName].forEach((className) => {
        this.elm.classList.add(className)
      })
    }
    if (this.componentName && StyleGuide.hasOwnProperty(this.componentName)) {
      StyleGuide[this.componentName].forEach((className) => {
        this.elm.classList.add(className)
      })
    }
    if (this.css) {
      Object.keys(this.css).forEach((cssAttr) => {
        this.elm.style[cssAttr] = this.css[cssAttr]
      })
    }
  }
  _setAttribute (attr, value) {
    this.elm.setAttribute(attr, value)
  }
  _setAttributes () {
    if (this.attributes) {
      Object.keys(this.attributes).forEach((attr) => {
        this._setAttribute(attr, this.attributes[attr])
      })
    }
  }
  _registerEvents () {
    Object.keys(this.events).forEach((eventName) => {
      this.elm.addEventListener(eventName, this.events[eventName])
    })
  }
  refresh () {
    this.elm.parentNode.replaceChild(this.render(this.renderOptions, this.childCallback()), this.elm)
  }
  render (renderOptions, childCallback) {
    this.renderOptions = renderOptions
    this.childCallback = childCallback
    this.elm = document.createElement(this.htmlTag)
    this._applyStyleGuide()
    this.classes.forEach((className) => {
      this.elm.classList.add(className)
    })
    if (this.id) {
      this.elm.id = this.id
    }
    if (typeof childCallback === 'function') {
      this.elm.appendChild(childCallback())
    }
    this._registerEvents()
    this._setAttributes()
    return this.elm
  }
}
