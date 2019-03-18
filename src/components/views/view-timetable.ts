import { html, css, CSSResult, property } from 'lit-element'
import { PageViewElement } from '../page-view-element.js'

import { connect } from 'pwa-helpers'

import dateback from '../../functions/dateback.js'

// These are the shared styles needed by this element.
import { styles as SharedStyles } from '../styles/shared-styles.js'
import { styles as ViewStyles } from '../styles/view-styles.js'

import { store, RootState } from '../../store.js'
import { changeSource } from '../../actions/timetable.js'

import '../timetable-grid/timetable-grid.js'
import '../timetable-toggle/timetable-toggle.js'
import '../timetable-select/timetable-select.js'

class ViewTimetable extends connect(store)(PageViewElement) {
  @property({ type: String })
  private _source: string = ''

  /* @property({ type: String })
  private _mode: string = '' */

  @property({ type: String })
  private _timestamp: Date = new Date(0)

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

      user-select: none;

      height: 40px;
    }

    #menubar > * {
      display: inline-block;

      float: left;

      margin-right: 32px;
    }

    #timestamp {
      float: right;
      height: 100%;
      line-height: 40px;

      color: white;
      opacity: .7;
      font-weight: 500;
    }
  `

  protected render() {
    return html`
      <h1 id="title">Mein Stundenplan</h1>
      <div id="menubar" role="menubar">
        <timetable-toggle on="Klassen" off="Lehrer"></timetable-toggle>
        <timetable-select
          @change=${(e: { target: { value: string } }) =>
            store.dispatch(changeSource(e!.target!.value))}
          value=${this._source}
        >
          <option value="1A">1A</option>
          <option value="1B">1B</option>
          <option value="2A">2A</option>
          <option value="2B">2B</option>
          <option value="3A">3A</option>
          <option value="3B">3B</option>
        </timetable-select>

        <div id="timestamp">
          zuletzt aktualisiert ${dateback(this._timestamp)}
        </div>
      </div>
    `
  }

  stateChanged(state: RootState) {
    this._source = state.timetable!.source
    /* this._mode = state.timetable!.mode */
    this._timestamp = new Date(state.timetable!.timestamp)
  }
}

export const title: string = 'Mein Stundenplan'

customElements.define('view-timetable', ViewTimetable)
