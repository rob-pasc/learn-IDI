# learn-IDI

learn-IDI ist eine Webanwendung auf Basis von React und Vite, die als zentraler Hub für Tutoriums-Inhalte dient (Timetable, Unterlagen, Ressourcen).

## Voraussetzungen

- **Node.js**  
- **npm**

## Projekt lokal ausführen 

### 1. Projekt entpacken
Entpacken Sie die ZIP-Datei in einen beliebigen Ordner.

### 2. Abhängigkeiten installieren
Im Projektordner:

```bash
npm install
```

### 3. Development Server starten

```bash
npm run dev
```

Danach die angezeigte URL im Browser öffnen.

####  Browser-Hinweis
Für die beste Darstellung wird ein aktueller Chromium-basierter Browser wie **Google Chrome** oder **Microsoft Edge** empfohlen, da diese alle im Projekt verwendeten modernen CSS-Features vollständig unterstützen.  
Die Anwendung ist jedoch auch in anderen modernen Browsern nutzbar; einzelne visuelle Details können dort geringfügig abweichen, die Funktionalität bleibt jedoch immer erhalten.

---

### Anmerkung 1: Automatische Index-Generierung

Beim Starten von `dev` sowie vor `build` wird automatisch ein Index generiert:

* Script: `scripts/generate-materials-index.mjs`
* Output: `public/data/materials.index.json`

Dieser Index wird im Frontend verwendet, um die *Unterlagen* dynamisch anzuzeigen.
Ist dies erfolgreich, sollte in der Konsole so etwas wie `[gen] wrote /data/materials.index.json with 26 items` angezeigt werden.

### Anmerkung 2: Hosting

Die Website ist in diesem Zustand auch auf Render gehostet. Sollte aus irgendeinem Grund der lokale Build fehlschlagen, wäre sie hier zur Gänze einsehbar: [learn-idi.onrender.com](https://learn-idi.onrender.com/)