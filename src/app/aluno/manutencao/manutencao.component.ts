import { Component } from '@angular/core';
import {Aluno} from "../../shared/model/aluno";
import {ALUNOS} from "../../shared/model/ALUNOS";
import {AlunoService} from "../../shared/services/aluno.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent {

  readonly NOME_BOTAO_CADASTRAR = 'Cadastrar';
  readonly NOME_BOTAO_ATUALIZAR = 'Atualizar';
  alunoTratamento: Aluno;
  mensagemErro = '';
  estahCadastrando = true;
  nomeBotao = this.NOME_BOTAO_CADASTRAR;

  constructor(private alunoService: AlunoService, private rotaAtivada: ActivatedRoute) {
    const idEdicao = this.rotaAtivada.snapshot.params['id'];
    if (idEdicao) {
      this.estahCadastrando = false;
      this.alunoService.pesquisarPorId(idEdicao).subscribe(alunoRetornado => {
        this.alunoTratamento = alunoRetornado;
      });
    }
    this.alunoTratamento = new Aluno('','', '', 0);
    this.nomeBotao = this.estahCadastrando ? this.NOME_BOTAO_CADASTRAR : this.NOME_BOTAO_ATUALIZAR;
  }

  cadastrar(): void {
    this.alunoService.cadastrar(this.alunoTratamento).subscribe(
      alunoCadastrado => {
        console.log(alunoCadastrado);
      }
    );
  }

  // private ehMatriculaCadastrada(matricula: string): boolean {
  //   const alunosRetornados = this.alunos.filter(aluno => aluno.matricula === matricula);
  //   return alunosRetornados.length > 0;
  // }

}
