export class CustomFileInput extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.innerHTML = `
    <style>
    input{
    background: red;
    }
    </style>
    `
  }

  connectedCallback() {
    const input = document.createElement("input")
    input.type = "file"
    input.id = this.getAttribute("id") || ""
    input.addEventListener("change", (e) => {
      const event = new Event("change", { bubbles: true, cancelable: true })
      this.dispatchEvent(event)
    })

    this.shadowRoot?.appendChild(input)
  }
}
