# Preparação pública

- Template reconstruído por lista permitida de campos; active false e pinData vazio.
- Referências a credenciais, tokens, appkeys, usuário/senha e outros segredos removidos ou substituídos.
- IDs de ambientes, objetos, pipelines e campos específicos substituídos por marcadores ou números demonstrativos.
- IDs internos regenerados e metadados da instância não incluídos.
- Clientes, domínios e notas visuais específicos generalizados.
- Nós de API, Gmail, HubSpot, webhook e agendamentos desabilitados conforme presentes no fluxo.
- Logs de conteúdo de contatos/páginas removidos do código público.
- executionOrder v1 explicitado no template; fuso e demais configurações da instância não foram presumidos.

A lógica de transformação foi mantida, com substituições de anonimização e retirada de logs.
