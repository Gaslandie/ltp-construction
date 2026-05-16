/* admin.js — Back-office LTP Construction SARLU */

(function () {
  'use strict';

  var STORAGE_KEYS = {
    isLoggedIn: 'isLoggedIn',
    adminEmail: 'adminEmail',
    country: 'country'
  };

  var CREDENTIALS = {
    'admin_guinee@ltpconstruction.com': {
      password: 'LTP2026GN',
      country: 'guinee',
      dashboard: 'guinee/dashboard.html'
    },
    'admin_cameroun@ltpconstruction.com': {
      password: 'LTP2026CM',
      country: 'cameroun',
      dashboard: 'cameroun/dashboard.html'
    }
  };

  var COUNTRY_DASHBOARDS = {
    guinee: 'guinee/dashboard.html',
    cameroun: 'cameroun/dashboard.html'
  };

  var pagePath = window.location.pathname.toLowerCase();
  var isLoginPage = document.body && document.body.dataset.adminPage === 'login';
  var requiredCountry = getRequiredCountry();
  var sidebar = document.getElementById('adminSidebar');
  var overlay = document.getElementById('sidebarOverlay');
  var toggleBtn = document.getElementById('sidebarToggle');
  var closeBtn = document.getElementById('sidebarCloseBtn');
  var moduleLabels = {
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

  function getRequiredCountry() {
    if (pagePath.indexOf('/admin/guinee/') !== -1) return 'guinee';
    if (pagePath.indexOf('/admin/cameroun/') !== -1) return 'cameroun';
    return null;
  }

  function getDashboardForCountry(country) {
    return COUNTRY_DASHBOARDS[country] || 'index.html';
  }

  function buildAdminUrl(relativePath) {
    var prefix = requiredCountry ? '../' : './';
    return new URL(prefix + relativePath, window.location.href).href;
  }

  function redirectTo(relativePath) {
    window.location.replace(buildAdminUrl(relativePath));
  }

  function revealProtectedPage() {
    if (!isLoginPage && document.body) {
      document.body.classList.add('admin-auth-ready');
    }
  }

  function replaceCurrentState() {
    try {
      window.history.replaceState(
        {
          adminPage: window.location.pathname,
          adminCountry: requiredCountry || 'login'
        },
        document.title,
        window.location.href
      );
    } catch (error) {
      /* Ignore history API failures in restricted contexts. */
    }
  }

  function clearSession() {
    try {
      window.localStorage.removeItem(STORAGE_KEYS.isLoggedIn);
      window.localStorage.removeItem(STORAGE_KEYS.adminEmail);
      window.localStorage.removeItem(STORAGE_KEYS.country);
    } catch (error) {
      /* Ignore localStorage failures on unsupported contexts. */
    }
  }

  function readSession() {
    try {
      var isLoggedIn = window.localStorage.getItem(STORAGE_KEYS.isLoggedIn);
      var adminEmail = window.localStorage.getItem(STORAGE_KEYS.adminEmail);
      var country = window.localStorage.getItem(STORAGE_KEYS.country);

      if (isLoggedIn !== 'true' || !adminEmail || !country) {
        clearSession();
        return null;
      }

      var account = CREDENTIALS[adminEmail.toLowerCase()];
      if (!account || account.country !== country) {
        clearSession();
        return null;
      }

      return {
        isLoggedIn: true,
        adminEmail: adminEmail.toLowerCase(),
        country: country,
        dashboard: account.dashboard
      };
    } catch (error) {
      clearSession();
      return null;
    }
  }

  function saveSession(adminEmail, country) {
    try {
      window.localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
      window.localStorage.setItem(STORAGE_KEYS.adminEmail, adminEmail);
      window.localStorage.setItem(STORAGE_KEYS.country, country);
      return true;
    } catch (error) {
      clearSession();
      return false;
    }
  }

  function redirectToSessionDashboard(session) {
    if (!session) {
      redirectTo('index.html');
      return;
    }

    redirectTo(getDashboardForCountry(session.country));
  }

  function enforceSessionAccess() {
    var session = readSession();

    if (isLoginPage) {
      if (session) {
        redirectToSessionDashboard(session);
        return null;
      }

      replaceCurrentState();
      return null;
    }

    if (!requiredCountry) return session;

    if (!session) {
      redirectTo('index.html');
      return null;
    }

    if (session.country !== requiredCountry) {
      redirectToSessionDashboard(session);
      return null;
    }

    replaceCurrentState();
    return session;
  }

  function revalidateAccess() {
    if (isLoginPage) {
      var loginSession = readSession();
      if (loginSession) {
        redirectToSessionDashboard(loginSession);
      }
      return;
    }

    if (!requiredCountry) return;

    var session = readSession();
    if (!session) {
      redirectTo('index.html');
      return;
    }

    if (session.country !== requiredCountry) {
      redirectToSessionDashboard(session);
    }
  }

  function bindSessionGuards() {
    window.addEventListener('pageshow', function () {
      revalidateAccess();
    });

    window.addEventListener('popstate', function () {
      revalidateAccess();
    });

    window.addEventListener('storage', function () {
      revalidateAccess();
    });
  }

  function bindLogoutLinks() {
    document.querySelectorAll('.logout-btn, .sidebar-logout-link, [data-admin-logout]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        clearSession();
        redirectTo('index.html');
      });
    });
  }

  function initLoginPage() {
    var form = document.getElementById('adminLoginForm');
    var emailInput = document.getElementById('adminEmail');
    var passwordInput = document.getElementById('adminPassword');
    var errorBox = document.getElementById('loginError');
    var submitButton = document.getElementById('adminLoginSubmit');
    var submitLabel = submitButton ? submitButton.querySelector('.login-submit-label') : null;
    var submitIcon = submitButton ? submitButton.querySelector('i') : null;

    if (!form || !emailInput || !passwordInput || !errorBox || !submitButton || !submitLabel || !submitIcon) return;

    function hideError() {
      errorBox.hidden = true;
      errorBox.textContent = '';
      emailInput.classList.remove('is-invalid');
      passwordInput.classList.remove('is-invalid');
    }

    function setLoading(isLoading) {
      submitButton.disabled = isLoading;
      submitButton.classList.toggle('is-loading', isLoading);
      submitButton.setAttribute('aria-busy', isLoading ? 'true' : 'false');
      submitLabel.textContent = isLoading ? 'Connexion...' : 'Se connecter';
      submitIcon.className = isLoading ? 'bi bi-arrow-repeat' : 'bi bi-box-arrow-in-right';
    }

    function showError(message) {
      setLoading(false);
      errorBox.hidden = false;
      errorBox.textContent = message;
      emailInput.classList.add('is-invalid');
      passwordInput.classList.add('is-invalid');
    }

    emailInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);
    emailInput.focus();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      hideError();
      setLoading(true);

      var email = emailInput.value.trim().toLowerCase();
      var password = passwordInput.value;
      var account = CREDENTIALS[email];

      if (!email || !password) {
        showError('Renseignez votre email administrateur et votre mot de passe.');
        return;
      }

      if (!account || account.password !== password) {
        showError('Identifiants incorrects. Vérifiez l’email administrateur et le mot de passe.');
        return;
      }

      var saved = saveSession(email, account.country);
      if (!saved) {
        showError('Le stockage local est indisponible dans ce navigateur. Activez localStorage pour utiliser cette maquette.');
        return;
      }

      window.setTimeout(function () {
        redirectTo(account.dashboard);
      }, 320);
    });
  }

  function normalizeText(value) {
    return (value || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function initEmployeesTableFilters() {
    var table = document.querySelector('.employees-table');
    var searchInput = document.querySelector('.employees-search input');
    var statusFilter = document.querySelector('[data-employee-status-filter]');
    var departmentFilter = document.querySelector('[data-employee-department-filter]');
    var countNode = document.querySelector('[data-employee-count]');
    var emptyState = document.querySelector('[data-employee-empty]');
    var feedbackNode = document.querySelector('[data-employee-feedback]');
    var detailModalEl = document.getElementById('employeeDetailsModal');
    var modalFeedbackNode = detailModalEl ? detailModalEl.querySelector('[data-employee-modal-feedback]') : null;

    if (!table || !searchInput || !statusFilter || !departmentFilter) return;

    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
    var currentEmployeeName = '';
    var detailModal = detailModalEl && window.bootstrap && window.bootstrap.Modal
      ? new window.bootstrap.Modal(detailModalEl)
      : null;

    function getEmployeeSearchText(row) {
      return [
        row.dataset.employeeName,
        row.dataset.employeeRole,
        row.dataset.employeeEmail,
        row.dataset.employeePhone
      ].join(' ');
    }

    function fillDepartmentFilter() {
      var departments = [];

      rows.forEach(function (row) {
        var department = row.dataset.employeeDepartment;
        if (department && departments.indexOf(department) === -1) {
          departments.push(department);
        }
      });

      departments.sort(function (a, b) {
        return a.localeCompare(b, 'fr');
      });

      departments.forEach(function (department) {
        var option = document.createElement('option');
        option.value = department;
        option.textContent = department;
        departmentFilter.appendChild(option);
      });
    }

    function applyFilters() {
      var query = normalizeText(searchInput.value);
      var status = normalizeText(statusFilter.value);
      var department = normalizeText(departmentFilter.value);
      var visibleCount = 0;

      rows.forEach(function (row) {
        var rowText = normalizeText(getEmployeeSearchText(row));
        var rowStatus = normalizeText(row.dataset.employeeStatus);
        var rowDepartment = normalizeText(row.dataset.employeeDepartment);
        var matchesQuery = !query || rowText.indexOf(query) !== -1;
        var matchesStatus = status === 'tous' || rowStatus === status;
        var matchesDepartment = department === 'tous' || rowDepartment === department;
        var isVisible = matchesQuery && matchesStatus && matchesDepartment;

        row.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      if (countNode) {
        countNode.textContent = visibleCount + ' employé' + (visibleCount > 1 ? 's' : '') + ' affiché' + (visibleCount > 1 ? 's' : '');
      }

      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    }

    function setDetailValue(key, value) {
      var node = detailModalEl ? detailModalEl.querySelector('[data-employee-detail="' + key + '"]') : null;
      if (node) node.textContent = value || 'Non applicable';
    }

    function showActionFeedback(action) {
      var targetName = currentEmployeeName || 'ce module';
      var message = action + ' : action fictive prête pour la future version connectée';

      if (action !== 'Ajouter employé') {
        message += ' sur ' + targetName;
      }

      message += '. Aucune donnée n’a été enregistrée.';

      if (feedbackNode) {
        feedbackNode.textContent = message;
        feedbackNode.hidden = false;
      }

      if (modalFeedbackNode) {
        modalFeedbackNode.textContent = message;
        modalFeedbackNode.hidden = false;
      }
    }

    function showEmployeeDetails(row) {
      if (!row || !detailModalEl) return;

      currentEmployeeName = row.dataset.employeeName || '';
      setDetailValue('name', row.dataset.employeeName);
      setDetailValue('role', row.dataset.employeeRole);
      setDetailValue('department', row.dataset.employeeDepartment);
      setDetailValue('country', row.dataset.employeeCountry);
      setDetailValue('phone', row.dataset.employeePhone);
      setDetailValue('email', row.dataset.employeeEmail);
      setDetailValue('status', row.dataset.employeeStatus);
      setDetailValue('arrival', row.dataset.employeeArrival);
      setDetailValue('departure', row.dataset.employeeDeparture);
      setDetailValue('manager', row.dataset.employeeManager);
      setDetailValue('activity', row.dataset.employeeActivity);

      if (modalFeedbackNode) {
        modalFeedbackNode.hidden = true;
        modalFeedbackNode.textContent = '';
      }

      if (detailModal) {
        detailModal.show();
      }
    }

    fillDepartmentFilter();
    applyFilters();

    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    departmentFilter.addEventListener('change', applyFilters);

    table.addEventListener('click', function (event) {
      var button = event.target.closest('[data-employee-details]');
      if (!button) return;

      showEmployeeDetails(button.closest('tr'));
    });

    document.addEventListener('click', function (event) {
      var actionButton = event.target.closest('[data-employee-action]');
      if (!actionButton) return;

      showActionFeedback(actionButton.dataset.employeeAction || 'Action');
    });
  }

  function initEmailActions() {
    var feedbackNode = document.querySelector('[data-email-feedback]');
    var actionButtons = Array.prototype.slice.call(document.querySelectorAll('[data-email-action]'));
    var requestButtons = Array.prototype.slice.call(document.querySelectorAll('[data-email-request-action]'));
    var openCreateButtons = Array.prototype.slice.call(document.querySelectorAll('[data-email-open-create]'));
    var createModalEl = document.getElementById('emailCreateModal');
    var createForm = document.querySelector('[data-email-create-form]');
    var generatedEmailNode = document.querySelector('[data-generated-email]');
    var createFeedbackNode = document.querySelector('[data-email-create-feedback]');
    var generateButton = document.querySelector('[data-email-generate]');
    var saveRequestButton = document.querySelector('[data-email-save-request]');
    var createModal = createModalEl && window.bootstrap && window.bootstrap.Modal
      ? new window.bootstrap.Modal(createModalEl)
      : null;

    if (!feedbackNode) return;

    function slugifyEmailPart(value) {
      return normalizeText(value)
        .replace(/[^a-z0-9]+/g, '.')
        .replace(/^\.+|\.+$/g, '');
    }

    function generateEmail() {
      if (!createForm || !generatedEmailNode) return '';

      var firstName = slugifyEmailPart(createForm.elements.firstName.value);
      var lastName = slugifyEmailPart(createForm.elements.lastName.value);
      var initial = firstName ? firstName.charAt(0) : 'x';
      var namePart = lastName || 'utilisateur';
      var email = initial + '.' + namePart + '@ltpconstruction.com';

      generatedEmailNode.textContent = email;
      return email;
    }

    function showFeedback(message) {
      feedbackNode.textContent = message;
      feedbackNode.hidden = false;
    }

    function showCreateFeedback(message) {
      if (!createFeedbackNode) return;
      createFeedbackNode.textContent = message;
      createFeedbackNode.hidden = false;
    }

    actionButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var action = button.dataset.emailAction || 'Action email';
        showFeedback(action + ' : action fictive prête pour la future gestion email. Aucune donnée n’a été enregistrée.');
      });
    });

    requestButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var card = button.closest('.email-request-card');
        var action = button.dataset.emailRequestAction || 'Action';
        var requestName = card ? card.dataset.requestName : 'la demande';
        var requestEmail = card ? card.dataset.requestEmail : '';
        var badge = card ? card.querySelector('.status-badge') : null;

        if (badge && action === 'Approuver') {
          badge.className = 'status-badge success';
          badge.innerHTML = '<i class="bi bi-circle-fill"></i>Approuvé';
        }

        if (badge && action === 'Refuser') {
          badge.className = 'status-badge danger';
          badge.innerHTML = '<i class="bi bi-circle-fill"></i>Refusé';
        }

        showFeedback(action + ' : ' + requestName + (requestEmail ? ' · ' + requestEmail : '') + '. Simulation locale, aucune création cPanel.');
      });
    });

    openCreateButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        generateEmail();
        if (createFeedbackNode) {
          createFeedbackNode.hidden = true;
          createFeedbackNode.textContent = '';
        }
        if (createModal) createModal.show();
      });
    });

    if (createForm) {
      ['firstName', 'lastName'].forEach(function (fieldName) {
        var field = createForm.elements[fieldName];
        if (field) field.addEventListener('input', generateEmail);
      });
    }

    generateButton && generateButton.addEventListener('click', function () {
      var email = generateEmail();
      showCreateFeedback(email + ' généré automatiquement. Aucune boîte réelle créée.');
    });

    saveRequestButton && saveRequestButton.addEventListener('click', function () {
      var email = generateEmail();
      showCreateFeedback('Demande enregistrée fictivement pour ' + email + '. Validation cPanel à connecter plus tard.');
      showFeedback('Nouvelle demande email simulée : ' + email + '. Aucune API cPanel appelée.');
    });
  }

  var activeSession = enforceSessionAccess();

  bindSessionGuards();

  if (isLoginPage) {
    initLoginPage();
    return;
  }

  if (requiredCountry && !activeSession) {
    return;
  }

  revealProtectedPage();

  function openSidebar() {
    if (sidebar) sidebar.classList.add('is-open');
    if (overlay) overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  toggleBtn && toggleBtn.addEventListener('click', openSidebar);
  closeBtn && closeBtn.addEventListener('click', closeSidebar);
  overlay && overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeSidebar();
  });

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
    logout.setAttribute('data-admin-logout', 'true');
    logout.innerHTML = '<i class="bi bi-box-arrow-right"></i><span>Déconnexion</span>';
    sidebarFooter.appendChild(logout);
  }

  bindLogoutLinks();
  initEmployeesTableFilters();
  initEmailActions();

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
