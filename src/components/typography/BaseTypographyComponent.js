import BaseComponent from "../BaseComponent";

export default class BaseTypographyComponent extends BaseComponent {
  constructor (options = {}) {
    super(options)
    this.text = options.text
  }

  render(renderOptions, childCallback) {
    super.render(renderOptions, childCallback)
    this.elm.innerText = this.text
    return this.elm
  }
}
