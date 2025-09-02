// GNOME Terminal Window Interactivity
const terminalWindow = document.getElementById('gnome-terminal-window');
const terminalArea = document.getElementById('terminal-area');
const titlebar = terminalWindow.querySelector('.gnome-titlebar');
const btnClose = terminalWindow.querySelector('.window-btn.close');
const btnMin = terminalWindow.querySelector('.window-btn.min');
const btnMax = terminalWindow.querySelector('.window-btn.max');

// State
let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
let isMaximized = false, prevRect = {};
let terminalHistory = [];
let currentInput = '';
let cursorVisible = true;
let cursorInterval;

// Prompt parts
const user = '<span class="prompt-user">kali@kali</span>';
const path = '<span class="prompt-path">~</span>';
const git = '<span class="prompt-git">(main)</span>';
const symbol = '<span class="prompt-symbol">$</span>';

function renderPrompt(input = '', showCursor = true) {
  return `<div class="terminal-line"><span class="terminal-prompt">${user} ${path} ${git} ${symbol}</span><span class="terminal-cmd">${escapeHtml(input)}</span>${showCursor ? '<span class="terminal-cursor">_</span>' : ''}</div>`;
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[tag]));
}

function renderTerminal() {
  terminalArea.innerHTML = terminalHistory.join('') + renderPrompt(currentInput, cursorVisible);
  terminalArea.scrollTop = terminalArea.scrollHeight;
}

function handleCommand(cmd) {
  const trimmed = cmd.trim();
  if (trimmed === 'clear') {
    terminalHistory = [];
    return;
  }
  let output = '';
  switch(trimmed) {
    case 'about':
      output = 'Opening About window...';
      // TODO: Open About window
      break;
    case 'projects':
      output = 'Opening Projects window...';
      // TODO: Open Projects window
      break;
    case 'skills':
      output = 'Opening Skills window...';
      // TODO: Open Skills window
      break;
    case 'contact':
      output = 'Opening Contact window...';
      // TODO: Open Contact window
      break;
    case 'help':
      output = 'Fake commands: about, projects, skills, contact, clear';
      break;
    default:
      if (trimmed.length > 0)
        output = `zsh: command not found: ${escapeHtml(trimmed)}`;
  }
  if (output) {
    terminalHistory.push(`<div class="terminal-output">${output}</div>`);
  }
}

// Typing and input
terminalArea.addEventListener('click', () => {
  terminalArea.focus();
});

document.addEventListener('keydown', e => {
  if (terminalWindow.style.display !== 'none' && document.activeElement === terminalArea) {
    if (e.key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      renderTerminal();
      e.preventDefault();
    } else if (e.key === 'Enter') {
      terminalHistory.push(renderPrompt(currentInput, false));
      handleCommand(currentInput);
      currentInput = '';
      renderTerminal();
      e.preventDefault();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      currentInput += e.key;
      renderTerminal();
      e.preventDefault();
    }
  }
});

// Blinking cursor
function startCursorBlink() {
  if (cursorInterval) clearInterval(cursorInterval);
  cursorInterval = setInterval(() => {
    cursorVisible = !cursorVisible;
    renderTerminal();
  }, 500);
}

function stopCursorBlink() {
  if (cursorInterval) {
    clearInterval(cursorInterval);
    cursorInterval = null;
  }
}

// Draggability
function onDragStart(e) {
  isDragging = true;
  const rect = terminalWindow.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  terminalWindow.style.zIndex = 1300;
}
function onDrag(e) {
  if (!isDragging || isMaximized) return;
  terminalWindow.style.left = (e.clientX - dragOffsetX) + 'px';
  terminalWindow.style.top = (e.clientY - dragOffsetY) + 'px';
}
function onDragEnd() {
  isDragging = false;
  terminalWindow.style.zIndex = 1200;
}
titlebar.addEventListener('mousedown', onDragStart);
document.addEventListener('mousemove', onDrag);
document.addEventListener('mouseup', onDragEnd);

// Window controls
btnClose.addEventListener('click', () => {
  terminalWindow.classList.remove('zoomIn');
  terminalWindow.classList.add('zoomOut');
  setTimeout(() => {
    terminalWindow.style.display = 'none';
    terminalWindow.classList.remove('zoomOut');
    stopCursorBlink();
  }, 250);
});
btnMin.addEventListener('click', () => {
  terminalWindow.style.display = 'none';
  stopCursorBlink();
});
btnMax.addEventListener('click', () => {
  if (!isMaximized) {
    prevRect = {
      left: terminalWindow.style.left,
      top: terminalWindow.style.top,
      width: terminalWindow.style.width,
      height: terminalWindow.style.height
    };
    terminalWindow.style.left = '0';
    terminalWindow.style.top = '0';
    terminalWindow.style.width = '100vw';
    terminalWindow.style.height = '100vh';
    isMaximized = true;
  } else {
    terminalWindow.style.left = prevRect.left;
    terminalWindow.style.top = prevRect.top;
    terminalWindow.style.width = prevRect.width;
    terminalWindow.style.height = prevRect.height;
    isMaximized = false;
  }
});

// Show terminal window (triggered by dock icon)
function showTerminal() {
  terminalWindow.style.display = 'flex';
  terminalWindow.classList.remove('zoomOut');
  terminalWindow.classList.add('zoomIn');
  setTimeout(() => terminalArea.focus(), 250);
  renderTerminal();
  startCursorBlink();
}
window.showTerminal = showTerminal;

// Listen for dock icon click
const dockTerminalBtn = document.querySelector('.dock-icon[data-section="terminal"]');
if (dockTerminalBtn) {
  dockTerminalBtn.addEventListener('click', () => {
    // Only show if not already visible
    if (terminalWindow.style.display === 'none') {
      showTerminal();
    }
  });
}
