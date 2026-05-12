// je recupere le canvas depuis le HTML
var monCanvas = document.getElementById('fond-canvas');
var ctx = monCanvas.getContext('2d');

var largeur, hauteur;
var mesParticules = [];

// les couleurs  Des particules
var couleurs = ['rgba(56,189,248,', 'rgba(125,211,252,', 'rgba(14,165,233,'];

// je redimensionne le canvas quand la fenetre change
function redimensionner() {
  largeur = monCanvas.width = window.innerWidth;
  hauteur = monCanvas.height = window.innerHeight;
}

class Particule {
  constructor() { this.reinitialiser(); }
  reinitialiser() {
    this.x = Math.random() * largeur;
    this.y = Math.random() * hauteur;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.taille = Math.random() * 2 + 1;
    this.couleur = couleurs[Math.floor(Math.random() * couleurs.length)];
    this.alpha = Math.random() * 0.6 + 0.2;
    this.pulse = Math.random() * Math.PI * 2;
  }
  deplacer() {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += 0.02;
    // si la particule sort de l'ecran on la remet au debut
    if (this.x < 0 || this.x > largeur || this.y < 0 || this.y > hauteur) this.reinitialiser();
  }
  dessiner() {
    var a = this.alpha + Math.sin(this.pulse) * 0.15;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.taille, 0, Math.PI * 2);
    ctx.fillStyle = this.couleur + a + ')';
    ctx.fill();
  }
}

// je cree toutes les particules au debut
function creerParticules() {
  mesParticules = [];
  var nombre = Math.floor((largeur * hauteur) / 12000);
  for (var i = 0; i < nombre; i++) {
    mesParticules.push(new Particule());
  }
}

// je dessine les lignes entre les particules proches
function dessinerLignes() {
    var distanceMax = 140;
    for (var i = 0; i < mesParticules.length; i++) {
      for (var j = i + 1; j < mesParticules.length; j++) {
        var dx = mesParticules[i].x - mesParticules[j].x;
        var dy = mesParticules[i].y - mesParticules[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < distanceMax) {
          var alpha = (1 - distance / distanceMax) * 0.25;
          ctx.beginPath();
          ctx.moveTo(mesParticules[i].x, mesParticules[i].y);
          ctx.lineTo(mesParticules[j].x, mesParticules[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
  }
}

// les cercles lumineux qui bougent en arriere plan
var cerclesLumineux = [
  { x: 0.15, y: 0.25, r: 250, couleur: 'rgba(56,189,248,0.04)', vitesse: 0.0003 },
  { x: 0.82, y: 0.6,  r: 300, couleur: 'rgba(14,165,233,0.035)', vitesse: 0.0002 },
  { x: 0.5,  y: 0.8,  r: 200, couleur: 'rgba(125,211,252,0.03)', vitesse: 0.0004 },
];
var tempsAnimation = 0;

function dessinerCercles() {
  tempsAnimation += 0.01;
  cerclesLumineux.forEach(function(cercle, i) {
    var ox = (cercle.x + Math.sin(tempsAnimation * cercle.vitesse * 1000 + i) * 0.05) * largeur;
    var oy = (cercle.y + Math.cos(tempsAnimation * cercle.vitesse * 800  + i) * 0.04) * hauteur;
    var degrade = ctx.createRadialGradient(ox, oy, 0, ox, oy, cercle.r);
    degrade.addColorStop(0, cercle.couleur);
    degrade.addColorStop(1, 'transparent');
    ctx.fillStyle = degrade;
    ctx.beginPath();
    ctx.arc(ox, oy, cercle.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

// la boucle principale d'animation
function animer() {
  ctx.clearRect(0, 0, largeur, hauteur);
  // je dessine le fond degrade
  var fondDegrade = ctx.createLinearGradient(0, 0, 0, hauteur);
  fondDegrade.addColorStop(0, '#060d1a');
  fondDegrade.addColorStop(0.5, '#08111f');
  fondDegrade.addColorStop(1, '#060d1a');
  ctx.fillStyle = fondDegrade;
  ctx.fillRect(0, 0, largeur, hauteur);
  dessinerCercles();
  dessinerLignes();
  mesParticules.forEach(function(p) { p.deplacer(); p.dessiner(); });
  requestAnimationFrame(animer);
}

// je lance tout au chargement
window.addEventListener('resize', function() { redimensionner(); creerParticules(); });
redimensionner();
creerParticules();
animer();

// les cercles suivent  la souris
document.addEventListener('mousemove', function(e) {
  var mx = e.clientX / largeur - 0.5;
  var my = e.clientY / hauteur - 0.5;
  cerclesLumineux[0].x = 0.15 + mx * 0.04;
  cerclesLumineux[0].y = 0.25 + my * 0.04;
});

// apparition au scroll 
// j'utilise IntersectionObserver pour detecter quand les elements sont visibles
var tousLesElements = document.querySelectorAll('.apparition');
var observateur = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

tousLesElements.forEach(function(el) { observateur.observe(el); });

// ========== OUVRIR ET FERMER LES CARTES FORMATION ==========
function ouvrirFormation(carte) {
  var estOuverte = carte.classList.contains('ouverte');
  // je ferme toutes les cartes d'abord
  document.querySelectorAll('.carte-formation').forEach(function(c) {
    c.classList.remove('ouverte');
    c.querySelector('.icone-toggle').style.transform = 'rotate(0deg)';
    c.querySelector('.bouton-details').innerHTML = '<i class="fa-solid fa-chevron-down icone-toggle"></i> Voir les détails';
  });
  // si elle n'etait pas deja ouverte je l'ouvre
  if (!estOuverte) {
    carte.classList.add('ouverte');
    carte.querySelector('.icone-toggle').style.transform = 'rotate(180deg)';
    carte.querySelector('.bouton-details').innerHTML = '<i class="fa-solid fa-chevron-up icone-toggle" style="transform:none"></i> Masquer les détails';
  }
}

// je change le lien actif selon la section visible
var toutesSections = document.querySelectorAll('section[id]');
var tousLiensNav = document.querySelectorAll('.liste-nav a');

window.addEventListener('scroll', function() {
  var sectionActive = '';
  toutesSections.forEach(function(s) {
    if (window.scrollY >= s.offsetTop - 120) sectionActive = s.id;
  });
  tousLiensNav.forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + sectionActive);
  });
});

// menu mobile 
$(document).ready(function () {

  // quand on clique sur le menu , il  apparait ou disparait
  $(".bouton-menu").click(function () {
    $(".liste-nav").toggleClass("visible");
  });

  // quand on clique sur un lien on ferme le menu
  $(".liste-nav a").click(function () {
    $(".liste-nav").removeClass("visible");
  });

  //  animation des barres de competences
  function animerBarres() {
    $(".categorie-competence").each(function () {
      var categorie = $(this);
      // si deja animee on ne refait rien
      if (categorie.data("anime") === true) return;
      var positionCategorie = categorie.offset().top;
      var hauteurFenetre    = $(window).scrollTop() + $(window).height();
      if (hauteurFenetre > positionCategorie + 80) {
        categorie.data("anime", true);
        // j'anime chaque barre jusqu'a son pourcentage
        categorie.find(".barre-remplissage").each(function () {
          var pourcentage = $(this).data("pct");
          $(this).css("width", "0%").animate({ width: pourcentage + "%" }, 1200);
        });
      }
    });
  }

  $(window).on("scroll", animerBarres);
  animerBarres(); // je lance aussi au chargement

  // effet de survol sur les comprtences 
  $(document).on("mouseenter", ".item-competence", function () {
    $(this).find(".barre-remplissage").css("box-shadow", "0 0 20px rgba(56,189,248,0.7)");
    $(this).find(".nom-competence").css("color", "#38bdf8");
  });

  $(document).on("mouseleave", ".item-competence", function () {
    $(this).find(".barre-remplissage").css("box-shadow", "0 0 12px rgba(56,189,248,0.4)");
    $(this).find(".nom-competence").css("color", "");
  });

});
