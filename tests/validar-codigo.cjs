// Execute: node tests/validar-codigo.cjs. Sem rede, API, banco ou execução n8n.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const base=path.resolve(__dirname,'..');
const meta=JSON.parse(fs.readFileSync(path.join(__dirname,'inventario-codigo.json'),'utf8'));
const results=[];
function test(name,fn){fn();results.push({teste:name,resultado:'passou'});}
function run(name,options={}){
 const e=meta.codes.find(c=>c.name===name),body=fs.readFileSync(path.join(base,e.path),'utf8');
 const context={$json:options.json||{},$input:{all:()=>options.items||[]},$:options.node||(()=>({first:()=>({json:{}})})),$thisRunIndex:options.runIndex||0,items:options.items||[{json:{after:'cursor-demo'}}],$items:options.history||(()=>{throw Error('fim simulado');}),$item:()=>({$node:{'Paginação HubSpot':{json:{paging:{next:{after:'cursor-next'}}}}}}),Date:options.Date||Date,console:{log:()=>{},error:()=>{}}};
 return vm.runInNewContext('(function(){'+body+'})()',context,{timeout:1000});
}
test('Sintaxe dos corpos JavaScript',()=>{for(const e of meta.codes)new Function(fs.readFileSync(path.join(base,e.path),'utf8'));});
test('Estrutura pública e conexões válidas',()=>{
 const text=fs.readFileSync(path.join(base,'workflows/workflow.template.json'),'utf8'),w=JSON.parse(text);
 assert.equal(w.active,false);assert.deepEqual(w.pinData,{});assert.equal(w.nodes.length,meta.total);assert.equal(w.nodes.filter(n=>n.disabled).length,meta.disabled);assert.equal(w.nodes.filter(n=>n.credentials).length,0);
 const names=new Set(w.nodes.map(n=>n.name));for(const [source,groups]of Object.entries(w.connections)){assert.ok(names.has(source));for(const outputs of Object.values(groups))for(const links of outputs)for(const link of links)assert.ok(names.has(link.node),link.node);}
 for(const n of w.nodes.filter(n=>/gmail|httpRequest|hubspot|webhook|scheduleTrigger|\.cron$/.test(n.type)))assert.equal(n.disabled,true,n.name);
 assert.equal(/pat-[A-Za-z0-9_-]{10,}|AIza[A-Za-z0-9_-]{20,}|eyJ[A-Za-z0-9_-]{15,}\./.test(text),false);
});

test('Limpa CNPJ, CEP e inscrições e reconhece isenção',()=>{
 const out=run('Limpa cep/insc/cnpj',{json:{body:{CEP:'12.345-678',CGC_CPF:'12.345.678/0001-00',INSCMUNl:'isento',IDENTINSCESTAD:'12.345-6'},'Inscrição Estadual':'ISENTO'}});assert.equal(out.CEP,'12345678');assert.equal(out.CGC_CPF,'12345678000100');assert.equal(out.INSCMUNl,'ISENTO');assert.equal(out.IDENTINSCESTAD,'123456');assert.equal(out.INSCRICAO_ESTADUAL,'ISENTO');
});
test('Campos ausentes não são convertidos em documentos inventados',()=>{const out=run('Limpa cep/insc/cnpj',{json:{body:{}}});assert.equal(out.CGC_CPF,undefined);assert.equal(out.CEP,undefined);});
test('Separa contatos financeiros e legais sem incluir outros campos',()=>{
 const node=()=>({item:{json:{NOME_FINANCEIRO:'Financeiro Demo',EMAIL_FINANCEIRO:'financeiro@example.com',NOME_LEGAL:'Legal Demo',EMAIL_LEGAL:'legal@example.com',OUTRO:'ignorar'}}});
 const out=run('Contatos',{node});assert.equal(out.length,2);assert.equal(out[0].json['tipo do contato'],'Financeiro');assert.equal(out[1].json['tipo do contato'],'Legal');assert.equal(out[0].json.OUTRO,undefined);
});
test('Ausência de chaves de contato produz lista vazia',()=>{assert.equal(run('Contatos',{node:()=>({item:{json:{OUTRO:'demo'}}})}).length,0);});
test('Chave existente com valor vazio ainda cria grupo no código original',()=>{assert.equal(run('Contatos',{node:()=>({item:{json:{NOME_LEGAL:''}}})}).length,1);});

const report={escopo:'Testes locais de JavaScript e estrutura JSON, sem n8n ou sistemas reais',total:results.length,testes:results};
fs.writeFileSync(path.join(__dirname,'resultados-testes.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
