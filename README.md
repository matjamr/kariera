<div align="center">

# 🚀 Kariera

**Twoje poszukiwanie pracy, uproszczone.**

Aplikacja internetowa do zarządzania aplikacjami o pracę — śledź wysłane CV, statusy rekrutacji,
rozmowy kwalifikacyjne i statystyki w jednym miejscu.

*Projekt zaliczeniowy — Techniki Projektowania Frontendowego (TPF)*

</div>

## Spis treści
- [Opis aplikacji](#opis-aplikacji)
- [Zaczynamy!](#zaczynamy)
- [Użyte technologie](#użyte-technologie)
- [Struktura projektu](#struktura-projektu)
- [Zrzuty ekranu](#zrzuty-ekranu)
- [Google Analytics](#google-analytics)
- [Hotjar / Contentsquare](#hotjar--contentsquare)
- [Wdrożenie](#wdrożenie)

## Opis aplikacji

**Kariera** to centrum rekrutacyjne dla osób szukających pracy. Aplikacja odwzorowuje prototyp przygotowany w Figmie (`Kariera.fig`) i oferuje:

- 📋 **Moje aplikacje** — karty aplikacji o pracę z pełnym CRUD (kreator 3-krokowy, edycja, usuwanie z potwierdzeniem)
- 📊 **Dashboard** — statystyki, ostatnia aktywność, nadchodzące rozmowy
- 📈 **Analityka** — pipeline rekrutacyjny, trendy, ranking firm
- 📅 **Kalendarz** — widok miesiąca z zaplanowanymi rozmowami
- ⚙️ **Ustawienia** — profil i preferencje poszukiwania pracy
- 📄 **Raport** — raport wyników z eksportem do PDF
- 🔐 **Logowanie Firebase** — email/hasło + Google, chronione trasy

## Zaczynamy!

### 1. Sklonuj repozytorium
```shell
git clone https://github.com/matjamr/kariera.git
cd kariera
```

### 2. Zainstaluj zależności
Wymagany [Node.js](https://nodejs.org/) 18+
```shell
npm install
```

### 3. Skonfiguruj środowisko
Skopiuj `.env.example` do `.env.local` i uzupełnij klucze:

```shell
# Firebase (Console -> Project settings -> Your apps -> Web app)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Hotjar / Contentsquare (id z taga t.contentsquare.net/uxa/<id>.js)
NEXT_PUBLIC_CONTENTSQUARE_TAG_ID=...
```

> **Tryb demo:** gdy zmienne Firebase są puste, aplikacja działa w lokalnym trybie demo —
> zaloguje dowolny e-mail z hasłem o długości min. 6 znaków (bez prawdziwego konta).

### 4. Uruchom
```shell
npm run dev        # http://localhost:3000
```

Pozostałe komendy: `npm run build` (build produkcyjny), `npm start` (serwer produkcyjny), `npm run storybook` (podgląd komponentów).

### 5. Logowanie

Przy skonfigurowanym Firebase możesz użyć konta testowego:

<details>
  <summary>Konto testowe</summary>

```shell
Login: test.kariera@gmail.com
Hasło: Kariera!2026
```

</details>

Możesz też zarejestrować własne konto (`/register`) albo użyć przycisku **Sign in with Google**.

## Użyte technologie
- Next.js (14.2) — App Router + React 18
- TypeScript
- Tailwind CSS + next-themes (tryb ciemny)
- Firebase Authentication (11.x) — email/hasło + Google
- Google Analytics 4 (react-ga4)
- Hotjar / Contentsquare — nagrania sesji i heatmapy
- Storybook
- Git

## Struktura projektu

```
app/
  (auth)/          # logowanie, rejestracja, reset hasła
  (app)/           # część chroniona (AuthGuard): dashboard, applications,
                   # analytics, calendar, settings, pricing, report
  (legal)/         # privacy, terms
  (pages)/         # centrum pomocy (FAQ)
  layout.tsx       # główny layout: AuthProvider + AnalyticsListener
  not-found.tsx    # strona 404
src/
  components/app/  # AppHeader, AppSidebar, MobileTabBar, Modal,
                   # ApplicationWizard, StatusBadge, AuthProvider, AuthGuard...
  hooks/           # useApplications (CRUD w localStorage), useOnClickOutside...
  lib/firebase.ts  # inicjalizacja Firebase ze zmiennych środowiskowych
  shared/data/     # typy i dane startowe
```

Każdy ekran prototypu ma własną trasę (`/login`, `/register`, `/forgot-password`, `/dashboard`,
`/applications`, `/analytics`, `/calendar`, `/settings`, `/pricing`, `/report`), nieistniejące
ścieżki obsługuje strona 404, a trasy aplikacji są chronione — bez zalogowania następuje
przekierowanie na `/login`. Nawigacja odbywa się bez przeładowania strony, a `AnalyticsListener`
raportuje pageview do GA4 i Contentsquare przy każdej zmianie trasy.

## Zrzuty ekranu

### Logowanie
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Logowanie Desktop](docs/screenshots/login.png) | ![Logowanie Mobile](docs/screenshots/mobile-login.png) |

### Rejestracja
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Rejestracja Desktop](docs/screenshots/register.png) | ![Rejestracja Mobile](docs/screenshots/mobile-register.png) |

### Reset hasła
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Reset hasła Desktop](docs/screenshots/forgot-password.png) | ![Reset hasła Mobile](docs/screenshots/mobile-forgot-password.png) |

### Dashboard
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Dashboard Desktop](docs/screenshots/dashboard.png) | ![Dashboard Mobile](docs/screenshots/mobile-dashboard.png) |

### Moje aplikacje
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Aplikacje Desktop](docs/screenshots/applications.png) | ![Aplikacje Mobile](docs/screenshots/mobile-applications.png) |

### Dodawanie aplikacji — kreator 3-krokowy
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Kreator Desktop](docs/screenshots/wizard-step1.png) | ![Kreator Mobile](docs/screenshots/mobile-wizard-step1.png) |

### Potwierdzenie usunięcia
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Modal usuwania Desktop](docs/screenshots/delete-modal.png) | ![Modal usuwania Mobile](docs/screenshots/mobile-delete-modal.png) |

### Analityka
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Analityka Desktop](docs/screenshots/analytics.png) | ![Analityka Mobile](docs/screenshots/mobile-analytics.png) |

### Kalendarz
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Kalendarz Desktop](docs/screenshots/calendar.png) | ![Kalendarz Mobile](docs/screenshots/mobile-calendar.png) |

### Ustawienia
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Ustawienia Desktop](docs/screenshots/settings.png) | ![Ustawienia Mobile](docs/screenshots/mobile-settings.png) |

### Cennik
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Cennik Desktop](docs/screenshots/pricing.png) | ![Cennik Mobile](docs/screenshots/mobile-pricing.png) |

### Raport (eksport PDF)
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![Raport Desktop](docs/screenshots/report.png) | ![Raport Mobile](docs/screenshots/mobile-report.png) |

### Strona 404
| Desktop       | Mobile     |
|:-------------:|:------------:|
| ![404 Desktop](docs/screenshots/404.png) | ![404 Mobile](docs/screenshots/mobile-404.png) |

## Google Analytics

Aplikacja raportuje pageview przy każdej zmianie trasy (SPA) do property GA4 (`G-F3KHRYS3D3`).

Widok "Przegląd w czasie rzeczywistym" z panelu GA4 podczas sesji użytkowników na wersji produkcyjnej:

![GA4 Realtime](docs/screenshots/ga-realtime.png)

## Hotjar / Contentsquare

Hotjar jest częścią Contentsquare — aplikacja ładuje tag śledzący, który nagrywa sesje użytkowników
(Session Replay) i buduje heatmapy. Panel: [app.contentsquare.com](https://app.contentsquare.com).

Lista nagranych sesji użytkowników w panelu:

![Session Replay — lista nagrań](docs/screenshots/hotjar-session-replay.png)

Odtwarzacz nagrania sesji — po lewej lista odwiedzonych podstron, na dole oś czasu z zdarzeniami
(treści na podglądzie są zamaskowane przez domyślne ustawienia prywatności Contentsquare):

![Session Replay — odtwarzacz](docs/screenshots/hotjar-replay-player.png)

## Wdrożenie

### 🌍 Aplikacja działa pod adresem: **[kariera-silk.vercel.app](https://kariera-silk.vercel.app)**

Wdrożenie na [Vercel](https://vercel.com/) (darmowy plan Hobby) przez Vercel CLI: `vercel link` →
`vercel env add` (zmienne z sekcji [Zaczynamy!](#zaczynamy)) → `vercel --prod`. Po wdrożeniu domena
produkcyjna została dodana w Firebase: *Authentication → Settings → Authorized domains*.
