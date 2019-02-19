/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css, property } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store, RootState } from '../store.js';

// These are the actions needed by this element.
import { checkout } from '../actions/shop.js';

// We are lazy loading its reducer.
import shop, { cartQuantitySelector } from '../reducers/shop.js';
store.addReducers({
  shop
});

// These are the elements needed by this element.
import './shop-products.js';
import './shop-cart.js';

// These are the shared styles needed by this element.
import { styles as SharedStyles } from './styles/shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { addToCartIcon } from './my-icons.js';

class MyView3 extends connect(store)(PageViewElement) {
  @property({type: Number})
  private _quantity = 0;

  @property({type: String})
  private _error = '';

  static styles = [
    SharedStyles,
    ButtonSharedStyles,
    css`
      button {
        border: 2px solid var(--app-dark-text-color);
        border-radius: 3px;
        padding: 8px 16px;
      }

      button:hover {
        border-color: var(--app-primary-color);
        color: var(--app-primary-color);
      }

      .cart,
      .cart svg {
        fill: var(--app-primary-color);
        width: 64px;
        height: 64px;
      }

      .circle.small {
        margin-top: -72px;
        width: 28px;
        height: 28px;
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
      }
    `
  ];

  protected render() {
    return html``;
  }

  private _checkoutButtonClicked() {
    store.dispatch(checkout());
  }

  // This is called every time something is updated in the store.
  stateChanged(state: RootState) {
    this._quantity = cartQuantitySelector(state);
    this._error = state.shop!.error;
  }
}

customElements.define('my-view3', MyView3);
