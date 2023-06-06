import {Negociacao} from './models/negociacao.js';

const negociacao = new Negociacao(new Date());

negociacao.quantidade = 10;

console.log(negociacao);
