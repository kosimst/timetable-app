import { LitElement } from "lit-element";

export interface Icon extends LitElement {
  paint: (duration: number) => void
}