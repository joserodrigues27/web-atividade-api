# Upload de Imagem e Visualizador de Galeria Compartilhada Usando a API de Upload da Cloudinary

**José Rodrigues Costa Júnior**

Repositório para resolução da atividade sobre API REST da disciplina de Desenvolvimento Web da faculdade. A atividade tem como objetivo fornecer uma introdução sobre APIs e seus usos. A API pública escolhida para este projeto foi a Upload API da Cloudinary que permite fazer uploads, em principal de imagens e vídeos, além de permitir fazer alterações (transformações), restringir tipos de arquivos e utilizar ferramentas, como um widget usado para auxiliar a realizar uploads.

## Descrição e Objetivo do projeto

O projeto utiliza a API de Upload da Cloudinary e tem como objetivo auxiliar no aprendizado sobre APIs, logo trata-se de um projeto mais simples que permite realizar uploads de imagens dos tipos: .jpg, .jpeg, .png, .webp, .svg e .avif. As imagens são postadas (usando requisição do tipo POST) em uma pasta que utiliza um upload preset (conjunto de predefinições de upload que permite por exemplo: restringir quais arquivos podem ser armazenados e quais transformações serão permitidas) do tipo unsigned (sem assinatura, escolhido por ser uma solução mais simples e ideal para a ideia do projeto de ter uma galeria de imagens compartilhadas). Além de realizar uploads de uma forma mais tradicional (selecionando os arquivos permitidos), é possível fazer uploads utilizando o widget de upload desenvolvido pela cloudinary que tem opções como câmera, acessar o google drive, digitar uma url de uma imagem, entre outros recursos. No fim do projeto tem uma parte destinada a visualização de uma galeria de imagens formada por no máximo 100 imagens que foram postadas utilizando este projeto. Todas as imagens são coletadas por meio da utilização de requisição do tipo GET que procura as imagens com base na pasta armazenada (utilizando-a como uma expressão/palavra chave), sendo utilizada uma serveless function (get-cloudinary-gallery.js) para realizar requisição a fim de não expor dados sensíveis (a api key e a api secret), logo as variáveis de ambiente podem ser utilizadas com o vercel e assim usar uma função no front-end para fazer requisição do tipo GET para a serveless function com a finalidade de carregar a galeria.

## Tecnologias utilizadas:

* HTML, CSS e JavaScript Puro.
* Upload API - Cloudinary.
* Vercel (Deploy do projeto e para utilizar variáveis de ambiente por meio de uma serveless function).

## Referências

Materiais que ajudaram na realização do projeto/atividade:

* Site W3Schools: https://www.w3schools.com/
* Canal da Cloudinary: https://www.youtube.com/@Cloudinary
* Upload API Reference: https://cloudinary.com/documentation/image_upload_api_reference
* Upload API Guides: https://cloudinary.com/documentation/upload_images
* Upload Widget API Reference: https://cloudinary.com/documentation/upload_widget_reference
* Search for assets: https://cloudinary.com/documentation/searching_for_assets

## Licença do Projeto

- GPL (General Public License) 3.0.
