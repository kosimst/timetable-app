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

import { store, RootState } from '../store.js'

import {
  navigate,
  updateOffline,
  updateDrawerState,
  AppActionUpdateDrawerState,
} from '../actions/app.js'

import './snack-bar.js'

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

      --app-drawer-width: 256px;

      --app-primary-color: #e91e63;
      --app-secondary-color: #293237;
      --app-dark-text-color: var(--app-secondary-color);
      --app-light-text-color: white;
      --app-section-even-color: #f7f7f7;
      --app-section-odd-color: white;

      --app-header-background-color: white;
      --app-header-text-color: var(--app-dark-text-color);
      --app-header-selected-color: var(--app-primary-color);

      --app-drawer-background-color: var(--app-secondary-color);
      --app-drawer-text-color: var(--app-light-text-color);
      --app-drawer-selected-color: #78909c;
    }

    /* Styling of sidebar */
    #sidebar {
      position: fixed;
      left: 0;
      top: 0;

      width: 80px;
      height: 100vh;

      background: #172a3a;
    }
  `

  protected render(): TemplateResult {
    return html`
      <aside id="sidebar">
        <nav>
          <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
          <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
          <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
        </nav>
      </aside>

      <main role="main" class="main-content">
        <my-view1 class="page" ?active="${this._page === 'view1'}"></my-view1>
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
    this._drawerOpened = state.app!.drawerOpened
  }
}

window.customElements.define('timetable-app', TimetableApp)
