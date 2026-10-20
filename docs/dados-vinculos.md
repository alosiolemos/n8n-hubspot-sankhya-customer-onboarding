# Dados e vínculos

## Normalização

Limpa cep/insc/cnpj remove sinais de CEP e inscrições e mantém somente dígitos no documento CGC_CPF. Também converte variações reconhecidas de isento em ISENTO. O nome INSCMUNl e a combinação de campos de body e da raiz foram preservados como no código recebido; revise o contrato de entrada ao adaptar.

Isso é limpeza de formato, não validação de dígitos verificadores, situação cadastral ou endereço.

## Contatos

O nó Contatos lê Informações e separa as chaves que contêm FINANCEIRO ou LEGAL. Cria até dois itens conforme a presença dessas chaves, atribui tipo do contato e envia os itens ao loop.

Um grupo pode conter campos vazios: a lógica verifica a existência de chaves, não se nome e e-mail estão preenchidos. O teste de demonstração mostra esse comportamento para orientar a validação dos dados mínimos.

## Relações

| Referência | Papel |
| --- | --- |
| Parceiro retornado → CODPARC | Chave do cliente no ERP |
| CODPARC → contatos | Vincular cada pessoa ao parceiro |
| CODPARC e dados contratuais → contrato | Criar o registro do contrato |
| IDs de parceiro/contrato → HubSpot | Rastreabilidade na conta de origem |
| Negócio HubSpot → atualização de etapa | Continuidade do processo comercial |

Atualizar Conta Jurídico grava id_do_parceiro_sankhya, id_do_contrato_sankhya e sankhya_status_parceiro. O nó HubSpot seguinte atualiza o negócio.

Não foi identificado um rollback distribuído ou uma garantia global de idempotência. Falha após criar parceiro/contatos pode deixar o processo parcialmente concluído; antes de reexecutar, verificar o que já foi criado e registrar as referências.
