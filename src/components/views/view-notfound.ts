import { html } from 'lit-element'
import { PageViewElement } from '../page-view-element.js'

// These are the shared styles needed by this element.
import { styles as SharedStyles } from '../styles/shared-styles.js'

class ViewNotfound extends PageViewElement {
  static styles = SharedStyles

  protected render() {
    return html`
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>
          The page you're looking for doesn't seem to exist. Head back
          <a href="/">home</a> and try again?
        </p>
      </section>
    `
  }
}

export const title: string = 'Ups… Seite nicht gefunden'

customElements.define('view-notfound', ViewNotfound)
