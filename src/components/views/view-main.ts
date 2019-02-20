import { html, css, CSSResult } from 'lit-element'
import { PageViewElement } from '../page-view-element.js'

// These are the shared styles needed by this element.
import { styles as SharedStyles } from '../styles/shared-styles.js'
import { styles as ViewStyles } from '../styles/view-styles.js'

import '../timetable-grid/timetable-grid.js'

class ViewMain extends PageViewElement {
  static styles: CSSResult = css`
    ${SharedStyles}
    ${ViewStyles}`

  protected render() {
    return html``
  }
}

export const title: string = 'Meine Startseite'

customElements.define('view-main', ViewMain)
