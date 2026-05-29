import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Playlist, PlaylistServices, PlaylistSongs } from '../../music.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideCheck, LucideList, LucidePen, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [ MatCardModule, MatTableModule,  ReactiveFormsModule, LucideList, LucidePen, LucideX, LucideCheck ],
  templateUrl: './detailPlaylist.component.html',
})

export class DetailPlaylist {

  playlist: Playlist | undefined
  playlistMusics: PlaylistSongs[] = [];
  isEditing = false;
  playlistForm: FormGroup;
  dataSource: any;

  displayedColumns: string[] = ['imgSong', 'singer', 'song']; 
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient, 
    private router: Router, 
    private playlistService: PlaylistServices, 
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.playlistForm = this.fb.group({
      imgPlaylist: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPlaylistDetails(id);
      this.getPlaylistMusics(id)
    }
  }

  getPlaylistMusics(playlistId: string): void {
    console.log('Iniciando a busca de músicas...');
    this.playlistService.getPlaylistsById(playlistId).subscribe({
      next: (data) => {
        if (data != null){
          this.playlistMusics = data.songs;
        } else {
          this.playlistMusics = []
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
        this.dataSource = new MatTableDataSource(this.playlistMusics);
        console.info('Busca de músicas concluída');
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  getPlaylistDetails(playlistId: string): void{
    this.playlistService.getPlaylistsById(playlistId).subscribe({
        next: (data) => {
          this.playlist = data;
          if (this.playlist) {
            this.playlistForm.patchValue({
              imgPlaylist: this.playlist.imgPlaylist,
              name: this.playlist.name,
            });
          };
        },
        error: (error) => {
          console.error('Erro ao obter os detalhes da playlist.', error);
          this.snackBar.open('Erro ao obter os detalhes da playlist.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        complete: () => {
          console.info('Detalhes da playlist carregados com sucesso');
        }
      });
    }

  updatePlaylist(): void {
    if (this.playlist && this.playlist._id) {
      const updatedPlaylist = {
        ...this.playlistForm.value
      };
  
      this.playlistService.updatePlaylist(this.playlist._id, updatedPlaylist).subscribe({
        next: (updated) => {
          this.playlist = updated;
          this.toggleEdit(); 
          this.snackBar.open('Playlist atualizada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          console.error('Erro ao atualizar a playlist.', error);
          this.snackBar.open('Erro ao atualizar a playlist.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        complete: () => {
          console.info('Atualização da playlist completa');
        }
      });
    }
  }

  goBackToList(): void {
    this.router.navigate(['/playlist']); // Navegar para a rota da lista de músicas
  }

}