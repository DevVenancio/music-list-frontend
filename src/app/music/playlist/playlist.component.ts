import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LucideInfo, LucidePlus, LucideTrash } from '@lucide/angular';
import { Playlist, PlaylistServices } from '../music.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [ MatCardModule, RouterOutlet, LucidePlus, LucideInfo, LucideTrash ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})

export class PlaylistComponent {

  playlistList: Playlist[] = [];
  dataSource: any;

  constructor(private http: HttpClient, private router: Router, private playlistService: PlaylistServices, private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    console.log('ListComponent inicializado');
    this.fetchPlaylist();
  }

  fetchPlaylist(): void {
      console.log('Iniciando a busca de músicas...');
      this.playlistService.getPlaylists().subscribe({
        next: (data) => {
          if (data != null){
            this.playlistList = data;
          } else {
            this.playlistList = []
          }
        },
        error: (error) => {
          console.error('Erro ao buscar as playlists.', error);
          this.snackBar.open('Erro ao buscar as playlists.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        complete: () => {
          console.info('Busca de playlists concluída');
        }
      });
    }

  confirmPlaylistDelete(playlistId: string): void {
    const confirmation = window.confirm('Tem certeza de que deseja excluir esta playlist?');
    if (confirmation) {
      this.deletePlaylist(playlistId);
    }
  }

  // Função para excluir música
  deletePlaylist(playlistId: string): void {
    this.playlistService.deletePlaylist(playlistId).subscribe({
      next: () => {
        // Atualiza a lista após a exclusão
        this.playlistList = this.playlistList.filter(playlist => playlist._id !== playlistId);
        this.snackBar.open('Playlist excluída com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        console.error('Erro ao excluir a playlist!', error);
        this.snackBar.open('Erro ao excluir a playlist!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => {
        console.info('Exclusão de playlist completa');
      }
    });
  }

  viewPlaylistDetails(playlistId: string): void {
    this.router.navigate(['/playlist-details', playlistId]); 
  }
  
  addNewPlaylist(): void {
    this.router.navigate(['/new-playlist']); 
  }

}
