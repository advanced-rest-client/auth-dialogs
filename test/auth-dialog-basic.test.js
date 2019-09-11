import { fixture, assert, aTimeout } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import '../auth-dialog-basic.js';

describe('<auth-dialog-basic>', function() {
  async function basicFixture() {
    return await fixture(`<auth-dialog-basic opened></auth-dialog-basic>`);
  }

  let element;
  const username = 'test';
  const password = 'test';
  const hash = 'dGVzdDp0ZXN0';

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
    element.addEventListener('auth-dialog-closed', function() {
      done();
    });
    const button = element.shadowRoot.querySelector('anypoint-button[dialog-confirm]');
    button.click();
  });

  it('auth-dialog-closed contains auth data', function(done) {
    element.username = username;
    element.password = password;
    element.addEventListener('auth-dialog-closed', function(e) {
      assert.equal(e.detail.value.username, username, 'User name is set');
      assert.equal(e.detail.value.password, password, 'Password is set');
      assert.equal(e.detail.value.hash, hash, 'Hash is set');
      assert.equal(e.detail.type, 'basic', 'Type is set');
      done();
    });
    const button = element.shadowRoot.querySelector('anypoint-button[dialog-confirm]');
    button.click();
  });
});
