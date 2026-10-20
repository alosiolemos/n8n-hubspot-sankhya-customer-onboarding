# Investigação das rotas e APIs do ERP

O trabalho exigiu compreender entidades, serviços e payloads, não somente configurar um conector pronto. Para o cenário de contatos e associações que precisava implementar, investiguei as requisições no navegador e adaptei o formato das chamadas ao n8n.

O export utiliza os serviços do Gateway Sankhya, incluindo CRUDServiceProvider.saveRecord e entidades de cadastro. O payload de contatos associa CODPARC e NOMECONTATO, além de e-mail.

## Documentação consultada nesta revisão

Hoje existe uma referência oficial de [Cadastro de Contato de Clientes](https://developer.sankhya.com.br/reference/post_contatocliente), com exemplo de saveRecord para a entidade Contato. A existência atual dessa página não permite afirmar quando ela estava disponível ou se cobria o cenário específico que enfrentei.

Por isso descrevo o aprendizado e a investigação que realizei, em vez de afirmar que não existe documentação de contatos. O case evidencia a capacidade de compreender a operação no ERP e transformar esse entendimento em requisições e associações entre registros.

A autenticação do export usa o padrão recebido, com token, appkey e credenciais em headers do nó de login. Todos foram removidos da publicação. Ao adaptar, confira o [guia oficial de integração](https://developer.sankhya.com.br/reference/guia-integracao), pois a documentação atual apresenta também um novo fluxo de autenticação; não se deve presumir que configurar uma nova integração hoje repita exatamente o ambiente histórico.
