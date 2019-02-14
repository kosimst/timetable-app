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

import 'boxicons'

import { store, RootState } from '../../store.js'

import {
  navigate,
  updateOffline,
  updateDrawerState,
  AppActionUpdateDrawerState,
} from '../../actions/app.js'

import '../snack-bar.js'

// Imports os styles
import { styles } from './navbar-styles.js'

class TimetableApp extends connect(store)(LitElement) {
  @property({ type: String })
  appTitle: string = ''

  @property({ type: String })
  private _page: string = ''

  @property({ type: Boolean })
  private _snackbarOpened: boolean = false

  @property({ type: Boolean })
  private _offline: boolean = false

  static styles: CSSResult = css`
    :host {
      display: block;

      width: 100vw;
      height: 100vh;

      /* Theme */
      --theme-sidebar-color: #172a3a;

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
    }

    /* Styling of sidebar */
    ${styles}
  `

  protected render(): TemplateResult {
    return html`
      <aside id="sidebar">
        <nav>
          <a ?selected="${this._page === 'view-main'}" href="/main">
            <box-icon type="solid" name="user-detail"></box-icon>
          </a>
          <div class="center">
            <a ?selected="${this._page === 'view2'}" href="/view2"
              ><box-icon name="calendar"></box-icon
            ></a>
            <a ?selected="${this._page === 'view3'}" href="/view3"
              ><box-icon name="book-open" type="solid"></box-icon
            ></a>
          </div>
          <a ?selected="${this._page === 'view3'}" href="/view3"
            ><box-icon name="cog"></box-icon
          ></a>
        </nav>
      </aside>

      <main role="main" class="main-content">
        <view-main class="page" ?active="${this._page === 'main'}"></view-main>
        <my-view2 class="page" ?active="${this._page === 'view2'}"></my-view2>
        <my-view3 class="page" ?active="${this._page === 'view3'}"></my-view3>
        <my-view404
          class="page"
          ?active="${this._page === 'view404'}"
        ></my-view404>
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
  }

  protected updated(changedProps: PropertyValues): void {
    if (changedProps.has('_page')) {
      const pageTitle: string = this.appTitle + ' - ' + this._page
      updateMetadata({
        title: pageTitle,
        description: pageTitle,
      })
    }
  }

  stateChanged(state: RootState) {
    this._page = state.app!.page
    this._offline = state.app!.offline
    this._snackbarOpened = state.app!.snackbarOpened
  }
}

window.customElements.define('timetable-app', TimetableApp)
