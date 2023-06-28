import { View } from "./views";

export class MensagemView extends View<String> {
  
  protected  template(model: string): string {
    return `
            <p class="alert alert-info">${model}</p>
        `;
  }

  public update(model: string): void {
    const template = this.template(model);
    this.elemento.innerHTML = template;
  }
}

