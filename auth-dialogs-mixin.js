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
import { dedupingMixin } from '../@polymer/polymer/lib/utils/mixin.js';

(function(global) {
'use strict';
if (!global.ArcBehaviors) {
  /**
   * @namespace ArcBehaviors
   */
  global.ArcBehaviors = {};
}

/**
 * Contains a common function for authorization dialogs.
 *
 * Implementations should be named according to pattern `auth-dialog-[type]`.
 * The type is set on `auth-dialog-closed` event's `type` property.
 *
 * @polymer
 * @mixinFunction
 * @memberof ArcBehaviors
 */
ArcBehaviors.AuthDialogMixin = dedupingMixin((base) => {
  /**
   * @polymer
   * @mixinClass
   */
  class ADBmixin extends base {
    static get properties() {
      return {
        // True if the dialog is opened.
        opened: Boolean
      };
    }

    constructor() {
      super();
      this._onDialogClosed = this._onDialogClosed.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('iron-overlay-closed', this._onDialogClosed);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('iron-overlay-closed', this._onDialogClosed);
    }

    _onDialogClosed(e) {
      e.stopPropagation();

      const detail = {
        canceled: false
      };
      if (e.detail.canceled || !e.detail.confirmed) {
        detail.canceled = true;
      } else {
        detail.type = this.nodeName.toLowerCase().replace('auth-dialog-', '');
        detail.value = this._getValue();
      }
      this.dispatchEvent(new CustomEvent('auth-dialog-closed', {
        composed: true,
        bubbles: true,
        detail
      }));
    }
    /**
     * Creates the `value` object to be passed to the `auth-dialog-closed` custom event.
     */
    _getValue() {
      console.warn('The _getValue function not implemented in the dialog implementation.');
    }
  }
  return ADBmixin;

  /**
   * Fired when the user accepts or closes the dialog.
   *
   * @event auth-dialog-closed
   * @param {Object} value Authorization data from the dialog. It may vary depending on dialog type.
   * @param {String} type Authorization type of the dialog. `basic`, `ntlm` etc.
   * @param {Boolean} canceled True if the dialog was canceled. If true then other properties are
   * not set.
   */
});
})(window);
