# Medix - Plataforma de Saúde Digital

## Vídeo de demonstração

- [Link do vídeo no YouTube](https://youtu.be/xl2QhTteCrw)

## Para utilizar a API siga o passo a passo do repositório abaixo

- [Link repositório Java](https://github.com/challengeoracle/sprint-1-java)

## ⚠ USUÁRIO DE ACESSO
Utilize as seguintes credenciais para acessar o aplicativo:
```bash
  usuario: paciente@medix.com
  senha: senhaSegura123
```

--- 

## Introdução

A plataforma Medix é uma solução integrada que busca resolver a fragmentação e a ineficiência no ecossistema de saúde, conectando pacientes e instituições de forma inteligente. O projeto consiste em um aplicativo móvel para o paciente e um sistema de gestão para as unidades de saúde.

## Objetivos da Solução

O desenvolvimento da plataforma visa alcançar os seguintes objetivos:

- **Empoderar o Paciente:** Oferecer um aplicativo móvel para que pacientes localizem unidades de saúde, verifiquem a disponibilidade de recursos e especialidades e tomem decisões informadas.
- **Otimizar a Gestão Hospitalar:** Fornecer às instituições de saúde uma plataforma para gerenciar recursos em tempo real e utilizar ferramentas de análise de dados para prever picos de demanda.
- **Criar um Ecossistema Integrado:** Construir uma ponte tecnológica que conecta as necessidades dos pacientes com a capacidade das instituições, melhorando a eficiência e a qualidade do atendimento em saúde de forma geral.

## Público-Alvo

A solução é direcionada principalmente a gestores de hospitais, administradores de clínicas e redes de saúde que buscam otimizar a operação e reduzir custos, e também a pacientes e seus familiares, que buscam atendimento médico de forma ágil e transparente. As equipes médicas e administrativas também são usuárias, utilizando os painéis de gestão para otimizar seu trabalho diário.

## Funcionalidades do Aplicativo Móvel

O aplicativo móvel Medix foi desenvolvido para proporcionar uma experiência completa ao paciente, cobrindo os seguintes recursos:

- **Autenticação e Cadastro:** Permite que novos usuários criem uma conta e que usuários existentes façam login para acessar a plataforma.
- **Agendamento de Consultas e Exames:** Um fluxo de múltiplos passos permite ao usuário agendar serviços escolhendo a especialidade, a unidade, o dia, o horário e o profissional. O sistema de agendamentos exibe os próximos compromissos e o histórico.
- **Busca de Unidades de Saúde:** Oferece uma tela para buscar, filtrar e visualizar detalhes de hospitais, clínicas e laboratórios.
- **Resultados de Exames:** Permite o acesso a resultados de exames, exibindo laudos médicos ou tabelas de resultados de forma clara e organizada.
- **Medix AI (Chatbot):** Uma assistente virtual para esclarecer dúvidas sobre saúde e oferecer informações educativas, seguindo um conjunto de regras de segurança que priorizam o bem-estar do paciente.
- **Central de Ajuda:** Seção com perguntas frequentes e informações de contato para suporte.
- **Perfil do Usuário:** Exibe informações do perfil do paciente, como nome, e-mail, CPF e idade, com opções de segurança para ocultar dados sensíveis.

## Arquitetura do Backend (Java)

A documentação do backend em Java detalha a arquitetura que suporta essas funcionalidades, incluindo:

- **Classes de Domínio:** Entidades como `Usuario`, `Paciente` e `UnidadeSaude` foram modeladas para representar a estrutura de dados do sistema. A classe `Usuario` é a base, e dela herdam `Paciente` e `Colaborador`, separando a conta do usuário de seu papel na plataforma.
- **API (Endpoints CRUD):** Foram implementados controladores e a lógica de serviço para operações de Criar, Ler, Atualizar e Excluir logicamente para as entidades principais.
- **Segurança (JWT):** A API conta com filtros de autenticação e tokens JWT para proteger os endpoints, garantindo que apenas usuários autorizados possam acessar os recursos.
- **Diagrama Relacional:** O diagrama relacional mostra as tabelas e os relacionamentos entre elas, cobrindo a parte de usuários e unidades de saúde para um MVP.

## Como Rodar o Projeto Mobile

Para rodar o projeto mobile, siga os passos abaixo:

```bash
git clone https://github.com/challengeoracle/sprint-1-mobile
cd sprint-1-mobile
```

Instale os pacotes:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

## Repositório GitHub do Backend

O código fonte e a documentação completa do backend em Java estão disponíveis no seguinte repositório: [https://github.com/challengeoracle/sprint-1-java](https://github.com/challengeoracle/sprint-1-java)
