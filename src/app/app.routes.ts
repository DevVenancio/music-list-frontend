import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './music/news/news.component';
import { DetailsComponent } from './music/details/details.component';
import { ListComponent } from './music/list/list.component';
import { PlaylistComponent } from './music/playlist/playlist.component';
import { NgModule } from '@angular/core';
import { MusicComponent } from './music/music.component';
import { DetailPlaylist } from './music/playlist/detailPlaylist/detailPlaylist.component';
import { NewPlaylist } from './music/playlist/newPlaylist/newPlaylist.component';

export const routes: Routes = [
    { path: 'music', component: MusicComponent },
    { path: 'new-music', component: NewsComponent },
    { path: 'music-details/:id', component: DetailsComponent },
    { path: 'list', component: ListComponent },
    { path: 'playlist', component: PlaylistComponent },
    { path: 'playlist-details/:id', component: DetailPlaylist },
    { path: 'new-playlist', component: NewPlaylist },
    { path: '', redirectTo: 'music', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }