import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Music {
  _id: string;
  imgSong: string;
  singer: string;
  song: string;
  genre: string[];
  playlist: Playlist;
  registrationDate: string;
}

export interface Playlist {
  _id: string,
  imgPlaylist: string,
  name: string,
  songs: PlaylistSongs[],
  amountSongs: number
}

export interface PlaylistSongs {
  _id: string,
  singer: string,
  song: string
}

export interface PlaylistInSongs {
  _id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiMusic = 'http://localhost:5000/api/music'; 

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    })
  };
  // GET: Listar todas as músicas
  getMusics(): Observable<Music[]> {
    const url = `${this.apiMusic}?_=${new Date().getTime()}`; //parâmetro de cache-busting que corrigiu erro de requisição apos deploy
    return this.http.get<Music[]>(url, this.httpOptions); 
}

  // POST: Criar uma nova música
  createMusic(music: Music): Observable<Music> {
    return this.http.post<Music>(this.apiMusic, music, this.httpOptions);
  }

  // GET: Obter uma música por ID
  getMusicById(id: string): Observable<Music> {
    return this.http.get<Music>(`${this.apiMusic}/${id}`, this.httpOptions);
  }

  // PUT: Atualizar uma música
  updateMusic(id: string, music: Music): Observable<Music> {
    return this.http.put<Music>(`${this.apiMusic}/${id}`, music, this.httpOptions);
  }

  // DELETE: Excluir uma música
  deleteMusic(id: string): Observable<any> {
    return this.http.delete(`${this.apiMusic}/${id}`, this.httpOptions);
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistServices {
  private apiPlaylist = 'http://localhost:5000/api/playlist'; 

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    })
  };

  // GET: Busco todas as Playlists cadastradas
  getPlaylists(): Observable<Playlist[]>{
    const url = `${this.apiPlaylist}?_=${new Date().getTime()}`
    return this.http.get<Playlist[]>(url, this.httpOptions); 
  }

  // GET: Busco as informações de uma Playlist de acordo com o ID
  getPlaylistsById(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiPlaylist}/${id}`, this.httpOptions);
  }

  // POST: Criação de uma nova playlist
  createPlaylist(playlist: Playlist): Observable<Music> {
    return this.http.post<Music>(this.apiPlaylist, playlist, this.httpOptions);
  }

  // PUT: Atualizar os dados de uma playlist
  updatePlaylist(playlistId: string, playlist: Playlist): Observable<Playlist>{
    return this.http.put<Playlist>(`${this.apiPlaylist}/${playlistId}`, playlist, this.httpOptions);
  }

  // PUT: Adicionar uma música à playlist.
  addSong(musicId: string, playlistId: string): Observable<any>{
    return this.http.put<Playlist>(`${this.apiPlaylist}/add-music/${playlistId}`, { "musicId": musicId }, this.httpOptions)
  }

  // DELETE: Excluir uma playlist
  deletePlaylist(id: string): Observable<any> {
    return this.http.delete(`${this.apiPlaylist}/${id}`, this.httpOptions);
  }
}