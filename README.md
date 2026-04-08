
# ⛽ Calculadora de Combustível

Uma calculadora web para descobrir qual combustível compensa mais abastecer: **Álcool**, **Gasolina** ou **GNV**.

## 💡 Como funciona

Basta informar o preço por litro do álcool, da gasolina e, opcionalmente, o preço por m³ do GNV. A calculadora usa as seguintes regras de rendimento para comparar:

- **Álcool vs Gasolina** — regra dos 70%: se o álcool custar menos de 70% do preço da gasolina, ele compensa mais.
- **GNV** — usa 65% como fator de rendimento, considerando que carros bicombustíveis adaptados têm consumo diferente.

O app mostra qual opção sai mais barata e exibe uma comparação entre todos os combustíveis informados.

## 🚀 Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## 📦 Como rodar localmente

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## 🏗️ Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📋 Funcionalidades

- Comparação entre até 3 combustíveis (Álcool, Gasolina e GNV)
- Campo de GNV opcional
- Saudação dinâmica de acordo com o horário de Brasília
- Efeito parallax sutil no cartão principal
- Interface limpa e responsiva
=======
# calculadora-combustivel

