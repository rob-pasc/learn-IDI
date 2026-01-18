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

Danach die angezeigte URL im Browser öffnen (typischerweise `http://localhost:5173`).

####  Browser-Hinweis
Für die beste Darstellung wird ein aktueller Chromium-basierter Browser wie **Google Chrome** oder **Microsoft Edge** empfohlen, da diese alle im Projekt verwendeten modernen CSS-Features vollständig unterstützen.  
Die Anwendung ist jedoch auch in anderen modernen Browsern nutzbar; einzelne visuelle Details können dort geringfügig abweichen, die Funktionalität bleibt jedoch immer erhalten.


---

## Daten & Inhalte

### Unterlagen (Downloads)

Unterlagen liegen unter:

```
public/downloads/
  web/
  rdb/
  prog/
  nosql/
```

In diesen Ordnern befinden sich ausschließlich Dateien vom Typ `.zip`, `.md`, `.pdf`, `.sql` (sollte nicht allzu groß sein; keine Unterordner).

### Automatische Index-Generierung

Beim Starten von `dev` sowie vor `build` wird automatisch ein Index generiert:

* Script: `scripts/generate-materials-index.mjs`
* Output: `public/data/materials.index.json`

Dieser Index wird im Frontend verwendet, um die Unterlagen dynamisch anzuzeigen.

