return {
  CEP: $json.body.CEP ? String($json.body.CEP).replace(/[./-]/g, '') : $json.body.CEP,
  INSCMUNl: /isento|insenta/i.test($json.body.INSCMUNl) ? "ISENTO" : ($json.body.INSCMUNl ? String($json.body.INSCMUNl).replace(/[./-]/g, '') : $json.body.INSCMUNl),
  IDENTINSCESTAD: /isento|insenta/i.test($json.body.IDENTINSCESTAD) ? "ISENTO" : ($json.body.IDENTINSCESTAD ? String($json.body.IDENTINSCESTAD).replace(/[./-]/g, '') : $json.body.IDENTINSCESTAD),
  CGC_CPF: $json.body.CGC_CPF ? String($json.body.CGC_CPF).replace(/[^0-9]/g, '') : $json.body.CGC_CPF,
  INSCRICAO_ESTADUAL: /isento|insenta/i.test($json["Inscrição Estadual"]) ? "ISENTO" : $json["Inscrição Estadual"],
};
