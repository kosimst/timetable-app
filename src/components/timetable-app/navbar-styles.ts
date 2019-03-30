import { css, CSSResult } from 'lit-element'

export const styles: CSSResult = css`
  #sidebar {
    position: fixed;
    left: 0;
    top: 0;

    width: var(--app-sidebar-width);
    height: 100vh;

    background: var(--theme-sidebar-color);

    --padding: 16px;
  }

  #sidebar nav box-icon {
    width: calc(var(--app-sidebar-width) - 2 * var(--padding));
    height: calc(var(--app-sidebar-width) - 2 * var(--padding));

    margin: var(--padding);

    fill: white;

    opacity: 0.8;

    transition: opacity 0.2s ease-out;
  }

  aside#sidebar nav > * {
    position: absolute;
  }

  #sidebar nav .center {
    top: 50%;

    transform: translateY(-50%);
  }

  #sidebar nav a:last-child {
    bottom: 0;
  }

  #sidebar a {
    display: block;

    position: relative;

    width: var(--app-sidebar-width);
    height: var(--app-sidebar-width);

    background-color: #0000;

    transition: background-color 0.2s ease-out;
  }

  #sidebar nav a:hover {
    background-color: #0002;
  }

  #sidebar nav a:hover box-icon {
    opacity: 0.9;
  }

  #sidebar nav a[current] {
    background-color: #0004;
  }

  #sidebar nav a[current] box-icon {
    opacity: 1;
  }

  #sidebar nav a::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 0;
    height: 100%;

    transition: width 0.2s ease-out;

    background-color: white;
  }

  #sidebar nav a[current]::after {
    width: 5px;
  }

  #sidebar > nav a > .icon {
    stroke: white;
    stroke-width: 1.5px;
    fill: none;

    display: inline-block;

    width: calc(var(--app-sidebar-width) - 2 * var(--padding));
    height: calc(var(--app-sidebar-width) - 2 * var(--padding));
    padding: var(--padding);

    position: absolute;

    z-index: 2;
  }

  #sidebar > nav a > .icon.underlay {
    stroke: #808B94;

    z-index: 1;
  }
`
