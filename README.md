# SAPE - Scanner de Pendências

## 📋 Sobre

O **SAPE** é uma ferramenta desenvolvida para facilitar a consulta de pendências de Impostos de diversas empresas de forma automatizada. O sistema processa uma lista de inscrições e retorna informações sobre pendências encontradas, organizando os resultados de forma clara e eficiente.

## ⚡ Funcionalidades

- Consulta automática de pendências FGTS (`Futuramente outros impostos`)
- Processamento em lote de múltiplas empresas
- Sistema de logs coloridos para fácil acompanhamento

## 📋 Requisitos
- Node.js
- NPM ou Yarn
- Lista de Inscrições válidas
- Sistema de API funcional

## ⚙️ API

Para utilizar este sistema, é necessário possuir uma **API própria** configurada que seja capaz de:

- **Gerar e renovar tokens de autenticação** no sistema oficial do FGTS
- **Acessar o perfil do procurador** autorizado
- **Obter tokens gateway** para controle de sessão

### Requisitos da API
- Integração com o sistema oficial do FGTS Digital
- Capacidade de gerenciar e renovar tokens de sessão do procurador
- Endpoint dedicado para geração do token do procurador

### Configuração
As credenciais da sua API devem ser configuradas no arquivo `.env`:

```env
API_KEY=sua_chave_de_api
API_URL=url_da_sua_api
PROCURADOR=inscrição_do_procurador
```

## 🚀 Como usar

1. **Preparação**
  - Crie o arquivo `./data/empresas.txt`
  - Adicione as inscrições por linha no arquivo

2. **Configuração**
- Crie um arquivo `.env`
- Adicione os valores `API_KEY`, `API_URL` e `PROCURADOR` no seu arquivo `.env`

3. **Execução**
  ```bash
  npm install
  npm start
  ```

## 🗒️ Sistema de Logs
| Cor | Status            | Descrição                                            |
|-----|-------------------|------------------------------------------------------|
| 🟢  | Sem Pendências     | A empresa não possui pendências registradas.         |
| 🟣  | Com Pendências     | A empresa possui pendências a serem resolvidas.      |
| 🔴  | Outros             | Sem Procuração, Filial ou erro desconhecido.         |

## 📁 Estrutura
```
├── modules/
│   ├── token.js                # Gerenciamento de tokens
│   ├── fgts.js                 # Consultas FGTS
│   ├── logs.js                 # Sistema de logs
│   └── others.js               # Utilitários
├── data/
│   └── empresas.txt            # Lista de Inscrições
├── logs/
│   └── 01-08-2025/
│       ├── com_pendencias.log  # Arquivo com as empresas que tem pendências
        ├── sem_pendencias.log  # Arquivo com as empresas sem pendências
        └── error.log           # Arquivo com os erros (Sem Procuração, Filial, Outros)
├── .env                        # Arquivo de credenciais
└── index.js                    # Arquivo principal
```

## 🎯 Roadmap

- ✅ Consulta FGTS
- ⏳ Integração DARF (planejado)
- ⏳ Relatórios em PDF (planejado)
- ⏳ Interface web (planejado)

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
