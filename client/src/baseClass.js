/**
 * @private
 * @abstract
 */
export class AppLaunchpadClientBase {
  /**
   * @private
   */
  constructor() {
    this.promises = {};
  }
  /**
   * Sets the promises object
   * @private
   */
  setPromise(name, value) {
    this.promises[name] = value;
  }
  /**
   * Returns the promises object
   * @private
   */
  getPromise(name) {
    return this.promises[name];
  }
}
