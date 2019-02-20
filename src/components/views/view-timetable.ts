import { html, css, CSSResult } from 'lit-element'
import { PageViewElement } from '../page-view-element.js'

// These are the shared styles needed by this element.
import { styles as SharedStyles } from '../styles/shared-styles.js'
import { styles as ViewStyles } from '../styles/view-styles.js'

import '../timetable-grid/timetable-grid.js'
import '../timetable-toggle/timetable-toggle.js'
import '../timetable-select/timetable-select.js'

class ViewTimetable extends PageViewElement {
  static styles: CSSResult = css`
    ${SharedStyles}
    ${ViewStyles}

    :host {
      display: grid;

      grid-template-columns: 2% 90% 8%;
      grid-template-rows: 12% 10% 83%;
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

      height: 40px;
    }

    #menubar > * {
      display: inline-block;

      float: left;

      margin-right: 32px;
    }
  `

  protected render() {
    return html`
      <h1 id="title">Mein Stundenplan</h1>
      <div id="menubar" role="menubar">
        <timetable-toggle on="Klassen" off="Lehrer"></timetable-toggle>
        <timetable-select>
          <option value="1A">1A</option>
          <option value="1B">1B</option>
          <option value="2A">2A</option>
          <option value="2B">2B</option>
          <option value="3A">3A</option>
          <option value="3B">3B</option>
        </timetable-select>
      </div>
    `
  }
}

export const title: string = 'Mein Stundenplan'

customElements.define('view-timetable', ViewTimetable)
