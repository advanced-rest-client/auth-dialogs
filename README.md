[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/auth-dialogs.svg)](https://www.npmjs.com/package/@advanced-rest-client/auth-dialogs)

[![Build Status](https://travis-ci.org/advanced-rest-client/auth-dialogs.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/auth-dialogs)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/auth-dialogs)


# &lt;auth-dialogs&gt;

Common authorization dialogs to provide client credentials

## Example:

```html
<auth-dialog-basic on-auth-dialog-closed="onBasicAuthData"></auth-dialog-basic>
<auth-dialog-ntlm on-auth-dialog-closed="onAuthData"></auth-dialog-ntlm>
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/auth-dialogs
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_modules/@advanced-rest-client/auth-dialogs/auth-dialogs.js';
    </script>
  </head>
  <body>
    <auth-dialog-basic opened></auth-dialog-basic>
    <auth-dialog-ntlm></auth-dialog-ntlm>
    <script>
    Array.from(document.querySelectorAll('auth-dialog-basic,auth-dialog-ntlm'))
    .forEach((element) => {
      element.addEventListener('auth-dialog-closed', (e) => console.log(e.detail.value));
    });
    </script>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from './node_modules/@polymer/polymer/polymer-element.js';
import './node_modules/@advanced-rest-client/auth-dialogs/auth-dialogs.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <auth-dialog-basic on-auth-dialog-closed="onAuthData"></auth-dialog-basic>
    <auth-dialog-ntlm on-auth-dialog-closed="onAuthData"></auth-dialog-ntlm>
    `;
  }

  onAuthData(e) {
    if (!e.detail.cancelled) {
      console.log(e.detail.value);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const basic = this.shadowRoot.querySelector('auth-dialog-basic');
    basic.opened = true;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/auth-dialogs
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
