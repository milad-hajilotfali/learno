/* ── Memzy achievements + character roster — PURE logic ──
   Loaded by index.html as a browser global AND require()'d by Node tests.
   No DOM, no localStorage, no Math.random in here. */
(function (root) {
  "use strict";

  var CATEGORIES = [
    { key: "points",   label: "The Climb",    icon: "bolt" },
    { key: "streak",   label: "The Fire",     icon: "fire" },
    { key: "mastery",  label: "The Scholar",  icon: "graduation-cap" },
    { key: "explorer", label: "The Explorer", icon: "compass" }
  ];

  /* gte(field, n) -> predicate; truthy(field) -> boolean predicate */
  function gte(f, n) { return function (s) { return (s[f] || 0) >= n; }; }
  function truthy(f) { return function (s) { return !!s[f]; }; }

  var ACHIEVEMENTS = [
    /* points (total points) */
    { id:"pts_25",    category:"points", name:"Spark",        icon:"bolt",     goal:25,   test:gte("points",25),    desc:"Earn 25 points" },
    { id:"pts_100",   category:"points", name:"Rising Star",  icon:"star",     goal:100,  test:gte("points",100),   desc:"Earn 100 points",  reward:{avatar:"c20"} },
    { id:"pts_300",   category:"points", name:"Wordsmith",    icon:"pen-nib",  goal:300,  test:gte("points",300),   desc:"Earn 300 points" },
    { id:"pts_750",   category:"points", name:"Trailblazer",  icon:"compass",  goal:750,  test:gte("points",750),   desc:"Earn 750 points",  reward:{avatar:"c21"} },
    { id:"pts_1500",  category:"points", name:"Mastermind",   icon:"brain",    goal:1500, test:gte("points",1500),  desc:"Earn 1,500 points" },
    { id:"pts_3000",  category:"points", name:"Virtuoso",     icon:"gem",      goal:3000, test:gte("points",3000),  desc:"Earn 3,000 points", reward:{avatar:"c22"} },
    { id:"pts_6000",  category:"points", name:"Oosta Legend", icon:"crown",    goal:6000, test:gte("points",6000),  desc:"Earn 6,000 points", reward:{avatar:"c23"} },
    /* streak (best-ever streak, days) */
    { id:"streak_3",   category:"streak", name:"Warming Up",  icon:"mug-hot",       goal:3,   test:gte("bestStreak",3),   desc:"Reach a 3-day streak" },
    { id:"streak_7",   category:"streak", name:"On Fire",     icon:"fire",       goal:7,   test:gte("bestStreak",7),   desc:"Reach a 7-day streak",   reward:{avatar:"c24"} },
    { id:"streak_14",  category:"streak", name:"Consistent",  icon:"fire-flame-curved",       goal:14,  test:gte("bestStreak",14),  desc:"Reach a 14-day streak" },
    { id:"streak_30",  category:"streak", name:"Blazing",     icon:"fire-flame-simple", goal:30,  test:gte("bestStreak",30),  desc:"Reach a 30-day streak",  reward:{avatar:"c25"} },
    { id:"streak_100", category:"streak", name:"Inferno",     icon:"meteor",       goal:100, test:gte("bestStreak",100), desc:"Reach a 100-day streak", reward:{avatar:"c26"} },
    { id:"streak_200", category:"streak", name:"Phoenix",     icon:"dragon",    goal:200, test:gte("bestStreak",200), desc:"Reach a 200-day streak", reward:{avatar:"c27"} },
    /* mastery (words + levels) */
    { id:"words_50",    category:"mastery", name:"Collector",      icon:"book",            goal:50,   test:gte("wordsLearned",50),   desc:"Learn 50 words" },
    { id:"words_250",   category:"mastery", name:"Scholar",        icon:"graduation-cap",  goal:250,  test:gte("wordsLearned",250),  desc:"Learn 250 words",  reward:{avatar:"c28"} },
    { id:"words_1000",  category:"mastery", name:"Lexicon",        icon:"language",        goal:1000, test:gte("wordsLearned",1000), desc:"Learn 1,000 words", reward:{avatar:"c29"} },
    { id:"chapter_100", category:"mastery", name:"Chapter Master", icon:"bookmark",            test:truthy("anyChapter100"), desc:"Fully learn a chapter" },
    { id:"level_done",  category:"mastery", name:"Level Master",   icon:"medal",           test:truthy("anyLevelDone"),  desc:"Complete a CEFR level", reward:{avatar:"c30"} },
    /* explorer (consistency + breadth) */
    { id:"days_7",     category:"explorer", name:"Regular",      icon:"calendar-check", goal:7,   test:gte("activeDays",7),    desc:"Practice on 7 days" },
    { id:"days_30",    category:"explorer", name:"Dedicated",    icon:"calendar-day",       goal:30,  test:gte("activeDays",30),   desc:"Practice on 30 days",  reward:{avatar:"c31"} },
    { id:"days_100",   category:"explorer", name:"Devoted",      icon:"calendar-week",       goal:100, test:gte("activeDays",100),  desc:"Practice on 100 days", reward:{avatar:"c32"} },
    { id:"big_day",    category:"explorer", name:"Big Day",      icon:"sun",            goal:200, test:gte("bestDay",200),     desc:"Earn 200 points in one day" },
    { id:"langs_2",    category:"explorer", name:"Globetrotter", icon:"globe",          goal:2,   test:gte("langCount",2),     desc:"Start a second language", reward:{avatar:"c33"} },
    { id:"reviews_100",category:"explorer", name:"Sharpshooter", icon:"bullseye",    goal:100, test:gte("reviewsDone",100), desc:"Complete 100 reviews" }
  ];

  function earnedAchievements(stats) {
    var s = stats || {};
    return ACHIEVEMENTS.filter(function (a) { return a.test(s); }).map(function (a) { return a.id; });
  }

  function badgeFor(points) {
    var b = null;
    ACHIEVEMENTS.forEach(function (a) {
      if (a.category === "points" && (points || 0) >= a.goal) b = a;
    });
    return b;
  }

  /* ── Character roster (deterministic, stable across devices) ── */
  var PEEP_HEADS = ["afro","bangs","bangs2","bantuKnots","bear","bun","bun2","buns","cornrows","cornrows2","dreads1","dreads2","flatTop","flatTopLong","grayBun","grayMedium","grayShort","hijab","long","longAfro","longBangs","longCurly","medium1","medium2","medium3","mediumBangs","mediumBangs2","mediumBangs3","mediumStraight","mohawk","mohawk2","noHair1","noHair2","noHair3","pomp","shaved1","shaved2","shaved3","short1","short2","short3","short4","short5","turban","twists","twists2"];
  var PEEP_SKINS = ["ffdbb4","edb98a","d08b5b","ae5d29","694d3d"];
  var PEEP_FACIAL = ["chin","full","full2","full3","full4","goatee1","goatee2","moustache1","moustache2","moustache3","moustache4","moustache5","moustache6","moustache7","moustache8","moustache9"];

  /* Mulberry32 — tiny seeded PRNG so the roster is identical everywhere. */
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function buildRoster() {
    var rnd = mulberry32(0x051A7E); /* fixed seed — do not change (would re-shuffle everyone's roster) */
    var pick = function (arr) { return arr[Math.floor(rnd() * arr.length)]; };
    var out = [], seen = {}, guard = 0;
    while (out.length < 50 && guard < 2000) {
      guard++;
      var head = pick(PEEP_HEADS), skin = pick(PEEP_SKINS);
      var facial = rnd() < 0.3 ? pick(PEEP_FACIAL) : null;
      var key = head + "|" + skin + "|" + (facial || "n");
      if (seen[key]) continue;
      seen[key] = 1;
      out.push({ id: "c" + out.length, head: head, skinColor: skin, facialHair: facial });
    }
    return out;
  }

  var CHARACTERS = buildRoster();

  /* Assign unlock buckets by index (stable):
     c0..c17  -> free (18)
     c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33 -> achievement rewards (14)
     c42..c49 -> plus (8)
     everything else -> points threshold (10), ascending. */
  var ACH_BY_AVATAR = {};
  ACHIEVEMENTS.forEach(function (a) { if (a.reward) ACH_BY_AVATAR[a.reward.avatar] = a.id; });
  var POINTS_LADDER = [50, 150, 400, 600, 900, 1200, 1800, 2400, 4000, 5000];
  var _ladderIdx = 0;
  CHARACTERS.forEach(function (c, i) {
    if (ACH_BY_AVATAR[c.id]) { c.unlock = { kind: "achievement", achId: ACH_BY_AVATAR[c.id] }; }
    else if (i <= 17) { c.unlock = { kind: "free" }; }
    else if (i >= 42) { c.unlock = { kind: "plus" }; }
    else { c.unlock = { kind: "points", at: POINTS_LADDER[Math.min(_ladderIdx++, POINTS_LADDER.length - 1)] }; }
  });

  function avatarVal(c) { return "peep:" + c.head + "|" + c.skinColor + "|" + (c.facialHair || ""); }

  function isCharUnlocked(c, stats, isPlus) {
    var u = c.unlock || { kind: "free" };
    if (u.kind === "free") return true;
    if (u.kind === "plus") return !!isPlus;
    if (u.kind === "points") return (stats && stats.points || 0) >= u.at;
    if (u.kind === "achievement") return earnedAchievements(stats).indexOf(u.achId) !== -1;
    return false;
  }

  function _commas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function unlockCaption(c) {
    var u = c.unlock || { kind: "free" };
    if (u.kind === "plus") return "Oosta Plus";
    if (u.kind === "points") return _commas(u.at) + " points";
    if (u.kind === "achievement") {
      var a = ACHIEVEMENTS.filter(function (x) { return x.id === u.achId; })[0];
      return a ? "Earn " + a.name : "Locked";
    }
    return "";
  }

  var api = { CATEGORIES: CATEGORIES, ACHIEVEMENTS: ACHIEVEMENTS, earnedAchievements: earnedAchievements,
    badgeFor: badgeFor, CHARACTERS: CHARACTERS, avatarVal: avatarVal, isCharUnlocked: isCharUnlocked, unlockCaption: unlockCaption };
  root.MemzyAch = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
