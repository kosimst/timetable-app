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

import '@polymer/paper-ripple/paper-ripple.js'

import { store, RootState } from '../../store.js'

import {
  navigate,
  updateOffline,
  updateDrawerState,
  AppActionUpdateDrawerState,
  /* toggleLoginDialog, */
} from '../../actions/app.js'

import '../snack-bar.js'

import '../../../assets/icons/student.svg.js'
import '../../../assets/icons/monitor.svg.js'
import '../../../assets/icons/cog.svg.js'
import '../../../assets/icons/homework.svg.js'

import { Icon } from '../../../assets/icons/icon'

// Imports os styles
import { styles } from './navbar-styles.js'
import { styles as shadows } from '../styles/shadows.js'
import { User } from '../../types/user.js'
import { logIn, updateUser } from '../../actions/user.js'
import { auth } from '../../firebase.js'

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

  /*   @property({ type: Boolean })
  private _loginDialogOpened: boolean = false */

  @property({ type: Object })
  private _user: User | null = null

  /* @property({ type: Boolean, reflect: true })
  private loading: boolean = true */

  static styles: CSSResult = css`
    /* Shadows */
    ${shadows}

    :host {
      display: block;

      width: 100vw;
      height: 100vh;

      /* Theme */
      --theme-sidebar-color: #172a3a;
      --theme-color: #09bc8a;
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

    /* Styles of user menu */
    #user {
      position: fixed;
      top: 8px;
      right: 12px;

      width: 150px;
      height: 40px;
      border-radius: 999px;

      background-color: white;
      box-shadow: var(--shadow-elevation-8dp);
      background: var(--theme-second-gradient);
      transition: var(--shadow-transition);

      overflow: hidden;
    }

    #sign-in {
      border: none;
      outline: none;
      font-family: Poppins;
      color: white;
      background: #0000;
      font-weight: 600;

      height: 100%;
      width: 100%;
      font-size: 16px;
      border-radius: inherit;
      cursor: pointer;

      transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #user:hover {
      box-shadow: var(--shadow-elevation-16dp);
    }

    #user:hover #sign-in {
      background: #0002;
    }

    #user img {
      display: none;
    }

    #user[data-logged-in] img {
      display: inline-block;
      width: 32px;
      height: 32px;

      position: absolute;
      left: 4px;
      top: 4px;
      border-radius: 99px;

      z-index: 100;
    }

    #user[data-logged-in] {
      width: 200px;
    }

    #user[data-logged-in]::before {
      content: '';
      position: absolute;

      width: 40px;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: inherit;
      background: white;
      filter:
        drop-shadow(10px 0 15px white)
        drop-shadow(2.5px 0 2.5px white)
      ;
    }

    #user[data-logged-in] span {
      position: absolute;
      right: 16px;
      top: 0;
      line-height: 40px;
    }

    /* Login dialog */
    #login-dialog {
      position: fixed;
      z-index: 10000;

      top: 10%;
      left: 50%;
      transform: translateX(-50%) scale(0);

      width: 300px;
      height: 400px;

      background: white;
      box-shadow: var(--shadow-elevation-16dp);
      border-radius: 10px;

      transition: transform 0.2s ease-out;
    }

    #login-dialog[data-opened] {
      transform: translateX(-50%) scale(1);
    }

    /* Overlay for dialogs */
    #overlay {
      width: 100vw;
      height: 100vh;

      top: 0;
      left: 0;

      position: fixed;

      background: var(--theme-second-gradient);
      opacity: 0;
      z-index: 9999;

      visibility: hidden;

      transition: opacity 0.4s ease-out;
    }

    #overlay[data-opened] {
      visibility: visible;
      opacity: 0.9;
    }
  `

  protected render(): TemplateResult {
    return html`
      <aside id="sidebar">
        <nav>
          <a ?current="${this._page === 'main'}" href="/">
            <icon-student
              class="icon hover${this._page === 'main' ? ' active' : ''}"
            ></icon-student>
            <icon-student class="icon underlay"></icon-student>
          </a>
          <div class="center">
            <a ?current="${this._page === 'timetable'}" href="/timetable">
              <icon-monitor
                class="icon hover${this._page === 'timetable' ? ' active' : ''}"
              ></icon-monitor>
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

      <div id="user" ?data-logged-in="${!!this._user}">
        <button
          id="sign-in"
          @click="${this._user
            ? () => () => {}
            : () => store.dispatch(logIn())}"
        >
          <img src="${this._user ? this._user.photo : ''}" />
          <span>${this._user ? this._user.name : 'Anmelden'}</span>
          <paper-ripple></paper-ripple>
        </button>
      </div>

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

    auth().onAuthStateChanged((rawUser: any) => {
      if (rawUser) {
        const user: User = {
          email: rawUser.email,
          name: rawUser.displayName,
          photo: rawUser.photoURL,
        }

        store.dispatch(updateUser(user))
      }
    })
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
    /* this._loginDialogOpened = state.app!.loginDialogOpened */
    this._user = state.user!.user
    /* this.loading = state.app!.loading */
  }
}

customElements.define('timetable-app', TimetableApp)
