// @ts-nocheck
"use strict";

/* Vital Smash — ODS 3 Salud y Bienestar
   Compatibilidad: Chrome 49+, Safari 10+, Firefox 52+, Android 5 WebView.
   Polyfills + fallbacks. La lógica del juego no cambia. */
(function () {
  if (typeof structuredClone !== "function") {
    window.structuredClone = function (o) {
      return JSON.parse(JSON.stringify(o));
    };
  }
  if (!Array.prototype.includes) {
    Array.prototype.includes = function (v, from) {
      return this.indexOf(v, from || 0) !== -1;
    };
  }
  if (!Array.prototype.find) {
    Array.prototype.find = function (fn, thisArg) {
      for (var i = 0; i < this.length; i++) {
        if (fn.call(thisArg, this[i], i, this)) return this[i];
      }
    };
  }
  if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (fn, thisArg) {
      for (var i = 0; i < this.length; i++) {
        if (fn.call(thisArg, this[i], i, this)) return i;
      }
      return -1;
    };
  }
  if (!String.prototype.includes) {
    String.prototype.includes = function (s, from) {
      return this.indexOf(s, from || 0) !== -1;
    };
  }
  if (!String.prototype.repeat) {
    String.prototype.repeat = function (n) {
      var s = "", i;
      for (i = 0; i < n; i++) s += this;
      return s;
    };
  }
  if (!Math.hypot) {
    Math.hypot = function () {
      var s = 0, i;
      for (i = 0; i < arguments.length; i++) s += arguments[i] * arguments[i];
      return Math.sqrt(s);
    };
  }
  if (!Object.assign) {
    Object.assign = function (t) {
      for (var i = 1; i < arguments.length; i++) {
        var s = arguments[i];
        if (s != null) {
          for (var k in s) {
            if (Object.prototype.hasOwnProperty.call(s, k)) t[k] = s[k];
          }
        }
      }
      return t;
    };
  }
  if (!Number.isFinite) {
    Number.isFinite = function (n) {
      return typeof n === "number" && isFinite(n);
    };
  }
  window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (cb) { return setTimeout(function () { cb(Date.now()); }, 16); };
  window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (id) { clearTimeout(id); };
  if (!window.performance) window.performance = {};
  if (!performance.now) {
    var t0 = Date.now();
    performance.now = function () { return Date.now() - t0; };
  }
  if (!window.localStorage) {
    var mem = {};
    window.localStorage = {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
      setItem: function (k, v) { mem[k] = String(v); },
      removeItem: function (k) { delete mem[k]; }
    };
  }
  if (!Element.prototype.addEventListener) return;
})();

var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
var lerp = (a, b, t) => a + (b - a) * t;
var rand = (a, b) => a + Math.random() * (b - a);
var chance = (p) => Math.random() < p;
var dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
var FONT = "\"Nunito\", system-ui, sans-serif";
var I18N = {
	es: {
		title: "VITAL SMASH",
		subtitle: "ODS 3 · Salud y Bienestar",
		play: "Jugar",
		howTo: "Cómo jugar",
		records: "Récords",
		store: "Tienda",
		stats: "Estadísticas",
		options: "Opciones",
		credits: "Créditos",
		back: "Volver",
		retry: "Reintentar",
		menu: "Menú",
		gameOver: "FIN DE PARTIDA",
		score: "Puntos",
		highScore: "Récord",
		combo: "Combo",
		coins: "Monedas",
		level: "Nivel",
		time: "Tiempo",
		enterName: "Escribe tu nombre",
		saveRecord: "Guardar récord",
		skip: "Omitir",
		player: "Jugador",
		date: "Fecha",
		noRecords: "Todavía no hay récords. ¡Juega una partida!",
		how1: "Aplasta frutas y verduras para sumar puntos.",
		how2: "No toques la comida chatarra: pierdes una vida.",
		how3: "Si dejas pasar la chatarra, ganas un bonus.",
		how4: "El agua cura. El brócoli te da un escudo.",
		how5: "Los combos multiplican tu puntuación.",
		odsBlurb: "ODS 3: Garantizar una vida sana y promover el bienestar para todos en todas las edades.",
		shake: "Temblor",
		particles: "Partículas",
		showFPS: "Mostrar FPS",
		sound: "Sonido",
		volume: "Volumen",
		smashed: "Alimentos sanos",
		avoided: "Chatarra evitada",
		clicks: "Clics",
		bestCombo: "Mejor combo",
		totalTime: "Tiempo total",
		pause: "Pausa",
		resume: "Continuar",
		miss: "FALLASTE",
		junkHit: "COMIDA PROHIBIDA",
		avoidedMsg: "BIEN EVITADO",
		freeze: "HIELO",
		speed: "PICANTE",
		jackpot: "JACKPOT",
		heal: "+VIDA",
		shield: "ESCUDO",
		comboBoost: "SUPER COMBO",
		splat: "SPLASH",
		critical: "CRÍTICO",
		madeBy: "Desarrollado por Felipe",
		felipeBio: "Estudiante · Escuela Palavra Viva · Sala 9C · 7 años de experiencia en desarrollo de software",
		odsTitle: "ODS 3 — Salud y Bienestar",
		creditsThanks: "Gracias por cuidar tu salud jugando",
		creditsDesign: "Diseño y programación",
		creditsMusic: "Música de fondo",
		creditsOds: "Inspirado en el ODS 3 de las Naciones Unidas",
		upgrades: "Mejoras",
		colors: "Colores",
		moreCoins: "Más monedas",
		moreCombo: "Más combo",
		moreLives: "Más vidas",
		crits: "Críticos",
		clickRadius: "Radio de clic",
		moreParticles: "Partículas",
		magnet: "Imán",
		slowmo: "Cámara lenta",
		shieldUp: "Escudo",
		on: "SÍ",
		off: "NO",
		wellbeing: "Bienestar",
		googleNote: "Traducción vía Google Translate",
		poster5: "5 AL DÍA",
		posterWater: "AGUA",
		posterMove: "MUÉVETE",
		food_tomato: "Tomate",
		food_apple: "Manzana",
		food_banana: "Banana",
		food_orange: "Naranja",
		food_strawberry: "Fresa",
		food_blueberry: "Arándano",
		food_avocado: "Aguacate",
		food_watermelon: "Sandía",
		food_kiwi: "Kiwi",
		food_carrot: "Zanahoria",
		food_broccoli: "Brócoli",
		food_water: "Agua",
		food_golden: "Manzana dorada",
		food_spinach: "Espinaca",
		food_ice: "Hielo",
		food_chili: "Ají",
		food_burger: "Hamburguesa",
		food_soda: "Refresco",
		food_fries: "Papas fritas",
		food_donut: "Dona",
		food_candy: "Dulce",
		food_pizza: "Pizza",
		food_hotdog: "Hot dog",
		food_chips: "Chips",
		rank: "Puesto",
		nameHint: "Aparecerás en la tabla de récords",
		translating: "Traduciendo con Google…",
		vs: "Modo VS",
		vsStart: "¡VS!",
		vsWin: "¡GANASTE!",
		vsLose: "PERDISTE",
		p1: "Jugador 1",
		p2: "Jugador 2",
		cosmetics: "Cosméticos",
		equip: "Equipar",
		unequip: "Quitar",
		bought: "Comprado",
		owned: "Tienes",
		preview: "Vista previa",
		hat_cap: "Gorra",
		hat_crown: "Corona",
		hat_wizard: "Sombrero mago",
		hat_chef: "Gorro chef",
		glasses_sun: "Gafas sol",
		glasses_nerd: "Gafas nerd",
		mustache_classic: "Bigote",
		aura_green: "Aura verde",
		aura_gold: "Aura dorada",
		aura_fire: "Aura fuego",
		suit_cape: "Capa",
		face_smile: "Sonrisa",
		challenges: "Desafíos",
		themes: "Temas",
		theme_default: "Clásico",
		theme_tropical: "Tropical",
		theme_neon: "Neón",
		theme_arcade: "Arcade",
		theme_candy: "Dulce",
		theme_dark: "Oscuro",
		theme_golden: "Dorado",
		theme_pv: "PV",
		free: "GRATUITO",
		music: "Música",
		sfx: "Efectos",
		yourRecord: "Tu récord",
		maxLevel: "Nivel máx.",
		gamesPlayed: "Partidas",
		totalScore: "Puntos totales",
		coinsEarned: "Monedas ganadas",
		challengesDone: "Desafíos",
		event_fruit_rain: "LLUVIA DE FRUTAS",
		event_golden_rush: "RUSH DORADO",
		event_mega_combo: "MEGA COMBO",
		event_freeze_time: "TIEMPO CONGELADO",
		event_double_points: "PUNTOS DOBLES",
		challenge_fruit_master: "Maestro frutal",
		challenge_fruit_master_desc: "Aplasta 100 frutas",
		challenge_combo_king: "Rey del combo",
		challenge_combo_king_desc: "Consigue un combo de 30",
		challenge_perfect: "Ronda perfecta",
		challenge_perfect_desc: "Termina sin perder vida",
		challenge_speed: "Smash rápido",
		challenge_speed_desc: "Llega a 500 puntos en 60s",
		challenge_healthy: "Carrera sana",
		challenge_healthy_desc: "Aplasta 50 alimentos sanos",
		challenge_junk_avoider: "Evita basura",
		challenge_junk_avoider_desc: "Deja pasar 40 junk",
		challenge_combo_15: "Combo 15",
		challenge_combo_15_desc: "Consigue combo de 15",
		challenge_score_1k: "Mil puntos",
		challenge_score_1k_desc: "Alcanza 1000 puntos",
		challenge_smashed_50: "50 frutas",
		challenge_smashed_50_desc: "Aplasta 50 frutas",
		challenge_smashed_200: "200 frutas",
		challenge_smashed_200_desc: "Aplasta 200 frutas",
		challenge_combo_50: "Combo 50",
		challenge_combo_50_desc: "Consigue combo de 50",
		challenge_perfect_3: "3 perfectas",
		challenge_perfect_3_desc: "3 rondas sin perder vida",
		challenge_speed_800: "800 en 60s",
		challenge_speed_800_desc: "Llega a 800 en 60s",
		challenge_games_10: "10 partidas",
		challenge_games_10_desc: "Juega 10 partidas",
		challenge_coins_200: "200 monedas",
		challenge_coins_200_desc: "Gana 200 monedas",
		challenge_complete: "¡Desafío completado!",
		dailyChallenges: "Desafíos de hoy",
		nextDaily: "Nuevos en",
		reward: "Recompensa",
		locked: "Bloqueado",
		equipTheme: "Usar tema",
		activeTheme: "Activo",
		vsTime: "Tiempo",
		shopUpgrades: "Mejoras",
		shopCosmetics: "Cosméticos",
		shopThemes: "Temas",
	vsAgain: "Otra vez",
		vsIntro: "¡Prepárense!",
		vsVsCpu: "1P vs CPU",
		vs2Players: "2 Jugadores",
		cloudSave: "Guardado nube",
		exportSave: "Exportar código",
		importSave: "Importar código",
		cloudCopied: "¡Código copiado!",
		cloudLoaded: "¡Partida cargada!",
		cloudFail: "Código inválido",

	},
	en: {
		title: "VITAL SMASH",
		subtitle: "SDG 3 · Good Health and Well-being",
		play: "Play",
		howTo: "How to play",
		records: "Records",
		store: "Shop",
		stats: "Stats",
		options: "Options",
		credits: "Credits",
		back: "Back",
		retry: "Retry",
		menu: "Menu",
		gameOver: "GAME OVER",
		score: "Score",
		highScore: "Best",
		combo: "Combo",
		coins: "Coins",
		level: "Level",
		time: "Time",
		enterName: "Enter your name",
		saveRecord: "Save record",
		skip: "Skip",
		player: "Player",
		date: "Date",
		noRecords: "No records yet. Play a round!",
		how1: "Smash fruits and veggies to score points.",
		how2: "Do not tap junk food: you lose a life.",
		how3: "Let junk pass to earn an avoid bonus.",
		how4: "Water heals. Broccoli grants a shield.",
		how5: "Longer combos multiply your score.",
		odsBlurb: "SDG 3: Ensure healthy lives and promote well-being for all at all ages.",
		shake: "Shake",
		particles: "Particles",
		showFPS: "Show FPS",
		sound: "Sound",
		volume: "Volume",
		smashed: "Healthy foods",
		avoided: "Junk avoided",
		clicks: "Clicks",
		bestCombo: "Best combo",
		totalTime: "Total time",
		pause: "Pause",
		resume: "Resume",
		miss: "MISSED",
		junkHit: "FORBIDDEN FOOD",
		avoidedMsg: "NICE DODGE",
		freeze: "FREEZE",
		speed: "SPICY",
		jackpot: "JACKPOT",
		heal: "+LIFE",
		shield: "SHIELD",
		comboBoost: "SUPER COMBO",
		splat: "SPLASH",
		critical: "CRITICAL",
		madeBy: "Developed by Felipe",
		felipeBio: "Student · Escola Palavra Viva · Class 9C · 7 years of software development experience",
		odsTitle: "SDG 3 — Good Health and Well-being",
		creditsThanks: "Thanks for taking care of your health by playing",
		creditsDesign: "Design & programming",
		creditsMusic: "Background music",
		creditsOds: "Inspired by UN Sustainable Development Goal 3",
		upgrades: "Upgrades",
		colors: "Colors",
		moreCoins: "More coins",
		moreCombo: "More combo",
		moreLives: "More lives",
		crits: "Crits",
		clickRadius: "Tap radius",
		moreParticles: "Particles",
		magnet: "Magnet",
		slowmo: "Slow-mo",
		shieldUp: "Shield",
		on: "ON",
		off: "OFF",
		wellbeing: "Well-being",
		googleNote: "Translation via Google Translate",
		poster5: "5 A DAY",
		posterWater: "WATER",
		posterMove: "MOVE",
		food_tomato: "Tomato",
		food_apple: "Apple",
		food_banana: "Banana",
		food_orange: "Orange",
		food_strawberry: "Strawberry",
		food_blueberry: "Blueberry",
		food_avocado: "Avocado",
		food_watermelon: "Watermelon",
		food_kiwi: "Kiwi",
		food_carrot: "Carrot",
		food_broccoli: "Broccoli",
		food_water: "Water",
		food_golden: "Golden apple",
		food_spinach: "Spinach",
		food_ice: "Ice",
		food_chili: "Chili",
		food_burger: "Burger",
		food_soda: "Soda",
		food_fries: "Fries",
		food_donut: "Donut",
		food_candy: "Candy",
		food_pizza: "Pizza",
		food_hotdog: "Hot dog",
		food_chips: "Chips",
		rank: "Rank",
		nameHint: "You will appear on the records board",
		translating: "Translating with Google…",
		vs: "VS Mode",
		vsStart: "VS!",
		vsWin: "YOU WIN!",
		vsLose: "YOU LOSE",
		p1: "Player 1",
		p2: "Player 2",
		cosmetics: "Cosmetics",
		equip: "Equip",
		unequip: "Unequip",
		bought: "Bought",
		owned: "Owned",
		preview: "Preview",
		hat_cap: "Cap",
		hat_crown: "Crown",
		hat_wizard: "Wizard hat",
		hat_chef: "Chef hat",
		glasses_sun: "Sunglasses",
		glasses_nerd: "Nerd glasses",
		mustache_classic: "Mustache",
		aura_green: "Green aura",
		aura_gold: "Gold aura",
		aura_fire: "Fire aura",
		suit_cape: "Cape",
		face_smile: "Smile",
		challenges: "Challenges",
		themes: "Themes",
		theme_default: "Classic",
		theme_tropical: "Tropical",
		theme_neon: "Neon",
		theme_arcade: "Arcade",
		theme_candy: "Candy",
		theme_dark: "Dark",
		theme_golden: "Golden",
		theme_pv: "PV",
		free: "FREE",
		music: "Music",
		sfx: "SFX",
		yourRecord: "Your record",
		maxLevel: "Max level",
		gamesPlayed: "Games played",
		totalScore: "Total score",
		coinsEarned: "Coins earned",
		challengesDone: "Challenges",
		event_fruit_rain: "FRUIT RAIN",
		event_golden_rush: "GOLDEN RUSH",
		event_mega_combo: "MEGA COMBO",
		event_freeze_time: "FREEZE TIME",
		event_double_points: "DOUBLE POINTS",
		challenge_fruit_master: "Fruit Master",
		challenge_fruit_master_desc: "Smash 100 fruits",
		challenge_combo_king: "Combo King",
		challenge_combo_king_desc: "Reach a combo of 30",
		challenge_perfect: "Perfect Round",
		challenge_perfect_desc: "Finish without losing a life",
		challenge_speed: "Speed Smash",
		challenge_speed_desc: "Reach 500 points in 60s",
		challenge_healthy: "Healthy Run",
		challenge_healthy_desc: "Smash 50 healthy foods",
		challenge_junk_avoider: "Junk Avoider",
		challenge_junk_avoider_desc: "Let 40 junk pass",
		challenge_combo_15: "Combo 15",
		challenge_combo_15_desc: "Reach a combo of 15",
		challenge_score_1k: "Thousand Points",
		challenge_score_1k_desc: "Reach 1000 points",
		challenge_smashed_50: "50 Fruits",
		challenge_smashed_50_desc: "Smash 50 fruits",
		challenge_smashed_200: "200 Fruits",
		challenge_smashed_200_desc: "Smash 200 fruits",
		challenge_combo_50: "Combo 50",
		challenge_combo_50_desc: "Reach a combo of 50",
		challenge_perfect_3: "3 Perfects",
		challenge_perfect_3_desc: "3 rounds without losing life",
		challenge_speed_800: "800 in 60s",
		challenge_speed_800_desc: "Reach 800 points in 60s",
		challenge_games_10: "10 Games",
		challenge_games_10_desc: "Play 10 games",
		challenge_coins_200: "200 Coins",
		challenge_coins_200_desc: "Earn 200 coins",
		challenge_complete: "Challenge complete!",
		dailyChallenges: "Today's challenges",
		nextDaily: "New in",
		reward: "Reward",
		locked: "Locked",
		equipTheme: "Use theme",
		activeTheme: "Active",
		vsTime: "Time",
		shopUpgrades: "Upgrades",
		shopCosmetics: "Cosmetics",
		shopThemes: "Themes",
	vsAgain: "Again",
		vsIntro: "Get ready!",
		vsVsCpu: "1P vs CPU",
		vs2Players: "2 Players",
		cloudSave: "Cloud save",
		exportSave: "Export code",
		importSave: "Import code",
		cloudCopied: "Code copied!",
		cloudLoaded: "Save loaded!",
		cloudFail: "Invalid code",

	},
	pt: {
		title: "VITAL SMASH",
		subtitle: "ODS 3 · Saúde e Bem-estar",
		play: "Jogar",
		howTo: "Como jogar",
		records: "Recordes",
		store: "Loja",
		stats: "Estatísticas",
		options: "Opções",
		credits: "Créditos",
		back: "Voltar",
		retry: "Tentar de novo",
		menu: "Menu",
		gameOver: "FIM DE JOGO",
		score: "Pontos",
		highScore: "Recorde",
		combo: "Combo",
		coins: "Moedas",
		level: "Nível",
		time: "Tempo",
		enterName: "Escreva o seu nome",
		saveRecord: "Guardar recorde",
		skip: "Saltar",
		player: "Jogador",
		date: "Data",
		noRecords: "Ainda não há recordes. Jogue uma partida!",
		how1: "Esmague frutas e legumes para ganhar pontos.",
		how2: "Não toque na comida lixo: perde uma vida.",
		how3: "Se deixar a comida lixo passar, ganha um bónus.",
		how4: "A água cura. O brócolos dá um escudo.",
		how5: "Combos maiores multiplicam a pontuação.",
		odsBlurb: "ODS 3: Garantir uma vida saudável e promover o bem-estar para todos, em todas as idades.",
		shake: "Tremor",
		particles: "Partículas",
		showFPS: "Mostrar FPS",
		sound: "Som",
		volume: "Volume",
		smashed: "Alimentos sãos",
		avoided: "Lixo evitado",
		clicks: "Cliques",
		bestCombo: "Melhor combo",
		totalTime: "Tempo total",
		pause: "Pausa",
		resume: "Continuar",
		miss: "FALHOU",
		junkHit: "COMIDA PROIBIDA",
		avoidedMsg: "BEM EVITADO",
		freeze: "GELO",
		speed: "PICANTE",
		jackpot: "JACKPOT",
		heal: "+VIDA",
		shield: "ESCUDO",
		comboBoost: "SUPER COMBO",
		splat: "SPLASH",
		critical: "CRÍTICO",
		madeBy: "Desenvolvido por Felipe",
		felipeBio: "Estudante · Escola Palavra Viva · Sala 9C · 7 anos de experiência em desenvolvimento de software",
		odsTitle: "ODS 3 — Saúde e Bem-estar",
		creditsThanks: "Obrigado por cuidar da saúde a jogar",
		creditsDesign: "Design e programação",
		creditsMusic: "Música de fundo",
		creditsOds: "Inspirado no ODS 3 das Nações Unidas",
		upgrades: "Melhorias",
		colors: "Cores",
		moreCoins: "Mais moedas",
		moreCombo: "Mais combo",
		moreLives: "Mais vidas",
		crits: "Críticos",
		clickRadius: "Raio do clique",
		moreParticles: "Partículas",
		magnet: "Íman",
		slowmo: "Câmara lenta",
		shieldUp: "Escudo",
		on: "SIM",
		off: "NÃO",
		wellbeing: "Bem-estar",
		googleNote: "Tradução via Google Translate",
		poster5: "5 AO DIA",
		posterWater: "ÁGUA",
		posterMove: "MEXE-TE",
		food_tomato: "Tomate",
		food_apple: "Maçã",
		food_banana: "Banana",
		food_orange: "Laranja",
		food_strawberry: "Morango",
		food_blueberry: "Mirtilo",
		food_avocado: "Abacate",
		food_watermelon: "Melancia",
		food_kiwi: "Kiwi",
		food_carrot: "Cenoura",
		food_broccoli: "Brócolos",
		food_water: "Água",
		food_golden: "Maçã dourada",
		food_spinach: "Espinafre",
		food_ice: "Gelo",
		food_chili: "Malagueta",
		food_burger: "Hambúrguer",
		food_soda: "Refrigerante",
		food_fries: "Batatas fritas",
		food_donut: "Donut",
		food_candy: "Doce",
		food_pizza: "Pizza",
		food_hotdog: "Cachorro",
		food_chips: "Chips",
		rank: "Lugar",
		nameHint: "Vais aparecer na tabela de recordes",
		translating: "A traduzir com o Google…",
		vs: "Modo VS",
		vsStart: "VS!",
		vsWin: "VOCÊ GANHOU!",
		vsLose: "VOCÊ PERDEU",
		p1: "Jogador 1",
		p2: "Jogador 2",
		cosmetics: "Cosméticos",
		equip: "Equipar",
		unequip: "Remover",
		bought: "Comprado",
		owned: "Possui",
		preview: "Prévia",
		hat_cap: "Boné",
		hat_crown: "Coroa",
		hat_wizard: "Chapéu mago",
		hat_chef: "Chapéu chef",
		glasses_sun: "Óculos sol",
		glasses_nerd: "Óculos nerd",
		mustache_classic: "Bigode",
		aura_green: "Aura verde",
		aura_gold: "Aura dourada",
		aura_fire: "Aura fogo",
		suit_cape: "Capa",
		face_smile: "Sorriso",
		challenges: "Desafios",
		themes: "Temas",
		theme_default: "Clássico",
		theme_tropical: "Tropical",
		theme_neon: "Neon",
		theme_arcade: "Arcade",
		theme_candy: "Doce",
		theme_dark: "Escuro",
		theme_golden: "Dourado",
		theme_pv: "PV",
		free: "GRÁTIS",
		music: "Música",
		sfx: "Efeitos",
		yourRecord: "O teu recorde",
		maxLevel: "Nível máx.",
		gamesPlayed: "Partidas",
		totalScore: "Pontos totais",
		coinsEarned: "Moedas ganhas",
		challengesDone: "Desafios",
		event_fruit_rain: "CHUVA DE FRUTAS",
		event_golden_rush: "RUSH DOURADO",
		event_mega_combo: "MEGA COMBO",
		event_freeze_time: "TEMPO CONGELADO",
		event_double_points: "PONTOS DUPLOS",
		challenge_fruit_master: "Mestre das frutas",
		challenge_fruit_master_desc: "Esmague 100 frutas",
		challenge_combo_king: "Rei do combo",
		challenge_combo_king_desc: "Alcance um combo de 30",
		challenge_perfect: "Ronda perfeita",
		challenge_perfect_desc: "Termine sem perder vida",
		challenge_speed: "Smash rápido",
		challenge_speed_desc: "Chegue a 500 pontos em 60s",
		challenge_healthy: "Corrida saudável",
		challenge_healthy_desc: "Esmague 50 alimentos sãos",
		challenge_junk_avoider: "Evita lixo",
		challenge_junk_avoider_desc: "Deixe passar 40 lixo",
		challenge_combo_15: "Combo 15",
		challenge_combo_15_desc: "Alcance combo de 15",
		challenge_score_1k: "Mil pontos",
		challenge_score_1k_desc: "Alcance 1000 pontos",
		challenge_smashed_50: "50 frutas",
		challenge_smashed_50_desc: "Esmague 50 frutas",
		challenge_smashed_200: "200 frutas",
		challenge_smashed_200_desc: "Esmague 200 frutas",
		challenge_combo_50: "Combo 50",
		challenge_combo_50_desc: "Alcance combo de 50",
		challenge_perfect_3: "3 perfeitas",
		challenge_perfect_3_desc: "3 rondas sem perder vida",
		challenge_speed_800: "800 em 60s",
		challenge_speed_800_desc: "Chegue a 800 em 60s",
		challenge_games_10: "10 partidas",
		challenge_games_10_desc: "Jogue 10 partidas",
		challenge_coins_200: "200 moedas",
		challenge_coins_200_desc: "Ganhe 200 moedas",
		challenge_complete: "Desafio concluído!",
		dailyChallenges: "Desafios de hoje",
		nextDaily: "Novos em",
		reward: "Recompensa",
		locked: "Bloqueado",
		equipTheme: "Usar tema",
		activeTheme: "Ativo",
		vsTime: "Tempo",
		shopUpgrades: "Melhorias",
		shopCosmetics: "Cosméticos",
		shopThemes: "Temas",
	vsAgain: "De novo",
		vsIntro: "Preparem-se!",
		vsVsCpu: "1P vs CPU",
		vs2Players: "2 Jogadores",
		cloudSave: "Nuvem",
		exportSave: "Exportar código",
		importSave: "Importar código",
		cloudCopied: "Código copiado!",
		cloudLoaded: "Jogo carregado!",
		cloudFail: "Código inválido",

	},
	fr: {
		title: "VITAL SMASH",
		subtitle: "ODD 3 · Santé et bien-être",
		play: "Jouer",
		howTo: "Comment jouer",
		records: "Records",
		store: "Boutique",
		stats: "Stats",
		options: "Options",
		credits: "Crédits",
		back: "Retour",
		retry: "Rejouer",
		menu: "Menu",
		gameOver: "PARTIE TERMINÉE",
		score: "Score",
		highScore: "Record",
		combo: "Combo",
		coins: "Pièces",
		level: "Niveau",
		time: "Temps",
		enterName: "Entre ton nom",
		saveRecord: "Sauver le record",
		skip: "Passer",
		player: "Joueur",
		date: "Date",
		noRecords: "Pas encore de records. Joue une partie !",
		how1: "Écrase fruits et légumes pour marquer des points.",
		how2: "Ne touche pas la malbouffe : tu perds une vie.",
		how3: "Laisse passer la malbouffe pour un bonus.",
		how4: "L'eau soigne. Le brocoli donne un bouclier.",
		how5: "Les combos multiplient ton score.",
		odsBlurb: "ODD 3 : Permettre à tous de vivre en bonne santé et promouvoir le bien-être à tout âge.",
		shake: "Tremblement",
		particles: "Particules",
		showFPS: "Afficher FPS",
		sound: "Son",
		volume: "Volume",
		smashed: "Aliments sains",
		avoided: "Malbouffe évitée",
		clicks: "Clics",
		bestCombo: "Meilleur combo",
		totalTime: "Temps total",
		pause: "Pause",
		resume: "Reprendre",
		miss: "RATÉ",
		junkHit: "NOURRITURE INTERDITE",
		avoidedMsg: "BIEN ÉVITÉ",
		freeze: "GLACE",
		speed: "ÉPICÉ",
		jackpot: "JACKPOT",
		heal: "+VIE",
		shield: "BOUCLIER",
		comboBoost: "SUPER COMBO",
		splat: "SPLASH",
		critical: "CRITIQUE",
		madeBy: "Développé par Felipe",
		felipeBio: "Élève · Escola Palavra Viva · Classe 9C · 7 ans d'expérience en développement logiciel",
		odsTitle: "ODD 3 — Santé et bien-être",
		creditsThanks: "Merci de prendre soin de ta santé en jouant",
		creditsDesign: "Design et programmation",
		creditsMusic: "Musique de fond",
		creditsOds: "Inspiré de l'ODD 3 des Nations Unies",
		upgrades: "Améliorations",
		colors: "Couleurs",
		moreCoins: "Plus de pièces",
		moreCombo: "Plus de combo",
		moreLives: "Plus de vies",
		crits: "Critiques",
		clickRadius: "Rayon de clic",
		moreParticles: "Particules",
		magnet: "Aimant",
		slowmo: "Ralenti",
		shieldUp: "Bouclier",
		on: "OUI",
		off: "NON",
		wellbeing: "Bien-être",
		googleNote: "Traduction via Google Translate",
		poster5: "5 PAR JOUR",
		posterWater: "EAU",
		posterMove: "BOUGE",
		food_tomato: "Tomate",
		food_apple: "Pomme",
		food_banana: "Banane",
		food_orange: "Orange",
		food_strawberry: "Fraise",
		food_blueberry: "Myrtille",
		food_avocado: "Avocat",
		food_watermelon: "Pastèque",
		food_kiwi: "Kiwi",
		food_carrot: "Carotte",
		food_broccoli: "Brocoli",
		food_water: "Eau",
		food_golden: "Pomme d'or",
		food_spinach: "Épinard",
		food_ice: "Glace",
		food_chili: "Piment",
		food_burger: "Burger",
		food_soda: "Soda",
		food_fries: "Frites",
		food_donut: "Donut",
		food_candy: "Bonbon",
		food_pizza: "Pizza",
		food_hotdog: "Hot-dog",
		food_chips: "Chips",
		rank: "Rang",
		nameHint: "Tu apparaîtras au tableau des records",
		translating: "Traduction Google…",
		vs: "Mode VS",
		vsStart: "VS !",
		vsWin: "GAGNÉ !",
		vsLose: "PERDU",
		p1: "Joueur 1",
		p2: "Joueur 2",
		cosmetics: "Cosmétiques",
		equip: "Équiper",
		unequip: "Retirer",
		bought: "Acheté",
		owned: "Possédé",
		preview: "Aperçu",
		hat_cap: "Casquette",
		hat_crown: "Couronne",
		hat_wizard: "Chapeau mage",
		hat_chef: "Toque",
		glasses_sun: "Lunettes soleil",
		glasses_nerd: "Lunettes geek",
		mustache_classic: "Moustache",
		aura_green: "Aura verte",
		aura_gold: "Aura or",
		aura_fire: "Aura feu",
		suit_cape: "Cape",
		face_smile: "Sourire",
		challenges: "Défis",
		themes: "Thèmes",
		theme_default: "Classique",
		theme_tropical: "Tropical",
		theme_neon: "Néon",
		theme_arcade: "Arcade",
		theme_candy: "Bonbon",
		theme_dark: "Sombre",
		theme_golden: "Doré",
		theme_pv: "PV",
		free: "GRATUIT",
		music: "Musique",
		sfx: "Effets",
		yourRecord: "Ton record",
		maxLevel: "Niveau max",
		gamesPlayed: "Parties",
		totalScore: "Score total",
		coinsEarned: "Pièces gagnées",
		challengesDone: "Défis",
		event_fruit_rain: "PLUIE DE FRUITS",
		event_golden_rush: "RUSH DORÉ",
		event_mega_combo: "MÉGA COMBO",
		event_freeze_time: "TEMPS FIGÉ",
		event_double_points: "POINTS DOUBLES",
		challenge_fruit_master: "Maître des fruits",
		challenge_fruit_master_desc: "Écrase 100 fruits",
		challenge_combo_king: "Roi du combo",
		challenge_combo_king_desc: "Atteins un combo de 30",
		challenge_perfect: "Manche parfaite",
		challenge_perfect_desc: "Termine sans perdre de vie",
		challenge_speed: "Smash rapide",
		challenge_speed_desc: "Atteins 500 points en 60s",
		challenge_healthy: "Course saine",
		challenge_healthy_desc: "Écrase 50 aliments sains",
		challenge_junk_avoider: "Évite junk",
		challenge_junk_avoider_desc: "Laisse passer 40 junk",
		challenge_combo_15: "Combo 15",
		challenge_combo_15_desc: "Atteins un combo de 15",
		challenge_score_1k: "Mille points",
		challenge_score_1k_desc: "Atteins 1000 points",
		challenge_smashed_50: "50 fruits",
		challenge_smashed_50_desc: "Écrase 50 fruits",
		challenge_smashed_200: "200 fruits",
		challenge_smashed_200_desc: "Écrase 200 fruits",
		challenge_combo_50: "Combo 50",
		challenge_combo_50_desc: "Atteins un combo de 50",
		challenge_perfect_3: "3 parfaites",
		challenge_perfect_3_desc: "3 manches sans perdre de vie",
		challenge_speed_800: "800 en 60s",
		challenge_speed_800_desc: "Atteins 800 en 60s",
		challenge_games_10: "10 parties",
		challenge_games_10_desc: "Joue 10 parties",
		challenge_coins_200: "200 pièces",
		challenge_coins_200_desc: "Gagne 200 pièces",
		challenge_complete: "Défi terminé !",
		dailyChallenges: "Défis du jour",
		nextDaily: "Nouveaux dans",
		reward: "Récompense",
		locked: "Verrouillé",
		equipTheme: "Utiliser",
		activeTheme: "Actif",
		vsTime: "Temps",
		shopUpgrades: "Améliorations",
		shopCosmetics: "Cosmétiques",
		shopThemes: "Thèmes",
	vsAgain: "Encore",
		vsIntro: "Prêts !",
		vsVsCpu: "1P vs CPU",
		vs2Players: "2 Joueurs",
		cloudSave: "Sauvegarde cloud",
		exportSave: "Exporter code",
		importSave: "Importer code",
		cloudCopied: "Code copié !",
		cloudLoaded: "Partie chargée !",
		cloudFail: "Code invalide",

	}
};
var FOOD_TYPES = {
	tomato: {
		key: "food_tomato",
		hp: 1,
		speed: 1,
		score: 10,
		coins: 3,
		color: "#e63946",
		scale: 1,
		rarity: 1,
		kind: "healthy",
		shape: "tomato"
	},
	apple: {
		key: "food_apple",
		hp: 1,
		speed: 1.05,
		score: 15,
		coins: 6,
		color: "#c1121f",
		scale: 1.05,
		rarity: .22,
		kind: "healthy",
		shape: "apple"
	},
	banana: {
		key: "food_banana",
		hp: 1,
		speed: 1.25,
		score: 12,
		coins: 3,
		color: "#ffe066",
		scale: 1.1,
		rarity: .2,
		kind: "healthy",
		shape: "banana"
	},
	orange: {
		key: "food_orange",
		hp: 1,
		speed: .95,
		score: 14,
		coins: 6,
		color: "#f77f00",
		scale: 1,
		rarity: .18,
		kind: "healthy",
		shape: "orange"
	},
	strawberry: {
		key: "food_strawberry",
		hp: 1,
		speed: 1.45,
		score: 18,
		coins: 6,
		color: "#e63946",
		scale: .78,
		rarity: .16,
		kind: "healthy",
		shape: "berry"
	},
	blueberry: {
		key: "food_blueberry",
		hp: 1,
		speed: 1.85,
		score: 22,
		coins: 6,
		color: "#4361ee",
		scale: .55,
		rarity: .12,
		kind: "healthy",
		shape: "blueberry"
	},
	avocado: {
		key: "food_avocado",
		hp: 2,
		speed: .55,
		score: 30,
		coins: 12,
		color: "#2d6a4f",
		scale: 1.32,
		rarity: .1,
		kind: "healthy",
		shape: "avocado"
	},
	watermelon: {
		key: "food_watermelon",
		hp: 2,
		speed: .5,
		score: 35,
		coins: 12,
		color: "#d00000",
		scale: 1.48,
		rarity: .08,
		kind: "healthy",
		shape: "melon"
	},
	kiwi: {
		key: "food_kiwi",
		hp: 1,
		speed: 1.1,
		score: 16,
		coins: 6,
		color: "#80b918",
		scale: .9,
		rarity: .12,
		kind: "healthy",
		shape: "kiwi"
	},
	carrot: {
		key: "food_carrot",
		hp: 1,
		speed: 1.15,
		score: 15,
		coins: 6,
		color: "#f77f00",
		scale: 1.05,
		rarity: .14,
		kind: "healthy",
		shape: "carrot"
	},
	broccoli: {
		key: "food_broccoli",
		hp: 1,
		speed: .85,
		score: 25,
		coins: 9,
		color: "#40916c",
		scale: 1.12,
		rarity: .1,
		kind: "healthy",
		shape: "broccoli",
		special: "shield"
	},
	water: {
		key: "food_water",
		hp: 1,
		speed: .9,
		score: 20,
		coins: 3,
		color: "#4cc9f0",
		scale: 1,
		rarity: .08,
		kind: "healthy",
		shape: "bottle",
		special: "heal"
	},
	golden: {
		key: "food_golden",
		hp: 1,
		speed: .9,
		score: 100,
		coins: 45,
		color: "#ffd60a",
		scale: 1.1,
		rarity: .035,
		kind: "healthy",
		shape: "apple",
		special: "jackpot"
	},
	spinach: {
		key: "food_spinach",
		hp: 1,
		speed: 1,
		score: 20,
		coins: 6,
		color: "#2d6a4f",
		scale: .95,
		rarity: .08,
		kind: "healthy",
		shape: "leaf",
		special: "combo"
	},
	ice: {
		key: "food_ice",
		hp: 1,
		speed: .75,
		score: 30,
		coins: 6,
		color: "#90e0ef",
		scale: 1,
		rarity: .07,
		kind: "healthy",
		shape: "ice",
		special: "freeze"
	},
	chili: {
		key: "food_chili",
		hp: 1,
		speed: 1.2,
		score: 20,
		coins: 6,
		color: "#e63946",
		scale: 1,
		rarity: .07,
		kind: "healthy",
		shape: "chili",
		special: "boost"
	},
	burger: {
		key: "food_burger",
		hp: 1,
		speed: 1,
		score: 0,
		coins: 0,
		color: "#bc6c25",
		scale: 1.15,
		rarity: .09,
		kind: "junk",
		shape: "burger"
	},
	soda: {
		key: "food_soda",
		hp: 1,
		speed: 1.12,
		score: 0,
		coins: 0,
		color: "#e63946",
		scale: 1,
		rarity: .09,
		kind: "junk",
		shape: "soda"
	},
	fries: {
		key: "food_fries",
		hp: 1,
		speed: 1.05,
		score: 0,
		coins: 0,
		color: "#ffb703",
		scale: 1,
		rarity: .08,
		kind: "junk",
		shape: "fries"
	},
	donut: {
		key: "food_donut",
		hp: 1,
		speed: .95,
		score: 0,
		coins: 0,
		color: "#f4a261",
		scale: 1.05,
		rarity: .08,
		kind: "junk",
		shape: "donut"
	},
	candy: {
		key: "food_candy",
		hp: 1,
		speed: 1.35,
		score: 0,
		coins: 0,
		color: "#ff006e",
		scale: .72,
		rarity: .08,
		kind: "junk",
		shape: "candy"
	},
	pizza: {
		key: "food_pizza",
		hp: 1,
		speed: .9,
		score: 0,
		coins: 0,
		color: "#e85d04",
		scale: 1.18,
		rarity: .07,
		kind: "junk",
		shape: "pizza"
	},
	hotdog: {
		key: "food_hotdog",
		hp: 1,
		speed: 1.1,
		score: 0,
		coins: 0,
		color: "#d62828",
		scale: 1.08,
		rarity: .07,
		kind: "junk",
		shape: "hotdog"
	},
	chips: {
		key: "food_chips",
		hp: 1,
		speed: 1.15,
		score: 0,
		coins: 0,
		color: "#fcbf49",
		scale: 1,
		rarity: .07,
		kind: "junk",
		shape: "chips"
	}
};
var HEALTHY_KEYS = Object.keys(FOOD_TYPES).filter((k) => FOOD_TYPES[k].kind === "healthy");
var JUNK_KEYS = Object.keys(FOOD_TYPES).filter((k) => FOOD_TYPES[k].kind === "junk");

var COSMETICS = [
	{ id: "hat_cap", slot: "hat", nameKey: "hat_cap", cost: 40, color: "#e63946" },
	{ id: "hat_crown", slot: "hat", nameKey: "hat_crown", cost: 120, color: "#ffd60a" },
	{ id: "hat_wizard", slot: "hat", nameKey: "hat_wizard", cost: 90, color: "#7b2cbf" },
	{ id: "hat_chef", slot: "hat", nameKey: "hat_chef", cost: 60, color: "#f8f9fa" },
	{ id: "glasses_sun", slot: "glasses", nameKey: "glasses_sun", cost: 50, color: "#212529" },
	{ id: "glasses_nerd", slot: "glasses", nameKey: "glasses_nerd", cost: 45, color: "#457b9d" },
	{ id: "mustache_classic", slot: "mustache", nameKey: "mustache_classic", cost: 35, color: "#3d2914" },
	{ id: "aura_green", slot: "aura", nameKey: "aura_green", cost: 80, color: "#4c9f38" },
	{ id: "aura_gold", slot: "aura", nameKey: "aura_gold", cost: 150, color: "#ffd60a" },
	{ id: "aura_fire", slot: "aura", nameKey: "aura_fire", cost: 130, color: "#e85d04" },
	{ id: "suit_cape", slot: "suit", nameKey: "suit_cape", cost: 100, color: "#c1121f" },

];

var THEMES = {
	default: { id: "default", nameKey: "theme_default", cost: 0, free: true, colors: { bg: "#1b4332", belt: "#2d6a4f", hud: "#14281d", particles: "#ffb703", juice: "#e63946", accent: "#4c9f38" } },
	pv: { id: "pv", nameKey: "theme_pv", cost: 0, free: true, colors: { bg: "#1a3a5c", belt: "#2e6b8a", hud: "#0f2740", particles: "#f4c430", juice: "#e8b923", accent: "#3d7ea6" }, logo: true },
	tropical: { id: "tropical", nameKey: "theme_tropical", cost: 80, colors: { bg: "#0d7377", belt: "#14919b", hud: "#032f30", particles: "#ff9f1c", juice: "#e63946", accent: "#2ec4b6" } },
	neon: { id: "neon", nameKey: "theme_neon", cost: 120, colors: { bg: "#0b0b2e", belt: "#16213e", hud: "#1a1a2e", particles: "#e94560", juice: "#00f5d4", accent: "#7b2cbf" } },
	arcade: { id: "arcade", nameKey: "theme_arcade", cost: 100, colors: { bg: "#1a1a2e", belt: "#16213e", hud: "#0f3460", particles: "#e94560", juice: "#ffd60a", accent: "#e94560" } },
	candy: { id: "candy", nameKey: "theme_candy", cost: 90, colors: { bg: "#ff85a2", belt: "#ff99b8", hud: "#c44569", particles: "#ffe66d", juice: "#ff6b9d", accent: "#f8a5c2" } },
	dark: { id: "dark", nameKey: "theme_dark", cost: 70, colors: { bg: "#121212", belt: "#1e1e1e", hud: "#0a0a0a", particles: "#bb86fc", juice: "#cf6679", accent: "#03dac6" } },
	golden: { id: "golden", nameKey: "theme_golden", cost: 150, colors: { bg: "#3d2b00", belt: "#5c4500", hud: "#2a1e00", particles: "#ffd60a", juice: "#ffb703", accent: "#ffd60a" } }
};

var CHALLENGES = [
	{ id: "fruit_master", nameKey: "challenge_fruit_master", descKey: "challenge_fruit_master_desc", target: 100, track: "smashed", reward: 50 },
	{ id: "combo_king", nameKey: "challenge_combo_king", descKey: "challenge_combo_king_desc", target: 30, track: "bestCombo", reward: 60 },
	{ id: "perfect", nameKey: "challenge_perfect", descKey: "challenge_perfect_desc", target: 1, track: "perfect", reward: 80 },
	{ id: "speed", nameKey: "challenge_speed", descKey: "challenge_speed_desc", target: 500, track: "speedScore", reward: 70 },
	{ id: "healthy", nameKey: "challenge_healthy", descKey: "challenge_healthy_desc", target: 50, track: "smashed", reward: 40 },
	{ id: "junk_avoider", nameKey: "challenge_junk_avoider", descKey: "challenge_junk_avoider_desc", target: 40, track: "avoided", reward: 45 },
	{ id: "combo_15", nameKey: "challenge_combo_15", descKey: "challenge_combo_15_desc", target: 15, track: "bestCombo", reward: 35 },
	{ id: "score_1k", nameKey: "challenge_score_1k", descKey: "challenge_score_1k_desc", target: 1000, track: "highScore", reward: 90 },
	{ id: "smashed_50", nameKey: "challenge_smashed_50", descKey: "challenge_smashed_50_desc", target: 50, track: "smashed", reward: 30 },
	{ id: "smashed_200", nameKey: "challenge_smashed_200", descKey: "challenge_smashed_200_desc", target: 200, track: "smashed", reward: 100 },
	{ id: "combo_50", nameKey: "challenge_combo_50", descKey: "challenge_combo_50_desc", target: 50, track: "bestCombo", reward: 120 },
	{ id: "perfect_3", nameKey: "challenge_perfect_3", descKey: "challenge_perfect_3_desc", target: 3, track: "perfect", reward: 100 },
	{ id: "speed_800", nameKey: "challenge_speed_800", descKey: "challenge_speed_800_desc", target: 800, track: "speedScore", reward: 110 },
	{ id: "games_10", nameKey: "challenge_games_10", descKey: "challenge_games_10_desc", target: 10, track: "gamesPlayed", reward: 55 },
	{ id: "coins_200", nameKey: "challenge_coins_200", descKey: "challenge_coins_200_desc", target: 200, track: "coinsEarned", reward: 75 }
];

var LEVEL_EVENTS = [
	{ id: "fruit_rain", key: "event_fruit_rain", minLevel: 3 },
	{ id: "golden_rush", key: "event_golden_rush", minLevel: 5 },
	{ id: "mega_combo", key: "event_mega_combo", minLevel: 4 },
	{ id: "freeze_time", key: "event_freeze_time", minLevel: 6 },
	{ id: "double_points", key: "event_double_points", minLevel: 7 }
];

class ObjectPool {
	constructor(factory, size = 64) {
		this.factory = factory;
		this.pool = [];
		for (let i = 0; i < size; i++) this.pool.push(factory());
	}
	get() {
		return this.pool.pop() || this.factory();
	}
	release(o) {
		if (o.reset) o.reset();
		this.pool.push(o);
	}
};
class SaveSystem {
	static load() {
		try {
			const d = JSON.parse(localStorage.getItem(this.KEY));
			if (!d) return structuredClone(this.defaults);
			var out = Object.assign({}, this.defaults, d);
			out.colors = Object.assign({}, this.defaults.colors, d.colors || {});
			out.upgrades = Object.assign({}, this.defaults.upgrades, d.upgrades || {});
			out.cosmetics = Object.assign({}, this.defaults.cosmetics, d.cosmetics || {});
			out.ownedCosmetics = Array.isArray(d.ownedCosmetics) ? d.ownedCosmetics : [];
			out.theme = d.theme || "pv";
			out.ownedThemes = Array.isArray(d.ownedThemes) ? d.ownedThemes : ["pv", "default"];
			out.gamesPlayed = d.gamesPlayed || 0;
			out.totalScore = d.totalScore || 0;
			out.coinsEarned = d.coinsEarned || 0;
			out.maxLevel = d.maxLevel || 1;
			out.challenges = Object.assign({}, this.defaults.challenges, d.challenges || {});
			out.completedChallenges = Array.isArray(d.completedChallenges) ? d.completedChallenges : [];
			out.options = Object.assign({}, this.defaults.options, d.options || {});
			out.records = Array.isArray(d.records) ? d.records : [];
			out.achievements = d.achievements || {};
			return out;
		} catch (e) {
			return structuredClone(this.defaults);
		}
	}
	static save(data) {
		try {
			localStorage.setItem(this.KEY, JSON.stringify(data));
		} catch (e) {}
	}
	static exportCode(data) {
		try {
			const json = JSON.stringify(data);
			return btoa(unescape(encodeURIComponent(json)));
		} catch (e) { return ""; }
	}
	static importCode(code) {
		try {
			const json = decodeURIComponent(escape(atob(code.trim())));
			const d = JSON.parse(json);
			if (!d || typeof d !== "object") return null;
			var out = Object.assign({}, this.defaults, d);
			out.colors = Object.assign({}, this.defaults.colors, d.colors || {});
			out.upgrades = Object.assign({}, this.defaults.upgrades, d.upgrades || {});
			out.cosmetics = Object.assign({}, this.defaults.cosmetics, d.cosmetics || {});
			out.ownedCosmetics = Array.isArray(d.ownedCosmetics) ? d.ownedCosmetics : [];
			out.ownedThemes = Array.isArray(d.ownedThemes) ? d.ownedThemes : ["pv", "default"];
			out.options = Object.assign({}, this.defaults.options, d.options || {});
			out.records = Array.isArray(d.records) ? d.records : [];
			out.achievements = d.achievements || {};
			return out;
		} catch (e) { return null; }
	}
};
SaveSystem.KEY = "vitalSmash_ods3_v1";
SaveSystem.defaults = {
		version: 1,
		highScore: 0,
		coins: 0,
		totalSmashed: 0,
		totalAvoided: 0,
		totalClicks: 0,
		totalTime: 0,
		bestCombo: 0,
		precisionHits: 0,
		unlocked: ["tomato", "apple"],
		records: [],
		colors: {
			tomato: "#e63946",
			leaves: "#4c9f38",
			juice: "#e63946",
			particles: "#ffb703",
			belt: "#2d6a4f",
			bg: "#1b4332",
			hud: "#14281d"
		},
		upgrades: {
			coinMult: 0,
			comboBonus: 0,
			lives: 0,
			critChance: 0,
			clickRadius: 0,
			particles: 0,
			magnet: 0,
			slowmo: 0,
			shield: 0
		},
		cosmetics: {
			hat: null,
			mustache: null,
			glasses: null,
			face: null,
			aura: null,
			suit: null
		},
		ownedCosmetics: [],
		theme: "pv",
		ownedThemes: ["pv", "default"],
		gamesPlayed: 0,
		totalScore: 0,
		coinsEarned: 0,
		maxLevel: 1,
		challenges: {
			fruit_master: 0,
			combo_king: 0,
			perfect: 0,
			speed: 0,
			healthy: 0,
			junk_avoider: 0,
			combo_15: 0,
			score_1k: 0,
			smashed_50: 0,
			smashed_200: 0,
			combo_50: 0,
			perfect_3: 0,
			speed_800: 0,
			games_10: 0,
			coins_200: 0
		},
		completedChallenges: [],
		dailyDate: "",
		dailyIds: [],
		options: {
			volume: .7,
			music: true,
			sfx: true,
			quality: 1,
			shake: true,
			particles: true,
			showFPS: false,
			fullscreen: false,
			sound: true,
			lang: "es"
		},
		achievements: {}
	};

class SoundManager {
	constructor() {
		this.ctx = null;
		this.master = null;
		this.enabled = true;
		this.sfxEnabled = true;
		this.musicEnabled = true;
		this.volume = .7;
		this.music = null;
		this.musicStarted = false;
		try {
			this.music = new Audio("music.mp3");
			this.music.loop = true;
			this.music.volume = .35;
			this.music.preload = "auto";
		} catch (e) {}
	}
	unlock() {
		if (!this.ctx) {
			const AC = window.AudioContext || window.webkitAudioContext;
			if (!AC) return;
			try { this.ctx = new AC({ latencyHint: "interactive" }); }
			catch (e) { this.ctx = new AC(); }
			this.master = this.ctx.createGain();
			this.master.gain.value = this.volume * this.volume;
			this.master.connect(this.ctx.destination);
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
		this.startMusic();
	}
	startMusic() {
		if (!this.music || this.musicStarted || !this.enabled || !this.musicEnabled) return;
		this.music.volume = .35 * this.volume;
		const p = this.music.play();
		if (p && p.then) p.then(() => { this.musicStarted = true; }).catch(() => {});
		else this.musicStarted = true;
	}
	stopMusic() {
		if (this.music) {
			this.music.pause();
			this.music.currentTime = 0;
			this.musicStarted = false;
		}
	}
	setVolume(v) {
		this.volume = Math.max(0, Math.min(1, v));
		if (this.master && this.ctx) this.master.gain.setTargetAtTime(this.volume * this.volume, this.ctx.currentTime, .02);
		if (this.music) this.music.volume = .35 * this.volume;
	}
	tone(freq, dur, type = "sine", vol = .2, slide = 0) {
		if (!this.enabled || !this.ctx) return;
		const t = this.ctx.currentTime;
		const o = this.ctx.createOscillator();
		const g = this.ctx.createGain();
		o.type = type;
		o.frequency.setValueAtTime(freq, t);
		if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
		g.gain.setValueAtTime(1e-4, t);
		g.gain.exponentialRampToValueAtTime(vol, t + .012);
		g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
		o.connect(g);
		g.connect(this.master);
		o.start(t);
		o.stop(t + dur + .02);
	}
	noise(dur = .12, vol = .18) {
		if (!this.enabled || !this.ctx) return;
		const n = .12 * this.ctx.sampleRate;
		const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
		const d = buf.getChannelData(0);
		for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
		const src = this.ctx.createBufferSource();
		src.buffer = buf;
		const g = this.ctx.createGain();
		const f = this.ctx.createBiquadFilter();
		f.type = "lowpass";
		f.frequency.value = 1400;
		g.gain.value = vol;
		src.connect(f);
		f.connect(g);
		g.connect(this.master);
		src.start();
	}
	smash() {
		this.noise(.1, .16);
		this.tone(220 + Math.random() * 40, .09, "sine", .18, -80);
	}
	miss() {
		this.tone(240, .22, "triangle", .14, -160);
	}
	junk() {
		this.tone(110, .18, "sawtooth", .12, -40);
		this.noise(.16, .12);
	}
	coin() {
		this.tone(880, .08, "square", .08);
		this.tone(1320, .12, "square", .06);
	}
	heal() {
		this.tone(523, .1, "sine", .12);
		this.tone(659, .14, "sine", .1);
		this.tone(784, .18, "sine", .1);
	}
	ui() {
		this.tone(520, .05, "sine", .08);
	}
	combo(n) {
		this.tone(400 + n * 18, .08, "triangle", .1);
	}
	levelUp() {
		this.tone(523, .12, "sine", .15);
		this.tone(659, .14, "sine", .12);
		this.tone(784, .18, "sine", .12);
		this.tone(1046, .25, "triangle", .1);
	}
	crit() {
		this.tone(880, .08, "square", .14);
		this.tone(1320, .12, "square", .12);
		this.tone(1760, .15, "triangle", .1);
	}
	jackpot() {
		this.tone(523, .1, "sine", .14);
		this.tone(659, .12, "sine", .12);
		this.tone(784, .14, "sine", .12);
		this.tone(1046, .2, "triangle", .14);
		this.tone(1319, .25, "triangle", .1);
	}
	powerup() {
		this.tone(440, .08, "sine", .12);
		this.tone(660, .12, "sine", .1);
		this.tone(880, .16, "triangle", .1);
	}
};
class InputManager {
	constructor(canvas) {
		this.canvas = canvas;
		this.x = 0;
		this.y = 0;
		this.down = false;
		this.clicked = false;
		this.scaleX = 1;
		this.scaleY = 1;
		this._onDown = (e) => {
			if (e.cancelable) e.preventDefault();
			this.updatePos(e);
			this.down = true;
			this.clicked = true;
		};
		this._onMove = (e) => {
			if (e.cancelable) e.preventDefault();
			this.updatePos(e);
		};
		this._onUp = (e) => {
			if (e) this.updatePos(e);
			this.down = false;
		};
		this._binds = [];
		var bind = (type, handler) => {
			canvas.addEventListener(type, handler, false);
			this._binds.push([type, handler]);
		};
		if (window.PointerEvent) {
			bind("pointerdown", this._onDown);
			bind("pointermove", this._onMove);
			bind("pointerup", this._onUp);
			bind("pointercancel", this._onUp);
		} else {
			bind("mousedown", this._onDown);
			bind("mousemove", this._onMove);
			bind("mouseup", this._onUp);
			bind("mouseleave", this._onUp);
			bind("touchstart", this._onDown);
			bind("touchmove", this._onMove);
			bind("touchend", this._onUp);
			bind("touchcancel", this._onUp);
		}
		try { canvas.style.touchAction = "none"; } catch (e) {}
		try { canvas.style.msTouchAction = "none"; } catch (e) {}
	}
	updatePos(e) {
		var pt = e;
		if (e.touches && e.touches.length) pt = e.touches[0];
		else if (e.changedTouches && e.changedTouches.length) pt = e.changedTouches[0];
		const r = this.canvas.getBoundingClientRect();
		this.x = (pt.clientX - r.left) * this.scaleX;
		this.y = (pt.clientY - r.top) * this.scaleY;
	}
	consumeClick() {
		const c = this.clicked;
		this.clicked = false;
		return c;
	}
	destroy() {
		for (var i = 0; i < this._binds.length; i++) {
			this.canvas.removeEventListener(this._binds[i][0], this._binds[i][1], false);
		}
		this._binds = [];
	}
};
class Camera {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.trauma = 0;
		this.zoom = 1;
		this.targetZoom = 1;
	}
	addShake(amount) {
		this.trauma = Math.min(1, this.trauma + amount / 24);
	}
	update(dt) {
		this.trauma = Math.max(0, this.trauma - dt * 1.8);
		this.zoom = lerp(this.zoom, this.targetZoom, 1 - Math.exp(-10 * dt));
	}
	apply(ctx, w, h) {
		ctx.save();
		ctx.translate(w / 2, h / 2);
		ctx.scale(this.zoom, this.zoom);
		const shake = this.trauma * this.trauma;
		if (shake > .002) {
			ctx.translate((Math.random() - .5) * shake * 22, (Math.random() - .5) * shake * 22);
			ctx.rotate((Math.random() - .5) * shake * .04);
		}
		ctx.translate(-w / 2, -h / 2);
	}
	restore(ctx) {
		ctx.restore();
	}
};
class Particle {
	constructor() {
		this.reset();
	}
	reset() {
		this.x = this.y = this.vx = this.vy = 0;
		this.life = this.maxLife = 1;
		this.size = 4;
		this.color = "#fff";
		this.gravity = 0;
		this.friction = .98;
		this.rotation = 0;
		this.spin = 0;
		this.alpha = 1;
		this.type = "circle";
		this.stretch = 1;
		this.active = false;
	}
	spawn(x, y, opts = {}) {
		this.x = x;
		this.y = y;
		this.vx = opts.vx || 0;
		this.vy = opts.vy || 0;
		this.life = this.maxLife = opts.life || .6;
		this.size = opts.size || 4;
		this.color = opts.color || "#fff";
		this.gravity = opts.gravity != null ? opts.gravity : 300;
		this.friction = opts.friction != null ? opts.friction : .98;
		this.rotation = opts.rotation || 0;
		this.spin = opts.spin || 0;
		this.type = opts.type || "circle";
		this.stretch = opts.stretch || 1;
		this.alpha = 1;
		this.active = true;
	}
	update(dt) {
		if (!this.active) return;
		this.vx *= this.friction;
		this.vy *= this.friction;
		this.vy += this.gravity * dt;
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		this.rotation += this.spin * dt;
		this.life -= dt;
		this.alpha = clamp(this.life / this.maxLife, 0, 1);
		if (this.life <= 0) this.active = false;
	}
	draw(ctx) {
		if (!this.active || this.alpha <= 0) return;
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.fillStyle = this.color;
		if (this.type === "seed") {
			ctx.beginPath();
			ctx.ellipse(0, 0, this.size * .4, this.size, 0, 0, Math.PI * 2);
			ctx.fill();
		} else if (this.type === "star") this.drawStar(ctx, 0, 0, this.size, 5);
		else if (this.type === "spark") ctx.fillRect(-this.size * .5, -this.size * this.stretch * .5, this.size, this.size * this.stretch);
		else {
			ctx.beginPath();
			ctx.arc(0, 0, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}
	drawStar(ctx, x, y, r, n) {
		ctx.beginPath();
		for (let i = 0; i < n * 2; i++) {
			const a = i * Math.PI / n - Math.PI / 2;
			const rad = i % 2 === 0 ? r : r * .4;
			ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad);
		}
		ctx.closePath();
		ctx.fill();
	}
};
class Coin {
	constructor() {
		this.reset();
	}
	reset() {
		this.x = this.y = this.vx = this.vy = 0;
		this.targetX = this.targetY = 0;
		this.life = 1;
		this.value = 1;
		this.active = false;
		this.phase = 0;
		this.scale = 1;
		this.collected = false;
	}
	spawn(x, y, tx, ty, value = 1) {
		this.x = x;
		this.y = y;
		this.vx = rand(-80, 80);
		this.vy = rand(-200, -80);
		this.targetX = tx;
		this.targetY = ty;
		this.value = value;
		this.life = 1.5;
		this.phase = 0;
		this.scale = 1;
		this.collected = false;
		this.active = true;
	}
	update(dt, magnet) {
		if (!this.active) return;
		this.phase += dt;
		if (this.phase < .25) {
			this.vy += 400 * dt;
			this.x += this.vx * dt;
			this.y += this.vy * dt;
		} else {
			const speed = magnet ? 1200 : 600;
			const dx = this.targetX - this.x, dy = this.targetY - this.y;
			const d = Math.hypot(dx, dy) || 1;
			this.x += dx / d * speed * dt;
			this.y += dy / d * speed * dt;
			if (d < 20) {
				this.collected = true;
				this.active = false;
			}
		}
		this.scale = 1 + Math.sin(this.phase * 12) * .15;
	}
	draw(ctx) {
		if (!this.active) return;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.scale(this.scale, this.scale);
		ctx.fillStyle = "rgba(255,200,50,0.35)";
		ctx.beginPath();
		ctx.arc(0, 0, 14, 0, Math.PI * 2);
		ctx.fill();
		const g = ctx.createRadialGradient(-3, -3, 0, 0, 0, 10);
		g.addColorStop(0, "#ffe566");
		g.addColorStop(.6, "#ffc107");
		g.addColorStop(1, "#e6a800");
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.arc(0, 0, 10, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#c98a00";
		ctx.lineWidth = 1.5;
		ctx.stroke();
		ctx.fillStyle = "#fff8";
		ctx.beginPath();
		ctx.arc(-3, -3, 3, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
};
class FloatText {
	constructor() {
		this.reset();
	}
	reset() {
		this.x = this.y = 0;
		this.text = "";
		this.color = "#fff";
		this.life = 1;
		this.maxLife = 1;
		this.scale = 1;
		this.vy = -60;
		this.active = false;
	}
	spawn(x, y, text, color = "#fff", scale = 1) {
		this.x = x;
		this.y = y;
		this.text = text;
		this.color = color;
		this.life = this.maxLife = 1.1;
		this.scale = scale;
		this.vy = -80;
		this.active = true;
	}
	update(dt) {
		if (!this.active) return;
		this.y += this.vy * dt;
		this.life -= dt;
		if (this.life <= 0) this.active = false;
	}
	draw(ctx) {
		if (!this.active) return;
		const a = clamp(this.life / this.maxLife, 0, 1);
		ctx.save();
		ctx.globalAlpha = a;
		ctx.translate(this.x, this.y);
		ctx.scale(this.scale * (.8 + .2 * a), this.scale * (.8 + .2 * a));
		ctx.font = `800 26px ${FONT}`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.strokeStyle = "#14281d";
		ctx.lineWidth = 5;
		ctx.strokeText(this.text, 0, 0);
		ctx.fillStyle = this.color;
		ctx.fillText(this.text, 0, 0);
		ctx.restore();
	}
};
function lighten(hex, pct) {
	const n = parseInt(hex.slice(1), 16);
	let r = (n >> 16) + pct, g = (n >> 8 & 255) + pct, b = (n & 255) + pct;
	return `#${(16777216 + clamp(r, 0, 255) * 65536 + clamp(g, 0, 255) * 256 + clamp(b, 0, 255)).toString(16).slice(1)}`;
}
function darken(hex, pct) {
	return lighten(hex, -pct);
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
function drawCosmeticItem(ctx, id, scale = 1) {
	ctx.save();
	ctx.scale(scale, scale);
	if (id === "hat_cap") {
		// baseball cap with brim and button
		const g = ctx.createLinearGradient(0, -30, 0, -12);
		g.addColorStop(0, "#ff4d5a"); g.addColorStop(1, "#c1121f");
		ctx.fillStyle = g;
		ctx.beginPath(); ctx.ellipse(0, -20, 15, 7, 0, Math.PI, 0); ctx.fill();
		ctx.fillStyle = "#e63946";
		ctx.beginPath(); ctx.ellipse(2, -16, 18, 5, 0.05, 0, Math.PI*2); ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.beginPath(); ctx.arc(0, -24, 3, 0, Math.PI*2); ctx.fill();
		ctx.fillStyle = "rgba(0,0,0,0.15)";
		ctx.beginPath(); ctx.ellipse(2, -15, 16, 3, 0.05, 0, Math.PI*2); ctx.fill();
	} else if (id === "hat_crown") {
		const g = ctx.createLinearGradient(0, -32, 0, -12);
		g.addColorStop(0, "#ffe566"); g.addColorStop(1, "#e6a800");
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.moveTo(-15, -12); ctx.lineTo(-12, -30); ctx.lineTo(-6, -18);
		ctx.lineTo(0, -34); ctx.lineTo(6, -18); ctx.lineTo(12, -30); ctx.lineTo(15, -12);
		ctx.closePath(); ctx.fill();
		ctx.strokeStyle = "#b8860b"; ctx.lineWidth = 1.2; ctx.stroke();
		[[-12,-28],[0,-32],[12,-28]].forEach(([x,y],i) => {
			ctx.fillStyle = ["#e63946","#4cc9f0","#e63946"][i];
			ctx.beginPath(); ctx.arc(x,y,2.8,0,Math.PI*2); ctx.fill();
			ctx.fillStyle = "rgba(255,255,255,0.5)";
			ctx.beginPath(); ctx.arc(x-0.8,y-0.8,1,0,Math.PI*2); ctx.fill();
		});
	} else if (id === "hat_wizard") {
		const g = ctx.createLinearGradient(-8, -40, 8, -10);
		g.addColorStop(0, "#9b5de5"); g.addColorStop(1, "#5a189a");
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.moveTo(-13, -11); ctx.quadraticCurveTo(-4, -22, 0, -42); ctx.quadraticCurveTo(4, -22, 13, -11);
		ctx.closePath(); ctx.fill();
		ctx.strokeStyle = "#3c096c"; ctx.lineWidth = 1; ctx.stroke();
		// stars
		ctx.fillStyle = "#ffd60a";
		[[-4,-22],[3,-28],[-2,-34]].forEach(([x,y]) => {
			ctx.beginPath();
			for (let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5;const r=i%2?1.2:2.6;ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}
			ctx.closePath(); ctx.fill();
		});
	} else if (id === "hat_chef") {
		ctx.fillStyle = "#ffffff";
		ctx.shadowColor = "rgba(0,0,0,0.2)"; ctx.shadowBlur = 4;
		ctx.beginPath(); ctx.ellipse(0, -26, 12, 11, 0, 0, Math.PI*2); ctx.fill();
		ctx.beginPath(); ctx.ellipse(-8, -22, 7, 7, 0, 0, Math.PI*2); ctx.fill();
		ctx.beginPath(); ctx.ellipse(8, -22, 7, 7, 0, 0, Math.PI*2); ctx.fill();
		ctx.shadowBlur = 0;
		ctx.fillStyle = "#f0f0f0";
		ctx.fillRect(-11, -16, 22, 7);
		ctx.strokeStyle = "#ddd"; ctx.lineWidth = 1;
		ctx.strokeRect(-11, -16, 22, 7);
	} else if (id === "glasses_sun") {
		ctx.fillStyle = "rgba(20,20,20,0.85)";
		roundRect(ctx, -15, -5, 12, 9, 2); ctx.fill();
		roundRect(ctx, 3, -5, 12, 9, 2); ctx.fill();
		ctx.strokeStyle = "#111"; ctx.lineWidth = 2.5;
		ctx.beginPath(); ctx.moveTo(-3, -1); ctx.lineTo(3, -1); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(-15, -2); ctx.lineTo(-18, -4); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(15, -2); ctx.lineTo(18, -4); ctx.stroke();
		ctx.fillStyle = "rgba(100,180,255,0.25)";
		roundRect(ctx, -14, -4, 10, 3, 1); ctx.fill();
		roundRect(ctx, 4, -4, 10, 3, 1); ctx.fill();
	} else if (id === "glasses_nerd") {
		ctx.strokeStyle = "#2a6f97"; ctx.lineWidth = 2.5;
		ctx.beginPath(); ctx.arc(-8, 0, 7.5, 0, Math.PI*2); ctx.stroke();
		ctx.beginPath(); ctx.arc(8, 0, 7.5, 0, Math.PI*2); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(-0.5, 0); ctx.lineTo(0.5, 0); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(-15.5, -2); ctx.lineTo(-18, -5); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(15.5, -2); ctx.lineTo(18, -5); ctx.stroke();
		ctx.fillStyle = "rgba(173,216,230,0.2)";
		ctx.beginPath(); ctx.arc(-8, 0, 6, 0, Math.PI*2); ctx.fill();
		ctx.beginPath(); ctx.arc(8, 0, 6, 0, Math.PI*2); ctx.fill();
	} else if (id === "mustache_classic") {
		ctx.fillStyle = "#2c1810";
		ctx.beginPath();
		ctx.ellipse(-7, 9, 9, 4.5, -0.25, 0, Math.PI*2);
		ctx.ellipse(7, 9, 9, 4.5, 0.25, 0, Math.PI*2);
		ctx.fill();
		ctx.fillStyle = "#4a2c1a";
		ctx.beginPath(); ctx.ellipse(0, 8, 4, 2.5, 0, 0, Math.PI*2); ctx.fill();
	} else if (id === "suit_cape") {
		const g = ctx.createLinearGradient(0, 5, 0, 42);
		g.addColorStop(0, "rgba(220,30,50,0.85)"); g.addColorStop(1, "rgba(120,10,25,0.55)");
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.moveTo(-10, 6); ctx.quadraticCurveTo(-26, 22, -14, 44);
		ctx.quadraticCurveTo(0, 38, 14, 44); ctx.quadraticCurveTo(26, 22, 10, 6);
		ctx.closePath(); ctx.fill();
		ctx.strokeStyle = "rgba(255,200,100,0.4)"; ctx.lineWidth = 1.5;
		ctx.beginPath(); ctx.moveTo(0, 8); ctx.quadraticCurveTo(-8, 28, -6, 42); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(0, 8); ctx.quadraticCurveTo(8, 28, 6, 42); ctx.stroke();
	} else if (id === "face_smile") {
		ctx.strokeStyle = "#c1121f"; ctx.lineWidth = 2.5;
		ctx.beginPath(); ctx.arc(0, 6, 8, .15, Math.PI - .15); ctx.stroke();
	}
	ctx.restore();
}
function drawAura(ctx, id, r) {
	if (!id) return;
	const t = performance.now() / 1000;
	ctx.save();
	if (id === "aura_green") {
		for (let i = 0; i < 3; i++) {
			const rr = r + 4 + i * 5 + Math.sin(t*2.5 + i)*2;
			ctx.strokeStyle = `rgba(76,159,56,${0.4 - i*0.1 + Math.sin(t*3)*0.1})`;
			ctx.lineWidth = 2.5 - i * 0.5;
			ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI*2); ctx.stroke();
		}
		for (let i = 0; i < 8; i++) {
			const a = t * 1.5 + i * Math.PI / 4;
			ctx.fillStyle = `rgba(149,213,178,${0.35 + Math.sin(t*4+i)*0.15})`;
			ctx.beginPath(); ctx.arc(Math.cos(a)*(r+14), Math.sin(a)*(r+14), 2, 0, Math.PI*2); ctx.fill();
		}
	} else if (id === "aura_gold") {
		ctx.shadowColor = "rgba(255,214,10,0.5)"; ctx.shadowBlur = 12;
		ctx.strokeStyle = `rgba(255,214,10,${0.5 + Math.sin(t*4)*0.2})`;
		ctx.lineWidth = 3.5;
		ctx.beginPath(); ctx.arc(0, 0, r + 8 + Math.sin(t*3)*3, 0, Math.PI*2); ctx.stroke();
		ctx.shadowBlur = 0;
		for (let i = 0; i < 8; i++) {
			const a = t * 2.2 + i * Math.PI / 4;
			const spark = 2 + Math.sin(t*5+i)*1.2;
			ctx.fillStyle = `rgba(255,230,100,${0.55 + Math.sin(t*3+i)*0.25})`;
			ctx.beginPath(); ctx.arc(Math.cos(a)*(r+13), Math.sin(a)*(r+13), spark, 0, Math.PI*2); ctx.fill();
		}
	} else if (id === "aura_fire") {
		for (let i = 0; i < 10; i++) {
			const a = t * 3.5 + i * Math.PI / 5;
			const rr = r + 2 + Math.sin(t*6 + i)*6;
			const sz = 3.5 + Math.sin(t*4+i)*2;
			ctx.fillStyle = `rgba(${232 - i*8},${80 + i*10},20,${0.4 + Math.sin(t*5+i)*0.25})`;
			ctx.beginPath();
			ctx.ellipse(Math.cos(a)*rr*0.35, -rr*0.55 + Math.sin(a*1.3)*5, sz*0.6, sz, a, 0, Math.PI*2);
			ctx.fill();
		}
	}
	ctx.restore();
}
function drawMascot(ctx, x, y, cosmetics, scale = 1) {
	ctx.save();
	ctx.translate(x, y);
	ctx.scale(scale, scale);
	const cos = cosmetics || {};
	drawAura(ctx, cos.aura, 22);
	if (cos.suit) drawCosmeticItem(ctx, cos.suit, 1);
	// tomato body
	const g = ctx.createRadialGradient(-7, -8, 3, 0, 2, 22);
	g.addColorStop(0, "#ff8a8a");
	g.addColorStop(0.55, "#e63946");
	g.addColorStop(1, "#9d0208");
	ctx.fillStyle = g;
	ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI*2); ctx.fill();
	ctx.fillStyle = "rgba(255,255,255,0.18)";
	ctx.beginPath(); ctx.ellipse(-6, -6, 6, 4, -0.4, 0, Math.PI*2); ctx.fill();
	ctx.fillStyle = "#52b788";
	ctx.beginPath(); ctx.ellipse(0, -18, 9, 4.5, 0, 0, Math.PI*2); ctx.fill();
	ctx.fillStyle = "#2d6a4f";
	ctx.beginPath(); ctx.moveTo(-2, -18); ctx.lineTo(-1, -28); ctx.lineTo(2, -28); ctx.lineTo(2, -18); ctx.fill();
	// face
	ctx.fillStyle = "#14281d";
	ctx.beginPath(); ctx.arc(-7, -2, 3.2, 0, Math.PI*2); ctx.arc(7, -2, 3.2, 0, Math.PI*2); ctx.fill();
	ctx.fillStyle = "#fff";
	ctx.beginPath(); ctx.arc(-6, -3, 1.1, 0, Math.PI*2); ctx.arc(8, -3, 1.1, 0, Math.PI*2); ctx.fill();
	if (cos.face) drawCosmeticItem(ctx, cos.face, 1);
	else {
		ctx.strokeStyle = "#14281d"; ctx.lineWidth = 2;
		ctx.beginPath(); ctx.arc(0, 4, 6, .2, Math.PI - .2); ctx.stroke();
	}
	if (cos.mustache) drawCosmeticItem(ctx, cos.mustache, 1);
	if (cos.glasses) drawCosmeticItem(ctx, cos.glasses, 1);
	if (cos.hat) drawCosmeticItem(ctx, cos.hat, 1);
	ctx.restore();
}

class Food {
	constructor() {
		this.reset();
	}
	reset() {
		this.x = this.y = 0;
		this.vx = this.vy = 0;
		this.type = "tomato";
		this.hp = 1;
		this.maxHp = 1;
		this.scale = 1;
		this.baseScale = 1;
		this.rotation = 0;
		this.squash = 1;
		this.stretch = 1;
		this.state = "run";
		this.timer = 0;
		this.hitFlash = 0;
		this.eyeOffset = 0;
		this.browAngle = 0;
		this.mouthOpen = 0;
		this.wobble = 0;
		this.seed = Math.random() * 1e3;
		this.active = false;
		this.leafAngle = 0;
		this.blink = 0;
		this.kind = "healthy";
	}
	spawn(x, y, type, speedMult = 1) {
		const t = FOOD_TYPES[type] || FOOD_TYPES.tomato;
		this.type = type;
		this.kind = t.kind;
		this.x = x;
		this.y = y;
		this.vx = rand(-30, 30);
		this.vy = 80 * t.speed * speedMult;
		this.hp = this.maxHp = t.hp;
		this.baseScale = t.scale * (.9 + Math.random() * .2);
		this.scale = this.baseScale;
		this.rotation = rand(-.2, .2);
		this.squash = 1;
		this.stretch = 1;
		this.state = "run";
		this.timer = 0;
		this.hitFlash = 0;
		this.eyeOffset = rand(-2, 2);
		this.browAngle = rand(-.15, .15);
		this.mouthOpen = .3 + Math.random() * .4;
		this.wobble = 0;
		this.seed = Math.random() * 1e3;
		this.leafAngle = rand(-.3, .3);
		this.blink = 0;
		this.active = true;
	}
	hit() {
		this.hp--;
		this.hitFlash = .15;
		this.squash = .55;
		this.stretch = 1.45;
		if (this.hp <= 0) {
			this.state = "smash";
			this.timer = 0;
		} else {
			this.state = "hurt";
			this.timer = 0;
		}
	}
	update(dt, beltSpeed) {
		if (!this.active) return;
		this.timer += dt;
		this.wobble += dt * 8;
		this.hitFlash = Math.max(0, this.hitFlash - dt);
		if (this.blink > 0) this.blink -= dt;
		else if (chance(.008)) this.blink = .12;
		if (this.state === "run" || this.state === "hurt") {
			this.y += this.vy * dt * beltSpeed;
			this.x += this.vx * dt * .3;
			this.rotation = Math.sin(this.wobble + this.seed) * .12;
			this.squash = lerp(this.squash, 1 + Math.sin(this.wobble * 2) * .08, .2);
			this.stretch = lerp(this.stretch, 1 / this.squash, .2);
			if (this.state === "hurt" && this.timer > .2) this.state = "run";
		} else if (this.state === "smash") {
			this.squash = lerp(this.squash, .2, .25);
			this.stretch = lerp(this.stretch, 1.8, .2);
			this.scale *= .92;
			if (this.timer > .18) this.active = false;
		}
	}
	draw(ctx, colors) {
		if (!this.active) return;
		const def = FOOD_TYPES[this.type];
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.scale(this.scale * this.stretch, this.scale * this.squash);
		const sh = ctx.createRadialGradient(0, 30, 2, 0, 30, 28);
		sh.addColorStop(0, "rgba(0,0,0,0.35)");
		sh.addColorStop(1, "rgba(0,0,0,0)");
		ctx.fillStyle = sh;
		ctx.beginPath();
		ctx.ellipse(0, 30, 26, 10, 0, 0, Math.PI * 2);
		ctx.fill();
		if (this.kind === "junk") {
			ctx.strokeStyle = `rgba(230,57,70,${.5 + Math.sin(this.wobble * 3) * .25})`;
			ctx.lineWidth = 3.5;
			ctx.setLineDash([6, 5]);
			ctx.beginPath();
			ctx.arc(0, 0, 36, 0, Math.PI * 2);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.fillStyle = "#e63946";
			ctx.font = `800 12px ${FONT}`;
			ctx.textAlign = "center";
			ctx.fillText("!", 0, -38);
		}
		this.drawShape(ctx, def, colors);
		if (def.shape !== "bottle" && def.shape !== "chips") this.drawFace(ctx);
		const cos = (typeof window !== "undefined" && window.__vital && window.__vital.data && window.__vital.data.cosmetics) || {};
		if (cos.aura) drawAura(ctx, cos.aura, 30);
		if (cos.suit) drawCosmeticItem(ctx, cos.suit, 0.9);
		if (cos.face) drawCosmeticItem(ctx, cos.face, 0.9);
		if (cos.mustache) drawCosmeticItem(ctx, cos.mustache, 0.9);
		if (cos.glasses) drawCosmeticItem(ctx, cos.glasses, 0.9);
		if (cos.hat) drawCosmeticItem(ctx, cos.hat, 0.9);
		ctx.restore();
	}
	drawShape(ctx, def, colors) {
		const col = this.hitFlash > 0 ? "#fff" : def.color;
		const shape = def.shape;
		if (shape === "banana") return this.drawBanana(ctx, col);
		if (shape === "carrot") return this.drawCarrot(ctx, col, colors.leaves);
		if (shape === "broccoli") return this.drawBroccoli(ctx, col);
		if (shape === "bottle") return this.drawBottle(ctx);
		if (shape === "chili") return this.drawChili(ctx, col);
		if (shape === "leaf") return this.drawLeaf(ctx, col);
		if (shape === "burger") return this.drawBurger(ctx);
		if (shape === "soda") return this.drawSoda(ctx);
		if (shape === "fries") return this.drawFries(ctx);
		if (shape === "donut") return this.drawDonut(ctx);
		if (shape === "candy") return this.drawCandy(ctx, col);
		if (shape === "pizza") return this.drawPizza(ctx);
		if (shape === "hotdog") return this.drawHotdog(ctx);
		if (shape === "chips") return this.drawChips(ctx);
		this.drawRound(ctx, def, colors, col);
	}
	drawRound(ctx, def, colors, col) {
		const bodyG = ctx.createRadialGradient(-8, -10, 0, 0, 0, 28);
		if (this.hitFlash > 0) {
			bodyG.addColorStop(0, "#fff");
			bodyG.addColorStop(1, col);
		} else {
			bodyG.addColorStop(0, lighten(def.color, 40));
			bodyG.addColorStop(.5, def.color);
			bodyG.addColorStop(1, darken(def.color, 30));
		}
		ctx.fillStyle = bodyG;
		ctx.beginPath();
		if (def.shape === "avocado") ctx.ellipse(0, 4, 20, 26, 0, 0, Math.PI * 2);
		else if (def.shape === "berry") {
			ctx.moveTo(0, 22);
			ctx.bezierCurveTo(22, 18, 20, -6, 0, -20);
			ctx.bezierCurveTo(-20, -6, -22, 18, 0, 22);
		} else if (def.shape === "kiwi") ctx.ellipse(0, 0, 24, 20, 0, 0, Math.PI * 2);
		else {
			ctx.moveTo(0, -26);
			ctx.bezierCurveTo(22, -26, 28, -8, 26, 8);
			ctx.bezierCurveTo(24, 24, 12, 30, 0, 30);
			ctx.bezierCurveTo(-12, 30, -24, 24, -26, 8);
			ctx.bezierCurveTo(-28, -8, -22, -26, 0, -26);
		}
		ctx.fill();
		ctx.fillStyle = "rgba(255,255,255,0.32)";
		ctx.beginPath();
		ctx.ellipse(-10, -12, 8, 6, -.4, 0, Math.PI * 2);
		ctx.fill();
		if (def.shape === "tomato" || def.shape === "apple") {
			ctx.save();
			ctx.translate(0, -24);
			ctx.rotate(this.leafAngle);
			this.drawLeaves(ctx, colors.leaves);
			ctx.restore();
		}
		if (def.shape === "melon") {
			ctx.strokeStyle = darken(def.color, 40);
			ctx.lineWidth = 3;
			for (let i = -2; i <= 2; i++) {
				ctx.beginPath();
				ctx.ellipse(0, 0, 8 + Math.abs(i) * 6, 28, 0, 0, Math.PI * 2);
				ctx.stroke();
			}
			ctx.strokeStyle = "#1b4332";
			ctx.lineWidth = 6;
			ctx.beginPath();
			ctx.arc(0, 0, 27, 0, Math.PI * 2);
			ctx.stroke();
		}
		if (def.shape === "orange") {
			ctx.strokeStyle = "rgba(255,255,255,0.25)";
			ctx.lineWidth = 1;
			for (let i = 0; i < 6; i++) {
				const a = i * Math.PI / 3;
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(Math.cos(a) * 24, Math.sin(a) * 24);
				ctx.stroke();
			}
		}
		if (def.shape === "blueberry") {
			ctx.fillStyle = "#3a0ca3";
			ctx.beginPath();
			ctx.arc(0, -10, 4, 0, Math.PI * 2);
			ctx.fill();
		}
		if (def.shape === "ice") {
			ctx.strokeStyle = "rgba(200,240,255,0.75)";
			ctx.lineWidth = 1.5;
			for (let i = 0; i < 3; i++) {
				const a = i * 2.1 + this.wobble;
				ctx.beginPath();
				ctx.moveTo(Math.cos(a) * 18, Math.sin(a) * 18);
				ctx.lineTo(Math.cos(a) * 26, Math.sin(a) * 26);
				ctx.stroke();
			}
		}
		if (this.type === "golden") {
			ctx.fillStyle = "rgba(255,255,200,0.85)";
			const spark = Math.sin(this.wobble * 3) * 3;
			ctx.beginPath();
			ctx.arc(-12 + spark, -8, 3, 0, Math.PI * 2);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(10, -14 - spark, 2.5, 0, Math.PI * 2);
			ctx.fill();
		}
		if (def.shape === "avocado") {
			ctx.fillStyle = "#6b4226";
			ctx.beginPath();
			ctx.arc(0, 6, 8, 0, Math.PI * 2);
			ctx.fill();
		}
		if (def.shape === "berry") {
			ctx.fillStyle = "#fff3";
			for (let i = 0; i < 8; i++) {
				ctx.beginPath();
				ctx.arc(-8 + i % 4 * 6, -4 + Math.floor(i / 4) * 10, 1.4, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.fillStyle = colors.leaves;
			ctx.beginPath();
			ctx.moveTo(0, -20);
			ctx.lineTo(-8, -28);
			ctx.lineTo(8, -28);
			ctx.fill();
		}
	}
	drawBanana(ctx, col) {
		ctx.save();
		ctx.rotate(-.4);
		ctx.fillStyle = col;
		ctx.beginPath();
		ctx.moveTo(-22, 8);
		ctx.quadraticCurveTo(0, 28, 24, 4);
		ctx.quadraticCurveTo(8, -8, -18, -4);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "#6b4226";
		ctx.fillRect(-24, -2, 6, 8);
		ctx.restore();
	}
	drawCarrot(ctx, col, leaf) {
		ctx.fillStyle = col;
		ctx.beginPath();
		ctx.moveTo(0, 28);
		ctx.lineTo(12, -10);
		ctx.lineTo(-12, -10);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = leaf;
		for (let i = -1; i <= 1; i++) {
			ctx.beginPath();
			ctx.moveTo(0, -10);
			ctx.quadraticCurveTo(i * 10, -22, i * 4, -30);
			ctx.quadraticCurveTo(i * 6, -18, 0, -10);
			ctx.fill();
		}
	}
	drawBroccoli(ctx, col) {
		ctx.fillStyle = "#6b4226";
		ctx.fillRect(-6, 4, 12, 22);
		ctx.fillStyle = col;
		for (const [x, y, r] of [
			[
				0,
				-8,
				16
			],
			[
				-12,
				0,
				12
			],
			[
				12,
				0,
				12
			],
			[
				0,
				6,
				10
			]
		]) {
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	drawBottle(ctx) {
		ctx.fillStyle = "#4cc9f0";
		roundRect(ctx, -10, -8, 20, 32, 6);
		ctx.fill();
		ctx.fillStyle = "#90e0ef";
		roundRect(ctx, -8, -4, 16, 10, 4);
		ctx.fill();
		ctx.fillStyle = "#2a9d8f";
		roundRect(ctx, -6, -22, 12, 16, 3);
		ctx.fill();
		ctx.fillStyle = "#1b4332";
		roundRect(ctx, -7, -26, 14, 8, 2);
		ctx.fill();
	}
	drawChili(ctx, col) {
		ctx.fillStyle = col;
		ctx.beginPath();
		ctx.moveTo(-4, -18);
		ctx.bezierCurveTo(18, -10, 16, 20, 0, 26);
		ctx.bezierCurveTo(-16, 10, -14, -8, -4, -18);
		ctx.fill();
		ctx.fillStyle = "#4c9f38";
		ctx.fillRect(-4, -24, 6, 8);
	}
	drawLeaf(ctx, col) {
		ctx.fillStyle = col;
		ctx.beginPath();
		ctx.ellipse(-8, 0, 14, 22, -.4, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(8, 2, 13, 20, .35, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = darken(col, 30);
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, 18);
		ctx.quadraticCurveTo(-4, 0, 0, -18);
		ctx.stroke();
	}
	drawBurger(ctx) {
		ctx.fillStyle = "#d4a373";
		roundRect(ctx, -22, -16, 44, 14, 8);
		ctx.fill();
		ctx.fillStyle = "#6a994e";
		ctx.fillRect(-20, -4, 40, 5);
		ctx.fillStyle = "#9c6644";
		roundRect(ctx, -20, 0, 40, 10, 4);
		ctx.fill();
		ctx.fillStyle = "#e9c46a";
		roundRect(ctx, -22, 8, 44, 12, 6);
		ctx.fill();
	}
	drawSoda(ctx) {
		ctx.fillStyle = "#e63946";
		roundRect(ctx, -12, -20, 24, 40, 6);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.fillRect(-12, -6, 24, 10);
		ctx.fillStyle = "#adb5bd";
		roundRect(ctx, -10, -24, 20, 8, 3);
		ctx.fill();
	}
	drawFries(ctx) {
		ctx.fillStyle = "#e63946";
		ctx.beginPath();
		ctx.moveTo(-16, 8);
		ctx.lineTo(-12, 24);
		ctx.lineTo(12, 24);
		ctx.lineTo(16, 8);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "#ffb703";
		for (let i = 0; i < 5; i++) ctx.fillRect(-14 + i * 6, -18, 4, 28);
	}
	drawDonut(ctx) {
		ctx.fillStyle = "#e9c46a";
		ctx.beginPath();
		ctx.arc(0, 0, 22, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#f4a261";
		ctx.beginPath();
		ctx.arc(0, 0, 18, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalCompositeOperation = "destination-out";
		ctx.beginPath();
		ctx.arc(0, 0, 8, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalCompositeOperation = "source-over";
		const spr = [
			"#e63946",
			"#4c9f38",
			"#4361ee",
			"#fff"
		];
		for (let i = 0; i < 8; i++) {
			const a = i * .8;
			ctx.fillStyle = spr[i % spr.length];
			ctx.fillRect(Math.cos(a) * 13, Math.sin(a) * 13, 3, 6);
		}
	}
	drawCandy(ctx, col) {
		ctx.fillStyle = col;
		ctx.beginPath();
		ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.moveTo(-14, 0);
		ctx.lineTo(-24, -10);
		ctx.lineTo(-24, 10);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(14, 0);
		ctx.lineTo(24, -10);
		ctx.lineTo(24, 10);
		ctx.fill();
	}
	drawPizza(ctx) {
		ctx.fillStyle = "#e9c46a";
		ctx.beginPath();
		ctx.moveTo(0, -24);
		ctx.lineTo(22, 20);
		ctx.lineTo(-22, 20);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "#e85d04";
		ctx.beginPath();
		ctx.moveTo(0, -16);
		ctx.lineTo(16, 16);
		ctx.lineTo(-16, 16);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "#e63946";
		ctx.beginPath();
		ctx.arc(-4, 4, 4, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(6, 8, 3.5, 0, Math.PI * 2);
		ctx.fill();
	}
	drawHotdog(ctx) {
		ctx.fillStyle = "#e9c46a";
		roundRect(ctx, -24, -10, 48, 20, 10);
		ctx.fill();
		ctx.fillStyle = "#bc4749";
		roundRect(ctx, -22, -6, 44, 12, 8);
		ctx.fill();
	}
	drawChips(ctx) {
		ctx.fillStyle = "#fcbf49";
		roundRect(ctx, -16, -22, 32, 44, 8);
		ctx.fill();
		ctx.fillStyle = "#e63946";
		ctx.fillRect(-16, -8, 32, 12);
		ctx.fillStyle = "#fff";
		ctx.font = `800 9px ${FONT}`;
		ctx.textAlign = "center";
		ctx.fillText("XXL", 0, 0);
	}
	drawLeaves(ctx, col) {
		ctx.fillStyle = col;
		for (let i = -1; i <= 1; i++) {
			ctx.save();
			ctx.rotate(i * .5);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.bezierCurveTo(8, -4, 12, -14, 2, -18);
			ctx.bezierCurveTo(-4, -12, -6, -4, 0, 0);
			ctx.fill();
			ctx.restore();
		}
		ctx.strokeStyle = darken(col, 20);
		ctx.lineWidth = 2.5;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, -6);
		ctx.stroke();
	}
	drawFace(ctx) {
		const eyeY = -2 + this.eyeOffset;
		const open = this.blink > 0 ? .15 : 1;
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.ellipse(-9, eyeY, 6, 7 * open, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(9, eyeY, 6, 7 * open, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#14281d";
		const look = Math.sin(this.wobble * .5) * 1.5;
		ctx.beginPath();
		ctx.arc(-9 + look, eyeY + 1, 3.2 * open, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(9 + look, eyeY + 1, 3.2 * open, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(-10 + look, eyeY - 1, 1.2 * open, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(8 + look, eyeY - 1, 1.2 * open, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#14281d";
		ctx.lineWidth = 2.2;
		ctx.lineCap = "round";
		ctx.beginPath();
		ctx.moveTo(-14, eyeY - 10 + this.browAngle * 10);
		ctx.lineTo(-4, eyeY - 8 - this.browAngle * 5);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(14, eyeY - 10 + this.browAngle * 10);
		ctx.lineTo(4, eyeY - 8 - this.browAngle * 5);
		ctx.stroke();
		ctx.lineWidth = 2;
		ctx.beginPath();
		if (this.state === "hurt" || this.state === "smash" || this.kind === "junk") ctx.arc(0, 10, 6, .2, Math.PI - .2);
		else {
			ctx.moveTo(-7, 8);
			ctx.quadraticCurveTo(0, 8 + this.mouthOpen * 10, 7, 8);
		}
		ctx.stroke();
	}
	contains(px, py, radius = 0) {
		return dist(px, py, this.x, this.y) < 28 * this.scale + radius;
	}
};
class Belt {
	constructor() {
		this.offset = 0;
		this.speed = 1;
		this.frozen = 0;
		this.boost = 0;
	}
	update(dt) {
		if (this.frozen > 0) {
			this.frozen -= dt;
			return;
		}
		const spd = this.speed * (this.boost > 0 ? 1.8 : 1);
		this.offset = (this.offset + 120 * spd * dt) % 60;
		if (this.boost > 0) this.boost -= dt;
	}
	draw(ctx, w, h, colors, opts = {}) {
		const beltTop = h * .28;
		const beltBot = h * .92;
		const beltW = opts.beltW || Math.min(w * .72, 520);
		const cx = opts.cx != null ? opts.cx : w / 2;
		const left = cx - beltW / 2;
		const right = cx + beltW / 2;
		ctx.fillStyle = "rgba(0,0,0,0.18)";
		ctx.beginPath();
		ctx.moveTo(left - 20, beltBot + 10);
		ctx.lineTo(right + 20, beltBot + 10);
		ctx.lineTo(right + 40, h);
		ctx.lineTo(left - 40, h);
		ctx.fill();
		ctx.fillStyle = "#2d6a4f";
		ctx.fillRect(left - 18, beltTop - 15, 18, beltBot - beltTop + 30);
		ctx.fillRect(right, beltTop - 15, 18, beltBot - beltTop + 30);
		this.drawRoller(ctx, cx, beltTop - 8, beltW + 20);
		this.drawRoller(ctx, cx, beltBot + 8, beltW + 20);
		const beltCol = colors.belt || "#2d6a4f";
		const bg = ctx.createLinearGradient(left, 0, right, 0);
		bg.addColorStop(0, darken(beltCol, 18));
		bg.addColorStop(.5, lighten(beltCol, 8));
		bg.addColorStop(1, darken(beltCol, 18));
		ctx.fillStyle = bg;
		ctx.beginPath();
		ctx.moveTo(left, beltTop);
		ctx.lineTo(right, beltTop);
		ctx.lineTo(right + 8, beltBot);
		ctx.lineTo(left - 8, beltBot);
		ctx.closePath();
		ctx.fill();
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(left, beltTop);
		ctx.lineTo(right, beltTop);
		ctx.lineTo(right + 8, beltBot);
		ctx.lineTo(left - 8, beltBot);
		ctx.clip();
		ctx.strokeStyle = "rgba(244,241,232,0.12)";
		ctx.lineWidth = 3;
		for (let y = beltTop - 60 + this.offset; y < beltBot + 20; y += 30) {
			const lw = lerp(0, 8, (y - beltTop) / (beltBot - beltTop));
			ctx.beginPath();
			ctx.moveTo(left - lw, y);
			ctx.lineTo(right + lw, y);
			ctx.stroke();
		}
		ctx.strokeStyle = "rgba(76,159,56,0.28)";
		ctx.lineWidth = 2;
		ctx.setLineDash([15, 20]);
		ctx.beginPath();
		ctx.moveTo(cx, beltTop);
		ctx.lineTo(cx, beltBot);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.restore();
		if (this.frozen > 0) {
			ctx.fillStyle = `rgba(150,220,255,${.25 * Math.min(1, this.frozen)})`;
			ctx.fillRect(left - 10, beltTop, beltW + 20, beltBot - beltTop);
		}
	}
	drawRoller(ctx, cx, y, width) {
		const g = ctx.createLinearGradient(cx - width / 2, y - 10, cx - width / 2, y + 10);
		g.addColorStop(0, "#95d5b2");
		g.addColorStop(.5, "#d8f3dc");
		g.addColorStop(1, "#2d6a4f");
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.ellipse(cx, y, width / 2, 10, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#1b4332";
		ctx.lineWidth = 2;
		ctx.stroke();
	}
};
class Background {
	constructor() {
		this.time = 0;
	}
	update(dt) {
		this.time += dt;
	}
	draw(ctx, w, h, colors, t) {
		const wallG = ctx.createLinearGradient(0, 0, 0, h * .55);
		wallG.addColorStop(0, lighten(colors.bg || "#1b4332", 28));
		wallG.addColorStop(.55, colors.bg || "#1b4332");
		wallG.addColorStop(1, darken(colors.bg || "#1b4332", 12));
		ctx.fillStyle = wallG;
		ctx.fillRect(0, 0, w, h);
		const floorG = ctx.createLinearGradient(0, h * .55, 0, h);
		floorG.addColorStop(0, "#e8f8ec");
		floorG.addColorStop(.4, "#d8f3dc");
		floorG.addColorStop(1, "#7ec8a0");
		ctx.fillStyle = floorG;
		ctx.fillRect(0, h * .55, w, h * .45);
		ctx.strokeStyle = "rgba(27,67,50,0.1)";
		ctx.lineWidth = 1;
		for (let i = 0; i < 10; i++) {
			const y = h * .55 + i * (h * .45 / 10);
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}
		const vignette = ctx.createRadialGradient(w / 2, h * .4, h * .15, w / 2, h * .4, h * .85);
		vignette.addColorStop(0, "rgba(0,0,0,0)");
		vignette.addColorStop(1, "rgba(0,20,10,0.22)");
		ctx.fillStyle = vignette;
		ctx.fillRect(0, 0, w, h);
		this.drawPlant(ctx, w * .07, h * .5, .7);
		this.drawPlant(ctx, w * .93, h * .48, .65);
		this.drawCooler(ctx, w * .08, h * .38);
		this.drawSalad(ctx, w * .92, h * .36);
		this.drawPoster(ctx, w * .2, h * .12, 78, 52, "#4c9f38", t("poster5"));
		this.drawPoster(ctx, w * .8, h * .14, 70, 48, "#2a9d8f", t("posterWater"));
		this.drawPoster(ctx, w * .5, h * .1, 64, 40, "#e63946", t("posterMove"));
		this.drawECG(ctx, w);
		for (let i = 0; i < 6; i++) {
			const x = w * (.12 + i * .15);
			const pulse = .5 + Math.sin(this.time * 1.2 + i) * .15;
			ctx.fillStyle = `rgba(255,250,220,${0.12 * pulse})`;
			ctx.beginPath();
			ctx.ellipse(x, 18, 44, 14, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = `rgba(255,250,220,${0.45 * pulse})`;
			ctx.beginPath();
			ctx.ellipse(x, 10, 16, 5, 0, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.fillStyle = "rgba(255,255,255,0.07)";
		for (let i = 0; i < 18; i++) {
			const px = (Math.sin(this.time * .35 + i * 1.7) * .5 + .5) * w;
			const py = (Math.cos(this.time * .25 + i * 2.1) * .5 + .5) * h * .5;
			ctx.beginPath();
			ctx.arc(px, py, 1.5 + (i % 3) * .6, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	drawECG(ctx, w) {
		ctx.save();
		ctx.strokeStyle = "rgba(76,159,56,0.28)";
		ctx.lineWidth = 2;
		ctx.beginPath();
		const y = 36;
		ctx.moveTo(0, y);
		for (let x = 0; x < w; x += 40) {
			ctx.lineTo(x + 10, y);
			ctx.lineTo(x + 14, 26);
			ctx.lineTo(x + 18, 50);
			ctx.lineTo(x + 22, 30);
			ctx.lineTo(x + 26, y);
			ctx.lineTo(x + 40, y);
		}
		ctx.stroke();
		ctx.restore();
	}
	drawPlant(ctx, x, y, s) {
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(s, s);
		ctx.fillStyle = "#9c6644";
		ctx.fillRect(-14, 10, 28, 18);
		ctx.fillStyle = "#4c9f38";
		ctx.beginPath();
		ctx.ellipse(0, -6, 16, 22, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(-12, 2, 10, 14, -.4, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(12, 2, 10, 14, .4, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
	drawCooler(ctx, x, y) {
		ctx.save();
		ctx.translate(x, y);
		ctx.globalAlpha = .55;
		ctx.fillStyle = "#74c0fc";
		ctx.fillRect(-16, -28, 32, 50);
		ctx.fillStyle = "#e7f5ff";
		ctx.beginPath();
		ctx.arc(0, -36, 14, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
	drawSalad(ctx, x, y) {
		ctx.save();
		ctx.translate(x, y);
		ctx.globalAlpha = .5;
		ctx.fillStyle = "#dee2e6";
		ctx.beginPath();
		ctx.ellipse(0, 10, 22, 10, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#4c9f38";
		ctx.beginPath();
		ctx.arc(-6, 0, 10, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#e63946";
		ctx.beginPath();
		ctx.arc(8, 2, 7, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
	drawPoster(ctx, x, y, w, h, col, txt) {
		ctx.save();
		ctx.translate(x, y);
		ctx.globalAlpha = .72;
		ctx.fillStyle = "#f4f1e8";
		ctx.fillRect(-w / 2, -h / 2, w, h);
		ctx.fillStyle = col;
		ctx.fillRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8);
		ctx.fillStyle = "#fff";
		ctx.font = `800 11px ${FONT}`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(txt, 0, 0);
		ctx.restore();
	}
};
class EffectManager {
	constructor() {
		this.hitStop = 0;
		this.flash = 0;
		this.flashColor = "255,255,255";
	}
	addHitStop(t = .04) {
		this.hitStop = Math.max(this.hitStop, t);
	}
	addFlash(a = .35, color = "255,255,255") {
		this.flash = Math.max(this.flash, a);
		this.flashColor = color;
	}
	update(dt) {
		this.hitStop = Math.max(0, this.hitStop - dt);
		this.flash = Math.max(0, this.flash - dt * 3);
	}
	draw(ctx, w, h) {
		if (this.flash > 0) {
			ctx.fillStyle = `rgba(${this.flashColor},${this.flash})`;
			ctx.fillRect(0, 0, w, h);
		}
	}
};
class Button {
	constructor(x, y, w, h, label, opts = {}) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.label = label;
		this.hover = false;
		this.scale = 1;
		this.color = opts.color || "#4c9f38";
		this.textColor = opts.textColor || "#f4f1e8";
		this.onClick = opts.onClick || (() => {});
		this.visible = true;
	}
	contains(px, py) {
		return this.visible && px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h;
	}
	update(mx, my, clicked) {
		if (!this.visible) return;
		this.hover = this.contains(mx, my);
		this.scale = lerp(this.scale, this.hover ? 1.05 : 1, .2);
		if (this.hover && clicked) this.onClick();
	}
	draw(ctx) {
		if (!this.visible) return;
		ctx.save();
		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
		ctx.scale(this.scale, this.scale);
		if (this.hover) {
			ctx.shadowColor = this.color;
			ctx.shadowBlur = 14;
		}
		ctx.fillStyle = "rgba(0,0,0,0.3)";
		roundRect(ctx, -this.w / 2 + 3, -this.h / 2 + 5, this.w, this.h, 14);
		ctx.fill();
		ctx.shadowBlur = 0;
		const g = ctx.createLinearGradient(0, -this.h / 2, 0, this.h / 2);
		g.addColorStop(0, lighten(this.color, 22));
		g.addColorStop(0.5, this.color);
		g.addColorStop(1, darken(this.color, 12));
		ctx.fillStyle = g;
		roundRect(ctx, -this.w / 2, -this.h / 2, this.w, this.h, 14);
		ctx.fill();
		ctx.fillStyle = "rgba(255,255,255,0.2)";
		roundRect(ctx, -this.w / 2 + 2, -this.h / 2 + 2, this.w - 4, this.h * .36, 10);
		ctx.fill();
		ctx.strokeStyle = "rgba(255,255,255,0.12)";
		ctx.lineWidth = 1.5;
		roundRect(ctx, -this.w / 2, -this.h / 2, this.w, this.h, 14);
		ctx.stroke();
		ctx.fillStyle = this.textColor;
		ctx.font = `800 ${Math.min(18, this.h * .42)}px ${FONT}`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.label, 0, 1);
		ctx.restore();
	}
};
class HUD {
	constructor() {
		this.comboPulse = 0;
	}
	update(dt) {
		this.comboPulse = Math.max(0, this.comboPulse - dt);
	}
	draw(ctx, w, h, game) {
		const pad = 12;
		const barH = w < 420 ? 70 : 52;
		ctx.save();
		ctx.fillStyle = "rgba(20,40,30,0.62)";
		roundRect(ctx, pad, pad, w - 24, barH, 14);
		ctx.fill();
		ctx.strokeStyle = "rgba(244,241,232,0.12)";
		ctx.lineWidth = 1.5;
		roundRect(ctx, pad, pad, w - 24, barH, 14);
		ctx.stroke();
		ctx.fillStyle = "#f4f1e8";
		ctx.font = `800 16px ${FONT}`;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
		const y1 = pad + (w < 420 ? 22 : 26);
		ctx.fillText(`${game.t("score")} ${game.score}`, 26, y1);
		if (w < 420) {
			ctx.fillText(`${game.t("coins")} ${game.data.coins}`, 26, 60);
			ctx.fillText(`${game.t("time")} ${game.timeAlive | 0}s`, 162, 60);
		} else {
			ctx.fillText(`${game.t("coins")} ${game.data.coins}`, 162, y1);
			ctx.fillText(`${game.t("time")} ${game.timeAlive | 0}s`, 292, y1);
		}
		ctx.fillStyle = "rgba(244,241,232,0.75)";
		ctx.font = `700 13px ${FONT}`;
		ctx.textAlign = "center";
		ctx.fillText(`${game.t("level")} ${game.level}`, w / 2, y1);
		if (game.activeEvent) {
			ctx.fillStyle = "#ff9f1c";
			ctx.font = `800 14px ${FONT}`;
			ctx.fillText(game.t("event_" + game.activeEvent) || game.activeEvent, w / 2, y1 + 18);
		}
		if (game.levelAnnounce > 0) {
			ctx.globalAlpha = Math.min(1, game.levelAnnounce);
			ctx.fillStyle = "#ffd60a";
			ctx.font = `900 36px ${FONT}`;
			ctx.fillText(`${game.t("level")} ${game.level}`, w / 2, h * 0.38);
			ctx.globalAlpha = 1;
		}
		if (game.combo > 1) {
			const s = 1 + this.comboPulse * .3;
			ctx.save();
			ctx.translate(w - pad - 70, y1);
			ctx.scale(s, s);
			ctx.fillStyle = "#95d5b2";
			ctx.font = `800 20px ${FONT}`;
			ctx.textAlign = "center";
			ctx.fillText(`x${game.combo}`, 0, 0);
			ctx.restore();
		}
		for (let i = 0; i < game.lives; i++) this.drawHeart(ctx, w - pad - 18 - i * 20, pad + barH - 14, 7);
		if (game.shieldTimer > 0) {
			ctx.strokeStyle = "#4cc9f0";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(w - pad - 18, pad + barH - 14, 11, 0, Math.PI * 2);
			ctx.stroke();
		}
		if (game.data.options.showFPS) {
			ctx.fillStyle = "#95d5b2";
			ctx.font = "12px ui-monospace, monospace";
			ctx.textAlign = "right";
			ctx.fillText(`${game.fps | 0} FPS`, w - pad, h - 12);
		}
		ctx.restore();
	}
	drawHeart(ctx, x, y, s) {
		ctx.fillStyle = "#e63946";
		ctx.beginPath();
		ctx.moveTo(x, y + s * .3);
		ctx.bezierCurveTo(x, y - s * .4, x - s, y - s * .2, x - s, y + s * .15);
		ctx.bezierCurveTo(x - s, y + s * .7, x, y + s * 1.05, x, y + s * 1.2);
		ctx.bezierCurveTo(x, y + s * 1.05, x + s, y + s * .7, x + s, y + s * .15);
		ctx.bezierCurveTo(x + s, y - s * .2, x, y - s * .4, x, y + s * .3);
		ctx.fill();
	}
};
var ACHIEVEMENTS = [
	{
		id: "first",
		name: "Primer smash",
		desc: "Aplasta tu primer alimento sano",
		check: (g) => g.totalSmashed >= 1
	},
	{
		id: "100",
		name: "100 sanos",
		desc: "Aplasta 100 alimentos sanos",
		check: (g) => g.totalSmashed >= 100
	},
	{
		id: "500",
		name: "500 sanos",
		desc: "Aplasta 500 alimentos sanos",
		check: (g) => g.totalSmashed >= 500
	},
	{
		id: "combo20",
		name: "Combo x20",
		desc: "Alcanza combo x20",
		check: (g) => g.bestCombo >= 20
	},
	{
		id: "score10k",
		name: "10K puntos",
		desc: "Consigue 10000 puntos",
		check: (g) => g.highScore >= 1e4
	},
	{
		id: "avoid50",
		name: "Guardián",
		desc: "Evita 50 comidas prohibidas",
		check: (g) => g.totalAvoided >= 50
	},
	{
		id: "rich",
		name: "Millonario",
		desc: "Acumula 1000 monedas",
		check: (g) => g.coins >= 1e3
	}
];
class AchievementManager {
	constructor(data) {
		this.data = data;
		this.queue = [];
		this.timer = 0;
	}
	check() {
		for (const a of ACHIEVEMENTS) if (!this.data.achievements[a.id] && a.check(this.data)) {
			this.data.achievements[a.id] = true;
			this.queue.push(a);
			SaveSystem.save(this.data);
		}
	}
	update(dt) {
		if (this.queue.length && this.timer <= 0) this.timer = 3;
		if (this.timer > 0) this.timer -= dt;
		if (this.timer <= 0 && this.queue.length) this.queue.shift();
	}
	draw(ctx, w) {
		if (!this.queue.length || this.timer <= 0) return;
		const a = this.queue[0];
		const alpha = this.timer > 2.5 ? (3 - this.timer) * 2 : this.timer < .5 ? this.timer * 2 : 1;
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.fillStyle = "rgba(20,40,30,0.92)";
		roundRect(ctx, w / 2 - 140, 80, 280, 56, 12);
		ctx.fill();
		ctx.fillStyle = "#95d5b2";
		ctx.font = `800 16px ${FONT}`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(a.name, w / 2, 100);
		ctx.fillStyle = "#d8f3dc";
		ctx.font = `600 13px ${FONT}`;
		ctx.fillText(a.desc, w / 2, 120);
		ctx.restore();
	}
};
class Store {
	constructor(game) {
		this.game = game;
		this.tab = "upgrades";
		this.buttons = [];
		this.previewId = null;
	}
	open() {
		this.game.state = "store";
		this.tab = "upgrades";
		this.buildButtons();
	}
	openCosmetics() {
		this.game.state = "store";
		this.tab = "cosmetics";
		this.buildButtons();
	}
	openThemes() {
		this.game.state = "store";
		this.tab = "themes";
		this.buildButtons();
	}
	buildButtons() {
		this.buttons = [];
		const g = this.game;
		const w = g.w, h = g.h;
		this.buttons.push(new Button(w / 2 - 60, h - 64, 120, 42, g.t("back"), {
			color: "#2a9d8f",
			onClick: () => {
				g.state = "menu";
				g.buildMenu();
			}
		}));
		const tabs = ["upgrades", "cosmetics", "themes"];
		const tabLabels = [g.t("shopUpgrades") || g.t("upgrades"), g.t("shopCosmetics") || g.t("cosmetics"), g.t("shopThemes") || g.t("themes")];
		const tw = Math.min(110, (w - 40) / 3);
		tabs.forEach((tab, i) => {
			this.buttons.push(new Button(w / 2 - (tw * 1.5 + 8) + i * (tw + 8), 72, tw, 34, tabLabels[i], {
				color: this.tab === tab ? "#4c9f38" : "#1b4332",
				onClick: () => {
					this.tab = tab;
					this.previewId = null;
					this.buildButtons();
				}
			}));
		});
		if (this.tab === "upgrades") {
			const ups = [
				{ key: "coinMult", name: g.t("moreCoins"), cost: 50 },
				{ key: "comboBonus", name: g.t("moreCombo"), cost: 80 },
				{ key: "lives", name: g.t("moreLives"), cost: 100 },
				{ key: "critChance", name: g.t("crits"), cost: 120 },
				{ key: "clickRadius", name: g.t("clickRadius"), cost: 90 },
				{ key: "particles", name: g.t("moreParticles"), cost: 60 },
				{ key: "magnet", name: g.t("magnet"), cost: 150 },
				{ key: "slowmo", name: g.t("slowmo"), cost: 200 },
				{ key: "shield", name: g.t("shieldUp"), cost: 180 }
			];
			const startY = 120;
			const gap = Math.min(38, (h - startY - 80) / ups.length);
			ups.forEach((u, i) => {
				const lvl = g.data.upgrades[u.key] || 0;
				const cost = u.cost * (lvl + 1);
				this.buttons.push(new Button(w / 2 - 150, startY + i * gap, 300, Math.min(34, gap - 4), `${u.name} Lv${lvl}  ${cost}`, {
					color: g.data.coins >= cost ? "#2a9d8f" : "#3d5a4c",
					onClick: () => {
						if (g.data.coins >= cost) {
							g.data.coins -= cost;
							g.data.upgrades[u.key] = (g.data.upgrades[u.key] || 0) + 1;
							SaveSystem.save(g.data);
							g.sound.coin();
							this.buildButtons();
						}
					}
				}));
			});
		} else if (this.tab === "colors") {
			const cols = [
				{ key: "tomato", name: "A" },
				{ key: "leaves", name: "B" },
				{ key: "juice", name: "C" },
				{ key: "belt", name: "D" },
				{ key: "bg", name: "E" },
				{ key: "hud", name: "F" }
			];
			const palette = ["#e63946","#4c9f38","#2a9d8f","#457b9d","#f4a261","#90e0ef","#d8f3dc","#1b4332","#14281d","#95d5b2"];
			cols.forEach((c, i) => {
				palette.forEach((p, j) => {
					this.buttons.push(new Button(w / 2 - 160 + j * 34, 130 + i * 46, 30, 30, "", {
						color: p,
						onClick: () => {
							g.data.colors[c.key] = p;
							SaveSystem.save(g.data);
						}
					}));
				});
			});
		} else if (this.tab === "cosmetics") {
			const owned = g.data.ownedCosmetics || [];
			const startY = 118;
			const gap = Math.min(36, (h - startY - 100) / Math.max(1, COSMETICS.length));
			COSMETICS.forEach((c, i) => {
				const has = owned.includes(c.id);
				const equipped = g.data.cosmetics[c.slot] === c.id;
				let label;
				if (!has) label = `${g.t(c.nameKey)}  ${c.cost}`;
				else if (equipped) label = `${g.t(c.nameKey)}  ✓`;
				else label = `${g.t(c.nameKey)}  ${g.t("equip")}`;
				const color = !has ? (g.data.coins >= c.cost ? "#2a9d8f" : "#3d5a4c") : (equipped ? "#4c9f38" : "#457b9d");
				this.buttons.push(new Button(w / 2 - 150, startY + i * gap, 300, Math.min(32, gap - 3), label, {
					color,
					onClick: () => {
						this.previewId = c.id;
						if (!has) {
							if (g.data.coins >= c.cost) {
								g.data.coins -= c.cost;
								if (!g.data.ownedCosmetics) g.data.ownedCosmetics = [];
								g.data.ownedCosmetics.push(c.id);
								g.data.cosmetics[c.slot] = c.id;
								SaveSystem.save(g.data);
								g.sound.coin();
								this.buildButtons();
							}
						} else {
							if (equipped) g.data.cosmetics[c.slot] = null;
							else g.data.cosmetics[c.slot] = c.id;
							SaveSystem.save(g.data);
							g.sound.ui();
							this.buildButtons();
						}
					}
				}));
			});
		} else if (this.tab === "themes") {
			const keys = Object.keys(THEMES);
			const startY = 120;
			const gap = Math.min(40, (h - startY - 80) / keys.length);
			keys.forEach((id, i) => {
				const th = THEMES[id];
				const owned = th.free || (g.data.ownedThemes || []).includes(id);
				const active = g.data.theme === id;
				let label = g.t(th.nameKey);
				if (th.free) label += " · " + g.t("free");
				else if (!owned) label += " · " + th.cost;
				else if (active) label += " · ✓";
				this.buttons.push(new Button(w / 2 - 150, startY + i * gap, 300, Math.min(36, gap - 4), label, {
					color: active ? "#4c9f38" : (owned ? "#2a9d8f" : "#3d5a4c"),
					onClick: () => {
						if (!owned) {
							if (g.data.coins >= th.cost) {
								g.data.coins -= th.cost;
								if (!g.data.ownedThemes) g.data.ownedThemes = ["pv", "default"];
								g.data.ownedThemes.push(id);
								g.data.theme = id;
								g.applyTheme();
								SaveSystem.save(g.data);
								g.sound.coin();
								this.buildButtons();
							}
						} else {
							g.data.theme = id;
							g.applyTheme();
							SaveSystem.save(g.data);
							g.sound.ui();
							this.buildButtons();
						}
					}
				}));
			});
		}
	}
	update(input) {
		const clicked = input.consumeClick();
		for (const b of this.buttons) b.update(input.x, input.y, clicked);
	}
	draw(ctx, w, h) {
		ctx.fillStyle = "rgba(20,40,30,0.94)";
		ctx.fillRect(0, 0, w, h);
		// soft glow
		const eg = ctx.createRadialGradient(w/2, h*0.3, 20, w/2, h*0.3, w*0.6);
		eg.addColorStop(0, "rgba(76,159,56,0.12)");
		eg.addColorStop(1, "rgba(0,0,0,0)");
		ctx.fillStyle = eg;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#f4f1e8";
		ctx.font = `800 28px ${FONT}`;
		ctx.textAlign = "center";
		ctx.fillText(this.game.t("store"), w / 2, 44);
		ctx.font = `700 15px ${FONT}`;
		ctx.fillStyle = "#95d5b2";
		ctx.fillText(`${this.game.t("coins")} ${this.game.data.coins}`, w / 2, h - 78);
		for (const b of this.buttons) b.draw(ctx);
		if (this.tab === "cosmetics") {
			drawMascot(ctx, w / 2 + 170, 200, this.game.data.cosmetics, 1.15);
		}
	}
};
class CreditsRoll {
	constructor(game) {
		this.game = game;
		this.scroll = 0;
		this.t = 0;
		this.ballY = 0;
		this.ballVy = 0;
		this.hold = 0;
	}
	open() {
		this.game.state = "credits";
		this.scroll = this.game.h * 0.42;
		this.t = 0;
		this.ballY = 0;
		this.ballVy = -420;
		this.hold = 0;
		this.game.buildCreditsButtons();
	}
	lines() {
		const g = this.game;
		return [
			{ text: g.t("title"), size: 52, color: "#4c9f38", gap: 18 },
			{ text: g.t("subtitle"), size: 22, color: "#95d5b2", gap: 48 },
			{ text: g.t("odsTitle"), size: 24, color: "#f4f1e8", gap: 12 },
			{ text: g.t("odsBlurb"), size: 16, color: "#d8f3dc", gap: 28, wrap: true },
			{ text: g.t("creditsOds"), size: 14, color: "#b7c4b0", gap: 56 },
			{ text: g.t("creditsDesign"), size: 14, color: "#95d5b2", gap: 10 },
			{ text: g.t("madeBy"), size: 30, color: "#f4f1e8", gap: 12 },
			{ text: g.t("felipeBio"), size: 16, color: "#b7c4b0", gap: 40, wrap: true },
			{ text: g.t("creditsMusic"), size: 14, color: "#95d5b2", gap: 10 },
			{ text: "music.mp3", size: 16, color: "#f4f1e8", gap: 48 },
			{ text: g.t("creditsThanks"), size: 18, color: "#95d5b2", gap: 80 }
		];
	}
	update(dt) {
		this.t += dt;
		const max = this.game.h * .55 + 520;
		if (this.scroll < max) this.scroll += 46 * dt;
		else {
			this.hold += dt;
			this.ballVy += 900 * dt;
			this.ballY += this.ballVy * dt;
			if (this.ballY > 40) {
				this.ballY = 40;
				this.ballVy *= -.62;
				if (Math.abs(this.ballVy) < 80) this.ballVy = 0;
			}
		}
	}
	draw(ctx, w, h) {
		ctx.fillStyle = "#14281d";
		ctx.fillRect(0, 0, w, h);
		const eg = ctx.createRadialGradient(w / 2, h * .4, 20, w / 2, h * .4, w * .7);
		eg.addColorStop(0, "rgba(76,159,56,0.18)");
		eg.addColorStop(1, "rgba(20,40,29,0)");
		ctx.fillStyle = eg;
		ctx.fillRect(0, 0, w, h);
		ctx.save();
		let y = h - this.scroll;
		for (const line of this.lines()) {
			ctx.fillStyle = line.color;
			ctx.font = `800 ${line.size}px ${FONT}`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			if (line.wrap) {
				const words = line.text.split(" ");
				let row = "";
				const maxW = Math.min(420, w - 48);
				for (const word of words) {
					const test = row ? row + " " + word : word;
					if (ctx.measureText(test).width > maxW) {
						ctx.fillText(row, w / 2, y);
						y += line.size + 6;
						row = word;
					} else row = test;
				}
				if (row) {
					ctx.fillText(row, w / 2, y);
					y += line.gap;
				}
			} else {
				ctx.fillText(line.text, w / 2, y);
				y += line.gap + line.size;
			}
		}
		ctx.restore();
	}

};
class Game {
	constructor(canvas, hooks = {}) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.hooks = hooks;
		this.w = 0;
		this.h = 0;
		this.data = SaveSystem.load();
		this.lang = this.data.options.lang || "es";
		this.i18n = I18N[this.lang] || I18N.es;
		this.state = "menu";
		this.input = new InputManager(canvas);
		this.camera = new Camera();
		this.belt = new Belt();
		this.belt2 = new Belt();
		this.bg = new Background();
		this.effects = new EffectManager();
		this.hud = new HUD();
		this.store = new Store(this);
		this.achievements = new AchievementManager(this.data);
		this.sound = new SoundManager();
		this.sound.enabled = this.data.options.sound !== false;
		this.sound.setVolume(typeof this.data.options.volume === "number" ? this.data.options.volume : .7);
		this.credits = new CreditsRoll(this);
		this.foods = [];
		this.particles = new ObjectPool(() => new Particle(), 200);
		this.coins = new ObjectPool(() => new Coin(), 40);
		this.floatTexts = new ObjectPool(() => new FloatText(), 20);
		this.activeParticles = [];
		this.activeCoins = [];
		this.activeTexts = [];
		this.score = 0;
		this.combo = 0;
		this.comboTimer = 0;
		this.lives = 3;
		this.level = 1;
		this.timeAlive = 0;
		this.spawnTimer = 0;
		this.speedMult = 1;
		this.sessionSmashed = 0;
		this.sessionAvoided = 0;
		this.sessionBestCombo = 0;
		this.shieldTimer = 0;
		this.pendingRecord = null;
		this.fps = 60;
		this.frames = 0;
		this.fpsTimer = 0;
		this.menuButtons = [];
		this.gameOverButtons = [];
		this.running = true;
		this.last = 0;
		this._onResize = () => this.resize();
		this._onVis = () => {
			if (document.visibilityState === "visible") this.sound.unlock();
			else SaveSystem.save(this.data);
		};
		this._onKey = (e) => {
			var isEsc = e.code === "Escape" || e.key === "Escape" || e.keyCode === 27 || e.which === 27;
			if (isEsc && this.state === "play") {
				this.state = "pause";
				this.buildPause();
			} else if (isEsc && this.state === "pause") this.state = "play";
		};
		window.addEventListener("resize", this._onResize);
		document.addEventListener("visibilitychange", this._onVis);
		window.addEventListener("keydown", this._onKey);
		var unlockOnce = (ev) => {
			this.sound.unlock();
			canvas.removeEventListener("pointerdown", unlockOnce, false);
			canvas.removeEventListener("mousedown", unlockOnce, false);
			canvas.removeEventListener("touchstart", unlockOnce, false);
		};
		canvas.addEventListener("pointerdown", unlockOnce, false);
		canvas.addEventListener("mousedown", unlockOnce, false);
		canvas.addEventListener("touchstart", unlockOnce, false);
		this.resize();
		if (!this.data.theme) this.data.theme = "pv";
		if (!this.data.ownedThemes) this.data.ownedThemes = ["pv", "default"];
		this.applyTheme();
		this.sound.musicEnabled = this.data.options.music !== false;
		this.sound.sfxEnabled = this.data.options.sfx !== false && this.data.options.sound !== false;
		this.buildMenu();
		this.raf = requestAnimationFrame((t) => this.loop(t));
	}
	t(key) {
		return this.i18n[key] || I18N.es[key] || key;
	}
	setLang(lang) {
		this.lang = lang;
		this.data.options.lang = lang;
		SaveSystem.save(this.data);
		this.i18n = I18N[lang] || I18N.es;
		this.rebuildUI();
	}
	getLang() {
		return this.lang;
	}
	rebuildUI() {
		if (this.state === "menu") this.buildMenu();
		else if (this.state === "options") this.buildOptions();
		else if (this.state === "store") this.store.buildButtons();
		else if (this.state === "gameover") this.buildGameOver();
		else if (this.state === "pause") this.buildPause();
		else if (this.state === "howto" || this.state === "records" || this.state === "stats" || this.state === "credits") this.buildBackOnly();
	}
	resize() {
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		this.w = window.innerWidth;
		this.h = window.innerHeight;
		this.canvas.width = this.w * dpr;
		this.canvas.height = this.h * dpr;
		this.canvas.style.width = this.w + "px";
		this.canvas.style.height = this.h + "px";
		this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		this.input.scaleX = 1;
		this.input.scaleY = 1;
		this.rebuildUI();
	}
	btnW() {
		return Math.min(240, this.w - 48);
	}
	buildMenu() {
		const w = this.w, h = this.h;
		const bw = this.btnW();
		const labels = [
			["play", "#4c9f38", () => this.startGame()],
			["vs", "#e85d04", () => this.startVS()],
			["store", "#2d6a4f", () => this.store.open()],
			["cosmetics", "#c1121f", () => { this.state = "cosmetics"; this.store.openCosmetics(); }],
			["themes", "#457b9d", () => { this.store.openThemes(); }],
			["records", "#40916c", () => { this.state = "records"; this.buildBackOnly(); }],
			["stats", "#2a9d8f", () => { this.state = "stats"; this.buildBackOnly(); }],
			["howTo", "#1b4332", () => { this.state = "howto"; this.buildBackOnly(); }],
			["options", "#14281d", () => { this.state = "options"; this.buildOptions(); }]
		];
		const startY = Math.min(h * .28, h - labels.length * 44 - 16);
		const gap = Math.min(44, Math.max(34, (h - startY - 16) / labels.length));
		this.menuButtons = labels.map(([key, color, onClick], i) => new Button(w / 2 - bw / 2, startY + i * gap, bw, Math.min(40, gap - 4), this.t(key), {
			color,
			onClick
		}));
	}

	applyTheme() {
		const th = THEMES[this.data.theme] || THEMES.pv || THEMES.default;
		if (!th) return;
		const c = th.colors;
		this.data.colors.bg = c.bg;
		this.data.colors.belt = c.belt;
		this.data.colors.hud = c.hud;
		this.data.colors.particles = c.particles;
		this.data.colors.juice = c.juice;
		if (c.accent) this.data.colors.leaves = c.accent;
		if (th.logo && !this.pvLogo) {
			this.pvLogo = new Image();
			this.pvLogo.src = "pv-logo.jpg";
			this.pvLogo.onerror = () => { this.pvLogo.src = "https://colegiopalavraviva.com.br/wp-content/uploads/2019/02/logo_twitter.jpg"; };
		}
	}
	buildThemes() {
		const w = this.w, h = this.h;
		const bw = this.btnW();
		const keys = Object.keys(THEMES);
		const startY = h * .18;
		const gap = Math.min(48, Math.max(36, (h * .7) / (keys.length + 1)));
		this.menuButtons = keys.map((id, i) => {
			const th = THEMES[id];
			const owned = th.free || (this.data.ownedThemes || []).includes(id);
			const active = this.data.theme === id;
			let label = this.t(th.nameKey);
			if (th.free) label += " · " + this.t("free");
			else if (!owned) label += " · " + th.cost + "💰";
			else if (active) label += " · " + this.t("activeTheme");
			return new Button(w / 2 - bw / 2, startY + i * gap, bw, Math.min(42, gap - 4), label, {
				color: active ? "#4c9f38" : (owned ? "#2a9d8f" : "#1b4332"),
				onClick: () => {
					if (!owned) {
						if (this.data.coins >= th.cost) {
							this.data.coins -= th.cost;
							if (!this.data.ownedThemes) this.data.ownedThemes = ["pv", "default"];
							this.data.ownedThemes.push(id);
							this.data.theme = id;
							this.applyTheme();
							SaveSystem.save(this.data);
							this.sound.coin();
						} else this.sound.miss();
					} else {
						this.data.theme = id;
						this.applyTheme();
						SaveSystem.save(this.data);
						this.sound.ui();
					}
					this.buildThemes();
				}
			});
		});
		this.menuButtons.push(new Button(w / 2 - bw / 2, startY + keys.length * gap + 8, bw, 42, this.t("back"), {
			color: "#14281d",
			onClick: () => { this.state = "menu"; this.buildMenu(); }
		}));
	}
	getDailyChallenges() {
		const today = new Date().toISOString().slice(0, 10);
		if (this.data.dailyDate === today && Array.isArray(this.data.dailyIds) && this.data.dailyIds.length === 3) {
			return this.data.dailyIds.map(id => CHALLENGES.find(c => c.id === id)).filter(Boolean);
		}
		// deterministic random from date
		let seed = 0;
		for (let i = 0; i < today.length; i++) seed = (seed * 31 + today.charCodeAt(i)) >>> 0;
		const indices = [];
		const avail = CHALLENGES.map((_, i) => i);
		for (let n = 0; n < 3 && avail.length; n++) {
			seed = (seed * 1103515245 + 12345) >>> 0;
			const idx = seed % avail.length;
			indices.push(avail[idx]);
			avail.splice(idx, 1);
		}
		this.data.dailyDate = today;
		this.data.dailyIds = indices.map(i => CHALLENGES[i].id);
		SaveSystem.save(this.data);
		return indices.map(i => CHALLENGES[i]);
	}
	buildChallenges() {
		const w = this.w, h = this.h;
		const bw = this.btnW();
		const daily = this.getDailyChallenges();
		const startY = h * .18;
		const gap = Math.min(56, Math.max(44, (h * .65) / (daily.length + 1)));
		this.menuButtons = daily.map((ch, i) => {
			const prog = (this.data.challenges && this.data.challenges[ch.id]) || 0;
			const done = (this.data.completedChallenges || []).includes(ch.id);
			const cur = Math.min(prog, ch.target);
			let label = this.t(ch.nameKey) + "  " + cur + "/" + ch.target;
			if (done) label += " ✓";
			return new Button(w / 2 - bw / 2, startY + i * gap, bw, Math.min(48, gap - 4), label, {
				color: done ? "#4c9f38" : "#9b5de5",
				onClick: () => this.sound.ui()
			});
		});
		this.menuButtons.push(new Button(w / 2 - bw / 2, startY + daily.length * gap + 12, bw, 42, this.t("back"), {
			color: "#14281d",
			onClick: () => { this.state = "menu"; this.buildMenu(); }
		}));
	}
	updateChallengeProgress() {
		if (!this.data.challenges) this.data.challenges = {};
		if (!this.data.completedChallenges) this.data.completedChallenges = [];
		const c = this.data.challenges;
		const map = {
			smashed: this.data.totalSmashed || 0,
			bestCombo: this.data.bestCombo || 0,
			perfect: c.perfect || 0,
			speedScore: c.speed || 0,
			avoided: this.data.totalAvoided || 0,
			highScore: this.data.highScore || 0,
			gamesPlayed: this.data.gamesPlayed || 0,
			coinsEarned: this.data.coinsEarned || 0
		};
		for (const ch of CHALLENGES) {
			const val = map[ch.track] != null ? map[ch.track] : (c[ch.id] || 0);
			c[ch.id] = Math.max(c[ch.id] || 0, val);
		}
		// keep legacy keys
		c.fruit_master = Math.max(c.fruit_master || 0, this.data.totalSmashed || 0);
		c.healthy = Math.max(c.healthy || 0, this.data.totalSmashed || 0);
		c.combo_king = Math.max(c.combo_king || 0, this.data.bestCombo || 0);
		for (const ch of CHALLENGES) {
			if (this.data.completedChallenges.includes(ch.id)) continue;
			const prog = c[ch.id] || 0;
			if (prog >= ch.target) {
				this.data.completedChallenges.push(ch.id);
				this.data.coins += ch.reward;
				this.data.coinsEarned = (this.data.coinsEarned || 0) + ch.reward;
				this.spawnFloat(this.w / 2, this.h * .4, this.t("challenge_complete"), "#ffe066", 1.4);
				this.sound.jackpot();
			}
		}
	}
	buildOptions() {
		const w = this.w, h = this.h;
		const bw = this.btnW();
		const o = this.data.options;
		if (typeof o.volume !== "number") o.volume = .7;
		const volPct = Math.round(o.volume * 100);
		const y = h * .22;
		const gap = 50;
		this.menuButtons = [
			new Button(w / 2 - bw / 2, y, bw, 44, `${this.t("music")}: ${o.music !== false ? this.t("on") : this.t("off")}`, {
				color: "#2a9d8f",
				onClick: () => {
					o.music = o.music === false ? true : false;
					this.sound.musicEnabled = o.music !== false;
					if (o.music !== false) this.sound.startMusic();
					else this.sound.stopMusic();
					SaveSystem.save(this.data);
					this.buildOptions();
				}
			}),
			new Button(w / 2 - bw / 2, y + gap * 0.85, bw, 44, `${this.t("sfx")}: ${o.sfx !== false ? this.t("on") : this.t("off")}`, {
				color: "#457b9d",
				onClick: () => {
					o.sfx = o.sfx === false ? true : false;
					o.sound = o.sfx !== false;
					this.sound.sfxEnabled = o.sfx !== false;
					this.sound.enabled = o.sfx !== false;
					SaveSystem.save(this.data);
					this.buildOptions();
				}
			}),
			new Button(w / 2 - bw / 2, y + gap, bw * 0.48, 44, `${this.t("volume")} -`, {
				color: "#457b9d",
				onClick: () => {
					o.volume = Math.max(0, Math.round((o.volume - 0.1) * 10) / 10);
					this.sound.setVolume(o.volume);
					if (o.sound && o.volume > 0) this.sound.startMusic();
					SaveSystem.save(this.data);
					this.buildOptions();
				}
			}),
			new Button(w / 2 + bw * 0.02, y + gap, bw * 0.48, 44, `${this.t("volume")} +`, {
				color: "#457b9d",
				onClick: () => {
					o.volume = Math.min(1, Math.round((o.volume + 0.1) * 10) / 10);
					this.sound.setVolume(o.volume);
					if (o.sound && o.volume > 0) this.sound.startMusic();
					SaveSystem.save(this.data);
					this.buildOptions();
				}
			}),
			new Button(w / 2 - bw / 2, y + gap * 2, bw, 44, `${this.t("volume")}: ${volPct}%`, {
				color: "#1b4332",
				onClick: () => {}
			}),
			new Button(w / 2 - bw / 2, y + gap * 3, bw, 44, `${this.t("shake")}: ${o.shake ? this.t("on") : this.t("off")}`, {
				color: "#2a9d8f",
				onClick: () => {
					o.shake = !o.shake;
					SaveSystem.save(this.data);
					this.buildOptions();
				}
			}),
			new Button(w / 2 - bw / 2, y + gap * 4, bw, 44, `${this.t("particles")}: ${o.particles ? this.t("on") : this.t("off")}`, {
				color: "#2a9d8f",
				onClick: () => {
					o.particles = !o.particles;
					SaveSystem.save(this.data);
					this.buildOptions();
				}
			}),
			new Button(w / 2 - bw / 2, y + gap * 5, bw, 44, `${this.t("showFPS")}: ${o.showFPS ? this.t("on") : this.t("off")}`, {
				color: "#2a9d8f",
				onClick: () => {
					o.showFPS = !o.showFPS;
					SaveSystem.save(this.data);
					this.buildOptions();
				}
			}),
			new Button(w / 2 - bw / 2, y + gap * 5.7, bw, 40, this.t("exportSave") || "Exportar código", {
				color: "#9b5de5",
				onClick: () => {
					const code = SaveSystem.exportCode(this.data);
					if (!code) return;
					if (navigator.clipboard && navigator.clipboard.writeText) {
						navigator.clipboard.writeText(code).then(() => {
							this.spawnFloat(this.w/2, this.h*0.5, this.t("cloudCopied") || "¡Código copiado!", "#ffe066", 1.3);
						}).catch(() => { prompt(this.t("exportSave"), code); });
					} else {
						prompt(this.t("exportSave"), code);
					}
					this.sound.ui();
				}
			}),
			new Button(w / 2 - bw / 2, y + gap * 6.5, bw, 40, this.t("importSave") || "Importar código", {
				color: "#7b2cbf",
				onClick: () => {
					const code = prompt(this.t("importSave") || "Importar código");
					if (!code) return;
					const loaded = SaveSystem.importCode(code);
					if (loaded) {
						this.data = loaded;
						SaveSystem.save(this.data);
						this.applyTheme();
						this.sound.jackpot();
						this.spawnFloat(this.w/2, this.h*0.5, this.t("cloudLoaded") || "¡Partida cargada!", "#4c9f38", 1.3);
						this.buildOptions();
					} else {
						this.sound.miss();
						this.spawnFloat(this.w/2, this.h*0.5, this.t("cloudFail") || "Código inválido", "#e63946", 1.2);
					}
				}
			}),
			new Button(w / 2 - bw / 2, y + gap * 7.4, bw, 44, this.t("back"), {
				color: "#4c9f38",
				onClick: () => {
					this.state = "menu";
					this.buildMenu();
				}
			})
		];
	}
	buildBackOnly() {
		const w = this.w, h = this.h;
		this.menuButtons = [new Button(w / 2 - 70, h - 70, 140, 44, this.t("back"), {
			color: "#4c9f38",
			onClick: () => {
				this.state = "menu";
				this.buildMenu();
			}
		})];
	}
	buildCreditsButtons() {
		this.buildBackOnly();
	}
	buildPause() {
		const w = this.w, h = this.h;
		const bw = this.btnW();
		this.menuButtons = [new Button(w / 2 - bw / 2, h * .42, bw, 50, this.t("resume"), {
			color: "#4c9f38",
			onClick: () => {
				this.state = "play";
			}
		}), new Button(w / 2 - bw / 2, h * .42 + 60, bw, 46, this.t("menu"), {
			color: "#2a9d8f",
			onClick: () => {
				this.state = "menu";
				this.buildMenu();
			}
		})];
	}
	buildGameOver() {
		const w = this.w, h = this.h;
		const bw = this.btnW();
		this.gameOverButtons = [new Button(w / 2 - bw / 2, h * .62, bw, 50, this.t("retry"), {
			color: "#4c9f38",
			onClick: () => this.startGame()
		}), new Button(w / 2 - bw / 2, h * .62 + 58, bw, 46, this.t("menu"), {
			color: "#2a9d8f",
			onClick: () => {
				this.state = "menu";
				this.buildMenu();
			}
		})];
	}
	startGame() {
		this.state = "play";
		this.score = 0;
		this.combo = 0;
		this.comboTimer = 0;
		this.lives = 3 + (this.data.upgrades.lives || 0);
		this.startLives = this.lives;
		this.level = 1;
		this.timeAlive = 0;
		this.spawnTimer = 0.6;
		this.speedMult = 1;
		this.sessionSmashed = 0;
		this.sessionAvoided = 0;
		this.sessionBestCombo = 0;
		this.shieldTimer = 0;
		this.eventTimer = 0;
		this.activeEvent = null;
		this.eventDuration = 0;
		this.doublePoints = 1;
		this.levelAnnounce = 1.2;
		this.belt.speed = 1;
		this.belt.frozen = 0;
		this.belt.boost = 0;
		this.foods = [];
		this.clearPools();
		this.applyTheme();
		this.sound.unlock();
		this.sound.startMusic();
	}
	startVS() {
		this.state = "vs_intro";
		this.vsIntroT = 0;
		this.vsWinner = null;
		this.vsDuration = 60;
		this.vsTimeLeft = 60;
		this.p1Lives = 3 + (this.data.upgrades.lives || 0);
		this.p2Lives = 3 + (this.data.upgrades.lives || 0);
		this.p1Score = 0;
		this.p2Score = 0;
		this.p1Combo = 0;
		this.p2Combo = 0;
		this.p1BestCombo = 0;
		this.p2BestCombo = 0;
		this.vsAI = false;
		this.foods = [];
		this.clearPools();
		this.belt.speed = 1;
		this.belt2.speed = 1;
		this.belt.frozen = 0;
		this.belt2.frozen = 0;
		this.belt.offset = 0;
		this.belt2.offset = 0;
		this.spawnTimer = 0.35;
		this.speedMult = 1;
		this.timeAlive = 0;
		this.applyTheme();
		this.sound.unlock();
		this.sound.startMusic();
		this.menuButtons = [];
		this.gameOverButtons = [];
	}
	finishVS(winner) {
		this.vsWinner = winner;
		this.state = "vs_result";
		this.buildVSResult();
		this.sound.ui();
	}
	buildVSResult() {
		const w = this.w, h = this.h;
		const bw = this.btnW();
		this.gameOverButtons = [
			new Button(w / 2 - bw / 2, h * .58, bw, 48, this.t("vsAgain"), {
				color: "#e85d04",
				onClick: () => this.startVS()
			}),
			new Button(w / 2 - bw / 2, h * .58 + 56, bw, 44, this.t("menu"), {
				color: "#2a9d8f",
				onClick: () => {
					this.state = "menu";
					this.buildMenu();
				}
			})
		];
	}
	spawnVSFood(side) {
		const type = chance(.12 + Math.min(1, this.timeAlive / 80) * .2) ? this.pickType(JUNK_KEYS) : this.pickType(HEALTHY_KEYS);
		const beltW = Math.min(this.w * .32, 220);
		const cx = side === 1 ? this.w * 0.28 : this.w * 0.72;
		const x = cx + rand(-beltW / 2 + 20, beltW / 2 - 20);
		const y = this.h * .22;
		const food = new Food();
		food.spawn(x, y, type, this.speedMult);
		food.side = side;
		this.foods.push(food);
	}

	clearPools() {
		for (const p of this.activeParticles) this.particles.release(p);
		for (const c of this.activeCoins) this.coins.release(c);
		for (const t of this.activeTexts) this.floatTexts.release(t);
		this.activeParticles = [];
		this.activeCoins = [];
		this.activeTexts = [];
	}
	pickType(keys) {
		const difficulty = Math.min(1, this.timeAlive / 120);
		const r = Math.random();
		let acc = 0;
		const weighted = keys.map((k) => {
			let rar = FOOD_TYPES[k].rarity;
			if (k !== "tomato") rar *= .35 + difficulty * .9;
			return {
				k,
				rar
			};
		});
		const sum = weighted.reduce((s, x) => s + x.rar, 0);
		for (const x of weighted) {
			acc += x.rar / sum;
			if (r < acc) return x.k;
		}
		return keys[0];
	}
	spawnCountForLevel() {
		// nivel 1-2 → 1, cada 2 niveles +1
		return 1 + Math.floor(Math.max(0, (this.level || 1) - 1) / 2);
	}
	spawnFood() {
		const type = chance(.1 + Math.min(1, this.timeAlive / 90) * .22) ? this.pickType(JUNK_KEYS) : this.pickType(HEALTHY_KEYS);
		const beltW = Math.min(this.w * .65, 480);
		const x = this.w / 2 + rand(-beltW / 2 + 30, beltW / 2 - 30);
		const y = this.h * .22;
		const food = new Food();
		food.spawn(x, y, type, this.speedMult);
		this.foods.push(food);
	}
	spawnWave() {
		const n = this.spawnCountForLevel();
		for (let i = 0; i < n; i++) this.spawnFood();
	}
	triggerLevelEvent() {
		const available = LEVEL_EVENTS.filter((e) => this.level >= e.minLevel);
		if (!available.length) return;
		const ev = available[Math.floor(Math.random() * available.length)];
		this.activeEvent = ev.id;
		this.eventDuration = 8 + Math.min(6, this.level);
		this.doublePoints = ev.id === "double_points" ? 2 : 1;
		if (ev.id === "freeze_time") this.belt.frozen = this.eventDuration;
		if (ev.id === "golden_rush") {
			for (let i = 0; i < 2; i++) this.spawnFood();
		}
		this.spawnFloat(this.w / 2, this.h * 0.32, this.t(ev.key) || ev.id, "#ffe066", 1.6);
		this.sound.powerup();
		this.effects.addFlash(0.2, "255,214,10");
	}
	smashFood(f) {
		f.hit();
		if (f.hp > 0) {
			this.spawnHitParticles(f.x, f.y, 8);
			this.sound.smash();
			return;
		}
		const def = FOOD_TYPES[f.type];
		if (def.kind === "junk") {
			if (this.shieldTimer > 0) {
				this.shieldTimer = 0;
				this.spawnFloat(f.x, f.y, this.t("shield"), "#4cc9f0");
				this.sound.ui();
				return;
			}
			this.lives--;
			this.combo = 0;
			this.camera.addShake(16);
			this.effects.addFlash(.45, "230,57,70");
			this.effects.addHitStop(.07);
			this.spawnExplosion(f.x, f.y, "#e63946");
			this.spawnFloat(f.x, f.y, this.t("junkHit"), "#e63946", 1.2);
			this.sound.junk();
			if (this.lives <= 0 && this.state === "play") this.gameOver();
			return;
		}
		this.combo++;
		this.comboTimer = 1.4;
		this.hud.comboPulse = .3;
		this.sessionBestCombo = Math.max(this.sessionBestCombo, this.combo);
		const mult = 1 + Math.floor(this.combo / 3) * (1 + (this.data.upgrades.comboBonus || 0) * .1);
		let pts = def.score * mult;
		if (this.doublePoints > 1) pts *= this.doublePoints;
		if (this.activeEvent === "mega_combo") this.combo += 1;
		let isCrit = chance(.08 + (this.data.upgrades.critChance || 0) * .04);
		if (isCrit) {
			pts *= 2;
			this.spawnFloat(f.x, f.y - 28, this.t("critical"), "#ffe066", 1.4);
			this.camera.addShake(10);
			this.effects.addFlash(.15, "255,224,102");
			this.sound.crit();
		}
		this.score += pts | 0;
		this.spawnFloat(f.x, f.y - 8, "+" + (pts | 0), isCrit ? "#ffe066" : "#95d5b2", isCrit ? 1.2 : 1);
		this.data.totalSmashed++;
		this.sessionSmashed++;
		this.data.bestCombo = Math.max(this.data.bestCombo, this.combo);
		if (!this.data.unlocked.includes(f.type)) this.data.unlocked.push(f.type);
		if (def.special === "freeze") {
			this.belt.frozen = 2.5;
			this.spawnFloat(f.x, f.y, this.t("freeze"), "#90e0ef");
			this.sound.powerup();
		}
		if (def.special === "boost") {
			this.belt.boost = 3;
			this.spawnFloat(f.x, f.y, this.t("speed"), "#f77f00");
		}
		if (def.special === "jackpot") this.spawnFloat(f.x, f.y, this.t("jackpot"), "#ffe066", 1.5);
		if (def.special === "heal") {
			this.lives++;
			this.spawnFloat(f.x, f.y, this.t("heal"), "#4cc9f0", 1.3);
			this.sound.heal();
		}
		if (def.special === "shield") {
			this.shieldTimer = 6 + (this.data.upgrades.shield || 0);
			this.spawnFloat(f.x, f.y, this.t("shield"), "#4cc9f0");
			this.sound.powerup();
		}
		if (def.special === "combo") {
			this.combo += 3;
			this.spawnFloat(f.x, f.y, this.t("comboBoost"), "#95d5b2", 1.3);
			this.effects.addFlash(.12, "149,213,178");
			this.sound.powerup();
		}
		this.spawnFloat(f.x, f.y, this.t("splat"), this.data.colors.juice || "#e63946");
		this.spawnSmashParticles(f);
		this.spawnCoins(f.x, f.y, Math.max(1, Math.floor(def.coins * (2 + (this.data.upgrades.coinMult || 0) * .35))));
		if (this.data.options.shake) this.camera.addShake(6 + this.combo * .25);
		this.effects.addHitStop(.03);
		this.effects.addFlash(.1);
		this.sound.smash();
		if (this.combo > 1) this.sound.combo(this.combo);
		this.achievements.check();
	}
	spawnSmashParticles(t) {
		if (!this.data.options.particles) return;
		const col = this.data.colors.juice || "#e63946";
		const extra = (this.data.upgrades.particles || 0) * 4;
		for (let i = 0; i < 16 + extra; i++) {
			const p = this.particles.get();
			const a = rand(0, Math.PI * 2), sp = rand(80, 320);
			p.spawn(t.x, t.y, {
				vx: Math.cos(a) * sp,
				vy: Math.sin(a) * sp - rand(50, 150),
				size: rand(3, 9),
				color: col,
				life: rand(.4, .9),
				gravity: 400,
				type: "circle"
			});
			this.activeParticles.push(p);
		}
		for (let i = 0; i < 7; i++) {
			const p = this.particles.get();
			const a = rand(0, Math.PI * 2), sp = rand(60, 180);
			p.spawn(t.x, t.y, {
				vx: Math.cos(a) * sp,
				vy: Math.sin(a) * sp - 80,
				size: rand(2, 5),
				color: "#ffe566",
				life: rand(.5, 1),
				gravity: 200,
				type: "seed",
				spin: rand(-8, 8)
			});
			this.activeParticles.push(p);
		}
	}
	spawnHitParticles(x, y, n) {
		if (!this.data.options.particles) return;
		for (let i = 0; i < n; i++) {
			const p = this.particles.get();
			p.spawn(x, y, {
				vx: rand(-100, 100),
				vy: rand(-120, -40),
				size: rand(2, 5),
				color: "#fff",
				life: .3,
				gravity: 200
			});
			this.activeParticles.push(p);
		}
	}
	spawnExplosion(x, y, col) {
		for (let i = 0; i < 28; i++) {
			const p = this.particles.get();
			const a = rand(0, Math.PI * 2), sp = rand(100, 400);
			p.spawn(x, y, {
				vx: Math.cos(a) * sp,
				vy: Math.sin(a) * sp,
				size: rand(4, 12),
				color: col,
				life: rand(.4, .8),
				gravity: 100,
				type: chance(.3) ? "spark" : "circle",
				stretch: 2
			});
			this.activeParticles.push(p);
		}
	}
	spawnCoins(x, y, n) {
		const tx = 160, ty = 40;
		for (let i = 0; i < n; i++) {
			const c = this.coins.get();
			c.spawn(x + rand(-10, 10), y + rand(-10, 10), tx, ty, 1);
			this.activeCoins.push(c);
		}
	}
	spawnFloat(x, y, text, color, scale = 1) {
		const f = this.floatTexts.get();
		f.spawn(x, y, text, color, scale);
		this.activeTexts.push(f);
	}
	gameOver() {
		this.state = "gameover";
		this.data.highScore = Math.max(this.data.highScore, this.score);
		this.data.totalTime += this.timeAlive;
		this.data.gamesPlayed = (this.data.gamesPlayed || 0) + 1;
		this.data.totalScore = (this.data.totalScore || 0) + this.score;
		this.data.maxLevel = Math.max(this.data.maxLevel || 1, this.level);
		if (this.startLives && this.lives === this.startLives) {
			this.data.challenges = this.data.challenges || {};
			this.data.challenges.perfect = (this.data.challenges.perfect || 0) + 1;
		}
		if (this.timeAlive <= 60 && this.score >= 500) {
			this.data.challenges = this.data.challenges || {};
			this.data.challenges.speed = Math.max(this.data.challenges.speed || 0, this.score);
		}
		SaveSystem.save(this.data);
		this.buildGameOver();
		this.pendingRecord = {
			score: this.score,
			combo: this.sessionBestCombo,
			level: this.level,
			time: this.timeAlive | 0,
			smashed: this.sessionSmashed,
			avoided: this.sessionAvoided,
			date: Date.now()
		};
		if (this.hooks.promptName && this.score > 0) {
			try {
				var self = this;
				var p = this.hooks.promptName(this.pendingRecord);
				if (p && typeof p.then === "function") {
					p.then(function (name) {
						if (name) self.saveRecord(name);
					}).catch(function () {});
				}
			} catch (e) {}
		}
	}
	saveRecord(name) {
		if (!this.pendingRecord) return;
		const rec = Object.assign({}, this.pendingRecord, {
			name: String(name).trim().slice(0, 16) || "Player"
		});
		this.data.records = (this.data.records || []).concat([rec]).sort((a, b) => b.score - a.score).slice(0, 12);
		SaveSystem.save(this.data);
		this.pendingRecord = null;
	}
	update(dt) {
		this.frames++;
		this.fpsTimer += dt;
		if (this.fpsTimer >= 1) {
			this.fps = this.frames;
			this.frames = 0;
			this.fpsTimer = 0;
		}
		this.camera.update(dt);
		this.effects.update(dt);
		this.achievements.update(dt);
		this.bg.update(dt);
	
		if (this.state === "vs_intro") {
			this.vsIntroT += dt;
			if (this.vsIntroT > 1.6) this.state = "vs_play";
			return;
		}
		if (this.state === "vs_result") {
			const clicked = this.input.consumeClick();
			for (const b of this.gameOverButtons) b.update(this.input.x, this.input.y, clicked);
			return;
		}
		if (this.state === "vs_play") {
			this.updateVS(dt);
			return;
		}
	if (this.state === "credits") {
			this.credits.update(dt);
			const clicked = this.input.consumeClick();
			for (const b of this.menuButtons) b.update(this.input.x, this.input.y, clicked);
			return;
		}
		if (this.state === "menu" || this.state === "vs_menu" || this.state === "options" || this.state === "howto" || this.state === "records" || this.state === "stats" || this.state === "pause" || this.state === "cosmetics") {
			const clicked = this.input.consumeClick();
			if (clicked) this.sound.ui();
			for (const b of this.menuButtons) b.update(this.input.x, this.input.y, clicked);
			return;
		}
		if (this.state === "store") {
			this.store.update(this.input);
			return;
		}
		if (this.state === "gameover") {
			const clicked = this.input.consumeClick();
			for (const b of this.gameOverButtons) b.update(this.input.x, this.input.y, clicked);
			return;
		}
		if (this.effects.hitStop > 0) return;
		this.timeAlive += dt;
		const prevLevel = this.level;
		this.level = 1 + Math.floor(this.timeAlive / 22);
		if (this.levelAnnounce > 0) this.levelAnnounce -= dt;
		if (this.level > prevLevel) {
			this.sound.levelUp();
			this.levelAnnounce = 1.4;
			this.spawnFloat(this.w / 2, this.h * 0.28, `${this.t("level")} ${this.level}`, "#ffd60a", 1.5);
			this.camera.addShake(8);
			this.data.maxLevel = Math.max(this.data.maxLevel || 1, this.level);
			if (this.level % 3 === 0) this.triggerLevelEvent();
		}
		if (this.eventDuration > 0) {
			this.eventDuration -= dt;
			if (this.eventDuration <= 0) {
				this.activeEvent = null;
				this.doublePoints = 1;
				this.belt.frozen = Math.max(0, this.belt.frozen);
			}
		}
		this.speedMult = 1 + this.timeAlive * .014 + this.level * .02;
		this.belt.speed = this.speedMult * (this.data.upgrades.slowmo ? .85 : 1);
		if (this.activeEvent === "freeze_time") this.belt.speed *= 0.35;
		this.belt.update(dt);
		if (this.shieldTimer > 0) this.shieldTimer -= dt;
		this.spawnTimer -= dt;
		if (this.spawnTimer <= 0) {
			this.spawnWave();
			const base = 1.8 - Math.min(0.7, this.timeAlive * .005) - this.level * .03;
			this.spawnTimer = Math.max(0.85, base * (0.9 + Math.random() * 0.35));
			if (this.activeEvent === "fruit_rain") {
				this.spawnWave();
				this.spawnTimer *= 0.65;
			}
		}
		this.comboTimer -= dt;
		if (this.comboTimer <= 0) this.combo = 0;
		for (let i = this.foods.length - 1; i >= 0; i--) {
			const f = this.foods[i];
			f.update(dt, this.belt.frozen > 0 ? .15 : 1);
			if (!f.active) {
				this.foods.splice(i, 1);
				continue;
			}
			if (f.y > this.h * .95 && f.state !== "smash") {
				if (f.kind === "junk") {
					this.sessionAvoided++;
					this.data.totalAvoided = (this.data.totalAvoided || 0) + 1;
					this.score += 8;
					this.spawnFloat(f.x, f.y - 20, this.t("avoidedMsg"), "#95d5b2");
					this.sound.ui();
					this.achievements.check();
				} else {
					this.lives--;
					this.camera.addShake(10);
					this.spawnFloat(f.x, f.y, this.t("miss"), "#e63946");
					this.sound.miss();
					if (this.lives <= 0 && this.state === "play") this.gameOver();
				}
				this.foods.splice(i, 1);
			}
		}
		if (this.input.consumeClick()) {
			if (this.input.x > this.w - 56 && this.input.y > this.h - 56) {
				this.state = "pause";
				this.buildPause();
			} else {
				this.data.totalClicks++;
				const radius = 12 + (this.data.upgrades.clickRadius || 0) * 6;
				for (let i = this.foods.length - 1; i >= 0; i--) {
					const f = this.foods[i];
					if (f.state === "smash") continue;
					if (f.contains(this.input.x, this.input.y, radius)) {
						this.smashFood(f);
						break;
					}
				}
			}
		}
		for (let i = this.activeParticles.length - 1; i >= 0; i--) {
			const p = this.activeParticles[i];
			p.update(dt);
			if (!p.active) {
				this.particles.release(p);
				this.activeParticles.splice(i, 1);
			}
		}
		const magnet = this.data.upgrades.magnet > 0;
		for (let i = this.activeCoins.length - 1; i >= 0; i--) {
			const c = this.activeCoins[i];
			c.update(dt, magnet);
			if (c.collected) {
				this.data.coins += c.value;
				this.sound.coin();
				this.coins.release(c);
				this.activeCoins.splice(i, 1);
			} else if (!c.active) {
				this.coins.release(c);
				this.activeCoins.splice(i, 1);
			}
		}
		for (let i = this.activeTexts.length - 1; i >= 0; i--) {
			const t = this.activeTexts[i];
			t.update(dt);
			if (!t.active) {
				this.floatTexts.release(t);
				this.activeTexts.splice(i, 1);
			}
		}
		this.hud.update(dt);
	}

	updateVS(dt) {
		this.timeAlive += dt;
		if (typeof this.vsTimeLeft === "number") {
			this.vsTimeLeft -= dt;
			if (this.vsTimeLeft <= 0) {
				const winner = this.p1Score >= this.p2Score ? 1 : 2;
				if (this.p1Score === this.p2Score) this.finishVS(0);
				else this.finishVS(winner);
				return;
			}
		}
		this.speedMult = 1 + Math.min(1.2, this.timeAlive / 90) * 0.7;
		this.belt.speed = this.speedMult * (this.data.upgrades.slowmo ? 0.85 : 1);
		this.belt2.speed = this.belt.speed;
		this.belt.update(dt);
		this.belt2.update(dt);
		this.bg.update(dt);
		this.effects.update(dt);
		this.spawnTimer -= dt;
		if (this.spawnTimer <= 0) {
			this.spawnVSFood(1);
			this.spawnVSFood(2);
			this.spawnTimer = Math.max(1.0, 1.6 - this.timeAlive * 0.006);
		}
		for (let i = this.foods.length - 1; i >= 0; i--) {
			const f = this.foods[i];
			const belt = f.side === 1 ? this.belt : this.belt2;
			f.update(dt, belt.frozen > 0 ? 0.15 : 1);
			if (!f.active) {
				this.foods.splice(i, 1);
				continue;
			}
			if (f.y > this.h * 0.95 && f.state !== "smash") {
				if (f.kind === "junk") {
					if (f.side === 1) this.p1Score += 8;
					else this.p2Score += 8;
					this.spawnFloat(f.x, f.y - 20, this.t("avoidedMsg"), "#95d5b2");
					this.sound.ui();
				} else {
					if (f.side === 1) {
						this.p1Lives--;
						if (this.p1Lives <= 0) { this.finishVS(2); return; }
					} else {
						this.p2Lives--;
						if (this.p2Lives <= 0) { this.finishVS(1); return; }
					}
					this.camera.addShake(8);
					this.spawnFloat(f.x, f.y, this.t("miss"), "#e63946");
					this.sound.miss();
				}
				this.foods.splice(i, 1);
			}
		}
		if (this.input.consumeClick()) {
			const radius = 14 + (this.data.upgrades.clickRadius || 0) * 6;
			const mx = this.input.x;
			// Left half = P1, right half = P2
			const side = mx < this.w * 0.5 ? 1 : 2;
			for (let i = this.foods.length - 1; i >= 0; i--) {
				const f = this.foods[i];
				if (f.state === "smash") continue;
				if (f.side !== side) continue;
				if (f.contains(mx, this.input.y, radius)) {
					this.smashVSFood(f);
					break;
				}
			}
		}
		for (let i = this.activeParticles.length - 1; i >= 0; i--) {
			const p = this.activeParticles[i];
			p.update(dt);
			if (!p.active) {
				this.particles.release(p);
				this.activeParticles.splice(i, 1);
			}
		}
		for (let i = this.activeTexts.length - 1; i >= 0; i--) {
			const t = this.activeTexts[i];
			t.update(dt);
			if (!t.active) {
				this.floatTexts.release(t);
				this.activeTexts.splice(i, 1);
			}
		}
	}
	smashVSFood(f) {
		f.hit();
		if (f.hp > 0) {
			this.spawnHitParticles(f.x, f.y, 8);
			this.sound.smash();
			return;
		}
		const def = FOOD_TYPES[f.type];
		if (def.kind === "junk") {
			if (f.side === 1) {
				this.p1Lives--;
				this.p1Combo = 0;
				if (this.p1Lives <= 0) this.finishVS(2);
			} else {
				this.p2Lives--;
				this.p2Combo = 0;
				if (this.p2Lives <= 0) this.finishVS(1);
			}
			this.camera.addShake(12);
			this.effects.addFlash(0.35, "230,57,70");
			this.spawnExplosion(f.x, f.y, "#e63946");
			this.spawnFloat(f.x, f.y, this.t("junkHit"), "#e63946", 1.1);
			this.sound.junk();
		} else {
			let pts = (def.score || 10);
			if (f.side === 1) {
				this.p1Combo = (this.p1Combo || 0) + 1;
				this.p1BestCombo = Math.max(this.p1BestCombo || 0, this.p1Combo);
				pts = Math.floor(pts * (1 + Math.min(this.p1Combo, 20) * 0.05));
				this.p1Score += pts;
			} else {
				this.p2Combo = (this.p2Combo || 0) + 1;
				this.p2BestCombo = Math.max(this.p2BestCombo || 0, this.p2Combo);
				pts = Math.floor(pts * (1 + Math.min(this.p2Combo, 20) * 0.05));
				this.p2Score += pts;
			}
			this.spawnHitParticles(f.x, f.y, 12 + (this.data.upgrades.particles || 0) * 3);
			this.spawnFloat(f.x, f.y, "+" + pts, "#4c9f38");
			this.sound.smash();
			if (def.effect === "heal") {
				if (f.side === 1) this.p1Lives = Math.min(5, this.p1Lives + 1);
				else this.p2Lives = Math.min(5, this.p2Lives + 1);
				this.spawnFloat(f.x, f.y - 24, this.t("heal"), "#90e0ef");
			}
		}
	}

	drawVS(ctx, w, h) {
		this.bg.draw(ctx, w, h, this.data.colors, (k) => this.t(k));
		ctx.fillStyle = "rgba(20,40,29,0.55)";
		ctx.fillRect(w * 0.5 - 3, h * 0.18, 6, h * 0.75);
		ctx.fillStyle = "#4c9f38";
		ctx.fillRect(w * 0.5 - 1.5, h * 0.18, 3, h * 0.75);
		const bw = Math.min(w * 0.34, 240);
		this.belt.draw(ctx, w, h, this.data.colors, { cx: w * 0.28, beltW: bw });
		this.belt2.draw(ctx, w, h, this.data.colors, { cx: w * 0.72, beltW: bw });
		for (const f of this.foods) f.draw(ctx, this.data.colors);
		for (const p of this.activeParticles) p.draw(ctx);
		for (const t of this.activeTexts) t.draw(ctx);
		this.effects.draw(ctx, w, h);
		ctx.save();
		ctx.fillStyle = "rgba(20,40,30,0.75)";
		roundRect(ctx, 10, 10, w * 0.38, 72, 12);
		ctx.fill();
		roundRect(ctx, w * 0.62 - 10, 10, w * 0.38, 72, 12);
		ctx.fill();
		// center timer
		const tl = Math.max(0, Math.ceil(this.vsTimeLeft || 0));
		ctx.fillStyle = "rgba(20,40,30,0.85)";
		roundRect(ctx, w / 2 - 36, 12, 72, 40, 12);
		ctx.fill();
		ctx.fillStyle = tl <= 10 ? "#e63946" : "#ffe066";
		ctx.font = `900 22px ${FONT}`;
		ctx.textAlign = "center";
		ctx.fillText(String(tl), w / 2, 38);
		// scores
		ctx.fillStyle = "#4c9f38";
		ctx.font = `800 14px ${FONT}`;
		ctx.textAlign = "left";
		ctx.fillText(this.t("p1"), 22, 28);
		ctx.fillStyle = "#f4f1e8";
		ctx.font = `900 20px ${FONT}`;
		ctx.fillText(String(this.p1Score || 0), 22, 50);
		ctx.font = `700 12px ${FONT}`;
		ctx.fillStyle = "#95d5b2";
		ctx.fillText("❤".repeat(Math.max(0, this.p1Lives || 0)) + "  x" + (this.p1Combo || 0), 22, 68);
		ctx.fillStyle = "#e85d04";
		ctx.font = `800 14px ${FONT}`;
		ctx.textAlign = "right";
		ctx.fillText(this.t("p2"), w - 22, 28);
		ctx.fillStyle = "#f4f1e8";
		ctx.font = `900 20px ${FONT}`;
		ctx.fillText(String(this.p2Score || 0), w - 22, 50);
		ctx.font = `700 12px ${FONT}`;
		ctx.fillStyle = "#95d5b2";
		ctx.fillText("x" + (this.p2Combo || 0) + "  " + "❤".repeat(Math.max(0, this.p2Lives || 0)), w - 22, 68);
		ctx.restore();
		drawMascot(ctx, 48, h - 40, this.data.cosmetics, 0.7);
		if (this.state === "vs_intro") {
			const t = Math.min(1, this.vsIntroT / 0.5);
			const scale = 0.5 + t * 1.2;
			const alpha = this.vsIntroT < 1.2 ? Math.min(1, this.vsIntroT * 2) : Math.max(0, 1 - (this.vsIntroT - 1.2) / 0.4);
			ctx.save();
			ctx.globalAlpha = alpha;
			ctx.translate(w / 2, h * 0.45);
			ctx.scale(scale, scale);
			ctx.fillStyle = "#e85d04";
			ctx.font = `900 64px ${FONT}`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.strokeStyle = "#14281d";
			ctx.lineWidth = 10;
			ctx.strokeText(this.t("vsStart"), 0, 0);
			ctx.fillText(this.t("vsStart"), 0, 0);
			ctx.restore();
			ctx.fillStyle = `rgba(244,241,232,${alpha * 0.9})`;
			ctx.font = `700 18px ${FONT}`;
			ctx.textAlign = "center";
			ctx.fillText(this.t("vsIntro"), w / 2, h * 0.56);
			ctx.font = `700 14px ${FONT}`;
			ctx.fillStyle = `rgba(149,213,178,${alpha * 0.95})`;
			ctx.fillText(this.t("p1") + " ←  |  → " + this.t("p2"), w / 2, h * 0.62);
		}
		if (this.state === "vs_result") {
			ctx.fillStyle = "rgba(20,40,29,0.78)";
			ctx.fillRect(0, 0, w, h);
			const winner = this.vsWinner;
			ctx.fillStyle = winner === 0 ? "#ffe066" : (winner === 1 ? "#4c9f38" : "#e85d04");
			ctx.font = `900 34px ${FONT}`;
			ctx.textAlign = "center";
			if (winner === 0) ctx.fillText("EMPATE", w / 2, h * 0.32);
			else ctx.fillText(this.t(winner === 1 ? "vsWin" : "vsLose"), w / 2, h * 0.32);
			ctx.fillStyle = "#f4f1e8";
			ctx.font = `800 20px ${FONT}`;
			ctx.fillText(this.t("p1") + "  " + (this.p1Score||0) + "  —  " + (this.p2Score||0) + "  " + this.t("p2"), w / 2, h * 0.42);
			ctx.font = `700 14px ${FONT}`;
			ctx.fillStyle = "#95d5b2";
			ctx.fillText("Combo max: " + (this.p1BestCombo||0) + " / " + (this.p2BestCombo||0), w / 2, h * 0.5);
			drawMascot(ctx, w / 2, h * 0.22, this.data.cosmetics, 1.1);
			for (const b of this.gameOverButtons) b.draw(ctx);
		}
	}
	drawLogo(ctx, w, y) {
		ctx.save();
		ctx.textAlign = "center";
		ctx.fillStyle = "#4c9f38";
		ctx.font = `900 ${Math.min(48, w * .11)}px ${FONT}`;
		ctx.strokeStyle = "#14281d";
		ctx.lineWidth = 8;
		ctx.strokeText(this.t("title"), w / 2, y);
		ctx.fillText(this.t("title"), w / 2, y);
		ctx.fillStyle = "#95d5b2";
		ctx.font = `700 15px ${FONT}`;
		ctx.fillText(this.t("subtitle"), w / 2, y + 28);
		ctx.fillStyle = "#d8f3dc";
		ctx.font = `700 13px ${FONT}`;
		ctx.fillText(`${this.t("highScore")}: ${this.data.highScore}`, w / 2, y + 50);
		ctx.restore();
		this.drawHeartMark(ctx, w / 2, y - 48);
	}
	drawHeartMark(ctx, x, y) {
		ctx.save();
		ctx.translate(x, y);
		ctx.fillStyle = "#e63946";
		ctx.beginPath();
		ctx.moveTo(0, 8);
		ctx.bezierCurveTo(-18, -8, -16, -22, 0, -12);
		ctx.bezierCurveTo(16, -22, 18, -8, 0, 8);
		ctx.fill();
		ctx.strokeStyle = "#f4f1e8";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(-16, -2);
		ctx.lineTo(-6, -2);
		ctx.lineTo(-2, -10);
		ctx.lineTo(3, 8);
		ctx.lineTo(7, -2);
		ctx.lineTo(16, -2);
		ctx.stroke();
		ctx.restore();
	}
	drawHowTo(ctx, w, h) {
		const panelW = Math.min(360, w - 24);
		const panelH = Math.min(300, h * .48);
		const x = (w - panelW) / 2;
		const y = h * .26;
		ctx.fillStyle = "rgba(20,40,29,0.82)";
		roundRect(ctx, x, y, panelW, panelH, 16);
		ctx.fill();
		ctx.fillStyle = "#f4f1e8";
		ctx.font = `800 20px ${FONT}`;
		ctx.textAlign = "center";
		ctx.fillText(this.t("howTo"), w / 2, y + 28);
		ctx.font = `600 13px ${FONT}`;
		ctx.textAlign = "left";
		[
			this.t("how1"),
			this.t("how2"),
			this.t("how3"),
			this.t("how4"),
			this.t("how5")
		].forEach((line, i) => {
			this.wrapText(ctx, "· " + line, x + 16, y + 56 + i * 36, panelW - 32, 16);
		});
	}
	wrapText(ctx, text, x, y, maxW, lh) {
		const words = text.split(" ");
		let row = "";
		let yy = y;
		ctx.fillStyle = "#d8f3dc";
		for (const word of words) {
			const test = row ? row + " " + word : word;
			if (ctx.measureText(test).width > maxW) {
				ctx.fillText(row, x, yy);
				yy += lh;
				row = word;
			} else row = test;
		}
		if (row) ctx.fillText(row, x, yy);
	}
	drawRecords(ctx, w, h) {
		const recs = this.data.records || [];
		const panelW = Math.min(520, w - 24);
		const panelH = Math.min(h * .58, 420);
		const x = (w - panelW) / 2;
		const y0 = h * .22;
		ctx.fillStyle = "rgba(20,40,29,0.9)";
		roundRect(ctx, x, y0, panelW, panelH, 16);
		ctx.fill();
		ctx.fillStyle = "#f4f1e8";
		ctx.font = `800 22px ${FONT}`;
		ctx.textAlign = "center";
		ctx.fillText(this.t("records"), w / 2, y0 + 28);
		ctx.font = `700 13px ${FONT}`;
		ctx.fillStyle = "#ffe066";
		ctx.fillText(`${this.t("yourRecord")}: ${this.data.highScore}  ·  ${this.t("bestCombo")}: x${this.data.bestCombo}`, w / 2, y0 + 48);
		if (!recs.length) {
			ctx.font = `600 14px ${FONT}`;
			ctx.fillStyle = "#b7c4b0";
			ctx.textAlign = "left";
			this.wrapText(ctx, this.t("noRecords"), x + 20, y0 + 80, panelW - 40, 18);
			return;
		}
		ctx.font = `700 12px ${FONT}`;
		ctx.fillStyle = "#95d5b2";
		ctx.textAlign = "left";
		ctx.fillText("#", x + 18, y0 + 72);
		ctx.fillText(this.t("player"), x + 48, y0 + 72);
		ctx.textAlign = "right";
		ctx.fillText(this.t("score"), x + panelW - 200, y0 + 72);
		ctx.fillText(this.t("combo"), x + panelW - 110, y0 + 72);
		ctx.fillText(this.t("time"), x + panelW - 24, y0 + 72);
		recs.slice(0, 9).forEach((r, i) => {
			const y = y0 + 98 + i * 26;
			ctx.fillStyle = i === 0 ? "#ffe066" : "#f4f1e8";
			ctx.textAlign = "left";
			ctx.fillText(String(i + 1), x + 18, y);
			ctx.fillText(String(r.name || "—").slice(0, 12), x + 48, y);
			ctx.textAlign = "right";
			ctx.fillText(String(r.score), x + panelW - 200, y);
			ctx.fillText("x" + (r.combo || 0), x + panelW - 110, y);
			ctx.fillText((r.time || 0) + "s", x + panelW - 24, y);
		});
	}
	drawStats(ctx, w, h) {
		const panelW = Math.min(340, w - 24);
		const panelH = Math.min(h * .55, 360);
		const x = (w - panelW) / 2;
		const y0 = h * .2;
		ctx.fillStyle = "rgba(20,40,29,0.88)";
		roundRect(ctx, x, y0, panelW, panelH, 16);
		ctx.fill();
		ctx.fillStyle = "#f4f1e8";
		ctx.font = `800 22px ${FONT}`;
		ctx.textAlign = "center";
		ctx.fillText(this.t("stats"), w / 2, y0 + 28);
		ctx.font = `600 14px ${FONT}`;
		ctx.textAlign = "left";
		const lines = [
			`${this.t("gamesPlayed")}: ${this.data.gamesPlayed || 0}`,
			`${this.t("yourRecord")}: ${this.data.highScore}`,
			`${this.t("bestCombo")}: x${this.data.bestCombo}`,
			`${this.t("maxLevel")}: ${this.data.maxLevel || 1}`,
			`${this.t("smashed")}: ${this.data.totalSmashed}`,
			`${this.t("avoided")}: ${this.data.totalAvoided || 0}`,
			`${this.t("totalScore")}: ${this.data.totalScore || 0}`,
			`${this.t("coinsEarned")}: ${this.data.coinsEarned || 0}`,
			`${this.t("coins")}: ${this.data.coins}`,
			
			`${this.t("totalTime")}: ${this.data.totalTime | 0}s`
		];
		lines.forEach((line, i) => ctx.fillText(line, x + 20, y0 + 58 + i * 26));
	}
	draw() {
		const ctx = this.ctx, w = this.w, h = this.h;
		ctx.clearRect(0, 0, w, h);
		if (this.state === "vs_intro" || this.state === "vs_play" || this.state === "vs_result") {
			this.drawVS(ctx, w, h);
			return;
		}
		if (this.state === "credits") {
			this.credits.draw(ctx, w, h);
			for (const b of this.menuButtons) b.draw(ctx);
			return;
		}
		if ([
			"menu",
			"options",
			"howto",
			"records",
			"stats",
			"credits",
			"pause"
		].includes(this.state)) {
			this.bg.draw(ctx, w, h, this.data.colors, (k) => this.t(k));
			this.belt.draw(ctx, w, h, this.data.colors);
			if (this.state === "credits") {
				this.credits.draw(ctx, w, h);
				for (const b of this.menuButtons) b.draw(ctx);
				return;
			}
			if (this.state !== "pause") {
				this.drawLogo(ctx, w, Math.min(h * .16, 110));
				if (this.state === "menu") {
					drawMascot(ctx, w / 2, Math.min(h * .16, 110) + 78, this.data.cosmetics, 0.85);
					if (this.data.theme === "pv" && this.pvLogo && this.pvLogo.complete) {
						const lw = 110, lh = 110;
						ctx.save();
						ctx.beginPath();
						ctx.arc(16 + lw/2, 16 + lh/2, lw/2, 0, Math.PI*2);
						ctx.closePath();
						ctx.clip();
						ctx.drawImage(this.pvLogo, 16, 16, lw, lh);
						ctx.restore();
						ctx.strokeStyle = "#f4c430";
						ctx.lineWidth = 3;
						ctx.beginPath();
						ctx.arc(16 + lw/2, 16 + lh/2, lw/2, 0, Math.PI*2);
						ctx.stroke();
					}
				}
			}
			if (this.state === "howto") this.drawHowTo(ctx, w, h);
			if (this.state === "records") this.drawRecords(ctx, w, h);
			if (this.state === "stats") this.drawStats(ctx, w, h);
			if (this.state === "pause") {
				ctx.fillStyle = "rgba(20,40,29,0.55)";
				ctx.fillRect(0, 0, w, h);
				ctx.fillStyle = "#f4f1e8";
				ctx.font = `800 36px ${FONT}`;
				ctx.textAlign = "center";
				ctx.fillText(this.t("pause"), w / 2, h * .34);
			}
			if (this.state === "menu" || this.state === "vs_menu" || this.state === "options" || this.state === "howto" || this.state === "records" || this.state === "pause" || this.state === "cosmetics" || this.state === "stats") for (const b of this.menuButtons) b.draw(ctx);
			if (this.state === "themes") {
				ctx.fillStyle = "#f4f1e8";
				ctx.font = `900 28px ${FONT}`;
				ctx.textAlign = "center";
				ctx.fillText(this.t("themes"), w / 2, h * .12);
			}
			if (this.state === "vs_menu") {
				ctx.fillStyle = "#f4f1e8";
				ctx.font = `900 28px ${FONT}`;
				ctx.textAlign = "center";
				ctx.fillText(this.t("vs"), w / 2, h * .18);
			}
			return;
		}
		if (this.state === "store") {
			this.store.draw(ctx, w, h);
			return;
		}
		this.camera.apply(ctx, w, h);
		this.bg.draw(ctx, w, h, this.data.colors, (k) => this.t(k));
		this.belt.draw(ctx, w, h, this.data.colors);
		this.foods.sort((a, b) => a.y - b.y);
		for (const f of this.foods) f.draw(ctx, this.data.colors);
		for (const p of this.activeParticles) p.draw(ctx);
		for (const c of this.activeCoins) c.draw(ctx);
		for (const t of this.activeTexts) t.draw(ctx);
		this.camera.restore(ctx);
		this.effects.draw(ctx, w, h);
		this.hud.draw(ctx, w, h, this);
		this.achievements.draw(ctx, w);
	
	if (this.state === "play") {
			ctx.save();
			ctx.fillStyle = "rgba(20,40,29,0.55)";
			roundRect(ctx, w - 52, h - 52, 40, 40, 10);
			ctx.fill();
			ctx.fillStyle = "#f4f1e8";
			ctx.fillRect(w - 38, h - 40, 5, 16);
			ctx.fillRect(w - 29, h - 40, 5, 16);
			ctx.restore();
		}
		if (this.state === "gameover") {
			ctx.fillStyle = "rgba(20,40,29,0.7)";
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = "#f4f1e8";
			ctx.font = `800 40px ${FONT}`;
			ctx.textAlign = "center";
			ctx.fillText(this.t("gameOver"), w / 2, h * .32);
			ctx.font = `700 20px ${FONT}`;
			ctx.fillText(`${this.t("score")}: ${this.score}`, w / 2, h * .4);
			ctx.fillText(`${this.t("highScore")}: ${this.data.highScore}`, w / 2, h * .46);
			ctx.fillText(`${this.t("avoided")}: ${this.sessionAvoided}`, w / 2, h * .52);
			for (const b of this.gameOverButtons) b.draw(ctx);
		}
	}
	loop(now) {
		if (!this.running) return;
		if (!this.last) this.last = now;
		let dt = Math.min(.05, (now - this.last) / 1e3);
		this.last = now;
		this.update(dt);
		this.draw();
		this.raf = requestAnimationFrame((t) => this.loop(t));
	}
	destroy() {
		this.running = false;
		if (this.raf) cancelAnimationFrame(this.raf);
		window.removeEventListener("resize", this._onResize);
		document.removeEventListener("visibilitychange", this._onVis);
		window.removeEventListener("keydown", this._onKey);
		this.input.destroy();
		SaveSystem.save(this.data);
	}
};
function bootGame(canvas, hooks = {}) {
  const game = new Game(canvas, hooks);
  window.__vital = game;
  return game;
}

var OVERLAY_COPY = {
  es: { title: "Vital Smash", enterName: "Escribe tu nombre", hint: "Aparecerás en la tabla de récords", save: "Guardar récord", skip: "Omitir" },
  en: { title: "Vital Smash", enterName: "Enter your name", hint: "You will appear on the records board", save: "Save record", skip: "Skip" },
  pt: { title: "Vital Smash", enterName: "Escreva o seu nome", hint: "Vais aparecer na tabela de recordes", save: "Guardar recorde", skip: "Saltar" },
  fr: { title: "Vital Smash", enterName: "Entre ton nom", hint: "Tu apparaîtras au tableau des records", save: "Sauver le record", skip: "Passer" }
};

function overlayCopy(lang) {
  return OVERLAY_COPY[lang] || OVERLAY_COPY.es;
}

function bootOverlay() {
  const canvas = document.getElementById("game");
  const modal = document.getElementById("name-modal");
  const form = document.getElementById("name-form");
  const input = document.getElementById("player-name");
  const hint = document.getElementById("name-hint");
  const title = document.getElementById("record-title");
  const saveBtn = document.getElementById("save-record");
  const skipBtn = document.getElementById("skip-record");
  const heading = document.getElementById("page-title");
  const langBtns = document.querySelectorAll(".lang-btn");
  let nameResolver = null;
  let game = null;

  function applyOverlayLang(lang) {
    const ui = overlayCopy(lang);
    if (heading) heading.textContent = ui.title + " — ODS 3 Salud y Bienestar";
    if (title) title.textContent = ui.enterName;
    if (input) input.placeholder = ui.enterName;
    if (saveBtn) saveBtn.textContent = ui.save;
    if (skipBtn) skipBtn.textContent = ui.skip;
    langBtns.forEach((b) => {
      b.dataset.active = b.dataset.lang === lang ? "true" : "false";
    });
  }

  game = bootGame(canvas, {
    promptName: function (stats) {
      return new Promise(function (resolve) {
        nameResolver = resolve;
        const ui = overlayCopy(game.getLang());
        hint.textContent = ui.hint + (stats ? " · " + stats.score : "");
        input.value = "";
        modal.hidden = false;
        input.focus();
      });
    }
  });

  applyOverlayLang(game.getLang());

  langBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const code = btn.dataset.lang;
      game.setLang(code);
      applyOverlayLang(code);
    });
  });

  function finishName(save) {
    const value = save ? input.value.trim().slice(0, 16) : null;
    if (nameResolver) nameResolver(value);
    nameResolver = null;
    modal.hidden = true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    finishName(true);
  });
  skipBtn.addEventListener("click", function () {
    finishName(false);
  });
}

if (!window.__vitalSmashBooted) {
  window.__vitalSmashBooted = true;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootOverlay);
  } else {
    bootOverlay();
  }
}
