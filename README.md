# Mon CV en ligne — Fatim-Zahra Essabiri

Bonjour ! Ce projet c'est mon CV personnel que j'ai fait en HTML, CSS et JavaScript.
C'est un site web avec plusieurs sections qui présentent mes compétences, mes projets et mes formations.

## Ce que j'ai utilisé

1. **HTML** → pour la structure de la page
2. **CSS** → pour le design et les animations
3. **JavaScript** → pour les effets interactifs
4. **jQuery** → pour simplifier certaines parties du JS (menu hamburger, animation des barres)
5. **React** → pour les cartes projets et le formulaire de contact
6. **EmailJS** → pour envoyer les messages du formulaire par email
7. **Font Awesome** → pour les icônes
8. **Google Fonts** → pour les polices (Playfair Display et DM Sans)

## Les fichiers du projet

CV/
|
|__ index.html            // la structure de cv 
|
|__ css/
|     |___style.css       // le design et le style de cv 
|__ js/
|     |___ app.js        // javascript principal , concerenent react je le integrer dans la page html
|
|__ README.md            // explication de mon travaille 


## Les sections du site

1. **Accueil** → mon nom, mon rôle et les boutons pour naviguer
2. **À propos** → une description de qui je suis et ce que je sais faire
3. **Compétences** → des barres de progression pour chaque technologie
4. **Projets** → mes projets universitaires (générés avec React)
5. **Formation** → mon parcours scolaire avec des cartes cliquables
6. **Langues** → les langues que je parle avec des points de niveau
7. **Contact** → un formulaire pour m'envoyer un message


## Comment ça marche

### Le fond animé (canvas)
Dans <app.js> j'ai créé des particules qui bougent sur un canvas HTML.
Les particules sont des petits points bleus connectés par des lignes quand elles sont proches.
Le fond suit aussi un peu la souris.

### L'animation au scroll
J'utilise <IntersectionObserver> pour détecter quand un élément entre dans l'écran.
Quand c'est le cas, j'ajoute la classe <.visible> qui déclenche l'animation CSS.

### Les barres de compétences
Les barres partent de 0% et s'animent jusqu'au bon pourcentage avec jQuery.
L'animation se déclenche seulement quand on scroll jusqu'à la section compétences.

### Le menu hamburger (mobile)
Sur les petits écrans le menu de navigation se cache.
Quand on clique sur l'icône hamburger, jQuery ajoute la classe `.visible` pour l'afficher.

### Les cartes formation
Quand on clique sur une carte, la fonction `ouvrirFormation()` est appelée.
Elle ferme toutes les autres cartes et ouvre celle sur laquelle on a cliqué.

### Les composants React
J'utilise React directement dans le HTML avec Babel (pas besoin de Node.js).
J'ai fait 3 composants :
- `CarteProjet` → affiche une carte pour chaque projet
- `BarreCompetence` → une barre de progression (pas utilisée dans la version finale)
- `FormulaireContact` → le formulaire avec validation et envoi par EmailJS


## Pour configurer le formulaire de contact

Dans `index.html` il faut remplacer ces 3 lignes par tes vraies clés EmailJS :

```javascript
var CLE_PUBLIQUE_EMAILJS  = "REMPLACE_PAR_TA_PUBLIC_KEY";
var ID_SERVICE_EMAILJS    = "REMPLACE_PAR_TON_SERVICE_ID";
var ID_TEMPLATE_EMAILJS   = "REMPLACE_PAR_TON_TEMPLATE_ID";
```

Tu peux créer un compte gratuit sur [emailjs.com](https://www.emailjs.com)



*Projet réalisé dans le cadre de ma 2ème année Licence Informatique — FSSM Marrakech*
