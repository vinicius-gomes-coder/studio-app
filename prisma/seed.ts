import "dotenv/config";
import { PrismaClient, Prisma } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...\n");

  // Limpeza na ordem inversa das dependências
  await prisma.evolucao.deleteMany();
  await prisma.aula.deleteMany();
  await prisma.agenda.deleteMany();
  await prisma.equipamento.deleteMany();
  await prisma.aluno.deleteMany();
  await prisma.fisioterapeuta.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.plano.deleteMany();
  console.log("🗑️  Banco limpo\n");

  // ─── 1. Planos ──────────────────────────────────────────────────────────────
  console.log("Criando Planos...");

  const plano1  = await prisma.plano.create({ data: { nome: "Básico",         preco: new Prisma.Decimal("150.00"),  periodoDoPlano: "mensal"     } });
  const plano2  = await prisma.plano.create({ data: { nome: "Essencial",      preco: new Prisma.Decimal("250.00"),  periodoDoPlano: "mensal"     } });
  const plano3  = await prisma.plano.create({ data: { nome: "Intermediário",  preco: new Prisma.Decimal("350.00"),  periodoDoPlano: "mensal"     } });
  const plano4  = await prisma.plano.create({ data: { nome: "Plus",           preco: new Prisma.Decimal("440.00"),  periodoDoPlano: "mensal"     } });
  const plano5  = await prisma.plano.create({ data: { nome: "Premium",        preco: new Prisma.Decimal("520.00"),  periodoDoPlano: "mensal"     } });
  const plano6  = await prisma.plano.create({ data: { nome: "Trimestral 2x",  preco: new Prisma.Decimal("680.00"),  periodoDoPlano: "trimestral" } });
  const plano7  = await prisma.plano.create({ data: { nome: "Trimestral 3x",  preco: new Prisma.Decimal("950.00"),  periodoDoPlano: "trimestral" } });
  const plano8  = await prisma.plano.create({ data: { nome: "Semestral",      preco: new Prisma.Decimal("1300.00"), periodoDoPlano: "semestral"  } });
  const plano9  = await prisma.plano.create({ data: { nome: "Anual Básico",   preco: new Prisma.Decimal("1500.00"), periodoDoPlano: "anual"      } });
  const plano10 = await prisma.plano.create({ data: { nome: "Anual Premium",  preco: new Prisma.Decimal("5500.00"), periodoDoPlano: "anual"      } });
  console.log("✅ 10 planos criados");

  // ─── 2. Usuários ────────────────────────────────────────────────────────────
  console.log("Criando Usuários...");

  await prisma.usuario.create({ data: { nome: "Carlos Mendes",    email: "carlos.mendes.1@studiofisio.com.br",    senha: "$2b$10$hashedpassword1",  telefone: "(31) 99821-4532", statusPagamento: "pago",         planoId: plano3.id  } });
  await prisma.usuario.create({ data: { nome: "Mariana Lopes",    email: "mariana.lopes.2@studiofisio.com.br",    senha: "$2b$10$hashedpassword2",  telefone: "(31) 97654-3210", statusPagamento: "pago",         planoId: plano5.id  } });
  await prisma.usuario.create({ data: { nome: "Thiago Moreira",   email: "thiago.moreira.3@studiofisio.com.br",   senha: "$2b$10$hashedpassword3",  telefone: "(31) 98712-0034", statusPagamento: "pendente",     planoId: plano1.id  } });
  await prisma.usuario.create({ data: { nome: "Patrícia Vieira",  email: "patricia.vieira.4@studiofisio.com.br",  senha: "$2b$10$hashedpassword4",  telefone: "(31) 99103-5678", statusPagamento: "pago",         planoId: plano6.id  } });
  await prisma.usuario.create({ data: { nome: "Rodrigo Campos",   email: "rodrigo.campos.5@studiofisio.com.br",   senha: "$2b$10$hashedpassword5",  telefone: "(31) 98234-9900", statusPagamento: "inadimplente", planoId: plano2.id  } });
  await prisma.usuario.create({ data: { nome: "Aline Figueiredo", email: "aline.figueiredo.6@studiofisio.com.br", senha: "$2b$10$hashedpassword6",  telefone: "(31) 97401-2233", statusPagamento: "pago",         planoId: plano7.id  } });
  await prisma.usuario.create({ data: { nome: "Eduardo Pinto",    email: "eduardo.pinto.7@studiofisio.com.br",    senha: "$2b$10$hashedpassword7",  telefone: "(31) 99567-8812", statusPagamento: "pendente",     planoId: plano4.id  } });
  await prisma.usuario.create({ data: { nome: "Luciana Ramos",    email: "luciana.ramos.8@studiofisio.com.br",    senha: "$2b$10$hashedpassword8",  telefone: "(31) 98890-1144", statusPagamento: "pago",         planoId: plano8.id  } });
  await prisma.usuario.create({ data: { nome: "Fernando Souza",   email: "fernando.souza.9@studiofisio.com.br",   senha: "$2b$10$hashedpassword9",  telefone: "(31) 97723-4456", statusPagamento: "pago",         planoId: plano9.id  } });
  await prisma.usuario.create({ data: { nome: "Isabela Duarte",   email: "isabela.duarte.10@studiofisio.com.br",  senha: "$2b$10$hashedpassword10", telefone: "(31) 99345-7790", statusPagamento: "inadimplente", planoId: plano10.id } });

  console.log("  ✅ 10 usuários criados");

  // ─── 3. Fisioterapeutas ─────────────────────────────────────────────────────
  console.log("Criando Fisioterapeutas...");

  const fisio1  = await prisma.fisioterapeuta.create({ data: { nome: "Dra. Amanda Correia",   crefito: "141523-F" } });
  const fisio2  = await prisma.fisioterapeuta.create({ data: { nome: "Dr. Bruno Tavares",     crefito: "298741-F" } });
  const fisio3  = await prisma.fisioterapeuta.create({ data: { nome: "Dra. Carla Nascimento", crefito: "073412-F" } });
  const fisio4  = await prisma.fisioterapeuta.create({ data: { nome: "Dr. Daniel Freitas",    crefito: "384920-F" } });
  const fisio5  = await prisma.fisioterapeuta.create({ data: { nome: "Dra. Elisa Monteiro",   crefito: "512038-F" } });
  const fisio6  = await prisma.fisioterapeuta.create({ data: { nome: "Dr. Fábio Azevedo",     crefito: "627194-F" } });
  const fisio7  = await prisma.fisioterapeuta.create({ data: { nome: "Dra. Gabriela Cunha",   crefito: "431857-F" } });
  const fisio8  = await prisma.fisioterapeuta.create({ data: { nome: "Dr. Henrique Matos",    crefito: "290463-F" } });
  const fisio9  = await prisma.fisioterapeuta.create({ data: { nome: "Dra. Ingrid Cavalcante", crefito: "583017-F" } });
  const fisio10 = await prisma.fisioterapeuta.create({ data: { nome: "Dr. Jorge Neves",       crefito: "164392-F" } });

  console.log("  ✅ 10 fisioterapeutas criados");

  // ─── 4. Alunos ──────────────────────────────────────────────────────────────
  console.log("Criando Alunos...");

  const aluno1  = await prisma.aluno.create({ data: { nome: "Lucas Oliveira",   aniversario: new Date(Date.UTC(1990, 2, 15))  } });
  const aluno2  = await prisma.aluno.create({ data: { nome: "Fernanda Santos",  aniversario: new Date(Date.UTC(1985, 6, 22))  } });
  const aluno3  = await prisma.aluno.create({ data: { nome: "Pedro Almeida",    aniversario: new Date(Date.UTC(1978, 10, 8))  } });
  const aluno4  = await prisma.aluno.create({ data: { nome: "Camila Souza",     aniversario: new Date(Date.UTC(1995, 0, 30))  } });
  const aluno5  = await prisma.aluno.create({ data: { nome: "Rafael Costa",     aniversario: new Date(Date.UTC(1968, 4, 19))  } });
  const aluno6  = await prisma.aluno.create({ data: { nome: "Juliana Pereira",  aniversario: new Date(Date.UTC(1993, 8, 5))   } });
  const aluno7  = await prisma.aluno.create({ data: { nome: "Bruno Silva",      aniversario: new Date(Date.UTC(1982, 1, 27))  } });
  const aluno8  = await prisma.aluno.create({ data: { nome: "Ana Lima",         aniversario: new Date(Date.UTC(1975, 11, 12)) } });
  const aluno9  = await prisma.aluno.create({ data: { nome: "Diego Ferreira",   aniversario: new Date(Date.UTC(1999, 3, 3))   } });
  const aluno10 = await prisma.aluno.create({ data: { nome: "Helena Rodrigues", aniversario: new Date(Date.UTC(1960, 7, 18))  } });

  console.log("  ✅ 10 alunos criados");

  // ─── 5. Equipamentos ────────────────────────────────────────────────────────
  console.log("Criando Equipamentos...");

  const equip1  = await prisma.equipamento.create({ data: { nome: "Ultrassom Terapêutico", modelo: "Sonacel Plus",  marca: "Carci",        ultimaManutencao: new Date(Date.UTC(2024, 10, 10)), proximaManutencao: new Date(Date.UTC(2025, 4, 10))  } });
  const equip2  = await prisma.equipamento.create({ data: { nome: "TENS / FES",            modelo: "Dualpex 961",   marca: "Quark",         ultimaManutencao: new Date(Date.UTC(2024, 8, 5)),  proximaManutencao: new Date(Date.UTC(2025, 2, 5))   } });
  const equip3  = await prisma.equipamento.create({ data: { nome: "Laser Terapêutico",     modelo: "LaserPulse",    marca: "Ibramed",       ultimaManutencao: new Date(Date.UTC(2025, 0, 20)), proximaManutencao: new Date(Date.UTC(2025, 6, 20))  } });
  const equip4  = await prisma.equipamento.create({ data: { nome: "Infravermelho",         modelo: "IRK-242",       marca: "Carci",         ultimaManutencao: new Date(Date.UTC(2024, 7, 14)), proximaManutencao: new Date(Date.UTC(2025, 1, 14))  } });
  const equip5  = await prisma.equipamento.create({ data: { nome: "Esteira Ergométrica",   modelo: "Athletic Pro",  marca: "Athletic",      ultimaManutencao: new Date(Date.UTC(2024, 11, 1)), proximaManutencao: new Date(Date.UTC(2025, 5, 1))   } });
  const equip6  = await prisma.equipamento.create({ data: { nome: "Bicicleta Ergométrica", modelo: "BikeMax 500",   marca: "Physicus",      ultimaManutencao: new Date(Date.UTC(2025, 1, 3)),  proximaManutencao: new Date(Date.UTC(2025, 7, 3))   } });
  const equip7  = await prisma.equipamento.create({ data: { nome: "Mesa de Tração",        modelo: "Trac 3000",     marca: "Enraf-Nonius",  ultimaManutencao: new Date(Date.UTC(2024, 9, 22)), proximaManutencao: new Date(Date.UTC(2025, 3, 22))  } });
  const equip8  = await prisma.equipamento.create({ data: { nome: "Maca Elétrica",         modelo: "ME-4000",       marca: "Chattanooga",   ultimaManutencao: new Date(Date.UTC(2024, 6, 30)), proximaManutencao: new Date(Date.UTC(2025, 0, 30))  } });
  const equip9  = await prisma.equipamento.create({ data: { nome: "Paralelas de Marcha",   modelo: "PM-180",        marca: "Carci",         ultimaManutencao: new Date(Date.UTC(2025, 2, 11)), proximaManutencao: new Date(Date.UTC(2025, 8, 11))  } });
  const equip10 = await prisma.equipamento.create({ data: { nome: "Bola de Pilates",       modelo: "Gymball 65cm",  marca: "Acte Sports",   ultimaManutencao: new Date(Date.UTC(2025, 0, 7)),  proximaManutencao: new Date(Date.UTC(2025, 6, 7))   } });

  console.log("  ✅ 10 equipamentos criados");

  // ─── 6. Agendas ─────────────────────────────────────────────────────────────
  // dia  → @db.Date  (UTC, sem hora)
  // hora → @db.Time  (epoch 1970-01-01 UTC com HH:mm)
  console.log("Criando Agendas...");

  const agenda1  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 7)),  hora: new Date(Date.UTC(1970, 0, 1, 7,  0)),  fisioterapeutaId: fisio1.id,  alunos: { connect: [{ id: aluno1.id }, { id: aluno2.id }] } } });
  const agenda2  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 8)),  hora: new Date(Date.UTC(1970, 0, 1, 8,  0)),  fisioterapeutaId: fisio2.id,  alunos: { connect: [{ id: aluno3.id }] } } });
  const agenda3  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 9)),  hora: new Date(Date.UTC(1970, 0, 1, 9,  0)),  fisioterapeutaId: fisio3.id,  alunos: { connect: [{ id: aluno4.id }, { id: aluno5.id }] } } });
  const agenda4  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 10)), hora: new Date(Date.UTC(1970, 0, 1, 10, 0)),  fisioterapeutaId: fisio4.id,  alunos: { connect: [{ id: aluno6.id }] } } });
  const agenda5  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 11)), hora: new Date(Date.UTC(1970, 0, 1, 14, 0)),  fisioterapeutaId: fisio5.id,  alunos: { connect: [{ id: aluno7.id }, { id: aluno8.id }] } } });
  const agenda6  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 14)), hora: new Date(Date.UTC(1970, 0, 1, 15, 0)),  fisioterapeutaId: fisio6.id,  alunos: { connect: [{ id: aluno9.id }] } } });
  const agenda7  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 15)), hora: new Date(Date.UTC(1970, 0, 1, 8,  30)), fisioterapeutaId: fisio7.id,  alunos: { connect: [{ id: aluno10.id }, { id: aluno1.id }] } } });
  const agenda8  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 16)), hora: new Date(Date.UTC(1970, 0, 1, 9,  30)), fisioterapeutaId: fisio8.id,  alunos: { connect: [{ id: aluno2.id }, { id: aluno3.id }] } } });
  const agenda9  = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 17)), hora: new Date(Date.UTC(1970, 0, 1, 10, 30)), fisioterapeutaId: fisio9.id,  alunos: { connect: [{ id: aluno4.id }] } } });
  const agenda10 = await prisma.agenda.create({ data: { dia: new Date(Date.UTC(2025, 3, 22)), hora: new Date(Date.UTC(1970, 0, 1, 16, 0)),  fisioterapeutaId: fisio10.id, alunos: { connect: [{ id: aluno5.id }, { id: aluno6.id }] } } });

  console.log("  ✅ 10 agendas criadas");

  // ─── 7. Aulas ───────────────────────────────────────────────────────────────
  // Relação 1:1 com Agenda (agendaId @unique).
  // fisioterapeutaId é o mesmo da agenda correspondente.
  console.log("Criando Aulas...");

  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 7)),  tipo: "individual",  status: "agendada",   fisioterapeutaId: fisio1.id,  agendaId: agenda1.id,  alunos: { connect: [{ id: aluno1.id }, { id: aluno2.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 8)),  tipo: "individual",  status: "realizada",  fisioterapeutaId: fisio2.id,  agendaId: agenda2.id,  alunos: { connect: [{ id: aluno3.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 9)),  tipo: "em grupo",    status: "realizada",  fisioterapeutaId: fisio3.id,  agendaId: agenda3.id,  alunos: { connect: [{ id: aluno4.id }, { id: aluno5.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 10)), tipo: "funcional",   status: "realizada",  fisioterapeutaId: fisio4.id,  agendaId: agenda4.id,  alunos: { connect: [{ id: aluno6.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 11)), tipo: "solo",        status: "cancelada",  fisioterapeutaId: fisio5.id,  agendaId: agenda5.id,  alunos: { connect: [{ id: aluno7.id }, { id: aluno8.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 14)), tipo: "aquática",    status: "agendada",   fisioterapeutaId: fisio6.id,  agendaId: agenda6.id,  alunos: { connect: [{ id: aluno9.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 15)), tipo: "em grupo",    status: "agendada",   fisioterapeutaId: fisio7.id,  agendaId: agenda7.id,  alunos: { connect: [{ id: aluno10.id }, { id: aluno1.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 16)), tipo: "individual",  status: "realizada",  fisioterapeutaId: fisio8.id,  agendaId: agenda8.id,  alunos: { connect: [{ id: aluno2.id }, { id: aluno3.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 17)), tipo: "funcional",   status: "agendada",   fisioterapeutaId: fisio9.id,  agendaId: agenda9.id,  alunos: { connect: [{ id: aluno4.id }] } } });
  await prisma.aula.create({ data: { data: new Date(Date.UTC(2025, 3, 22)), tipo: "solo",        status: "agendada",   fisioterapeutaId: fisio10.id, agendaId: agenda10.id, alunos: { connect: [{ id: aluno5.id }, { id: aluno6.id }] } } });

  console.log("  ✅ 10 aulas criadas");

  // ─── 8. Evoluções ───────────────────────────────────────────────────────────
  // Uma evolução por aluno com texto clínico realista.
  // Cada evolução conecta de 1 a 3 equipamentos.
  console.log("Criando Evoluções...");

  await prisma.evolucao.create({ data: { alunoId: aluno1.id,  evolucaoEntrada: "Paciente relata dor lombar intensa (7/10) com irradiação para MMII. Dificuldade para deambular e sentar por longos períodos.",                              evolucaoSaida: "Após sessão de TENS e alongamentos, dor reduziu para 3/10. Melhora perceptível na amplitude de deambulação. Orientado sobre postura.",                         equipamentos: { connect: [{ id: equip1.id }, { id: equip2.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno2.id,  evolucaoEntrada: "Queixa de dor cervical (6/10) com limitação de rotação para a esquerda. Tensão muscular palpável em trapézio e esternocleidomastóideo.",                      evolucaoSaida: "Redução da dor para 3/10 ao término da sessão. Melhora na rotação cervical esquerda. Paciente orientado sobre ergonomia no trabalho.",                          equipamentos: { connect: [{ id: equip3.id }, { id: equip4.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno3.id,  evolucaoEntrada: "Dor no joelho direito pós-cirurgia de LCA (5/10). Edema moderado e limitação de flexão a 80°. Cicatriz cirúrgica em processo de maturação.",                 evolucaoSaida: "Evolução positiva: dor 2/10, edema reduzido. Flexão de joelho atingiu 110°. Exercícios de cadeia cinética fechada realizados com boa tolerância.",               equipamentos: { connect: [{ id: equip5.id }, { id: equip6.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno4.id,  evolucaoEntrada: "Paciente com ombro doloroso direito (8/10). Abdução limitada a 90°. Sinal de Neer positivo. Diagnóstico de síndrome do manguito rotador.",                    evolucaoSaida: "Alívio importante (3/10) após mobilização articular e ultrassom. Abdução melhorou para 120°. Programa de fortalecimento iniciado.",                              equipamentos: { connect: [{ id: equip1.id }, { id: equip7.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno5.id,  evolucaoEntrada: "Hemiplegia à esquerda pós-AVC há 6 meses. Tônus aumentado em flexores de cotovelo e punho. Marcha com padrão ceifante.",                                      evolucaoSaida: "Sessão de FES e mobilização passiva. Redução do tônus e melhora na amplitude de extensão do cotovelo. Treino de marcha com andador realizado.",                equipamentos: { connect: [{ id: equip2.id }, { id: equip9.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno6.id,  evolucaoEntrada: "Dor plantar no pé esquerdo (6/10) com diagnóstico de fascite plantar. Dificuldade ao dar os primeiros passos pela manhã. Teste de Windlass positivo.",         evolucaoSaida: "Após ultrassom e alongamento da fáscia plantar, dor reduziu para 2/10. Marcha sem antálgica. Orientado sobre uso de palmilha e calçado adequado.",              equipamentos: { connect: [{ id: equip1.id }, { id: equip10.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno7.id,  evolucaoEntrada: "Formigamento e fraqueza em mão dominante. Sinal de Phalen e Tinel positivos. Eletromiografia confirma síndrome do túnel do carpo grau moderado.",             evolucaoSaida: "Exercícios de deslizamento nervoso e tendinoso realizados. Orientação sobre órtese noturna. Redução da parestesia durante a sessão. Dor 2/10.",                 equipamentos: { connect: [{ id: equip2.id }, { id: equip3.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno8.id,  evolucaoEntrada: "Lombalgia crônica (5/10) com contratura paravertebral bilateral e hiperlordose lombar. Postura anteriorizada. Sinal de Lasègue negativo.",                    evolucaoSaida: "Melhora na postura e redução da contratura muscular. Dor 2/10 ao final. Paciente orientado sobre higiene postural e exercícios domiciliares.",                  equipamentos: { connect: [{ id: equip4.id }, { id: equip8.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno9.id,  evolucaoEntrada: "Cervicalgia com irradiação para membro superior direito (7/10). Teste de compressão de Spurling positivo. Diagnóstico de protrusão discal C5-C6.",            evolucaoSaida: "Tração cervical e mobilização neural realizadas. Irradiação reduziu para 3/10. Amplitude de movimento cervical melhorou em todas as direções.",                  equipamentos: { connect: [{ id: equip7.id }, { id: equip3.id }] } } });
  await prisma.evolucao.create({ data: { alunoId: aluno10.id, evolucaoEntrada: "Dor em quadril esquerdo (6/10) pós-artroplastia total há 3 meses. Cicatriz cirúrgica bem consolidada. Marcha com auxílio de bengala. Flexão limitada a 85°.", evolucaoSaida: "Dor 2/10 ao final da sessão. Flexão de quadril atingiu 95°. Marcha mais independente. Treino de subida e descida de escadas realizado com supervisão.",         equipamentos: { connect: [{ id: equip9.id }, { id: equip5.id }, { id: equip8.id }] } } });

  console.log("  ✅ 10 evoluções criadas");

  console.log(`
🎉 Seed concluído com sucesso!

  Resumo:
  ├─ Planos:          10
  ├─ Usuários:        10
  ├─ Fisioterapeutas: 10
  ├─ Alunos:          10
  ├─ Equipamentos:    10
  ├─ Agendas:         10
  ├─ Aulas:           10
  └─ Evoluções:       10
  `);
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });