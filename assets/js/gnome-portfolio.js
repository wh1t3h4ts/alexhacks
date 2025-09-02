// GNOME Portfolio JS: Handles window system, dock, clock, etc.
document.addEventListener('DOMContentLoaded', function() {
  // Real-time clock for GNOME top panel
  function updateGnomeClock() {
    const clock = document.getElementById('gnome-clock');
    if (!clock) return;
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${h}:${m}`;
  }
  setInterval(updateGnomeClock, 1000);
  updateGnomeClock();

  // Window system
  const sections = {
    about: {
      title: 'About Me',
      icon: '',
      content: `<div style="display:flex;align-items:center;gap:18px;">
        <div style="width:64px;height:64px;border-radius:50%;background:#2d3742;display:flex;align-items:center;justify-content:center;font-size:2.2rem;color:#00adef;">A</div>
        <div>
          <h3 style="margin:0 0 4px 0;font-size:1.3rem;">Your Name</h3>
          <div style="color:#b8c7ce;font-size:1.02rem;">Cybersecurity enthusiast, developer, and Linux power user.<br>Welcome to my GNOME-inspired portfolio!</div>
        </div>
      </div>`
    },
    projects: {
      title: 'Projects',
      icon: '',
      content: `<div style="display:flex;gap:18px;flex-wrap:wrap;">
        <div style="background:#232b36;border-radius:10px;box-shadow:0 2px 8px #0003;padding:18px 16px;width:220px;min-height:120px;display:flex;flex-direction:column;justify-content:center;">
          <div style="font-weight:600;font-size:1.08rem;">Project One</div>
          <div style="color:#b8c7ce;font-size:0.98rem;margin:6px 0 0 0;">Description of project one.</div>
          <a href="#" style="color:#00adef;font-size:0.97rem;margin-top:8px;text-decoration:none;">GitHub</a>
        </div>
        <div style="background:#232b36;border-radius:10px;box-shadow:0 2px 8px #0003;padding:18px 16px;width:220px;min-height:120px;display:flex;flex-direction:column;justify-content:center;">
          <div style="font-weight:600;font-size:1.08rem;">Project Two</div>
          <div style="color:#b8c7ce;font-size:0.98rem;margin:6px 0 0 0;">Description of project two.</div>
          <a href="#" style="color:#00adef;font-size:0.97rem;margin-top:8px;text-decoration:none;">Demo</a>
        </div>
      </div>`
    },
    skills: {
      title: 'Skills',
      icon: '',
      content: `<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;">
        <div style="background:#232b36;border-radius:8px;padding:14px 10px;min-width:70px;text-align:center;font-size:1.1rem;color:#00adef;">HTML5</div>
        <div style="background:#232b36;border-radius:8px;padding:14px 10px;min-width:70px;text-align:center;font-size:1.1rem;color:#00adef;">CSS3</div>
        <div style="background:#232b36;border-radius:8px;padding:14px 10px;min-width:70px;text-align:center;font-size:1.1rem;color:#00adef;">JavaScript</div>
        <div style="background:#232b36;border-radius:8px;padding:14px 10px;min-width:70px;text-align:center;font-size:1.1rem;color:#00adef;">Bootstrap</div>
        <div style="background:#232b36;border-radius:8px;padding:14px 10px;min-width:70px;text-align:center;font-size:1.1rem;color:#00adef;">Linux</div>
        <div style="background:#232b36;border-radius:8px;padding:14px 10px;min-width:70px;text-align:center;font-size:1.1rem;color:#00adef;">Python</div>
      </div>`
    },
    contact: {
      title: 'Contact',
      icon: '',
      content: `<form class="mt-2" style="max-width:340px;margin:auto;">
        <div class="mb-3">
          <label for="contactName" class="form-label" style="color:#b8c7ce;">Name</label>
          <input type="text" class="form-control" style="background:#232b36;color:#e5e5e5;border:none;border-radius:7px;" id="contactName" required>
        </div>
        <div class="mb-3">
          <label for="contactEmail" class="form-label" style="color:#b8c7ce;">Email</label>
          <input type="email" class="form-control" style="background:#232b36;color:#e5e5e5;border:none;border-radius:7px;" id="contactEmail" required>
        </div>
        <div class="mb-3">
          <label for="contactMsg" class="form-label" style="color:#b8c7ce;">Message</label>
          <textarea class="form-control" style="background:#232b36;color:#e5e5e5;border:none;border-radius:7px;" id="contactMsg" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn" style="background:#00adef;color:#fff;width:100%;border-radius:7px;">Send</button>
      </form>`
    }
  };

  function createWindow(section) {
    // Remove existing window of this section
    const old = document.getElementById('window-' + section);
    if (old) old.remove();
    // Create window
    const win = document.createElement('div');
    win.className = 'gnome-window';
    win.id = 'window-' + section;
    win.innerHTML = `
      <div class="window-titlebar">
        <img src="assets/img/${sections[section].icon}" style="width:20px;margin-right:8px;">
        <span>${sections[section].title}</span>
        <div class="window-controls ms-auto">
          <button class="minimize" title="Minimize"></button>
          <button class="maximize" title="Maximize"></button>
          <button class="close" title="Close"></button>
        </div>
      </div>
      <div class="window-content">${sections[section].content}</div>
    `;
    // Center window
    win.style.left = '50%';
    win.style.top = '50%';
    win.style.transform = 'translate(-50%, -50%)';
    // Add to container
    document.getElementById('windows-container').appendChild(win);
    // Animate in (zoom-in)
    setTimeout(() => win.classList.add('zoom-in'), 10);
    // Controls
    win.querySelector('.close').onclick = () => {
      win.classList.remove('zoom-in');
      win.classList.add('zoom-out');
      setTimeout(() => win.remove(), 220);
    };
    win.querySelector('.minimize').onclick = () => win.classList.toggle('zoom-in');
    win.querySelector('.maximize').onclick = () => {
      if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
        win.style.left = '50%';
        win.style.top = '50%';
        win.style.width = '';
        win.style.height = '';
        win.style.transform = 'translate(-50%, -50%)';
      } else {
        win.classList.add('maximized');
        win.style.left = '0';
        win.style.top = '48px';
        win.style.width = '100vw';
        win.style.height = 'calc(100vh - 48px)';
        win.style.transform = 'none';
      }
    };
    // Dragging
    let isDragging = false, offsetX = 0, offsetY = 0;
    const titlebar = win.querySelector('.window-titlebar');
    titlebar.addEventListener('mousedown', function(e) {
      if (win.classList.contains('maximized')) return;
      isDragging = true;
      offsetX = e.clientX - win.getBoundingClientRect().left;
      offsetY = e.clientY - win.getBoundingClientRect().top;
      win.style.transition = 'none';
    });
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
      win.style.transform = 'none';
    });
    document.addEventListener('mouseup', function() {
      isDragging = false;
      win.style.transition = '';
    });
  }

  // Dock and nav triggers
  document.querySelectorAll('.dock-icon, #gnome-top-panel .nav-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const section = btn.getAttribute('data-section');
      if (section) createWindow(section);
    });
  });

  // Smooth transitions for windows
  document.getElementById('windows-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('gnome-window')) {
      document.querySelectorAll('.gnome-window').forEach(w => w.classList.remove('active'));
      e.target.classList.add('active');
    }
  });
});
