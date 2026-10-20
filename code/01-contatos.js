// Obter o Body do input dinamicamente da rota correta
const body = $('Informações').item.json;

// Função para criar os registros dinamicamente para os tipos desejados
const criarRegistro = (tipo) => {
  const registro = {};

  // Iterar sobre todas as chaves do objeto body
  Object.keys(body).forEach((key) => {
    // Verificar se a chave contém o tipo desejado
    if (key.toUpperCase().includes(tipo.toUpperCase())) {
      registro[key] = body[key];
    }
  });

  // Adicionar o tipo do contato ao registro
  if (Object.keys(registro).length > 0) {
    registro["tipo do contato"] = tipo === "FINANCEIRO" ? "Financeiro" : "Legal";
  }

  return registro;
};

// Gerar os registros apenas para "LEGAL" e "FINANCEIRO"
const tipos = ["FINANCEIRO", "LEGAL"];
const registros = tipos
  .map(tipo => criarRegistro(tipo)) // Gera o registro para cada tipo
  .filter(registro => Object.keys(registro).length > 0) // Filtra registros vazios
  .map(registro => ({ json: registro })); // Formata como saída do n8n

// Diagnóstico: Log do resultado final

// Retornar os registros como saídas
return registros;
