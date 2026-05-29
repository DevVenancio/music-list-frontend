import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LucidePen, LucideList, LucideX, LucideCheck } from '@lucide/angular'
import { HttpClient } from '@angular/common/http';
import { PlaylistServices } from '../../music.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatChipsModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, LucideX, LucideCheck],
  templateUrl: './newPlaylist.component.html',
})
export class NewPlaylist {
  playlistForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private playlistService: PlaylistServices,
    private router: Router, 
    private snackBar: MatSnackBar) { 
    this.playlistForm = this.formBuilder.group({
      imgPlaylist: ['', []],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  onSubmit() {
      if (this.playlistForm.valid) {
        console.log(this.playlistForm.value)
        const newPlaylist = this.playlistForm.value;
        this.playlistService.createPlaylist(newPlaylist).subscribe({
          next: (response) => {
            console.log('Playlist cadastrada com sucesso!', response);
            this.snackBar.open('Playlist cadastrada com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.playlistForm.reset();
            this.router.navigate(['/playlist']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar a playlist:', error);
            this.snackBar.open('Erro ao cadastrar a playlist. Tente novamente.', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          },
          complete: () => {
            console.info('Cadastro da playlist completo');
          }
        });
      } else {
        // Marca todos os campos como tocados para ativar a validação
        this.playlistForm.markAllAsTouched();
        console.log('Formulário inválido');
      }
    }

  listPlaylists(): void {
    this.router.navigate(['/playlist']); // Redireciona para a rota /list
  }

  getErrorMessage(controlName: string): string {
    const control = this.playlistForm.get(controlName);
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