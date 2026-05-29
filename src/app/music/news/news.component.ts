  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { HttpClient } from '@angular/common/http'; 
  import { ReactiveFormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { Router, RouterOutlet } from '@angular/router';
  import { MusicService, Playlist, PlaylistInSongs, PlaylistServices, PlaylistSongs } from '../music.service';
  import { MatSnackBar } from '@angular/material/snack-bar'
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatSelectModule } from '@angular/material/select';
  import { LucideCheck, LucideX } from '@lucide/angular'

  @Component({
    selector: 'app-news',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, LucideCheck, LucideX],
    templateUrl: './news.component.html',
    styleUrl: './news.component.css'
  })
  export class NewsComponent implements OnInit {
    playlists: PlaylistInSongs[] = [];
    musicForm: FormGroup;
    dateNow: Date = new Date();

    constructor(
      private formBuilder: FormBuilder, 
      private http: HttpClient, 
      private musicService: MusicService, 
      private playlistService: PlaylistServices,
      private router: Router, 
      private snackBar: MatSnackBar) { 
      this.musicForm = this.formBuilder.group({
        imgSong: ['', []],
        singer: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        song: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        genre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        playlist: [, []],
        registrationDate: [this.dateNow.toISOString().split("T")[0], Validators.required], 
      });
    }

    ngOnInit(): void {
      this.getPlaylists();
    }

    onSubmit() {
      if (this.musicForm.valid) {
        console.log(this.musicForm.value)
        const newMusic = this.musicForm.value;
        this.musicService.createMusic(newMusic).subscribe({
          next: (response) => {
            this.playlistService.addSong(response._id, response.playlist._id).subscribe({
              next: (updatedPlaylist) => {
                console.log('Música vinculada à playlist com sucesso no banco!', updatedPlaylist);
              },
              error: (err) => {
                console.error('Erro ao vincular música à playlist:', err);
              }
            })
            console.log('Música cadastrada com sucesso!', response);
            this.snackBar.open('Música cadastrada com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.musicForm.reset();
            this.router.navigate(['/list']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar a música:', error);
            this.snackBar.open('Erro ao cadastrar a música. Tente novamente.', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          },
          complete: () => {
            console.info('Cadastro de música completo');
          }
        });
      } else {
        // Marca todos os campos como tocados para ativar a validação
        this.musicForm.markAllAsTouched();
        console.log('Formulário inválido');
      }
    }    

  listMusics(): void {
    this.router.navigate(['/list']); // Redireciona para a rota /list
  }

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
  
  getErrorMessage(controlName: string): string {
    const control = this.musicForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    if (control?.hasError('minlength')) {
      return `O mínimo de caracteres é ${control.errors?.['minlength'].requiredLength}.`;
    }
    if (control?.hasError('maxlength')) {
      return `O máximo de caracteres é ${control.errors?.['maxlength'].requiredLength}.`;
    }
    return '';
  }
}