import {Component, OnInit} from '@angular/core';
import {ALUNOS} from "../../shared/model/ALUNOS";
import {Aluno} from "../../shared/model/aluno";
import {AlunoService} from "../../shared/services/aluno.service";

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  alunos: Aluno[] = [];
  alunosPesquisa: Array<Aluno> = [];

  constructor(private alunoService: AlunoService) {
  }

  ngOnInit() {
    this.alunoService.listar().subscribe(alunosRetornados =>
      {
        this.alunos = alunosRetornados;
      }
    );
    console.log('estou aqui');
    console.log(this.alunos);
  }

  remover(alunoARemover: Aluno): void {
    this.alunoService.remover(alunoARemover).subscribe( alunoRemovido => {
        console.log('Aluno removido');
      const indxARemover = this.alunos.findIndex(aluno =>
        aluno.matricula === alunoARemover.matricula);

      if (indxARemover >= 0) {
        this.alunos.splice(indxARemover, 1);
      }

      }
    );

  }

  pesquisar(pedacoNome: string) {
    if (pedacoNome.length == 0) {
      this.alunosPesquisa = [];
    }
    this.alunos.forEach(aluno => {
      if (aluno.nome.startsWith(pedacoNome)) {
        this.alunosPesquisa.push(aluno);
      }
    });
  }

}
