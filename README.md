[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/auth-dialogs.svg)](https://www.npmjs.com/package/@advanced-rest-client/auth-dialogs)

[![Build Status](https://travis-ci.org/advanced-rest-client/auth-dialogs.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/auth-dialogs)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/auth-dialogs)


# &lt;auth-dialogs&gt;

Authorization dialogs to provide client credentials for Basic and NTLM authorization schemes.
Used primarily in Advanced REST Client.

## Usage

### Installation
```
npm install --save @advanced-rest-client/auth-dialogs
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/auth-dialogs/auth-dialogs.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <auth-dialog-basic @auth-dialog-closed="${this.onAuthData}"></auth-dialog-basic>
    <auth-dialog-ntlm @auth-dialog-closed="${this.onAuthData}"></auth-dialog-ntlm>
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

## Development

```sh
git clone https://github.com/advanced-rest-client/auth-dialogs
cd auth-dialogs
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
