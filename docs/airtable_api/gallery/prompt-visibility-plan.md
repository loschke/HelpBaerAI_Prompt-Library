# Implementierungsplan: Prompt-Sichtbarkeit basierend auf Nutzer-Status

## 1. Voraussetzungen

### 1.1 Benötigte Daten
- Authentifizierungsstatus des Nutzers
- Subscription Tier des Nutzers (FREE/PREMIUM)
- FREE/PREMIUM Status der Prompts

### 1.2 Technische Anforderungen
- NextAuth.js Integration muss vorhanden sein
- Session muss um subscriptionTier erweitert sein
- Galerie-Komponente benötigt Zugriff auf Auth-Status

## 2. Implementierungsschritte

### 2.1 Session-Erweiterung
- Typ-Definition für erweiterte Session erstellen
- Integration des subscriptionTier in die Session

### 2.2 Komponenten-Anpassung
- Integration des Auth-Status in die Galerie
- Implementierung der Sichtbarkeitslogik
- Erstellung einer Helper-Funktion für Anzeigeentscheidungen

### 2.3 UI-Anpassungen
- Design für nicht-sichtbare Prompts
- Upgrade-Hinweise für FREE User
- Anpassung der Prompt-Anzeige basierend auf Berechtigungen

## 3. Teststrategie

### 3.1 Testszenarien
- Nicht eingeloggter Benutzer
- FREE User mit FREE Prompt
- FREE User mit PREMIUM Prompt
- PREMIUM User mit beiden Prompt-Typen

### 3.2 Edge Cases
- Verhalten bei Session-Timeout
- Handling von Subscription-Änderungen
- Fehlerbehandlung

## 4. Sicherheitsaspekte
- Server-seitige Validierung
- Schutz sensibler Daten
- Zugriffskontrollen

## 5. Performance
- Optimierung der Ladezeiten
- Effiziente Statusprüfungen
- Caching-Strategien

## 6. Dokumentation
- Aktualisierung der Komponenten-Dokumentation
- Beschreibung der Zugriffslogik
- Wartungshinweise 