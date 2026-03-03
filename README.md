# ☕ Coffee

> **Calculadora profissional para o preparo perfeito de café**

Aplicação interativa que utiliza técnicas científicas para ajudar você a manipular a concentração, o perfil de sabores, a textura e todos os aspectos importantes do seu café.

🌐 **Acesse em:** [coffee.densyy.com](https://coffee.densyy.com)

## 🎯 Sobre

Coffee é uma ferramenta educativa e prática para baristas, entusiastas e profissionais da indústria cafeeira. Com calculadoras interativas baseadas em métodos consagrados como V60, você aprende as proporções ideais de água, café e temperatura para extrair o melhor potencial de cada grão.

## 🚀 Features

- 📊 **Calculadoras Interativas** - Métodos profissionais de preparo
- 🎨 **Interface Intuitiva** - Design limpo e responsivo
- 📱 **Mobile-First** - Funciona perfeitamente em qualquer dispositivo
- ⚡ **Performance** - Construído com Vite e Svelte para máxima velocidade
- 🌍 **Português** - Totalmente em português brasileiro

## 🛠️ Stack Técnico

- **Framework**: [Svelte 5](https://svelte.dev) - Reatividade simplificada
- **Build Tool**: [Vite](https://vitejs.dev) - Build rápido e bundling otimizado
- **Roteamento**: [Svelte SPA Router](https://github.com/ItalyPaleAle/svelte-spa-router)
- **Runtime**: [Bun](https://bun.sh) - JavaScript runtime rápido e moderno

## 📦 Instalação

### Pré-requisitos
- [Bun](https://bun.sh) (recomendado) ou Node.js 18+

### Setup

```bash
# Clonar o repositório
git clone https://github.com/densyy/coffee.git
cd coffee

# Instalar dependências
bun install
```

## 🚀 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
bun run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🔨 Build

```bash
# Gerar build para produção
bun run build

# Visualizar build localmente
bun run serve
```

Os arquivos otimizados estarão em `./build`

## 📁 Estrutura do Projeto

```
coffee/
├── src/
│   ├── components/       # Componentes Svelte reutilizáveis
│   ├── pages/           # Páginas/Telas da aplicação
│   ├── routes/          # Componentes de rota
│   ├── stores/          # Stores Svelte (estado reativo)
│   ├── lib/             # Utilitários e helpers
│   ├── App.svelte       # Componente raiz
│   ├── main.js          # Ponto de entrada
│   └── routes.js        # Definição de rotas
├── public/              # Assets estáticos
│   ├── fonts/          # Fontes do projeto
│   ├── images/         # Imagens e favicons
│   └── global.css      # Estilos globais
├── build/              # Output de produção (gerado)
├── vite.config.js      # Configuração do Vite
├── svelte.config.js    # Configuração do Svelte
└── package.json        # Dependências e scripts
```

## 🎓 Como Usar

1. **Acesse** [coffee.densyy.com](https://coffee.densyy.com)
2. **Selecione** o método de preparo (V60, etc.)
3. **Configure** os parâmetros (gramas de café, temperatura, quantidade de água)
4. **Siga** as instruções passo a passo
5. **Aproveite** seu café perfeito ☕

---

**Feito com ☕ e ❤️** por [densyy](https://github.com/densyy)
