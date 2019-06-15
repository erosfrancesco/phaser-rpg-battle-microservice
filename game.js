import Game from "./utils/index.js";
//import Logic from "./test/index.js";


import BuilderScene from "../builders/index.js";
Game.addScene(BuilderScene);
Game.startScene(BuilderScene.key);


window.Game = Game;


/*
var url_string = window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("hello");
console.log(url_string, c);
/**/