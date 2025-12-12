import { PrismaClient, UserRole, SatelliteCategory, SatelliteStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ================================
  // USUARIO CEO - EDWIN
  // ================================
  console.log('👤 Creating CEO user...');
  
  const hashedPassword = await bcrypt.hash('AurumCEO2025!', 10);
  
  const ceo = await prisma.user.upsert({
    where: { email: 'edwin@aurumcapital.com' },
    update: {},
    create: {
      email: 'edwin@aurumcapital.com',
      name: 'Edwin',
      password: hashedPassword,
      role: UserRole.CEO,
      phone: '+1-555-0100',
      position: 'Chief Executive Officer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Edwin',
      allowedSatellites: [], // CEO tiene acceso a todos, no necesita lista
    },
  });

  console.log(`✅ CEO created: ${ceo.email}`);

  // ================================
  // 11 SATÉLITES DEL HOLDING
  // ================================
  console.log('🛰️  Creating satellites...');

  const satellites = [
    {
      code: 'QHOSTING',
      name: 'QHosting',
      category: SatelliteCategory.INFRASTRUCTURE,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 3,
      email: 'support@qhosting.com',
      website: 'https://qhosting.com',
      description: 'Proveedor de infraestructura y hosting cloud',
      primaryColor: '#0066FF',
      logo: '/satellites/qhosting.svg',
    },
    {
      code: 'NEURONADS',
      name: 'NeuroNads',
      category: SatelliteCategory.MARKETING,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 6,
      email: 'hello@neuronads.com',
      website: 'https://neuronads.com',
      description: 'Agencia de marketing digital y publicidad',
      primaryColor: '#FF3366',
      logo: '/satellites/neuronads.svg',
    },
    {
      code: 'SHULA_STUDIO',
      name: 'Shula Studio',
      category: SatelliteCategory.BEAUTY,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 9,
      email: 'info@shulastudio.com',
      website: 'https://shulastudio.com',
      description: 'Estudio de belleza y cuidado personal',
      primaryColor: '#FF69B4',
      logo: '/satellites/shula-studio.svg',
    },
    {
      code: 'LUMINAFLEX',
      name: 'LuminaFlex',
      category: SatelliteCategory.MANUFACTURING,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 3,
      email: 'contact@luminaflex.com',
      website: 'https://luminaflex.com',
      description: 'Manufactura de productos industriales',
      primaryColor: '#FFA500',
      logo: '/satellites/luminaflex.svg',
    },
    {
      code: 'ESCALAFIN',
      name: 'Escalafín',
      category: SatelliteCategory.FINTECH,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 3,
      email: 'soporte@escalafin.com',
      website: 'https://escalafin.com',
      description: 'Plataforma fintech para gestión financiera',
      primaryColor: '#00C853',
      logo: '/satellites/escalafin.svg',
    },
    {
      code: 'CUENTY',
      name: 'Cuenty',
      category: SatelliteCategory.SAAS,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 7,
      email: 'support@cuenty.com',
      website: 'https://cuenty.com',
      description: 'Software SaaS de contabilidad y facturación',
      primaryColor: '#2196F3',
      logo: '/satellites/cuenty.svg',
    },
    {
      code: 'WHATSCLOUD',
      name: 'WhatsCloud',
      category: SatelliteCategory.SAAS,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 3,
      email: 'hello@whatscloud.com',
      website: 'https://whatscloud.com',
      description: 'Plataforma SaaS para comunicaciones empresariales',
      primaryColor: '#25D366',
      logo: '/satellites/whatscloud.svg',
    },
    {
      code: 'VERTEXERP',
      name: 'VertexERP',
      category: SatelliteCategory.CONSULTING,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 3,
      email: 'info@vertexerp.com',
      website: 'https://vertexerp.com',
      description: 'Consultoría y desarrollo de sistemas ERP',
      primaryColor: '#9C27B0',
      logo: '/satellites/vertexerp.svg',
    },
    {
      code: 'CITA_PLANNER',
      name: 'Cita Planner',
      category: SatelliteCategory.SAAS,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 3,
      email: 'support@citaplanner.com',
      website: 'https://citaplanner.com',
      description: 'Software SaaS para gestión de citas y agenda',
      primaryColor: '#E91E63',
      logo: '/satellites/cita-planner.svg',
    },
    {
      code: 'CLOUDMX',
      name: 'CloudMX',
      category: SatelliteCategory.HARDWARE,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 3,
      email: 'ventas@cloudmx.com',
      website: 'https://cloudmx.com',
      description: 'Distribuidor de hardware y equipamiento cloud',
      primaryColor: '#607D8B',
      logo: '/satellites/cloudmx.svg',
    },
    {
      code: 'AURUM_INVEST',
      name: 'Aurum Invest',
      category: SatelliteCategory.TRADING,
      status: SatelliteStatus.ACTIVE,
      inboxNumber: 3,
      email: 'invest@aurumcapital.com',
      website: 'https://auruminvest.com',
      description: 'División de inversiones y trading del holding',
      primaryColor: '#FFD700',
      logo: '/satellites/aurum-invest.svg',
    },
  ];

  let createdCount = 0;
  for (const satelliteData of satellites) {
    const satellite = await prisma.satellite.upsert({
      where: { code: satelliteData.code },
      update: {},
      create: satelliteData,
    });
    
    console.log(`  ✅ ${satellite.code} - ${satellite.name}`);
    createdCount++;

    // Crear configuración básica para cada satélite
    await prisma.satelliteConfig.upsert({
      where: { satelliteId: satellite.id },
      update: {},
      create: {
        satelliteId: satellite.id,
        hasDatabase: ['ESCALAFIN', 'CUENTY', 'WHATSCLOUD', 'VERTEXERP', 'CITA_PLANNER'].includes(satellite.code),
        hasRedis: ['ESCALAFIN', 'CUENTY', 'WHATSCLOUD'].includes(satellite.code),
        customSettings: {
          timezone: 'America/Mexico_City',
          language: 'es',
          currency: 'USD',
        },
      },
    });
  }

  console.log(`✅ Created ${createdCount} satellites`);

  // ================================
  // USUARIOS ADICIONALES DE EJEMPLO
  // ================================
  console.log('👥 Creating additional users...');

  const managerPassword = await bcrypt.hash('Manager2025!', 10);
  const employeePassword = await bcrypt.hash('Employee2025!', 10);

  // Manager con acceso a algunos satélites
  const manager = await prisma.user.upsert({
    where: { email: 'manager@aurumcapital.com' },
    update: {},
    create: {
      email: 'manager@aurumcapital.com',
      name: 'Carlos Manager',
      password: managerPassword,
      role: UserRole.MANAGER,
      phone: '+1-555-0101',
      position: 'Project Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      allowedSatellites: ['QHOSTING', 'ESCALAFIN', 'CUENTY', 'WHATSCLOUD'],
    },
  });
  console.log(`  ✅ Manager created: ${manager.email}`);

  // Employee
  const employee = await prisma.user.upsert({
    where: { email: 'employee@aurumcapital.com' },
    update: {},
    create: {
      email: 'employee@aurumcapital.com',
      name: 'Ana Employee',
      password: employeePassword,
      role: UserRole.EMPLOYEE,
      phone: '+1-555-0102',
      position: 'Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      allowedSatellites: [],
    },
  });
  console.log(`  ✅ Employee created: ${employee.email}`);

  // ================================
  // CONFIGURACIÓN DEL SISTEMA
  // ================================
  console.log('⚙️  Creating system configuration...');

  await prisma.systemConfig.upsert({
    where: { key: 'app.name' },
    update: {},
    create: {
      key: 'app.name',
      value: 'Aurum Control Center',
      description: 'Nombre de la aplicación',
      isPublic: true,
    },
  });

  await prisma.systemConfig.upsert({
    where: { key: 'app.version' },
    update: {},
    create: {
      key: 'app.version',
      value: '1.0.0',
      description: 'Versión actual del sistema',
      isPublic: true,
    },
  });

  await prisma.systemConfig.upsert({
    where: { key: 'app.theme' },
    update: {},
    create: {
      key: 'app.theme',
      value: {
        name: 'Cyberpunk Gold',
        primaryColor: '#FFD700',
        backgroundColor: '#0f172a',
      },
      description: 'Tema visual de la aplicación',
      isPublic: true,
    },
  });

  await prisma.systemConfig.upsert({
    where: { key: 'app.maintenance_mode' },
    update: {},
    create: {
      key: 'app.maintenance_mode',
      value: false,
      description: 'Modo de mantenimiento',
      isPublic: true,
    },
  });

  console.log('✅ System configuration created');

  // ================================
  // TAREAS DE EJEMPLO
  // ================================
  console.log('📋 Creating sample tasks...');

  const qhosting = await prisma.satellite.findUnique({ where: { code: 'QHOSTING' } });
  const escalafin = await prisma.satellite.findUnique({ where: { code: 'ESCALAFIN' } });

  if (qhosting) {
    await prisma.task.create({
      data: {
        title: 'Migrar servidores a nueva infraestructura',
        description: 'Migración de 5 servidores de clientes legacy a nueva infraestructura cloud',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        satelliteId: qhosting.id,
        assigneeId: employee.id,
        creatorId: ceo.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
        estimatedHours: 40,
        tags: ['migration', 'infrastructure', 'urgent'],
      },
    });
  }

  if (escalafin) {
    await prisma.task.create({
      data: {
        title: 'Implementar nueva funcionalidad de reportes',
        description: 'Desarrollar módulo de reportes financieros con gráficas interactivas',
        status: 'TODO',
        priority: 'MEDIUM',
        satelliteId: escalafin.id,
        assigneeId: manager.id,
        creatorId: ceo.id,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días
        estimatedHours: 80,
        tags: ['feature', 'frontend', 'reports'],
      },
    });
  }

  console.log('✅ Sample tasks created');

  console.log('\n✨ Seeding completed successfully!\n');
  console.log('📝 Default credentials:');
  console.log('   CEO:      edwin@aurumcapital.com / AurumCEO2025!');
  console.log('   Manager:  manager@aurumcapital.com / Manager2025!');
  console.log('   Employee: employee@aurumcapital.com / Employee2025!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
