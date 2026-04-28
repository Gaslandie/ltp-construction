# LTP Construction SARLU — Maquette Front-End Statique

Maquette premium du futur site web de **LTP Construction SARLU**.

Objectif : présenter LTP Construction comme une entreprise crédible, structurée, haut de gamme et capable d’accompagner des projets BTP, infrastructures, génie civil, travaux publics, mines, immobilier, maintenance industrielle et logistique chantier.

---

## Technologies utilisées

- HTML5
- CSS3
- Bootstrap 5
- Bootstrap Icons
- JavaScript léger
- Google Fonts — Inter
- Images distantes Unsplash pour la maquette

Aucun backend, CMS, React, Node.js ou base de données pour le moment.

---

## Structure du projet

```txt
.
├── index.html
├── guinee/
│   ├── index.html
│   ├── a-propos.html
│   ├── services.html
│   ├── projets.html
│   ├── mines-infrastructures.html
│   ├── devis.html
│   ├── blog.html
│   └── contact.html
├── cameroun/
│   ├── index.html
│   ├── a-propos.html
│   ├── services.html
│   ├── projets.html
│   ├── infrastructures.html
│   ├── devis.html
│   ├── blog.html
│   └── contact.html
└── admin/
    └── index.html
```

---

## Pages principales

### Portail

- `index.html`

Page d’entrée multi-pays avec choix :

- LTP Construction Guinée
- LTP Construction Cameroun

### Guinée FR

- `guinee/index.html`
- `guinee/a-propos.html`
- `guinee/services.html`
- `guinee/projets.html`
- `guinee/mines-infrastructures.html`
- `guinee/devis.html`
- `guinee/blog.html`
- `guinee/contact.html`

### Cameroun FR

- `cameroun/index.html`
- `cameroun/a-propos.html`
- `cameroun/services.html`
- `cameroun/projets.html`
- `cameroun/infrastructures.html`
- `cameroun/devis.html`
- `cameroun/blog.html`
- `cameroun/contact.html`

### Administration

- `admin/index.html`

Page placeholder premium pour le futur back-office.

---

## Version linguistique

Pour la maquette actuelle, seule la version française est visible.

Les dossiers `/en/` peuvent être conservés plus tard si une version anglaise est demandée, mais ils ne sont pas affichés dans les navbars françaises.

---

## Comment tester en local

Ouvrir le portail :

```bash
xdg-open index.html
```

Ouvrir la version Guinée :

```bash
xdg-open guinee/index.html
```

Ouvrir la version Cameroun :

```bash
xdg-open cameroun/index.html
```

Ouvrir l’espace administration :

```bash
xdg-open admin/index.html
```

---

## Points à remplacer avant mise en production

### Contacts

Remplacer les valeurs temporaires :

```txt
+224000000000
+237000000000
contact@ltpconstruction.com
devis@ltpconstruction.com
rh@ltpconstruction.com
```

par les vrais numéros et emails validés par le client.

### Images

Les images actuelles viennent d’Unsplash pour la maquette.

Avant mise en production, remplacer par :

- photos réelles de chantiers ;
- photos d’équipe ;
- photos de machines ;
- projets réalisés ;
- bureaux ou présence locale.

### Formulaires

Les formulaires sont statiques pour le moment.

À connecter plus tard à :

- email ;
- WhatsApp ;
- backend ;
- CRM ;
- Google Sheets ;
- outil de gestion commerciale.

### Google Analytics

Un emplacement est prévu dans le `<head>` du portail.

Ajouter l’ID réel Google Analytics plus tard.

---

## Bonnes pratiques

- Ne pas utiliser de liens `#` pour les pages principales.
- Garder les liens réels vers les fichiers existants.
- Ne pas publier d’informations sensibles dans le dépôt.
- Ne pas mettre de documents internes client dans le site public.
- Ne pas commiter de fichiers `.env`, clés API, accès cPanel, mots de passe ou documents confidentiels.

---

## Commandes Git recommandées

Vérifier les modifications :

```bash
git status
```

Ajouter les fichiers :

```bash
git add .
```

Créer le commit :

```bash
git commit -m "Complete LTP Construction static website mockup"
```

Envoyer sur GitHub :

```bash
git push
```

---

## Prochaines évolutions possibles

- Version anglaise.
- Remplacement des images par des photos réelles.
- Connexion des formulaires.
- Création d’un vrai back-office.
- Ajout d’un blog dynamique.
- Ajout de pages projets détaillées.
- Optimisation SEO avancée.
- Intégration Google Analytics.
- Déploiement sur hébergement web.
