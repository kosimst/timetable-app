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
      display: block;
    }

    * {
      margin: 0;
      padding: 0;
    }
  `

  protected render() {
    return html`
      <h1>Hallo!</h1>
      <p>
        Diese Seite ist noch lange nicht fertig, das einzige, dass es bis jetzt
        zu sehen gibt findest du <a href="/timetable">hier</a>. Der Stundenplan
        wird momentan noch zufällig generiert, es geht nur um das Design und die
        Animationen. Außerdem ist die Sidebar schon fertig inklusive Animationen.
      </p>
    `
  }
}

export const title: string = 'Meine Startseite'

customElements.define('view-main', ViewMain)
