/* admin.js — Back-office LTP Construction SARLU */

(function () {
  'use strict';

  const sidebar   = document.getElementById('adminSidebar');
  const overlay   = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('sidebarToggle');
  const closeBtn  = document.getElementById('sidebarCloseBtn');
  const moduleLabels = {
    dashboard: {
      status: [
        ['success', 'Vue prête'],
        ['warning', 'Données fictives'],
        ['', 'Connexion backend à venir']
      ],
      emptyTitle: 'Aucune alerte critique',
      emptyText: 'Les alertes opérationnelles apparaîtront ici dès que le module sera connecté.'
    },
    employees: {
      status: [
        ['success', 'Accès préparés'],
        ['warning', 'Rôles à valider'],
        ['', 'Annuaire à connecter']
      ],
      emptyTitle: 'Aucun compte en attente',
      emptyText: 'Les invitations et demandes de validation seront listées dans cet espace.'
    },
    emails: {
      status: [
        ['success', 'Structure prête'],
        ['warning', 'DNS à contrôler'],
        ['', 'Boîtes à synchroniser']
      ],
      emptyTitle: 'Aucune erreur email',
      emptyText: 'Les problèmes de configuration ou de livraison seront affichés ici.'
    },
    analytics: {
      status: [
        ['success', 'Vue synthèse'],
        ['warning', 'Tracking à brancher'],
        ['', 'Rapports à venir']
      ],
      emptyTitle: 'Aucun rapport généré',
      emptyText: 'Les exports et comparatifs apparaîtront après activation des mesures.'
    },
    projects: {
      status: [
        ['success', 'Pipeline prêt'],
        ['warning', 'Planning fictif'],
        ['danger', 'Risques à qualifier']
      ],
      emptyTitle: 'Aucun blocage renseigné',
      emptyText: 'Les risques projet seront visibles ici après saisie des chantiers.'
    },
    quotes: {
      status: [
        ['success', 'Flux préparé'],
        ['warning', 'Modèles à valider'],
        ['', 'Historique à connecter']
      ],
      emptyTitle: 'Aucun devis urgent',
      emptyText: 'Les demandes prioritaires remonteront ici avec leur statut de traitement.'
    },
    messages: {
      status: [
        ['success', 'Inbox prête'],
        ['warning', 'Routage à définir'],
        ['danger', 'Urgences simulées']
      ],
      emptyTitle: 'Aucun message assigné',
      emptyText: 'Les conversations affectées à un utilisateur apparaîtront dans cette zone.'
    },
    settings: {
      status: [
        ['success', 'Base configurée'],
        ['warning', 'Sécurité à finaliser'],
        ['', 'Audit à prévoir']
      ],
      emptyTitle: 'Aucune modification récente',
      emptyText: 'Le journal d’activité sera alimenté quand les actions admin seront branchées.'
    }
  };

  function openSidebar() {
    sidebar  && sidebar.classList.add('is-open');
    overlay  && overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar  && sidebar.classList.remove('is-open');
    overlay  && overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  toggleBtn && toggleBtn.addEventListener('click', openSidebar);
  closeBtn  && closeBtn.addEventListener('click', closeSidebar);
  overlay   && overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

  /* Active nav link via filename */
  var page = location.pathname.split('/').pop().replace('.html', '');
  document.querySelectorAll('.sidebar-link[data-page]').forEach(function (link) {
    if (link.dataset.page === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  document.querySelectorAll('.sidebar-link[data-page]').forEach(function (link) {
    link.addEventListener('click', closeSidebar);
  });

  var sidebarFooter = document.querySelector('.sidebar-footer');
  if (sidebarFooter && !sidebarFooter.querySelector('.sidebar-logout-link')) {
    var logout = document.createElement('a');
    logout.href = '../index.html';
    logout.className = 'sidebar-link sidebar-footer-link sidebar-logout-link';
    logout.innerHTML = '<i class="bi bi-box-arrow-right"></i><span>Déconnexion</span>';
    sidebarFooter.appendChild(logout);
  }

  document.querySelectorAll('.module-list em').forEach(function (badge, index) {
    var labels = ['Prévu', 'En attente', 'À valider', 'Brouillon'];
    badge.textContent = labels[index % labels.length];
  });

  var currentModule = moduleLabels[page];
  var primaryCard = document.querySelector('.module-card-main');
  var sideCard = document.querySelector('.module-grid .module-card:not(.module-card-main)');

  if (currentModule && primaryCard && !primaryCard.querySelector('.module-status')) {
    var statusWrap = document.createElement('div');
    statusWrap.className = 'module-status';

    currentModule.status.forEach(function (item) {
      var badge = document.createElement('span');
      badge.className = 'status-badge' + (item[0] ? ' ' + item[0] : '');
      badge.innerHTML = '<i class="bi bi-circle-fill"></i>' + item[1];
      statusWrap.appendChild(badge);
    });

    primaryCard.appendChild(statusWrap);
  }

  if (currentModule && sideCard && !sideCard.querySelector('.empty-state')) {
    var empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<i class="bi bi-inbox"></i><div><strong>' + currentModule.emptyTitle + '</strong><span>' + currentModule.emptyText + '</span></div>';
    sideCard.appendChild(empty);
  }

})();
