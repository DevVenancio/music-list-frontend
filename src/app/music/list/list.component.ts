import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';
import { Music, MusicService } from '../music.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips'
import { LucidePlus, LucideCardSim, LucideTable, LucideTrash, LucideInfo } from '@lucide/angular'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatChipsModule, RouterOutlet, LucidePlus, LucideCardSim, LucideTable, LucideTrash, LucideInfo],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  musicList: Music[] = []; 
  dataSource: any;
  displayedColumns: string[] = ['imgSong', 'singer', 'song', 'genre', 'playlist', 'registrationDate']; 
  viewMode: 'cards' | 'table' = 'cards'; 

  constructor(private http: HttpClient, private router: Router, private musicService: MusicService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    console.log('ListComponent inicializado');
    this.fetchMusic();
  }

  
  fetchMusic(): void {
    console.log('Iniciando a busca de músicas...');
    this.musicService.getMusics().subscribe({
      next: (data) => {
        if (data != null){
          this.musicList = data;
        } else {
          this.musicList = []
        }
      },
      error: (error) => {
        console.error('Erro ao buscar as músicas', error);
        this.snackBar.open('Erro ao buscar as músicas!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.musicList);
        console.info('Busca de músicas concluída');
      }
    });
  }

  // Função para confirmar e excluir música
  confirmMusicDelete(musicId: string): void {
    const confirmation = window.confirm('Tem certeza de que deseja excluir esta música?');
    if (confirmation) {
      this.deleteMusic(musicId);
    }
  }

  // Função para excluir música
  deleteMusic(musicId: string): void {
    this.musicService.deleteMusic(musicId).subscribe({
      next: () => {
        // Atualiza a lista após a exclusão
        this.musicList = this.musicList.filter(music => music._id !== musicId);
        this.snackBar.open('Música excluída com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        console.error('Erro ao excluir a música', error);
        this.snackBar.open('Erro ao excluir a música!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => {
        console.info('Exclusão de música completa');
      }
    });
  }

  viewMusicDetails(musicId: string): void {
    this.router.navigate(['/music-details', musicId]); // Navega para o componente de detalhes
  }
  
  addNewMusic(): void {
    this.router.navigate(['/new-music']); // Redireciona para a rota /new
  }

}

