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
  }
  _applyStyleGuide () {
    if (this.componentName && StyleGuide.hasOwnProperty(this.componentName)) {
      StyleGuide[this.componentName].forEach((className) => {
        this.elm.classList.add(className)
      })
    }
  }
  _registerEvents (elm) {
    Object.keys(this.events).forEach((eventName) => {
      elm.addEventListener(eventName, this.events[eventName])
    })
  }
  render (renderOptions, childCallback) {
    this.elm = document.createElement(this.htmlTag)
    this._applyStyleGuide()
    this.classes.forEach((className) => {
      this.elm.classList.add(className)
    })
    if (this.id) {
      this.elm.id = this.id
    }
    if (typeof childCallback === 'function') {
      this.elm.innerHtml = childCallback().outerHTML
    }
    this._registerEvents(this.elm)
    return this.elm
  }
}
