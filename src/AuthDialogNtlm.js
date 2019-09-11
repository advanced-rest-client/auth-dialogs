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
import { AnypointDialog } from '@anypoint-web-components/anypoint-dialog/src/AnypointDialog.js'
import styles from '@anypoint-web-components/anypoint-dialog/src/AnypointDialogInternalStyles.js'
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@anypoint-web-components/anypoint-input/anypoint-input.js';
import '@anypoint-web-components/anypoint-input/anypoint-masked-input.js';
import { AuthDialogsMixin } from './AuthDialogsMixin.js';
import { html, css } from 'lit-element';
/**
 * Authorization dialogs for Advanced REST Client.
 *
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 * @appliesMixin AuthDialogsMixin
 */
export class AuthDialogNtlm extends AuthDialogsMixin(AnypointDialog) {
  static get styles() {
    return [
      styles,
      css`
      anypoint-input,
      anypoint-masked-input {
        width: auto;
      }
      `
    ];
  }
  render() {
    const { password, username, domain, compatibility } = this;
    return html`
    <h2 class="title">Authentication required</h2>
    <p>The endpoint requires a username and password</p>
    <anypoint-input
      type="text"
      name="username"
      .value="${username}"
      ?compatibility="${compatibility}"
      @value-changed="${this._inputHandler}"
    >
      <label slot="label">User Name</label>
    </anypoint-input>
    <anypoint-masked-input
      .value="${password}"
      name="password"
      ?compatibility="${compatibility}"
      @value-changed="${this._inputHandler}"
    >
      <label slot="label">Password</label>
    </anypoint-masked-input>
    <anypoint-input
      type="text"
      .value="${domain}"
      name="domain"
      ?compatibility="${compatibility}"
      @value-changed="${this._inputHandler}"
      >
      <label slot="label">NT domain</label>
    </anypoint-input>
    <div class="buttons">
      <anypoint-button dialog-dismiss>Cancel</anypoint-button>
      <anypoint-button dialog-confirm>OK</anypoint-button>
    </div>
    `;
  }

  static get properties() {
    return {
      // User login
      username: { type: String },
      // User password
      password: { type: String },
      // NT domain to login to.
      domain: { type: String }
    };
  }

  _getValue() {
    return {
      domain: this.domain,
      username: this.username,
      password: this.password
    };
  }
}
