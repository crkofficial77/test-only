const { execSync, exec } = require('child_process');
const readline = require('readline');

try {
  require.resolve('axios');
  require.resolve('qs');
  require.resolve('uuid');
} catch (e) {
  console.clear();
  console.log("\x1b[33m[SYSTEM] Detected missing dependencies...\x1b[0m");
  console.log("\x1b[32m[INSTALLER] Installing packages (axios, qs, uuid)... Please wait.\x1b[0m");
  try {
    execSync('npm install axios qs uuid', { stdio: 'inherit' });
    console.log("\x1b[32m[SUCCESS] Installation complete! Restarting script...\x1b[0m");
    // Require packages after install
  } catch (err) {
    console.error("\x1b[31m[ERROR] Failed to install packages automatically. Please run: npm install axios qs uuid\x1b[0m");
    process.exit(1);
  }
}

const axios = require('axios');
const qs = require('qs');
const { v4: uuidv4 } = require('uuid');

const getWidth = () => process.stdout.columns || 40;
const center = (text) => {
  const width = getWidth();
  const cleanText = text.replace(/\x1b\[[0-9;]*m/g, ""); // Remove colors for calc
  const pad = Math.max(0, Math.floor((width - cleanText.length) / 2));
  return ' '.repeat(pad) + text; 
};
const line = () => {
  const width = Math.min(getWidth(), 50); // Cap width at 50 for lines
  return colors.dim + '─'.repeat(width) + colors.reset;
};
const doubleLine = () => {
  const width = Math.min(getWidth(), 50);
  return colors.neonBlue + '═'.repeat(width) + colors.reset;
};

// --- THEME COLORS ---
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
   gray: "\x1b[90m",
  white: "\x1b[37m",
  crimson: "\x1b[38;5;196m",
  neonGreen: "\x1b[38;5;46m",
  neonBlue: "\x1b[38;5;51m"
};

const CONFIG = {
  BASE_URL: 'https://zefame-free.com/api_free.php',
  ORIGIN: 'https://zefame.com',
  TIKWM_API: 'https://www.tikwm.com/api/',
  SERVICES: { LIKES: '232', VIEWS: '229' },
  COOLDOWN_MINUTES: 5,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 2000,
  REQUEST_TIMEOUT: 30000,
  DEV_LINK: 'https://www.facebook.com/jhames.rhonnielle.martin'
};

const header = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Accept-Language': 'en-US,en;q=0.9',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not_A Brand";v="99"',
  'sec-ch-ua-mobile': '?1',
  'sec-ch-ua-platform': '"Android"',
  'origin': CONFIG.ORIGIN,
  'referer': CONFIG.ORIGIN + '/',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site'
};

const TIKWM_HEADERS = header; 
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const clear = () => console.clear();

const typeEffect = async (text, speed = 10) => {
  for (let char of text) {
    process.stdout.write(char);
    await sleep(speed);
  }
  console.log();
};

const openUrl = (url) => {
  const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  exec(`${start} ${url}`);
};

const printLogo = () => {

const logo = `
${colors.magenta}██╗    ██╗██╗███████╗
${colors.magenta}██║    ██║██║╚══███╔╝
${colors.cyan}██║ █╗ ██║██║  ███╔╝ 
${colors.cyan}██║███╗██║██║ ███╔╝  
${colors.blue}╚███╔███╔╝██║███████╗
${colors.blue} ╚══╝╚══╝ ╚═╝╚══════╝${colors.reset}
`;


  
  console.log(logo);
console.log(colors.gray + "TIKTOK BOOST SYSTEM" + colors.reset);
console.log(colors.yellow + "By: Wiz Reka" + colors.reset);

  console.log(line());
};

const bootAnimation = async () => {
  clear();
  const tasks = [
    `${colors.green}[SYSTEM]${colors.reset} Checking Environment...`,
    `${colors.green}[NETWORK]${colors.reset} Connecting to API endpoints...`,
    `${colors.green}[SECURITY]${colors.reset} Bypassing headers...`,
    `${colors.neonBlue}[COMPLETE]${colors.reset} Launching JTOOL v1...`
  ];

  for (const task of tasks) {
    process.stdout.write(task);
    await sleep(150);
    process.stdout.write(`\r${' '.repeat(40)}\r`); 
    console.log(task + ` ${colors.green}✔${colors.reset}`);
    await sleep(100);
  }
  await sleep(500);
  clear();
};

const countdown = async (seconds) => {
  const width = Math.min(20, getWidth() - 20);
  const spinners = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  console.log();
  for (let i = seconds; i >= 0; i--) {
    const percent = ((seconds - i) / seconds);
    const filled = Math.round(width * percent);
    const empty = width - filled;
    
    const mins = Math.floor(i / 60);
    const secs = i % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    let barColor = colors.neonGreen;
    if (percent < 0.5) barColor = colors.yellow;
    if (percent < 0.2) barColor = colors.red;

    const bar = `${barColor}█`.repeat(filled) + `${colors.dim}░`.repeat(empty) + `${colors.reset}`;
    const spinner = `${colors.cyan}${spinners[i % spinners.length]}${colors.reset}`;
    
    process.stdout.write(`\r ${spinner} ${colors.bright}WAITING:${colors.reset} [${bar}] ${timeStr} `);
    await sleep(1000);
  }
  process.stdout.write('\r\x1b[K'); 
  console.log(`${colors.green} ✔ SYSTEM READY FOR NEXT WAVE!${colors.reset}\n`);
};

// --- CORE LOGIC ---
const getVideoStats = async (link) => {
  try {
    const response = await axios.post(CONFIG.TIKWM_API, qs.stringify({ url: link, count: 12, cursor: 0, web: 1, hd: 1 }), { headers: TIKWM_HEADERS, timeout: 15000 });
    if (response.data.code === 0 && response.data.data) {
      const d = response.data.data;
      return { success: true, likes: d.digg_count || 0, views: d.play_count || 0, videoId: d.id || '', username: d.author?.unique_id || 'unknown' };
    }
    return { success: false };
  } catch (e) { return { success: false }; }
};

const checkVideoId = async (link, attempt = 1) => {
  try {
    const response = await axios.post(CONFIG.BASE_URL, qs.stringify({ action: 'checkVideoId', link: link }), { headers: header, timeout: CONFIG.REQUEST_TIMEOUT });
    if (response.data.success) return { success: true, videoId: response.data.data.videoId };
    throw new Error(response.data.message || 'Failed');
  } catch (e) {
    if (attempt < CONFIG.RETRY_ATTEMPTS) { await sleep(CONFIG.RETRY_DELAY); return checkVideoId(link, attempt + 1); }
    return { success: false, error: e.message };
  }
};

const checkService = async (service, videoId, attempt = 1) => {
  try {
    const response = await axios.get(`${CONFIG.BASE_URL}?action=check&device=${uuidv4()}&service=${service}&videoId=${videoId}`, { headers: header, timeout: CONFIG.REQUEST_TIMEOUT });
    if (response.data.success && response.data.data.allowed) return { success: true };
    throw new Error(response.data.message || 'Not available');
  } catch (e) {
    if (attempt < CONFIG.RETRY_ATTEMPTS) { await sleep(CONFIG.RETRY_DELAY); return checkService(service, videoId, attempt + 1); }
    return { success: false };
  }
};

const placeOrder = async (service, link, videoId, attempt = 1) => {
  try {
    const response = await axios.post(`${CONFIG.BASE_URL}?action=order`, qs.stringify({ service: service, link: link, uuid: uuidv4(), videoId: videoId }), { headers: header, timeout: CONFIG.REQUEST_TIMEOUT });
    if (response.data.success) return { success: true };
    throw new Error(response.data.message || 'Failed');
  } catch (e) {
    if (attempt < CONFIG.RETRY_ATTEMPTS) { await sleep(CONFIG.RETRY_DELAY); return placeOrder(service, link, videoId, attempt + 1); }
    return { success: false };
  }
};

// --- FIXED MENU BOXES (NO OVERFLOW) ---

const showTutorial = async () => {
  clear();
  printLogo();
  console.log(`${colors.bgBlue}${colors.white}    SYSTEM MANUAL / TUTORIAL    ${colors.reset}\n`);
  
  await typeEffect(`${colors.neonGreen}STEP 1:${colors.reset} Copy your TikTok Video Link.`);
  await typeEffect(`${colors.neonGreen}STEP 2:${colors.reset} Paste the link in the tool.`);
  console.log();
  await typeEffect(`${colors.yellow}INFO:${colors.reset} The tool uses an AUTO-COOLDOWN.`);
  await typeEffect(`      Just leave the tool running.`);
  console.log();
  
  await new Promise(resolve => {
    rl.question(`${colors.dim}Press Enter to return...${colors.reset}`, resolve);
  });
};

const startBooster = async () => {
  clear();
  printLogo();
  
  const link = await new Promise(resolve => {
    rl.question(`${colors.neonGreen}➤ Enter Target TikTok Link:${colors.reset} `, (a) => resolve(a.trim()));
  });

  if (!link || (!link.includes('tiktok.com') && !link.includes('vt.tiktok.com'))) {
    console.log(`\n${colors.red}✖ ERROR: Invalid URL detected!${colors.reset}`);
    await sleep(2000);
    return;
  }

  console.log(`\n${colors.dim}>> Analyzing video metadata...${colors.reset}`);
  
  let videoId = null;
  const tikwmResult = await getVideoStats(link);
  
  if (tikwmResult.success && tikwmResult.videoId) {
    videoId = tikwmResult.videoId;
    console.log(`${colors.green}✔ TARGET LOCKED:${colors.reset} @${tikwmResult.username}`);
  } else {
    const zefameResult = await checkVideoId(link);
    if (zefameResult.success) {
      videoId = zefameResult.videoId;
      console.log(`${colors.green}✔ ID EXTRACTED.${colors.reset}`);
    } else {
      console.log(`${colors.red}✖ ERROR: Target not found.${colors.reset}`);
      await sleep(2000);
      return;
    }
  }

  console.log(`${colors.green}✔ INITIATING BOOST SEQUENCE...${colors.reset}\n`);

  while (true) {
    console.log(doubleLine());
    console.log(`${colors.magenta} PROCESSING BATCH REQUEST ${colors.reset}`);
    
    
    process.stdout.write(`${colors.dim} [..] Requesting Likes... ${colors.reset}`);
    const likesCheck = await checkService(CONFIG.SERVICES.LIKES, videoId);
    if (likesCheck.success) {
      const res = await placeOrder(CONFIG.SERVICES.LIKES, link, videoId);
      process.stdout.write(res.success ? `\r ${colors.green}[✔] LIKES SENT SUCCESS   ${colors.reset}\n` : `\r ${colors.red}[✖] LIKES FAILED        ${colors.reset}\n`);
    } else {
      process.stdout.write(`\r ${colors.yellow}[!] LIKES ON COOLDOWN   ${colors.reset}\n`);
    }

    
    process.stdout.write(`${colors.dim} [..] Requesting Views... ${colors.reset}`);
    const viewsCheck = await checkService(CONFIG.SERVICES.VIEWS, videoId);
    if (viewsCheck.success) {
      const res = await placeOrder(CONFIG.SERVICES.VIEWS, link, videoId);
      process.stdout.write(res.success ? `\r ${colors.green}[✔] VIEWS SENT SUCCESS   ${colors.reset}\n` : `\r ${colors.red}[✖] VIEWS FAILED        ${colors.reset}\n`);
    } else {
      process.stdout.write(`\r ${colors.yellow}[!] VIEWS ON COOLDOWN   ${colors.reset}\n`);
    }
    
    console.log(doubleLine());
    
    await countdown(CONFIG.COOLDOWN_MINUTES * 60);
  }
};

const mainMenu = async () => {
  await bootAnimation();
  
  while (true) {
    clear();
    printLogo();
    console.log(`${colors.yellow} MAIN MENU SELECTION:${colors.reset}`);
    console.log();
    console.log(`  ${colors.white}[1]${colors.reset} ${colors.neonGreen}START BOOSTING${colors.reset}`);
    console.log(`  ${colors.white}[2]${colors.reset} ${colors.cyan}HOW IT WORKS${colors.reset}`);
    console.log(`  ${colors.white}[3]${colors.reset} ${colors.red}EXIT${colors.reset}`);
    console.log();
    console.log(line());
    
    const choice = await new Promise(resolve => {
      rl.question(`${colors.bright}wiz@terminal:~# ${colors.reset}`, resolve);
    });

    if (choice.trim() === '1') {
      await startBooster();
    } else if (choice.trim() === '2') {
      await showTutorial();
    } else if (choice.trim() === '3') {
      console.log(`\n${colors.red}>> Terminating session... Goodbye!${colors.reset}`);
      rl.close();
      process.exit(0);
    } else {
      console.log(`${colors.red}Invalid Command!${colors.reset}`);
      await sleep(1000);
    }
  }
};

mainMenu().catch(err => {
  console.error(err);
  process.exit(1);
});