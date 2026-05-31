# music-list-frontend

> [!WARNING] Importante
> *Esse projeto ainda está em desenvolvimento, portanto não é sua versão final.*

Um pequeno sistema para criação e listagem de **músicas** e **playlists**.

---

## ⚙️ Ferramentas Usadas
- NodeJS
- AngularJS
- Express
- MongoDB 
- TailwindCSS
- Typescript

## 💎 Features do Sistema
### Listagem de Músicas
- CRUD básico para músicas.
  1. Criação e edição das informações das músicas
  2. Exclusão da música
- Visualização das informações cadastradas.
- Vínculo das músicas com as Playlists criadas.

### Listagem de Playlists
- CRUD básico para playlists.
  1. Criação e edição das informações das playlists
  2. Exclusão das playlists e atualização das informações das músicas vinculadas
- Vínculo das playlists criadas com as músicas.
- Listagem de músicas vínculadas à playlist.
- Contagem de músicas vínculadas à playlist. 

## Clonagem do Projeto
> [!NOTE] Informações Complementares
> - É importante ressaltar que esse projeto é **totalmente dependente** do seu backend estar ativo, portanto deve-se ter ambos os projetos clonados e rodando simultaneamente para que tudo esteja em perfeito funcionamento.
>   - Link do repositório: [**music-list-backend**](https://github.com/DevVenancio/music-list-backend)
> - Outro ponto importante é que deve-se ter também uma **conexão com o MongoDB** criada e configurada, sendo necessário para que as informações sejam salvas corretamente.

Ao realizar a clonagem do repositório, é necessário **instalar as dependências** relacionadas ao projeto. Para isso, basta executar o comando `npm install` ou apenas `npm i`.

Após a instalações das dependências do projeto, basta iniciá-lo usando o comando `npm start` e aguardar o projeto ser compilado.