# Tópico — CI/CD (Trilha 1: Devs Nativos)

> **Perfil:** Devs com background Android/iOS que já configuram pipelines de build para APK/IPA, usam Fastlane, certificados e assinatura de apps. O foco é integrar o React Native nesse fluxo de CI/CD já conhecido.

---

## Objetivo do tópico

Ao final, o dev deve conseguir:
- Entender como o RN entra no pipeline de build Android/iOS
- Configurar uma pipeline simples com:
  - Instalação de dependências JS (`npm ci`/`yarn install`)
  - Lint + testes
  - Build Android (`./gradlew assembleRelease`)
  - Build iOS (`xcodebuild` ou Fastlane)
- Gerar artefatos (APK/IPA) e disponibilizá-los para o time
- Comparar com o fluxo já utilizado em apps nativos puros

---

## Mapeamento: Android/iOS → React Native

| Nativo                         | React Native / CI                      | Observação |
|--------------------------------|----------------------------------------|------------|
| Build Gradle (APK/AAB)        | `./gradlew assembleRelease`            | Igual ao nativo, com bundle RN incluído |
| Xcode build (IPA)             | `xcodebuild` / Fastlane                | Mesma pipeline de iOS, RN é só mais um target |
| Lint (Ktlint, SwiftLint)      | ESLint para JS/TS                      | Roda em paralelo aos linters nativos |
| Testes unitários JUnit/XCTest | Jest                                   | Complementar aos testes nativos |

---

## Fluxo típico de CI para RN

### Android (GitHub Actions, exemplo)

```yaml
name: React Native CI

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  build-android:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build Android
        run: cd android && ./gradlew assembleRelease

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-release
          path: android/app/build/outputs/apk/release/app-release.apk
```

### iOS (macOS runner)

```yaml
  build-ios:
    runs-on: macos-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install pods
        run: cd ios && pod install

      - name: Build iOS
        run: |
          cd ios
          xcodebuild \
            -workspace MyApp.xcworkspace \
            -scheme MyApp \
            -configuration Release \
            -sdk iphoneos
```

---

## Pontos de atenção

- **Cache de dependências JS**: usar cache de `node_modules` ou do `npm ci` para acelerar builds.
- **Pods iOS**: caching de `Pods/` (quando possível) ou de `Podfile.lock` para reduzir tempo de `pod install`.
- **Ambiente de build**: garantir que variáveis de ambiente de RN, Android e iOS estejam configuradas (JAVA_HOME, ANDROID_HOME, etc.).
- **Bundle JS**: o bundle JS é gerado automaticamente como parte do build nativo; não é necessário passo separado em CI para a maioria dos casos.

---

## Exercício prático

1. Crie um workflow de CI para Android que:
   - Executa lint (`npm run lint`).
   - Executa testes (`npm test`).
   - Gera um APK release (`./gradlew assembleRelease`).
2. Configure o workflow para publicar o APK como artefato.
3. Documente para o time em um `CI-CD.md`:
   - Como o pipeline funciona.
   - Onde encontrar os artefatos.
   - Quais checks são obrigatórios antes de merge (lint/test/build).

---

## Materiais de estudo

### Documentação & guias
- GitHub Actions — documentação oficial.
- Fastlane — guia de automação para Android/iOS.

### Artigos
- *React Native CI/CD Best Practices* — visão geral de pipelines para RN.
- *Automating Android & iOS Builds for React Native Apps* — foco em deployment.

### Vídeos

#### CI/CD for React Native Apps (40 min)

<details>
<summary>Descrição do conteúdo</summary>

O vídeo mostra, passo a passo, como montar um pipeline de CI/CD completo para um app RN, incluindo etapas de lint, testes, build e distribuição. A ênfase é em projetos que já possuem pipelines nativos e precisam apenas encaixar o RN nesse fluxo.

Tópicos:
- Estrutura básica de workflows no GitHub Actions.
- Integração com Fastlane para distribuição em TestFlight/Play Store.
- Gestão de certificados e keystores.
- Estratégias de versionamento e incrementos de build number.

</details>
