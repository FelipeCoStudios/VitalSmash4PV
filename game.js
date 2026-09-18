(async function () {
  const names = ["game.part1.js", "game.part2.js", "game.part3.js"];
  const texts = await Promise.all(names.map((n) => fetch(n).then((r) => {
    if (!r.ok) throw new Error("Failed to load " + n);
    return r.text();
  })));
  (0, eval)(texts.join(""));
})();
