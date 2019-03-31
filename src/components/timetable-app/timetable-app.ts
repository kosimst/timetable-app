import {
  LitElement,
  html,
  css,
  property,
  PropertyValues,
  CSSResult,
  TemplateResult,
} from 'lit-element'
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'
import { installOfflineWatcher } from 'pwa-helpers/network.js'
import { installRouter } from 'pwa-helpers/router.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'

import { store, RootState } from '../../store.js'

import {
  navigate,
  updateOffline,
  updateDrawerState,
  AppActionUpdateDrawerState,
} from '../../actions/app.js'

import '../snack-bar.js'

import '../../../assets/icons/student.svg.js'
import '../../../assets/icons/monitor.svg.js'
import '../../../assets/icons/cog.svg.js'
import '../../../assets/icons/homework.svg.js'

import { Icon } from '../../../assets/icons/icon'

// Imports os styles
import { styles } from './navbar-styles.js'

class TimetableApp extends connect(store)(LitElement) {
  @property({ type: String })
  public appTitle: string = ''

  @property({ type: String })
  private _page: string = ''

  @property({ type: Boolean })
  private _snackbarOpened: boolean = false

  @property({ type: Boolean })
  private _offline: boolean = false

  @property({ type: String })
  private _title: string = ''

  /* @property({ type: Boolean, reflect: true })
  private loading: boolean = true */

  static styles: CSSResult = css`
    :host {
      display: block;

      width: 100vw;
      height: 100vh;

      /* Theme */
      --theme-sidebar-color: #172a3a;
      --theme-main-gradient: linear-gradient(
        120.41deg,
        #508991 0%,
        #09bc8a 100%
      );
      --theme-second-gradient: linear-gradient(
        115.75deg,
        #004346 0%,
        #508991 100%
      );

      /* Layout */
      --app-sidebar-width: 64px;
    }

    /* Only show active view */
    .page:not([active]) {
      display: none;
    }

    /* Main */

    main {
      width: calc(100vw - var(--app-sidebar-width));
      height: 100%;

      margin-left: var(--app-sidebar-width);

      background-image: var(--theme-main-gradient);
    }

    /* Styling of sidebar */
    ${styles}
  `

  protected render(): TemplateResult {
    return html`
      <aside id="sidebar">
        <nav>
          <a ?current="${this._page === 'main'}" href="/">
            <icon-student class="icon hover${this._page === 'main' ? ' active' : ''}"></icon-student>
            <icon-student class="icon underlay"></icon-student>
          </a>
          <div class="center">
            <a ?current="${this._page === 'timetable'}" href="/timetable">
              <icon-monitor class="icon hover${this._page === 'timetable' ? ' active' : ''}"></icon-monitor>
              <icon-monitor class="icon underlay"></icon-monitor>
            </a>
            <a ?current="${this._page === 'view3'}" href="/view3">
              <icon-homework class="icon hover"></icon-homework>
              <icon-homework class="icon underlay"></icon-homework>
            </a>
          </div>
          <a ?current="${this._page === 'view3'}" href="/view3">
            <icon-cog class="icon hover"></icon-cog>
            <icon-cog class="icon underlay"></icon-cog>
          </a>
        </nav>
      </aside>

      <main role="main" class="main-content">
        <view-main class="page" ?active="${this._page === 'main'}"></view-main>
        <view-timetable
          class="page"
          ?active="${this._page === 'timetable'}"
        ></view-timetable>
        <view-notfound
          class="page"
          ?active="${this._page === 'notfound'}"
        ></view-notfound>
      </main>

      <footer>
        <p>Made with &hearts; by the Polymer team.</p>
      </footer>

      <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.
      </snack-bar>
    `
  }

  constructor() {
    super()
    setPassiveTouchGestures(true)
  }

  protected firstUpdated(): void {
    installRouter(
      (location: Location): void =>
        store.dispatch(navigate(decodeURIComponent(location.pathname))),
    )
    installOfflineWatcher(
      (offline: boolean): void => store.dispatch(updateOffline(offline)),
    )
    installMediaQueryWatcher(
      `(min-width: 460px)`,
      (): AppActionUpdateDrawerState =>
        store.dispatch(updateDrawerState(false)),
    )

    if (this.shadowRoot) {
      const icons = [...this.shadowRoot.querySelectorAll('.icon')] as Icon[]

      requestAnimationFrame(() => {
        icons.forEach(icon => icon.paint(300))
      })
    }
  }

  protected updated(changedProps: PropertyValues): void {
    if (changedProps.has('_description') || changedProps.has('_title')) {
      updateMetadata({
        title: this._title,
        description: this._title,
      })
    }
  }

  stateChanged(state: RootState) {
    this._page = state.app!.page
    this._offline = state.app!.offline
    this._snackbarOpened = state.app!.snackbarOpened
    this._title = state.app!.title
    /* this.loading = state.app!.loading */
  }
}

customElements.define('timetable-app', TimetableApp)
