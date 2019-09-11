import { fixture, assert, aTimeout } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import '../auth-dialog-ntlm.js';

describe('<auth-dialog-ntlm>', function() {
  async function basicFixture() {
    return await fixture(`<auth-dialog-ntlm opened></auth-dialog-ntlm>`);
  }

  let element;
  const username = 'test';
  const password = 'test';
  const domain = 'test-domain/nt';

  beforeEach(async () => {
    element = await basicFixture();
  });

  it('dispatches auth-dialog-closed event when closing', async () => {
    const spy = sinon.spy();
    element.addEventListener('auth-dialog-closed', spy);
    element.opened = false;
    await aTimeout(50);
    assert.isTrue(spy.called);
  });

  it('sets canceled when dismissing dialog', async () => {
    const spy = sinon.spy();
    element.addEventListener('auth-dialog-closed', spy);
    const button = element.shadowRoot.querySelector('anypoint-button[dialog-dismiss]');
    button.click();
    await aTimeout(50);
    assert.isTrue(spy.args[0][0].detail.canceled);
  });

  it('Fires auth-dialog-closed when accepted', function(done) {
    element.username = username;
    element.password = password;
    element.domain = domain;
    element.addEventListener('auth-dialog-closed', function() {
      done();
    });
    const button = element.shadowRoot.querySelector('anypoint-button[dialog-confirm]');
    button.click();
  });

  it('auth-dialog-closed contains auth data', function(done) {
    element.username = username;
    element.password = password;
    element.domain = domain;
    element.addEventListener('auth-dialog-closed', function(e) {
      assert.equal(e.detail.value.username, username, 'User name is set');
      assert.equal(e.detail.value.password, password, 'Password is set');
      assert.equal(e.detail.value.domain, domain, 'Domain is set');
      assert.equal(e.detail.type, 'ntlm', 'Type is set');
      done();
    });
    const button = element.shadowRoot.querySelector('anypoint-button[dialog-confirm]');
    button.click();
  });
});
