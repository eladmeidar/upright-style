import BaseTypographyComponent from "./BaseTypographyComponent";

export default class HeaderComponent extends BaseTypographyComponent{
  constructor (options) {
    super(options)
    this.htmlTag = 'h1'
    this.componentName = 'header'
  }
}
