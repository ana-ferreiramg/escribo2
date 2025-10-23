
# Escribo

# Teste Técnico 2: Gerador de Planos de Aula com IA
![Capa](./docs/images/bird_logo.png)

📅 Projeto em desenvolvimento — Última atualização: outubro de 2025

📚 Documentação completa → [Veja aqui](./docs/index.md)

## 📚 Sumário

- [Escribo](#escribo)
- [Teste Técnico 2: Gerador de Planos de Aula com IA](#teste-técnico-2-gerador-de-planos-de-aula-com-ia)
  - [📚 Sumário](#-sumário)
  - [📌 Visão Geral](#-visão-geral)
  - [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
    - [**Backend**](#backend)
    - [**Frontend**](#frontend)
  - [🛠️ Como Rodar o Projeto](#️-como-rodar-o-projeto)
    - [**Pré-requisitos**](#pré-requisitos)
    - [**Passos para Rodar o Backend**](#passos-para-rodar-o-backend)
  - [📡 Principais Endpoints da API](#-principais-endpoints-da-api)
  - [🎯 Contribuição](#-contribuição)
  - [📄 Licença](#-licença)
  - [📞 Contato](#-contato)

## 📌 Visão Geral
Este projeto é uma aplicação Full Stack voltada para auxiliar professores na criação rápida e personalizada de planos de aula utilizando inteligência artificial. A ferramenta integra a API Google Gemini com o Supabase (banco de dados e autenticação), permitindo que o usuário gere, salve e gerencie seus planos de aula de forma simples e eficiente.

O sistema foi construído com o objetivo de demonstrar a aplicação prática de tecnologias modernas no contexto educacional, unindo IA generativa, banco de dados em nuvem e interfaces responsivas.

## 🚀 Tecnologias Utilizadas
### **Backend**
- **Linguagem:** TypeScript
- **Plataforma:** Supabase
- **Banco de Dados:** PostgreSQL (gerenciado pelo supabase)
- **Autenticação:** Supabase Auth
- **Requisições HTTP:** Fetch API
- **IA:** Gemini (2.5. flash)
- **Hospedagem:** Supabase

### **Frontend**
- **Linguagem:** TypeScript
- **Framework:** Next.js
- **Estilização:** Tailwind CSS
- **Autenticação:** Supabase Auth
- **Requisições HTTP:** Fetch
- **Hospedagem:** Vercel

## 🛠️ Como Rodar o Projeto
### **Pré-requisitos**
| Ferramenta   | Versão mínima           | Observações                                            |
| ----------   | ----------------------- | ------------------------------------------------------ |
| Node.js      | 22.x ou superior        | Download                                               |
| Yarn         | 1.22.x ou superior      | Instalação                                             |
| Git          | Qualquer versão estável | Para clonar o repositório                              |
| Supabase CLI | 10.x ou superior        | npm install supabase --save-dev                        |

### **Passos para Rodar o Backend**
```sh
# Clone o repositório
git clone https://github.com/ana-ferreiramg/escribo2.git
cd escribo

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor
yarn dev
```

## 📡 Principais Endpoints da API
| Método | Endpoint     | Descrição                         |
| ------ | ------------ | --------------------------------- |
| POST   | /signup      | Criação de conta                  |
| POST   | /login       | Autenticação do usuário           |
| GET    | /plans       | Listagem de planos                |
| POST   | /plans       | Criação de novo plano             |
| PATCH  | /plans/:id   | Atualização de um plano           |
| DELETE | /plans/:id   | Exclusão de um plano              |  |

## 🎯 Contribuição
Se deseja contribuir para o projeto, siga os seguintes passos:
1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b minha-feature`).
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`).
4. Faça push da branch (`git push origin minha-feature`).
5. Abra um Pull Request.

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato
- Email: anapaulaferreiradev@gmail.com
- LinkedIn: [linkedin.com/in/ana--ferreira](https://linkedin.com/in/ana--ferreira)

---
