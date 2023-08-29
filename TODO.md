# DIGITAL REPUBLIC CODE CHALLENGE

## Objetivo

O Objetivo desse desafio é avaliar o conhecimento e capacidade dos candidatos às vagas de programação/desenvolvimento.
O teste pode ser feito por qualquer nível de profissional, contudo o critério de avaliação será conforme a experiencia do candidato.

## Instruções

1.  Crie um repositório para o versionamento do seu projeto no gitlab.
2.  Siga a instruções de desenvolvimento.
3.  Coloque um readme.md no projeto explicando como instalar e rodar o projeto.
4.  Adicione ao repositório os usuários @digitalrepublic, @thiagomontini e @nicoleteisen (Apenas gitlab).
5.  Envie o link do repositório para <rh@digitalrepublic.com.br>

## O que deve ser desenvolvido

Uma aplicação web ou mobile que ajude o usuário a calcular a quantidade de tinta necessária para pintar uma sala.
Essa aplicação deve considerar que a sala é composta de 4 paredes e deve permitir que o usuário escolha qual a medida de cada parede e quantas janelas e portas possuem cada parede.
Com base na quantidade necessária o sistema deve apontar tamanhos de lata de tinta que o usuário deve comprar, sempre priorizando as latas maiores. Ex: se o usuário precisa de 19 litros, ele deve sugerir 1 lata de 18L + 2 latas de 0,5L

### Regras de negócio

1.  Nenhuma parede pode ter menos de 1 metro quadrado nem mais de 50 metros quadrados, mas podem possuir alturas e larguras diferentes
2.  O total de área das portas e janelas deve ser no máximo 50% da área de parede
3.  A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta
4.  Cada janela possui as medidas: 2,00 x 1,20 mtos
5.  Cada porta possui as medidas: 0,80 x 1,90
6.  Cada litro de tinta é capaz de pintar 5 metros quadrados
7.  Não considerar teto nem piso.
8.  As variações de tamanho das latas de tinta são:
    *   0,5 L
    *   2,5 L
    *   3,6 L
    *   18 L

## Requistos técnicos

Você é livre para utilizar qualquer linguagem ou framework que queira e os calculos podem ser resolvidos tanto no backend ou frontend.
Não usar libs para criação de componentes de interface (Material UI, Bootstrap, etc), queremos ver você criando o seu próprio layout.

Mesmo o teste sendo algo simples e que pode ser resolvido com poucas linhas de código, crie uma estrutura de arquivos como se fosse um projeto maior. A organização e componentização são extremamente importantes.

Torne o projeto fácil de ser executado (crie um passo a passo e/ou utilize docker).

## O que será avaliado

*   Qualidade do código
*   Baixo acoplamento
*   Componentização e reutilização de código
*   Versionamento correto
*   Escalabilidade
*   Testabilidade

## Dicas

*   Prefira funções puras
*   Use gitflow e escreva comentários claros e objetivos em cada commit
*   O uso de eslint, editor config, docker, webpack, etc facilitam sua vida
*   Lembre-se do conceito de DRY e aplique
