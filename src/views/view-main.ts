/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element'
import { PageViewElement } from '../components/page-view-element.js'

// These are the shared styles needed by this element.
import { styles as SharedStyles } from '../styles/shared-styles.js'
import { styles as ViewStyles } from '../styles/view-styles.js'

class ViewMain extends PageViewElement {
  static styles = css`
    ${SharedStyles}
    ${ViewStyles}

    :host {
      display: grid;

      grid-template-columns: 90% 10%;
      grid-template-rows: 15% 10% 80%;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
      justify-items: stretch;
      align-items: stretch;
    }

    h1#title {
      padding-left: 64px;
      align-self: end;
    }
  `

  protected render() {
    return html`
      <h1 id="title">Mein Stundenplan</h1>
    `
  }
}

window.customElements.define('view-main', ViewMain)
