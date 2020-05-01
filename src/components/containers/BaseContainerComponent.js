import BaseComponent from "../BaseComponent";

export default class BaseContainerComponent extends BaseComponent {
  constructor (options = {}) {
    super(options)
    this.htmlTag = 'div'
    this.defaultStyleGuideName = 'containers'
  }
}
