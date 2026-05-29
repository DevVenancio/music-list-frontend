import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MusicService, Music, Playlist, PlaylistServices } from '../music.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LucidePen, LucideList, LucideX, LucideCheck } from '@lucide/angular'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatChipsModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, LucidePen, LucideList, LucideX, LucideCheck],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  music: Music | undefined;
  playlists: Playlist[] = []
  isEditing = false;
  musicForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private playlistService: PlaylistServices,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.musicForm = this.fb.group({
      imgSong: [''],
      singer: [''],
      song: [''],
      genre: [''],
      playlist: [null],
      registrationDate: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getMusicDetails(id);
    }
  }

  // Função para obter a listagem de Playlist cadastradas
  getPlaylists(){
    this.playlistService.getPlaylists().subscribe({
      next: (data) => {
        this.playlists = data;
        if (this.playlists) {
          this.musicForm.patchValue({
            playlist: this.playlists
          })
        }
      }
    })
  }

  // Função para obter os detalhes da música
  getMusicDetails(id: string): void {
    this.musicService.getMusicById(id).subscribe({
      next: (data) => {
        this.music = data;
        if (this.music) {
          this.musicForm.patchValue({
            imgSong: this.music.imgSong,
            singer: this.music.singer,
            song: this.music.song,
            genre: this.music.genre,
            playlist: this.music.playlist,
            registrationDate: this.music.registrationDate
          });
        }
;
      },
      error: (error) => {
        console.error('Erro ao obter os detalhes da música', error);
        this.snackBar.open('Erro ao obter os detalhes da música!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => {
        console.info('Detalhes da música carregados com sucesso');
      }
    });
  }

  // Função para alternar o modo de edição
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Função para atualizar a música
  updateMusic(): void {
    if (this.music && this.music._id) {
      const updatedMusic = {
        ...this.musicForm.value
      };
  
      this.musicService.updateMusic(this.music._id, updatedMusic).subscribe({
        next: (updated) => {
          this.music = updated;
          this.toggleEdit(); 
          this.snackBar.open('Música atualizada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          console.error('Erro ao atualizar a música', error);
          this.snackBar.open('Erro ao atualizar a música!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        complete: () => {
          console.info('Atualização de música completa');
        }
      });
    }
  }

  goBackToList(): void {
    this.router.navigate(['/list']); // Navegar para a rota da lista de músicas
  }
}