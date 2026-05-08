# Back-Office Maquette — LTP Construction SARLU

## Objectif

Créer une maquette premium et professionnelle du back-office LTP Construction SARLU.

Le back-office est une interface visuelle non connectée à une vraie base de données pour le moment, mais avec certaines interactions fonctionnelles en JavaScript local :
- login local ;
- navigation ;
- tableaux ;
- filtres ;
- états ;
- animations ;
- responsive.

Le design doit rester cohérent avec le site principal :
- bleu foncé premium ;
- gold ;
- vert ;
- glassmorphism léger ;
- style corporate BTP moderne.

---

# Modules du Back-Office

## 1. Dashboard
- statistiques générales ;
- activité récente ;
- accès rapide ;
- widgets ;
- notifications.

## 2. Google Analytics (maquette)
- visiteurs ;
- pages populaires ;
- pays visiteurs ;
- évolution trafic ;
- demandes de devis.

## 3. Gestion des employés
- liste employés ;
- rôles ;
- pays ;
- téléphone ;
- email professionnel ;
- statut :
  - actif ;
  - suspendu ;
  - quitté l’entreprise.

## 4. Gestion emails professionnels
- création d’emails ;
- rôles ;
- statut ;
- historique ;
- gestion comptes.

## 5. Gestion projets
- projets ;
- chantiers ;
- statut ;
- pays ;
- budget ;
- galerie images.

## 6. Gestion devis
- demandes ;
- statut ;
- clients ;
- export fictif PDF.

## 7. Gestion messages
- formulaires contact ;
- partenaires ;
- candidatures ;
- support.

## 8. Paramètres
- informations entreprise ;
- réseaux sociaux ;
- contacts ;
- langues ;
- pays actifs.

---

# Structure prévue

```text
admin/
  index.html
  dashboard.html
  employees.html
  emails.html
  analytics.html
  projects.html
  quotes.html
  messages.html
  settings.html

  assets/
    css/
      admin.css

    js/
      admin.js

