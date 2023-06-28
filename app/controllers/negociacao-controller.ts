import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");

  constructor() {
    this.inputData = document.querySelector("#data");
    this.inputQuantidade = document.querySelector("#quantidade");
    this.inputValor = document.querySelector("#valor");
    this.negociacoesView.update(this.negociacoes);
  }

  public adiciona(): void {
    
    const negociacao = this.criaNegociacao();
    if (this.isDiaUtil(negociacao.data)) {
      this.negociacoes.adiciona(negociacao);
      this.atulizaView();
      this.limparFormulario();
    } else
      this.AtualizaMensagemView("Apenas Negociações em dias úteis são aceitas");
    
  }

  private criaNegociacao(): Negociacao {
    const exp = /-/g;
    const date = new Date(this.inputData.value.replace(exp, ","));
    const quantidade = parseInt(this.inputQuantidade.value);
    const valor = parseFloat(this.inputValor.value);
    return new Negociacao(date, quantidade, valor);
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "1";
    this.inputValor.value = "0.0";
    this.inputData.focus();
  }

  private atulizaView(){
    this.negociacoesView.update(this.negociacoes);
    this.AtualizaMensagemView("Negociação Incluida com Sucesso");
  }

  private AtualizaMensagemView(opcao: string): void{
    this.mensagemView.update(opcao);
  }

  private isDiaUtil(data: Date){
      return (
        data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO
      );
  }
}
