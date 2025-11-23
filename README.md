# One Matter Mobile - Aplicativo Candidato (Frontend)

Este é o repositório do aplicativo mobile **One Matter**, o componente frontend do ecossistema Skill Station. Ele é desenvolvido utilizando **Expo Router** e **React Native** com **NativeWind** para estilização. O objetivo do aplicativo é proporcionar uma **Candidatura Cega**, conectando talentos a vagas com foco exclusivo em habilidades (`skills`) e potencial, alinhado à metodologia ética do projeto **Skill Station**.

---

## Ecossistema Skill Station: Recrutamento Ético e Tecnológico

O aplicativo mobile é a primeira etapa do processo, a **Candidatura Cega**.

O Skill Station estabelece um ecossistema completo que visa eliminar vieses e garantir a ética em processos seletivos de tecnologia. A avaliação ocorre em múltiplas camadas:

1.  **Candidatura Cega (Mobile / API Java):** O candidato interage com este aplicativo, onde sua aplicação é avaliada puramente com base nas skills cadastradas. A primeira fase de seleção pelos recrutadores é "às cegas".
2.  **A Estação Física (IoT & Hardware):** Candidatos pré-selecionados na primeira fase **são convidados pelos recrutadores** a realizar provas técnicas em um ambiente físico padronizado, controlado e monitorado por dispositivos IoT (ESP32).
3.  **Tecnologia de Confiança (Web Server & MQTT):** A avaliação técnica é executada via um servidor web embarcado no ESP32, com comunicação assíncrona e auditável via MQTT para envio e registro dos resultados.

Este projeto visa a união estratégica de IoT, Desenvolvimento Avançado e Metodologia Ética para modernizar o mercado de trabalho.

---

## Informações de Acesso e Links

| Descrição                            | Link / Valor                                 |
| :----------------------------------- | :------------------------------------------- |
| **API Java (Backend) - Repositório** | https://github.com/mtslma/one-matter-api.git |
| **API Java (Backend) - URL Base**    | [INSERIR LINK DO DEPLOY DA API AQUI]         |
| **Vídeo Demonstrativo do Projeto**   | [INSERIR LINK DO VÍDEO DEMONSTRATIVO AQUI]   |
| **Credencial de Acesso (Email)**     | `candidato@onematter.com`                    |
| **Credencial de Acesso (Senha)**     | `senhaSegura123`                             |

---

## Configuração do Backend (API Java)

Para que o aplicativo mobile funcione, o backend (API Java) deve estar ativo e acessível.

### Passos para Inicializar a API Localmente

1.  **Clone o repositório da API:**

    ```bash
    git clone https://github.com/mtslma/one-matter-api.git
    cd one-matter-api
    ```

2.  **Pré-requisitos:** Certifique-se de ter instalado o **Java Development Kit (JDK)** (versão 17 ou superior) e o **Maven** ou o **Gradle** (dependendo da sua estrutura de build).

3.  **Configuração do Banco de Dados:**

    -   Verifique o arquivo `application.properties` ou `application.yml` para a configuração do banco de dados (ex: H2, PostgreSQL, MySQL).
    -   Para o desenvolvimento local, geralmente é utilizado um banco em memória (como H2) ou um banco local (como PostgreSQL) configurado.
    -   A API provavelmente está configurada para iniciar com dados de teste (incluindo o usuário `candidato@onematter.com`).

4.  **Compilar e Rodar o Projeto (Spring Boot):**
    `bash
./mvnw clean install
./mvnw spring-boot:run
`

Após a inicialização bem-sucedida, a API estará rodando, geralmente na porta `8080`, e o endpoint base será `http://localhost:8080/api`.

> **Atenção:** Se a API estiver rodando localmente, ajuste a URL base no arquivo `src/api/apiClient.ts` do projeto mobile para o IP local da sua máquina, como `http://SEU_IP_LOCAL:8080/api`.

---

## Instalação e Execução do Aplicativo Mobile

### Tecnologias Utilizadas

-   **Framework:** React Native
-   **Gerenciamento de Rotas:** Expo Router
-   **Estilização:** NativeWind (Tailwind CSS para React Native)
-   **Gerenciamento de Estado/Formulários:** React Context, `react-hook-form`.

### Passos de Instalação

1.  **Instale as dependências:**

    ```bash
    npm install

    # ou

    yarn install
    ```

2.  **Inicie o projeto Expo:**
    ```bash
    npx expo start
    ```

O projeto será iniciado no Metro Bundler, e você poderá escanear o QR Code com o aplicativo **Expo Go** para executar o aplicativo em seu dispositivo móvel ou emulador.

---

## Principais Funcionalidades Implementadas

O aplicativo mobile é o ponto de entrada do candidato no ecossistema One Matter e implementa todo o fluxo de gerenciamento de perfil e candidaturas.

### 1. Fluxo Essencial do Candidato

-   **Autenticação e Cadastro:** Suporte completo para Login e um fluxo de Cadastro de usuário dividido em **três etapas** (Credenciais, Dados Pessoais e Seleção de Skills).
-   **Gerenciamento de Perfil:** Visualização completa dos dados do usuário (nome, CPF mascarado, gênero, idade, skills, etc.) e funcionalidade de **Edição de Perfil** em modal para atualizar Nome, Gênero, Telefone e Skills.
-   **Busca de Vagas:** A tela de exploração lista vagas ativas, realizando a lógica de frontend para **filtrar e ocultar vagas** às quais o usuário já se candidatou.
-   **Ações de Candidatura:** Permite que o usuário realize novas **Candidaturas** e visualize ou **Cancele** candidaturas ativas na seção dedicada.

### 2. Navegação e Arquitetura

-   **Navegação por Tabs:** Estrutura de navegação principal baseada em cinco abas (Home, Explore, Candidaturas, Perfil e Suporte) usando Expo Router Tabs.

### 3. Seção de Ajuda e Suporte

-   **Acesso Rápido a Dúvidas:** Implementação de uma tela de **Perguntas Frequentes (FAQ)**.
-   **Canais de Comunicação:** Tela de **Canais de Comunicação** com links clicáveis para e-mail e telefone de suporte.
-   **Relato de Problemas:** Formulário simples para que o usuário possa enviar feedback ou relatar erros.
-   **Informações Legais:** Telas dedicadas para a visualização dos **Termos de Uso** e da **Política de Privacidade**.
