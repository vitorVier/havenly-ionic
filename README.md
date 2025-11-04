Como configurar e rodar este projeto Ionic + Capacitor no Windows

1. Pré-requisitos (o que instalar)

Baixe e instale a versão LTS do Node.js: https://nodejs.org
No instalador, marque “Add to PATH”.
Verifique:
node -v
npm -v

Ionic CLI (opcional, mas recomendado)
Instale globalmente:
npm install -g @ionic/cli
Verifique:
ionic -v

Java JDK
Instale o Java (JDK) compatível com o Android Gradle Plugin (normalmente Java 11 ou 17). Baixe do site da Oracle ou de distribuições OpenJDK (Amazon Corretto, Temurin, etc).
Após instalar, configure a variável de ambiente JAVA_HOME apontando para a pasta do JDK.

Android Studio (inclui SDK, AVD, ferramentas Gradle)
Baixe e instale: https://developer.android.com/studio
Ao abrir, use o SDK Manager para instalar:
Android SDK Platform (API 33/34 por exemplo)
Android SDK Build-Tools
Emulator
Android SDK Platform-Tools (adb)
Crie pelo menos um AVD (Device Manager → Create Virtual Device) com imagem x86_64 (Google Play recommended).

2. Clonar o repositório em uma pasta escolhida

Abra um terminal onde você quer salvar o projeto e rode:
git clone https://github.com/usuario/repositorio.git nome-da-pasta

ou para um caminho absoluto:
git clone https://github.com/usuario/repositorio.git "C:\Users\User\Projetos\havenly-ionic"

Depois:
cd nome-da-pasta
dir    # (ou ls) — confirme que existe package.json, src/, capacitor.config.ts, android/

3. Instalar dependências do projeto (na raiz do repo)

No terminal (na pasta raiz do projeto):
npm install

4. Gerar o build web do Ionic e copiar para Android (Capacitor)
Passo a passo (sempre na raiz do projeto):

Gerar build web:
npm run build
ou
ionic build

Caso a pasta android/ ainda não exista, adicione a plataforma Android:
npx cap add android
ou com ionic CLI:
ionic capacitor add android

Copiar os arquivos gerados para o projeto Android:
npx cap copy android
ou para sincronizar plugins:
npx cap sync android

Abrir o projeto Android no Android Studio:
npx cap open android

5. Rodar o app no emulador / dispositivo

5.1 Pelo Android Studio
Abra o projeto Android (se já não abriu).
Aguarde o Gradle sincronizar (Sync / Build).
Em Run → Edit Configurations crie uma configuração “Android App” apontando para o módulo app.
Selecione um AVD ou dispositivo conectado (cabo USB + Depuração USB ativa).
Clique Run ▶️.

5.2 Pelo terminal (Gradle)
Na pasta android/:
cd android
.\gradlew assembleDebug
.\gradlew installDebug

