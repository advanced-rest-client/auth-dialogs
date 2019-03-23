/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/paper-input/paper-input.js';
import '../../@advanced-rest-client/paper-masked-input/paper-masked-input.js';
import './authorization-dialog.js';
import {AuthDialogMixin} from './auth-dialogs-mixin.js';
/**
 * Authorization dialogs for Advanced REST Client.
 *
 * ### Example
 *
 * ```html
 * <auth-dialog-basic username="test" password="test"
 *  on-auth-dialog-closed="_authData" opened></auth-dialog-basic>
 * ```
 *
 * ### Styling
 *
 * See the [authorization-dialog.html](authorization-dialog.html) for styling options.
 *
 * @polymer
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 * @appliesMixin AuthDialogMixin
 */
class AuthDialogBasic extends AuthDialogMixin(PolymerElement) {
  static get template() {
    return html`
    <authorization-dialog opened="{{opened}}">
      <h2 slot="title">Authentication required</h2>
      <p>The endpoint requires a username and password</p>
      <paper-input label="User Name" type="text" value="{{username}}"></paper-input>
      <paper-masked-input label="Password" value="{{password}}"></paper-masked-input>
    </authorization-dialog>
`;
  }

  static get is() {
    return 'auth-dialog-basic';
  }
  static get properties() {
    return {
      // User login
      username: String,
      // User password
      password: String
    };
  }

  _getValue() {
    return {
      hash: btoa(this.username + ':' + this.password),
      username: this.username,
      password: this.password
    };
  }
}
window.customElements.define(AuthDialogBasic.is, AuthDialogBasic);
