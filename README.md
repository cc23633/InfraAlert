# InfraAlert - Documentação Técnica

## 1. Requisitos Iniciais

### Ferramentas Necessárias
// Instale Node.js: Ambiente de execução JavaScript
https://nodejs.org/

// Instale Expo CLI globalmente
npm install -g expo-cli

// Certifique-se de ter o Expo Go instalado no dispositivo físico (Android/iOS)
// Disponível na Play Store/App Store

## 2. Clonagem do Projeto

// Clone o repositório
git clone https://github.com/SEU-USUARIO/InfraAlert.git
cd InfraAlert

## 3. Instalação de Dependências

// Instale as dependências principais
npm install expo react react-native @react-navigation/native @react-navigation/stack

// Instale dependências opcionais para suporte a Web
npm install react-dom@19.0.0 react-native-web@0.20.0 @expo/metro-runtime@5.0.4

// Forçar instalação em caso de conflitos de versão
npm install --legacy-peer-deps

## 4. Executando o Projeto

### Para Web
npx expo start --web

### Para Android
npx expo start --android

### Para iOS
npx expo start --ios

### Usando QR Code
// Execute o servidor
npx expo start

// Abra o Expo Go no celular e escaneie o QR Code exibido no terminal