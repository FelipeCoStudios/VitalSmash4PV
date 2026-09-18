// @ts-nocheck
"use strict";

/* Vital Smash — ODS 3 Salud y Bienestar
   Single-file game evolved from Tomato Smash. */

var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
var lerp = (a, b, t) => a + (b - a) * t;
var rand = (a, b) => a + Math.random() * (b - a);
var chance = (p) => Math.random() < p;
var dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
var FONT = "\"Nunito\", system-ui, sans-serif";
// FULL CONTENT TOO LARGE FOR SINGLE MESSAGE - USING ARTIFACT
console.error("game.js incomplete - reload from local artifacts");
