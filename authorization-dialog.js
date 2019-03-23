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
import { PolymerElement } from '../@polymer/polymer/polymer-element.js';

import { mixinBehaviors } from '../@polymer/polymer/lib/legacy/class.js';
import '../@polymer/paper-button/paper-button.js';
import '../@polymer/paper-styles/shadow.js';
import { PaperDialogBehavior } from '../@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import { NeonAnimationRunnerBehavior } from '../@polymer/neon-animation/neon-animation-runner-behavior.js';
import '../@polymer/neon-animation/animations/slide-from-top-animation.js';
import '../@polymer/neon-animation/animations/slide-up-animation.js';
import '../@polymer/neon-animation/animations/fade-out-animation.js';
import '../@polymer/neon-animation/animations/fade-in-animation.js';
import { html } from '../@polymer/polymer/lib/utils/html-tag.js';
/**
 * Base authorization dialog for Advanced REST Client. It is to be used to
 * create authorization dialogs with common UI and animations.
 *
 * The dialog extends `Polymer.PaperDialogBehavior` so the hosting application
 * should listen for it's events to determine dialog's state.
 *
 * ### Example
 *
 * ```html
 * <authorization-dialog>
 *  <h2 slot="title">Basic authorization</h2>
 *  <form>
 *   <input type="text" name="login"/>
 *  </form>
 * </authorization-dialog>
 * ```
 *
 * ### Styling
 *
 * `<authorization-dialog>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--authorization-dialog` | Mixin applied to the element | `{}`
 * `--authorization-dialog-title` | Mixin applied to the title of the dialog | `{}`
 *
 * Also it implements all `paper-dialog` mixins and variables.
 *
 * @polymer
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 * @appliesMixin Polymer.PaperDialogBehavior
 * @appliesMixin Polymer.NeonAnimationRunnerBehavior
 */
class AuthorizationDialog extends mixinBehaviors([
    PaperDialogBehavior,
    NeonAnimationRunnerBehavior
  ], PolymerElement) {
  static get template() {
    return html`
    <style>
     :host {
      display: block;
      margin: 24px 40px;
      -webkit-overflow-scrolling: touch;
      top: 0px;
      background: var(--paper-dialog-background-color, var(--primary-background-color));
      color: var(--paper-dialog-color, var(--primary-text-color));
      @apply --arc-font-body1;
      @apply --shadow-elevation-16dp;
      @apply --paper-dialog;
      @apply --authorization-dialog;
    }

    .dialog > * {
      margin-top: 20px;
      padding: 0 24px;
    }

    .dialog ::slotted(h2) {
      margin: 0;
      margin-top: 24px;
      position: relative;
      padding: 0 24px;
      @apply --arc-font-title;
      @apply --paper-dialog-title;
      @apply --authorization-dialog-title;
    }

    .content ::slotted(*:last-child) {
      margin-bottom: 24px;
    }

    .dialog > .buttons {
      position: relative;
      padding: 8px 8px 8px 24px;
      margin: 0;
      margin-bottom: 24px;
      color: var(--paper-dialog-button-color, var(--primary-color));
      @apply --layout-horizontal;
      @apply --layout-end-justified;
    }
    </style>
    <div class="dialog">
      <slot name="title"></slot>
      <div class="content">
        <slot></slot>
      </div>
      <div class="buttons">
        <paper-button dialog-dismiss="">Cancel</paper-button>
        <paper-button dialog-confirm="">Accept</paper-button>
      </div>
    </div>
`;
  }

  static get is() { return 'authorization-dialog'; }
  static get properties() {
    return {
      animationConfig: {
        value() {
          return {
            entry: [{
              name: 'slide-from-top-animation',
              node: this
            }, {
              name: 'fade-in-animation',
              node: this
            }],
            exit: [{
              name: 'slide-up-animation',
              node: this
            }, {
              name: 'fade-out-animation',
              node: this
            }]
          };
        }
      },
      // Set to true to disable canceling the overlay by clicking outside it.
      noCancelOnOutsideClick: {
        type: Boolean,
        value: true
      }
    };
  }

  constructor() {
    super();
    this._onNeonAnimationFinish = this._onNeonAnimationFinish.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('neon-animation-finish', this._onNeonAnimationFinish);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('neon-animation-finish', this._onNeonAnimationFinish);
  }

  _renderOpened() {
    this.cancelAnimation();
    this.playAnimation('entry');
  }

  _renderClosed() {
    this.cancelAnimation();
    this.playAnimation('exit');
  }

  _onNeonAnimationFinish() {
    if (this.opened) {
      this._finishRenderOpened();
    } else {
      this._finishRenderClosed();
    }
  }
}
window.customElements.define(AuthorizationDialog.is, AuthorizationDialog);
