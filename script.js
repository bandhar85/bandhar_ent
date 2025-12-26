// script.js — basic interactivity: nav toggle, scroll spy, contact form client-side validation
// plus Bora Mobility LLP product explorer (client-side only)

document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (!nav) return;
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // Close mobile nav after clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 980 && nav && navToggle) {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
      }
    });
  });

  // Scroll spy: highlight nav links for visible sections
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Simple contact form handling (frontend only). Sends a mailto if user wants or just validates.
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const clearBtn = document.getElementById('clearBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const company = (document.getElementById('company') || {}).value || '';
      const message = (document.getElementById('message') || {}).value || '';

      // Basic validation
      if (!name.trim() || !email.trim() || !message.trim()) {
        if (formStatus) {
          formStatus.textContent = 'Please complete name, email and message.';
          formStatus.style.color = '#d9534f';
        }
        return;
      }

      // Compose a mailto so user can send via their email client (frontend-only solution)
      const subject = encodeURIComponent('Enquiry from Banbhar Enterprises website — ' + (company || name));
      const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        (company ? ('Company: ' + company + '\n') : '') +
        'Email: ' + email + '\n\n' +
        'Message:\n' + message
      );

      // Show status and open mailto
      if (formStatus) {
        formStatus.textContent = 'Opening your email client to send enquiry...';
        formStatus.style.color = '#0b66b2';
      }

      // Using setTimeout briefly to show message then open mailto
      setTimeout(function () {
        window.location.href = 'mailto:sales@banbhar.com?subject=' + subject + '&body=' + body;
      }, 500);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      ['name', 'email', 'company', 'message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      if (formStatus) formStatus.textContent = '';
    });
  }

  /* Bora Mobility LLP — Product Explorer (append to script.js) */
  (function boraProductSectionInit() {
    const productDataBora = {
      mobiles: {
        title: 'Mobiles',
        note: 'curated mobile imports for retail & channel partners.',
        subcategories: [
          { brand: 'iPhone', desc: 'Apple iPhones with warranty-ready imports.', types: ['iPhone 14', 'iPhone 13'] },
          { brand: 'Samsung', desc: 'Galaxy series imported for varied consumer segments.', types: ['Galaxy S23', 'Galaxy A54'] },
          { brand: 'Xiaomi', desc: 'Value and performance phones for mass-market.', types: ['Redmi Note 12', 'Poco X5'] },
          { brand: 'OnePlus', desc: 'High-performance Android phones for power users.', types: ['OnePlus 11', 'Nord 3'] }
        ]
      },
      laptops: {
        title: 'Laptops & Tablets',
        note: 'Imported laptops and tablets for office and consumer needs.',
        subcategories: [
          { brand: 'Apple', desc: 'iPad and Mac devices sourced for resellers.', types: ['iPad Air', 'MacBook Air'] },
          { brand: 'Dell', desc: 'Business-focused notebooks and workstations.', types: ['Dell XPS', 'Dell Latitude'] },
          { brand: 'Lenovo', desc: 'Durable ThinkPad and IdeaPad imports.', types: ['ThinkPad T14', 'IdeaPad 3'] },
          { brand: 'HP', desc: 'Commercial and consumer HP laptops.', types: ['HP Spectre', 'HP Pavilion'] }
        ]
      },
      printers: {
        title: 'Printers',
        note: 'Bora imports home, office and industrial printers with full documentation.',
        subcategories: [
          { brand: 'Canon', desc: 'Photo-quality and office multifunction devices.', types: ['Canon PIXMA', 'imageRUNNER'] },
          { brand: 'HP', desc: 'Laser and inkjet printers with wide service network.', types: ['HP LaserJet', 'HP OfficeJet'] },
          { brand: 'Epson', desc: 'EcoTank and commercial inkjet solutions.', types: ['Epson EcoTank', 'Epson WorkForce'] },
          { brand: 'Brother', desc: 'Reliable office printers and label printers.', types: ['Brother HL Series', 'Brother MFC'] }
        ]
      }
      // ecommerce: {
      //   title: 'E-commerce Services',
      //   note: 'Marketplace-ready inventory and seller onboarding assistance.',
      //   subcategories: [
      //     { brand: 'Amazon', desc: 'Inventory and listing support for Amazon sellers.', types: ['Account Setup', 'FBA Prep'] },
      //     { brand: 'Flipkart', desc: 'Flipkart marketplace seller support and logistics.', types: ['Seller Onboarding', 'Order Fulfillment'] }
        // ]
      };
    

    // Helper to build Bora cards
    function elB(tag, attrs = {}, children = []) {
      const node = document.createElement(tag);
      Object.keys(attrs).forEach(k => {
        if (k === 'class') node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
      (Array.isArray(children) ? children : [children]).forEach(c => {
        if (!c) return;
        if (typeof c === 'string') node.appendChild(document.createTextNode(c));
        else node.appendChild(c);
      });
      return node;
    }

    function renderCategoryCreativeBora(key) {
      const container = document.getElementById('productContentBora');
      if (!container) return;
      container.innerHTML = '';

      const data = productDataBora[key];
      if (!data) return;

      const note = elB('div', { class: 'product-note' }, data.note);
      container.appendChild(note);

      const grid = elB('div', { class: 'subcategory-grid' });

      data.subcategories.forEach(sub => {
        const card = elB('article', { class: 'subcard', tabindex: '0' });
        const title = elB('h4', {}, sub.brand);
        const desc = elB('p', {}, sub.desc);
        const typesWrapper = elB('div', { class: 'types' });

        sub.types.forEach(type => {
          const chip = elB('span', { class: 'chip' }, type);
          typesWrapper.appendChild(chip);
        });

        const view = elB('div', { style: 'margin-top:8px' });
        const detailBtn = elB('button', { class: 'btn btn-outline' }, 'View Details');
        detailBtn.style.fontWeight = 700;
        detailBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          openProductModalBora(sub);
        });
        view.appendChild(detailBtn);

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(typesWrapper);
        card.appendChild(view);

        card.addEventListener('click', () => openProductModalBora(sub));
        card.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') openProductModalBora(sub); });

        grid.appendChild(card);
      });

      container.appendChild(grid);
    }

    // Bora modal helpers
    function openProductModalBora(sub) {
      const modal = document.getElementById('productModalBora');
      const title = document.getElementById('modalTitleBora');
      const desc = document.getElementById('modalDescBora');
      const typesContainer = document.getElementById('modalTypesBora');
      if (!modal || !title || !desc || !typesContainer) return;

      title.textContent = sub.brand;
      desc.textContent = sub.desc;
      typesContainer.innerHTML = '';
      sub.types.forEach(t => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = t;
        typesContainer.appendChild(chip);
      });

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      const close = document.getElementById('modalCloseBora');
      if (close) close.focus();
    }

    function closeProductModalBora() {
      const modal = document.getElementById('productModalBora');
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }

    // Wire Bora modal events and tabs
    const modalBackdropBora = document.getElementById('modalBackdropBora');
    const modalCloseBora = document.getElementById('modalCloseBora');
    if (modalBackdropBora) modalBackdropBora.addEventListener('click', closeProductModalBora);
    if (modalCloseBora) modalCloseBora.addEventListener('click', closeProductModalBora);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // close both modals if present
        closeProductModalBora();
        if (typeof closeProductModal === 'function') {
          try { closeProductModal(); } catch (err) { /* ignore if not available */ }
        }
      }
    });

    const tabsBora = document.querySelectorAll('.product-tabs-bora .tab-bora');
    if (tabsBora && tabsBora.length) {
      tabsBora.forEach(t => {
        t.addEventListener('click', () => {
          tabsBora.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
          t.classList.add('active'); t.setAttribute('aria-selected', 'true');
          renderCategoryCreativeBora(t.dataset.category);
        });
      });

      // initial render
      const activeTabB = document.querySelector('.product-tabs-bora .tab-bora.active');
      const defB = activeTabB ? activeTabB.dataset.category : 'mobiles';
      renderCategoryCreativeBora(defB);
    }
  })();

}); // end DOMContentLoaded

