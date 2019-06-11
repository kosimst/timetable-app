import { html, css, CSSResult } from 'lit-element'
import { PageViewElement } from '../page-view-element.js'

// These are the shared styles needed by this element.
import { styles as SharedStyles } from '../styles/shared-styles.js'
import { styles as ViewStyles } from '../styles/view-styles.js'

import '../timetable-grid/timetable-grid.js'

class ViewMain extends PageViewElement {
  static styles: CSSResult = css`
    ${SharedStyles}
    ${ViewStyles}

    :host {
      display: grid;

      grid-template-columns: 2% 90% 8%;
      grid-template-rows: 12% 10% 78%;
      grid-column-gap: 0px;
      grid-row-gap: 0px;

      justify-items: stretch;
      align-items: stretch;
    }

    h1#title {
      align-self: end;
      grid-column-start: 2;
    }

    #menubar {
      grid-column-start: 2;
      align-self: center;

      user-select: none;

      height: 40px;
    }

    #container {
      grid-column-start: 2;
      grid-row-start: 3;

      width: 100%;
      height: 100%;

      display: flex;
    }
  `

  protected render() {
    return html`
      <h1 id="title">${
        (() => {
          const hour = (new Date()).getHours()

          if (hour < 12) {
            return 'Guten Morgen'
          } else if (hour < 18) {
            return 'Hallo'
          } else {
            return 'Guten Abend'
          }
        })()
      }!</h1>
      <div id="menubar">
        Melde dich an
      </div>
      <div id="container"></div>
    `
  }
}

export const title: string = 'Meine Startseite'

customElements.define('view-main', ViewMain)
