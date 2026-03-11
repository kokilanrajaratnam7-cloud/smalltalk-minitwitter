# Microblogging Plattform – Transferarbeit
## 1. Ausgangslage

In diesem Projekt wurde eine einfache Microblogging-Plattform entwickelt.
Die Anwendung ermöglicht es Benutzern, kurze Beiträge (Posts) zu erstellen, zu bearbeiten und zu löschen.

Ziel der Arbeit ist es, eine moderne Webanwendung mit einer klaren Architektur zu entwickeln und typische Funktionen einer Social-Media-Plattform umzusetzen.

## 2. Ziel der Anwendung

Die Anwendung soll folgende Funktionen ermöglichen:
- Benutzer können sich registrieren
- Benutzer können sich anmelden (Login)
- Benutzer können Posts erstellen
- Benutzer können ihre eigenen Posts bearbeiten
- Benutzer können ihre eigenen Posts löschen
- Alle Benutzer können die Posts sehen
Damit wird ein einfaches Social-Media-System umgesetzt.

## 3. Verwendete Technologien
### Backend

Das Backend wurde mit folgenden Technologien entwickelt:
- TypeScript
- Bun Runtime
- REST API
- JWT Authentication
Das Backend stellt eine API zur Verfügung, über welche das Frontend mit dem Server kommuniziert.

### Frontend

Das Frontend wurde als Weboberfläche umgesetzt.
Funktionen:
- Login
- Registrierung
- Post erstellen
- Post bearbeiten
- Post löschen
- Posts anzeigen

### Datenbank / Persistenz

Für die Speicherung der Daten wird eine relationale Datenbank verwendet.
Die Kommunikation mit der Datenbank erfolgt über **Drizzle ORM**.  
Drizzle ist ein TypeScript ORM und Query Builder, der eine typsichere Interaktion mit der Datenbank ermöglicht.
Mit Drizzle werden Tabellen für **Benutzer** und **Posts** definiert. Über das Backend können diese Daten erstellt, gelesen, aktualisiert und gelöscht werden (CRUD-Operationen).
Die Datenbank speichert unter anderem:
- Benutzerinformationen (User)
- Beiträge der Benutzer (Posts)
Ein Benutzer kann mehrere Posts erstellen.

## 4. Architektur der Anwendung

Die Anwendung folgt dem Client-Server-Prinzip.
- Das Frontend ist der Client.
- Das Backend stellt eine REST API bereit.
- Die Datenbank speichert Benutzer und Posts.

Der Ablauf:
1. Benutzer sendet Anfrage über das Frontend
2. Anfrage geht an das Backend (API)
3. Backend verarbeitet die Anfrage
4. Daten werden in der Datenbank gespeichert oder gelesen
5. Backend sendet Antwort an das Frontend

## 5. Sicherheit

Für die Anmeldung wird eine Token-basierte Authentifizierung (JWT) verwendet.
Ablauf:
1. Benutzer meldet sich an
2. Server erstellt ein Token
3. Token wird bei weiteren API-Anfragen mitgesendet
4. Backend prüft das Token und erlaubt nur autorisierte Aktionen
Dadurch wird sichergestellt, dass nur eingeloggte Benutzer Posts erstellen oder verändern können.

## 6. Fazit

Mit diesem Projekt wurde eine funktionierende Microblogging-Plattform entwickelt.
Dabei wurden typische Konzepte moderner Webentwicklung umgesetzt, wie REST APIs, Authentifizierung und Client-Server-Architektur.

Die Anwendung zeigt, wie ein einfaches Social-Media-System technisch aufgebaut werden kann.

