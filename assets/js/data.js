/* =====================================================================
   data.js — FONTE ÚNICA DE CONTEÚDO DO PORTFÓLIO
   ---------------------------------------------------------------------
   TODO o texto, links, imagens e metadados do site ficam aqui.
   Para atualizar o portfólio, edite apenas este arquivo.
   Sections renderizadas por: assets/js/components.js
   ===================================================================== */

window.PORTFOLIO_DATA = {

  /* ------------------------------------------------------- perfil --- */
  profile: {
    name: 'Vinicius Nunes',
    fullName: 'Vinicius Nunes da Silva',
    title: 'Analista de Tecnologia da Informação',
    specialties: 'Suporte • Infraestrutura • Automação',
    message:
      'Transformando problemas de TI em soluções práticas, eficientes e automatizadas.',
    heroText:
      'Atuação em suporte N1/N2/N3, infraestrutura, implantação de sistemas e ' +
      'automação de processos, unindo experiência operacional e desenvolvimento ' +
      'de soluções para resolver problemas reais de TI.',
    location: 'Garça - SP',
    availability: 'Mudança / Remoto',
    status: 'Aberto a novas oportunidades',
    photo: 'assets/img/profile.jpg',
    photoAlt: 'Foto profissional de Vinicius Nunes',
    cv: {
      /* SUBSTITUIR: coloque o PDF real em assets/docs/curriculo-vinicius-nunes.pdf */
      file: 'assets/docs/curriculo-vinicius-nunes.pdf',
      label: 'Baixar currículo'
    }
  },

  /* ------------------------------------------------------- contatos -- */
  contacts: {
    linkedin: 'https://linkedin.com/in/vinicius-nunes-da-silva-204979268',
    linkedinLabel: 'linkedin.com/in/vinicius-nunes-da-silva',
    github: 'https://github.com/Vinenuness',
    githubLabel: 'github.com/Vinenuness',
    email: 'vininunesilva3@gmail.com',
    phone: '(14) 99139-6525',
    whatsapp: 'https://wa.me/5514991396525'
  },

  /* ------------------------------------------------------- hero tags - */
  heroTags: ['Suporte N1/N2/N3', 'Infraestrutura', 'Automação', 'Windows', 'Linux', 'Python'],

  /* --------------------------------------------------- indicadores --- */
  /* APENAS números documentados — não inventar outros. */
  metrics: [
    { value: '15h/semana', label: 'Economia estimada com automações' },
    { value: '30%', label: 'Redução no tempo de implantação de sistemas' }
  ],

  /* ---------------------------------------------------- contribuicao - */
  contribute: {
    title: 'Como posso contribuir',
    lead: 'Áreas onde atuo hoje e onde posso gerar resultado desde o primeiro dia.',
    cards: [
      { icon: '🖥️', title: 'Suporte de TI',
        text: 'Suporte N1/N2/N3, troubleshooting, atendimento a usuários, resolução de incidentes e gestão de chamados.' },
      { icon: '🌐', title: 'Infraestrutura',
        text: 'Ambientes Windows/Linux, redes, servidores, backup, serviços e administração de ambientes.' },
      { icon: '⚙️', title: 'Automação',
        text: 'Python, scripts, automação de tarefas repetitivas e desenvolvimento de ferramentas internas.' },
      { icon: '🚀', title: 'Implantação',
        text: 'Análise de infraestrutura, testes, implantação de sistemas e acompanhamento pós-go-live.' },
      { icon: '🔐', title: 'Segurança',
        text: 'Controle de acesso, segurança da informação, LGPD, gestão de incidentes e boas práticas.' },
      { icon: '📊', title: 'Dados',
        text: 'Power BI, Excel, SQL, análise de dados e indicadores.' }
    ]
  },

  /* ------------------------------------------------------ sobre mim -- */
  about: {
    title: 'Sobre mim',
    paragraphs: [
      'Minha trajetória em tecnologia começou com a formação técnica em Eletrônica e evoluiu para a área de ' +
      'Tecnologia da Informação. Ao longo dessa trajetória, desenvolvi experiência em suporte técnico, ' +
      'infraestrutura, implantação de sistemas, automação e desenvolvimento de soluções.',
      'Atualmente atuo como Analista de TI, trabalhando com suporte, infraestrutura, sistemas e automação ' +
      'em um ambiente corporativo.',
      'Meu objetivo profissional é continuar evoluindo principalmente nas áreas de Suporte de TI, ' +
      'Infraestrutura e Operações, utilizando automação e desenvolvimento como ferramentas para melhorar ' +
      'processos e resolver problemas.'
    ],
    /* mini-cards de perfil */
    highlights: [
      { label: 'Localização', value: 'Garça - SP', sub: 'Disponível para mudança / remoto' },
      { label: 'Atuação', value: 'Suporte N3', sub: 'Software & Infraestrutura' },
      { label: 'Formação', value: 'MBA em Gestão de T.I.', sub: '+ pós em Engenharia de Software' },
      { label: 'Status', value: 'Aberto', sub: 'A novas oportunidades' }
    ]
  },

  /* ------------------------------------------------------ timeline --- */
  experience: {
    title: 'Experiência profissional',
    lead: 'Trajetória construída do chão de operação à gestão de TI — cada etapa somando visão de processo, contato com usuário e domínio técnico.',
    items: [
      {
        company: 'AHBB Rede Santa Casa',
        role: 'Analista de TI — Suporte N3, Software & Infraestrutura',
        period: 'Dez/2025 – Atual',
        location: 'Garça - SP',
        current: true,
        summary: 'Suporte avançado, administração de ambientes, implantação de sistemas hospitalares e automação de processos internos.',
        activities: [
          'Desenvolvimento de sistemas web internos e scripts Python para automação',
          'Economia estimada de 15 horas semanais em processos manuais',
          'Administração do ambiente corporativo Nextcloud',
          'Gestão de permissões e usuários, com compartilhamento seguro de arquivos',
          'Rotinas automatizadas de backup',
          'Atuação relacionada à LGPD',
          'Implantação de sistemas hospitalares: análise de infraestrutura, testes e acompanhamento pós-go-live',
          'Redução de 30% no tempo de implantação através de mapeamento de fluxos',
          'Alinhamento com a gestão de TI em decisões técnicas e de segurança'
        ]
      },
      {
        company: 'Profissional autônomo',
        role: 'Desenvolvedor & Consultor de TI Freelance',
        period: 'Mar/2022 – Atual',
        location: 'Remoto / Presencial',
        current: false,
        summary: 'Projetos sob demanda unindo desenvolvimento, infraestrutura e consultoria de TI para pequenos negócios.',
        activities: [
          'Desenvolvimento de soluções web com Python e Flask',
          'Integração com bancos SQL',
          'Automação de processos',
          'Manutenção de hardware e configuração de redes locais',
          'Otimização de sistemas',
          'Boas práticas de segurança da informação'
        ]
      },
      {
        company: 'Prefeitura Municipal de Garça',
        role: 'Agente Comunitário de Saúde',
        period: 'Ago/2022 – Nov/2025',
        location: 'Garça - SP',
        current: false,
        summary: 'Experiência intensiva com dados, sistemas governamentais e relatórios gerenciais.',
        activities: [
          'Organização e consolidação de dados',
          'Excel avançado para relatórios gerenciais e indicadores',
          'Operação de sistemas governamentais (Gov.br / e-SUS)',
          'Controle de integridade de registros'
        ]
      },
      {
        company: 'EIXO SP',
        role: 'Operador de Caixa / Atendimento ao Cliente',
        period: 'Mar/2021 – Mai/2022',
        location: 'Garça - SP',
        current: false,
        summary: 'Atendimento ao cliente e operação de sistemas de venda.',
        activities: [
          'Atendimento ao cliente e operação de sistemas de retaguarda',
          'Rotinas de fechamento e conferência de caixa'
        ]
      },
      {
        company: 'PPA Brasil',
        role: 'Eletrônica, produção e recebimentos',
        period: 'Experiência anterior',
        location: '—',
        current: false,
        summary: 'Base técnica em eletrônica e processos industriais.',
        activities: [
          'Diagnóstico de falhas em placas eletrônicas',
          'Controle de qualidade na produção',
          'ERP TOTVS Protheus: conferência e validação de notas fiscais'
        ]
      }
    ]
  },

  /* --------------------------------------- projeto em destaque (home) */
  featuredProject: {
    label: 'Projeto em destaque',
    title: 'AtivoFix',
    tagline: 'Gestão de TI centralizada em um único ambiente',
    description:
      'Plataforma de gestão de TI desenvolvida para centralizar inventário de computadores, ' +
      'chamados, usuários, unidades, automações e relatórios em um único ambiente.',
    /* pipeline visual */
    pipeline: ['Inventário', 'Agente Windows', 'API', 'Chamados', 'Automação', 'Relatórios'],
    /* o que o projeto demonstra */
    demonstrates: [
      'Suporte', 'Gestão de ativos', 'Automação', 'Desenvolvimento',
      'Infraestrutura', 'API', 'Relatórios'
    ],
    tech: ['Python', 'Flask', 'SQLite', 'REST API', 'Windows Agent', 'Linux', 'Nginx', 'JavaScript'],
    /* SUBSTITUIR/AMPLIAR: adicione mais screenshots reais em assets/img/screenshots/ */
    screenshots: [
      { src: 'assets/img/screenshots/tela-login.jpg', alt: 'Tela de login do AtivoFix com destaque para inventário automático, chamados por unidade e relatórios em PDF', cap: 'Tela de acesso — painel administrativo (AtivoFix v2.0)' },
      { src: 'assets/img/screenshots/abrir-chamado.jpg', alt: 'Portal do usuário do AtivoFix para abertura de chamado sem login, com empresa, unidade, prioridade e anexos', cap: 'Portal do usuário — abertura de chamado sem login' }
    ],
    links: { project: 'https://github.com/Vinenuness/ativofix', case: 'projetos/ativofix/' },
    metrics: ['15h/semana economizadas', '30% menos tempo de implantação']
  },

  /* --------------------------------------------------------- ativoFix */
  ativofix: {
    title: 'AtivoFix',
    subtitle: 'Case: plataforma interna de gestão de TI',
    status: 'Em produção — ambiente corporativo',
    heroText:
      'Ferramenta que nasceu de um problema real do suporte: informação de ativos, chamados e ' +
      'unidades espalhadas em planilhas e memória. O AtivoFix centraliza tudo isso em um único ' +
      'sistema, com automações e relatórios para a operação de TI.',
    sections: {
      problem: {
        title: 'O problema',
        items: [
          'Inventário de computadores disperso — sem visão única do parque de máquinas',
          'Chamados de suporte registrados sem histórico organizado',
          'Informações de usuários e unidades desatualizadas ou espalhadas',
          'Tarefas repetitivas consumindo horas de trabalho manual por semana'
        ]
      },
      solution: {
        title: 'A solução',
        items: [
          'Plataforma web única centralizando inventário, chamados, usuários, unidades, automações e relatórios',
          'Agente Windows que coleta informações dos computadores e envia à API',
          'Automações para reduzir trabalho manual repetitivo',
          'Relatórios e indicadores para apoiar decisões da equipe de TI'
        ]
      },
      features: {
        title: 'Funcionalidades',
        items: [
          'Inventário de computadores com dados coletados automaticamente',
          'Gestão de chamados de suporte',
          'Cadastro de usuários e unidades',
          'Automações de rotinas',
          'Relatórios e dashboards'
        ]
      },
      architecture: {
        title: 'Arquitetura',
        flow: ['Inventário', 'Agente Windows', 'API', 'Chamados', 'Automação', 'Relatórios'],
        items: [
          'Agente instalado nos computadores Windows coleta dados de hardware e sistema',
          'API Flask recebe e processa as informações',
          'SQLite armazena os dados com baixo custo de operação',
          'Nginx serve a aplicação em ambiente Linux',
          'Módulos de chamados, automação e relatórios consomem a mesma base'
        ]
      },
      tech: {
        title: 'Tecnologias',
        items: [
          { name: 'Python', role: 'Linguagem principal — backend, automações e agente' },
          { name: 'Flask', role: 'Framework web da API e da interface' },
          { name: 'SQLite', role: 'Banco de dados embarcado' },
          { name: 'REST API', role: 'Integração entre agente, sistema e automações' },
          { name: 'Windows Agent', role: 'Coleta automática de dados nos endpoints' },
          { name: 'Linux', role: 'Ambiente de produção' },
          { name: 'Nginx', role: 'Servidor web / proxy reverso' },
          { name: 'JavaScript', role: 'Interatividade da interface' }
        ]
      },
      screenshots: {
        title: 'Screenshots',
        note: 'Capturas reais da aplicação em produção — painel administrativo e portal do usuário.',
        items: [
          { src: 'assets/img/screenshots/tela-login.jpg', alt: 'Tela de login do AtivoFix com destaque para inventário automático, chamados por unidade e relatórios em PDF', cap: 'Tela de acesso — painel administrativo (AtivoFix v2.0)' },
          { src: 'assets/img/screenshots/abrir-chamado.jpg', alt: 'Portal do usuário do AtivoFix para abertura de chamado sem login, com empresa, unidade, prioridade e anexos', cap: 'Portal do usuário — abertura de chamado sem login' }
        ]
      },
      security: {
        title: 'Segurança',
        items: [
          'Controle de acesso por usuário',
          'Atenção à LGPD no tratamento de informações de usuários',
          'Comunicação com a API restrita à rede interna',
          'Backups das rotinas de dados'
        ]
      },
      challenges: {
        title: 'Desafios técnicos',
        items: [
          'Coletar dados confiáveis de hardware em máquinas Windows heterogêneas',
          'Manter o agente leve, silencioso e resistente a falhas de rede',
          'Modelar a base para atender inventário, chamados e relatórios ao mesmo tempo',
          'Automatizar sem aumentar a complexidade operacional do dia a dia'
        ]
      },
      learnings: {
        title: 'O que este projeto demonstra',
        items: [
          'Visão de suporte: a ferramenta resolve dores reais do dia a dia do help desk',
          'Gestão de ativos e infraestrutura aplicadas em produção',
          'Capacidade de automatizar processos manuais',
          'Desenvolvimento orientado a problema — não a tecnologia'
        ]
      }
    },
    links: { project: 'https://github.com/Vinenuness/ativofix' }
  },

  /* --------------------------------------------------- competencias -- */
  skills: {
    title: 'Competências',
    lead: 'Tecnologias e práticas organizadas por área de atuação.',
    groups: [
      { name: 'Suporte e Operações', icon: '🖥️',
        items: ['Suporte N1/N2/N3', 'Troubleshooting', 'Gestão de chamados', 'Atendimento a usuários',
                'Implantação de sistemas', 'Documentação'] },
      { name: 'Infraestrutura', icon: '🌐',
        items: ['Windows', 'Linux', 'Redes', 'Servidores', 'Nextcloud', 'Backup', 'Nginx', 'VPN'] },
      { name: 'Automação', icon: '⚙️',
        items: ['Python', 'Scripts', 'Batch', 'PowerShell', 'Agentes Windows'] },
      { name: 'Desenvolvimento', icon: '💻',
        items: ['Python', 'Flask', 'SQL', 'REST API', 'PHP', 'HTML', 'CSS', 'JavaScript'] },
      { name: 'Dados', icon: '📊',
        items: ['Power BI', 'Excel Avançado', 'SQL', 'Pandas', 'NumPy', 'Linguagem R'] },
      { name: 'Segurança e Governança', icon: '🔐',
        items: ['Cibersegurança', 'LGPD', 'Controle de acesso', 'Gestão de incidentes',
                'Análise de vulnerabilidades', 'ITIL', 'COBIT'] },
      { name: 'Ferramentas', icon: '🧰',
        items: ['Git/GitHub', 'Nextcloud', 'TOTVS Protheus', 'AnyDesk', 'Microsoft 365', 'Jira'] }
    ]
  },

  /* ------------------------------------------------ como penso em TI - */
  mindset: {
    title: 'Como eu penso TI',
    lead: 'Um ciclo simples que aplico no dia a dia da operação.',
    pillars: [
      { icon: '🔎', name: 'ENTENDER', text: 'Antes de buscar uma solução, entender o problema e seu impacto.' },
      { icon: '🛠️', name: 'RESOLVER', text: 'Buscar soluções práticas, estáveis e adequadas ao ambiente.' },
      { icon: '⚙️', name: 'AUTOMATIZAR', text: 'Identificar tarefas repetitivas e buscar formas de reduzir trabalho manual.' },
      { icon: '📊', name: 'MELHORAR', text: 'Documentar, medir resultados e buscar melhoria contínua.' }
    ]
  },

  /* ----------------------------------------------------- saude ------ */
  health: {
    title: 'Experiência em Tecnologia na Saúde',
    text: 'Atuação em ambiente hospitalar envolvendo suporte, infraestrutura, implantação de sistemas, ' +
          'testes, acompanhamento pós-go-live e apoio à operação de sistemas.'
  },

  /* ------------------------------------------------------ formacao -- */
  education: {
    title: 'Formação',
    lead: 'Base acadêmica alinhada à gestão de TI, engenharia de software e à origem técnica em eletrônica.',
    items: [
      { degree: 'MBA em Gestão de T.I.', school: 'Unicorp Faculdades',
        type: 'Pós-graduação', period: '', note: '' },
      { degree: 'Especialização / Pós-graduação em Engenharia de Software', school: 'Unicorp Faculdades',
        type: 'Pós-graduação', period: '', note: '' },
      { degree: 'Graduação em Análise e Desenvolvimento de Sistemas', school: 'UNIVEM — Marília/SP',
        type: 'Graduação', period: '', note: '' },
      { degree: 'Técnico em Eletrônica', school: 'ETEC Monsenhor Antônio Magliano — Garça/SP',
        type: 'Técnico', period: '', note: '' },
      { degree: 'Bacharelado em Engenharia Civil', school: 'Instituição não informada',
        type: 'Incompleto', period: '', note: 'Incompleto — 4 anos cursados' }
    ]
  },

  /* -------------------------------------------------- certificacoes - */
  certifications: {
    title: 'Certificações e cursos',
    lead: 'Formações complementares em segurança, suporte, dados e programação.',
    items: [
      { name: 'Hackers do Bem — Formação & Nivelamento em Cibersegurança', hours: '144h',
        area: 'Segurança' },
      { name: 'Dell Technical Support', detail: 'Hardware, Software & Infrastructure', area: 'Suporte' },
      { name: 'Google Technical Support Fundamentals', detail: '', area: 'Suporte' },
      { name: 'Análise de Dados e Business Intelligence', detail: 'Power BI, R e Excel', area: 'Dados' },
      { name: 'Programação Python', detail: '', area: 'Automação' },
      { name: 'Administração de Banco de Dados & Lógica de Programação', detail: '', area: 'Dados' }
    ]
  },

  /* -------------------------------------------------------- contato - */
  contact: {
    title: 'Vamos conversar sobre tecnologia?',
    lead: 'Disponível para oportunidades em TI — suporte, infraestrutura e operações.',
    status: 'Disponível para oportunidades em TI',
    buttons: {
      linkedin: { label: 'LinkedIn' },
      github: { label: 'GitHub' },
      email: { label: 'Enviar e-mail' }
    }
  },

  /* ------------------------------------------------------- footer --- */
  footer: {
    note: 'Portfólio profissional — Analista de Tecnologia da Informação.',
    builtWith: 'Desenvolvido com HTML, CSS e JavaScript puro. Sem dependências.'
  },

  /* --------------------------------------------------- navegacao ---- */
  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Competências', href: '#competencias' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Formação', href: '#formacao' },
    { label: 'Contato', href: '#contato' }
  ],

  /* ------------------------------------------- meta / SEO / compartilhamento */
  meta: {
    title: 'Vinicius Nunes | Analista de TI | Suporte e Infraestrutura',
    description:
      'Portfólio de Vinicius Nunes, Analista de Tecnologia da Informação com experiência em suporte, ' +
      'infraestrutura, automação, implantação de sistemas e gestão de TI.',
    ogImage: 'assets/img/og-image.png',
    ogAtivofixImage: 'assets/img/og-ativofix.png',
    ogType: 'website',
    locale: 'pt_BR'
  },

  /* URL base do site (para canonical/OG). Ajustar ao publicar. */
  siteUrl: 'https://vinenuness.github.io/portfolio'
};
