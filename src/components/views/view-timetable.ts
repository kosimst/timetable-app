import { html, css, CSSResult, property } from 'lit-element'
import { PageViewElement } from '../page-view-element.js'

import { connect } from 'pwa-helpers'

import dateback from '../../functions/dateback.js'

// These are the shared styles needed by this element.
import { styles as SharedStyles } from '../styles/shared-styles.js'
import { styles as ViewStyles } from '../styles/view-styles.js'

import { store, RootState } from '../../store.js'
import {
  changeSource,
  loadTimetable,
  updateSources,
  updateColors,
} from '../../actions/timetable.js'

import '../timetable-grid/timetable-grid.js'
import '../timetable-toggle/timetable-toggle.js'
import '../timetable-select/timetable-select.js'

import '../timetable-grid/timetable-grid.js'
import '../timetable-hour/timetable-hour.js'

import { Week } from '../../types/timetable'

class ViewTimetable extends connect(store)(PageViewElement) {
  @property({ type: String })
  private _source: string = ''

  /* @property({ type: String })
  private _mode: string = '' */

  @property({ type: String })
  private _timestamp: Date = new Date(0)

  private _timetable: Week = []

  private _unloadTimestamp: number = 0

  @property({ type: Boolean })
  private _unload: boolean = false

  @property({ type: Number })
  private _highest: number = 0

  @property({ type: Object })
  private _sources: {
    [short: string]: string | number
  } = {}

  @property({ type: Object })
  private _colors: {
    [subject: string]: string
  } = { default: '#1155ff' }

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
      opacity: 0.7;
      font-weight: 500;
    }

    #timetable {
      grid-column-start: 2;
    }

    timetable-select {
      z-index: 3;
    }
  `

  protected render() {
    return html`
      <h1 id="title">Mein Stundenplan</h1>
      <div id="menubar" role="menubar">
        <timetable-toggle
          on="Klassen"
          off="Lehrer"
          @click="${this._changeMode}"
        ></timetable-toggle>
        <timetable-select @change=${this._changeSource} value=${this._source}>
          ${Object.entries(this._sources).map(
            ([short]) =>
              html`
                <option>${short}</option>
              `,
          )}
        </timetable-select>

        <div id="timestamp">
          zuletzt aktualisiert ${dateback(this._timestamp)}
        </div>
      </div>

      <timetable-grid id="timetable">
        ${this._timetable.map((day, i) => {
          return day.map((hour, h) => {
            return html`
              <div day="${i}" hour="${h}">
                ${hour &&
                  hour.map(
                    (
                      { subjectShort, subjectLong, roomLong, klasseShort },
                      j,
                    ) => {
                      return html`
                        <timetable-hour
                          subjectShort="${subjectShort}"
                          subjectLong="${subjectLong}"
                          roomLong="${roomLong}"
                          klasseShort="${klasseShort}"
                          color="${this._colors[subjectShort] ||
                            this._colors['default']}"
                          day="${i}"
                          hour="${h}"
                          order="${j}"
                          total="${hour.length}"
                          class="${this._unload ? 'unload' : ''}"
                          style="
                        --color: ${this._colors[subjectShort] ||
                            this._colors['default']};
                        --color-brighter:${this._colors[subjectShort] ||
                            this._colors['default']}AA;
                        --delay: ${i + h};
                        --highest: ${this._highest};
                        --total: ${1};
                        --order: ${j};
                        display: ${j === 0 ? 'block' : 'none'}
                      "
                        ></timetable-hour>
                      `
                    },
                  )}
              </div>
            `
          })
        })}
      </timetable-grid>
    `
  }

  constructor() {
    super()

    // @ts-ignore
    store.dispatch(loadTimetable(store.getState().timetable.source))
    // @ts-ignore
    store.dispatch(updateSources(store.getState().timetable.mode))

    store.dispatch(updateColors())
  }

  stateChanged(state: RootState) {
    this._source = state.timetable!.source
    /* this._mode = state.timetable!.mode */
    this._timestamp = new Date(state.timetable!.timestamp)

    this._sources = state.timetable!.sources
    this._colors = state.timetable!.colors

    if (state.timetable!.timetable && state.timetable!.timetable.length) {
      if (this._unloadTimestamp + this._highest * 50 + 300 <= Date.now()) {
        // @ts-ignore
        this._timetable = store.getState().timetable!.timetable
        this._unload = false
      } else {
        setTimeout(() => {
          this._unload = false
          // @ts-ignore
          this._timetable = store.getState().timetable!.timetable
        }, this._unloadTimestamp + this._highest * 50 + 300 - Date.now())
      }

      // @ts-ignore
      this._highest = [...state.timetable!.timetable].pop().length - 1 + 4
    }
  }

  _loadingFinished() {
    this._unload = false
  }

  _changeSource(e: Event) {
    store.dispatch(changeSource((e!.target as HTMLInputElement).value))

    this._unloadTimestamp = Date.now()
    this._unload = true
  }

  _changeMode() {
    // @ts-ignore
    const current = store.getState().timetable.mode

    store.dispatch(
      updateSources(current === 'klassen' ? 'teachers' : 'klassen'),
    )
  }
}

export const title: string = 'Mein Stundenplan'

customElements.define('view-timetable', ViewTimetable)
