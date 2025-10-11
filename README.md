# Sistema de Gestão de Estoque

Sistema para controlar estoque de produtos. Ajuda a saber quando precisa comprar mais produtos.

## Integrantes do Grupo

- RM 560812 - Gabriel Dos Santos Souza
- RM 560649 - Thomas Henrique Baute
- RM 559999 - Bruno Mateus Tizer das Chagas

## Como rodar?

1. Instalar dependências:

```bash
npm install
```

2. Iniciar o projeto:

```bash
npx expo start
```

3. Rodar no dispositivo:

- Escanear QR Code com Expo Go (Android/iOS)
- Ou pressionar `a` para Android emulator
- Ou pressionar `i` para iOS simulator
- Ou pressionar `w` para web

## Funcionalidades

### 1. Navegação entre telas (30 pontos)

- Expo Router com navegação por tabs
- 3 tabs principais: Fornecedores, Produtos e Estoque
- Tela inicial (index) com botão para entrar no sistema
- Navegação para formulários de cadastro

### 2. Protótipo visual funcional (30 pontos)

- Tela inicial com apresentação do sistema
- 3 tabs com layouts funcionais
- Formulários de cadastro de fornecedores e produtos
- Listagem de dados cadastrados
- Design simples e coerente

### 3. Formulário com manipulação de estado (20 pontos)

- Formulário de Fornecedor com campos: nome, CNPJ, telefone, email
- Formulário de Produto com campos: código e nome
- Controle de estado com useState
- Dados atualizados em tempo real

### 4. Armazenamento local com AsyncStorage (20 pontos)

- Dados de fornecedores salvos em AsyncStorage
- Dados de produtos salvos em AsyncStorage
- Dados persistem após reiniciar o app
- Carregamento automático dos dados ao abrir as telas

## Estrutura do Projeto

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Layout das tabs
│   ├── fornecedores.tsx     # Lista de fornecedores
│   ├── produtos.tsx         # Lista de produtos
│   └── estoque.tsx          # Visualização do estoque
├── _layout.tsx              # Layout raiz
├── index.tsx                # Tela inicial
├── fornecedor-form.tsx      # Formulário de fornecedor
└── produto-form.tsx         # Formulário de produto
```

## Tecnologias Utilizadas

- React Native
- Expo
- Expo Router (navegação)
- AsyncStorage (armazenamento local)
- TypeScript

## Vídeo Pitch

https://www.loom.com/share/a613b40c79c244608f3542cf14f4f79c?sid=b49be580-427a-4031-99c3-a9c4e66bacb0

## Vídeo de Funcionalidades

https://app.guidde.com/share/playbooks/5QVsBRgF2wLtsgB5oGVJ3e?origin=FpQpm0BK0JcIFJS3zfGOLS7I1eG2
