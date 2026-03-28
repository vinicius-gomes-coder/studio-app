import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ─── Helpers ──────────────────────────────────────────────────────────────────
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomItems<T>(arr: T[], min = 1, max = 3): T[] {
  const count = randomInt(min, Math.min(max, arr.length));
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function randomDate(startYear: number, endYear: number): Date {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

function randomFutureDate(daysAhead = 90): Date {
  const now = new Date();
  now.setDate(now.getDate() + randomInt(1, daysAhead));
  return now;
}

function randomPastDate(daysAgo = 90): Date {
  const now = new Date();
  now.setDate(now.getDate() - randomInt(1, daysAgo));
  return now;
}

// ─── Static data pools ────────────────────────────────────────────────────────
const NOMES_MASCULINOS = [
  "Lucas", "Pedro", "Gabriel", "Mateus", "Rafael",
  "Bruno", "Diego", "Felipe", "Henrique", "João",
];
const NOMES_FEMININOS = [
  "Ana", "Beatriz", "Camila", "Daniela", "Fernanda",
  "Gabriela", "Helena", "Isabela", "Julia", "Larissa",
];
const SOBRENOMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Lima",
  "Pereira", "Costa", "Ferreira", "Rodrigues", "Almeida",
];

function randomNome() {
  const nomes = [...NOMES_MASCULINOS, ...NOMES_FEMININOS];
  return `${randomItem(nomes)} ${randomItem(SOBRENOMES)}`;
}

const PLANO_NOMES = [
  "Básico", "Intermediário", "Avançado", "Premium", "Essencial",
  "Plus", "Pro", "Família", "Mensal", "Trimestral",
];

const PERIODOS = ["mensal", "trimestral", "semestral", "anual"];

const MARCAS_EQUIP = ["Physicus", "Athletic", "Carci", "Enraf-Nonius", "Chattanooga"];
const MODELOS_EQUIP = ["Pro 3000", "Ultra X", "ErgoFit", "MaxMove", "FlexCare"];
const NOMES_EQUIP = [
  "Esteira", "Bicicleta Ergométrica", "Ultrassom Terapêutico",
  "TENS", "Laser Terapêutico", "Infravermelho",
  "Mesa de Tração", "Maca Elétrica", "Maca Manual",
  "Paralelas",
];

const TIPOS_AULA = ["individual", "em grupo", "aquática", "solo", "funcional"];
const STATUS_AULA = ["agendada", "realizada", "cancelada"];
const STATUS_PAGAMENTO = ["pendente", "pago", "inadimplente"];

// ─── Main seed ────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Iniciando seed...\n");

  // 1. Planos ──────────────────────────────────────────────────────────────────
  console.log("Criando Planos...");
  const planos = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.plano.create({
        data: {
          nome: PLANO_NOMES[i],
          aulasPorSemana: randomInt(1, 5),
          preco: parseFloat((randomInt(10, 50) * 10).toFixed(2)),
          periodoDoPano: randomItem(PERIODOS),
        },
      })
    )
  );
  console.log(`  ✅ ${planos.length} planos criados`);

  // 2. Usuarios ────────────────────────────────────────────────────────────────
  console.log("Criando Usuários...");
  const usuarios = await Promise.all(
    Array.from({ length: 10 }, (_, i) => {
      const nome = randomNome();
      const emailSlug = nome.toLowerCase().replace(/\s/g, ".").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return prisma.usuario.create({
        data: {
          nome,
          email: `${emailSlug}.${i + 1}@studio.com`,
          senha: `hashed_password_${i + 1}`,
          telefone: `(${randomInt(11, 99)}) 9${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
          statusPagamento: randomItem(STATUS_PAGAMENTO),
          planoId: randomItem(planos).id,
        },
      });
    })
  );
  console.log(`  ✅ ${usuarios.length} usuários criados`);

  // 3. Fisioterapeutas ─────────────────────────────────────────────────────────
  console.log("Criando Fisioterapeutas...");
  const fisioterapeutas = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.fisioterapeuta.create({
        data: {
          nome: randomNome(),
          crefito: `CREFITO-${randomInt(10000, 99999)}-F`,
        },
      })
    )
  );
  console.log(`  ✅ ${fisioterapeutas.length} fisioterapeutas criados`);

  // 4. Alunos ──────────────────────────────────────────────────────────────────
  console.log("Criando Alunos...");
  const alunos = await Promise.all(
    Array.from({ length: 10 }, () =>
      prisma.aluno.create({
        data: {
          nome: randomNome(),
          aniversario: randomDate(1970, 2005),
        },
      })
    )
  );
  console.log(`  ✅ ${alunos.length} alunos criados`);

  // 5. Equipamentos ────────────────────────────────────────────────────────────
  console.log("Criando Equipamentos...");
  const equipamentos = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.equipamento.create({
        data: {
          nome: NOMES_EQUIP[i],
          modelo: randomItem(MODELOS_EQUIP),
          marca: randomItem(MARCAS_EQUIP),
          ultimaManutencao: randomPastDate(180),
          proximaManutencao: randomFutureDate(180),
        },
      })
    )
  );
  console.log(`  ✅ ${equipamentos.length} equipamentos criados`);

  // 6. Agendas ─────────────────────────────────────────────────────────────────
  // Criadas antes das aulas (relação 1:1 — aula referencia agenda)
  console.log("Criando Agendas...");
  const agendas = await Promise.all(
    Array.from({ length: 10 }, () => {
      const dia = randomFutureDate(60);
      const hora = new Date(dia);
      hora.setHours(randomInt(7, 18), randomItem([0, 30]), 0, 0);

      return prisma.agenda.create({
        data: {
          dia,
          hora,
          fisioterapeutaId: randomItem(fisioterapeutas).id,
          alunos: {
            connect: randomItems(alunos, 1, 3).map((a) => ({ id: a.id })),
          },
        },
      });
    })
  );
  console.log(`  ✅ ${agendas.length} agendas criadas`);

  // 7. Aulas ───────────────────────────────────────────────────────────────────
  // Cada aula referencia uma agenda única (1:1, agendaId @unique)
  console.log("Criando Aulas...");
  const aulas = await Promise.all(
    agendas.map((agenda) =>
      prisma.aula.create({
        data: {
          data: agenda.dia,
          tipo: randomItem(TIPOS_AULA),
          status: randomItem(STATUS_AULA),
          fisioterapeutaId: agenda.fisioterapeutaId,
          agendaId: agenda.id,
          alunos: {
            connect: randomItems(alunos, 1, 3).map((a) => ({ id: a.id })),
          },
        },
      })
    )
  );
  console.log(`  ✅ ${aulas.length} aulas criadas`);

  // 8. Evoluções ───────────────────────────────────────────────────────────────
  console.log("Criando Evoluções...");
  const evolucoes = await Promise.all(
    Array.from({ length: 10 }, () =>
      prisma.evolucao.create({
        data: {
          evolucaoEntrada: `Paciente apresenta dor ${randomInt(1, 10)}/10, limitação de movimento.`,
          evolucaoSaida: `Após atendimento, dor reduziu para ${randomInt(0, 5)}/10, melhora na amplitude.`,
          alunoId: randomItem(alunos).id,
          equipamentos: {
            connect: randomItems(equipamentos, 1, 3).map((e) => ({ id: e.id })),
          },
        },
      })
    )
  );
  console.log(`  ✅ ${evolucoes.length} evoluções criadas`);

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log(`
  Resumo:
  - Planos:          ${planos.length}
  - Usuários:        ${usuarios.length}
  - Fisioterapeutas: ${fisioterapeutas.length}
  - Alunos:          ${alunos.length}
  - Equipamentos:    ${equipamentos.length}
  - Agendas:         ${agendas.length}
  - Aulas:           ${aulas.length}
  - Evoluções:       ${evolucoes.length}
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