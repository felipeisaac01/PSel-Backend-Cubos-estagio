# Desafio - Estágio em Back-end - Cubos Tecnologia

## O que é este projeto?
 
<p>Este projeto é a minha resolução para o desafio proposto no processo seletivo para estágio em Back-end na Cubos tecnologia, em setembro/2020.
O desafio consiste em criar uma API RPC para facilitar o gerenciamento de uma fila de pessoas. O prazo para entrega foi de 4 dias.</p>

## Funcionalidades:

<p>O projeto consiste em 6 funcionalidades:</p>

<ul>
  <li><h4>Cadastrar usuário</h4>
      <p>Recebe informações, como nome, e-mail e gênero do usuário, gera um cadastro (na variável listaDeUsuarios) e retorna o cadastro, contendo id, nome e email e gênero.</p>
  </li>
  <li><h4>Adicionar a fila</h4>
      <p>Recebe a ID, coloca o usuário correspondente no fim da fila e retorna sua posição.</p>
  </li>
  <li><h4>Buscar usuário na fila</h4>
      <p>Recebe o email do usuário a ser procurado e retorna sua posição na fila.</p>
  </li>
  <li><h4>Ver fila</h4>
      <p>Retorna a quantidade de pessoas na fila e a fila em si, numerada.</p>
  </li>
  <li><h4>Filtrar fila</h4>
      <p>Recebe um parâmetro e o valor a ser utilizado(foi pedido apenas gênero, mas a funcionalidade foi implementada de modo a poder utilizar algum outro parâmetro 
      além do pedido, caso assim desejado) e retorna a quantidade de pessoas e os cadastros das pessoas que estão na fila e se encaixam no parâmetro, com sua posição na fila,
      ordenados do próximo para o último.</p>
  </li>
  <li><h4>Tirar da fila</h4>
      <p>Retira a primeira pessoa da fila e retorna o seu cadastro.</p>
  </li>
</ul>


## Construção do projeto
<ul>
<li>O projeto foi construído inteiramente em javaScript;</li>
<li>O framework utilizado para simular o servidor foi o Koa;</li>
<li>Foi criada uma Collection no Postman para verificação dos endpoints. Você pode acessá-la cliando <a href=''>aqui</a>;</li>
<li>Antes de todas as funcões e dos possíveis erros, existem comentários explicando os retornos e as saídas;</li>
<li>Foi estabelecido um modelo de resposta: 

```
{
    status: 'sucesso'/'error',
    dados: entidade,
}
```
</li>
</ul>
