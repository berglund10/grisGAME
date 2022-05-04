import {makeCanvas, stage, draggableSprites, sprite, render, buttons, particles, particleEffect} from "./library/display.js";
import {makePointer} from "./library/interactive.js";
import {assets} from "./library/utilities.js";
import {hitTestRectangle} from "./library/collision.js"

assets.load([
  "images/star.png","images/Gbild.png","images/cirkelstreckad.png","images/bakgrund.png", "images/Sbokstav.png",
  "images/Rbokstav.png", "images/Gbokstav.png", "images/Ibokstav.png", "images/Gbild.png", "images/Rbild.png",
  "images/Ibild.png", "images/Sbild.png", "images/bakgrundklar.png", "images/Rityta_G.png", "images/Rityta_R.png", "images/Rityta_I.png", "images/Rityta_S.png"
]).then(() => setup());

let canvas, pointer,
Gbokstav, G, Gklar,
Ibokstav, I, Iklar, 
Rbokstav, R, Rklar,
Sbokstav, S, Sklar,
bakgrund, bakgrundKlar;

function setup() {
  canvas = makeCanvas(800, 600);
  stage.width = canvas.width;
  stage.height = canvas.height;
  
  bakgrundKlar = sprite(assets["images/bakgrundklar.png"]);

  bakgrundKlar.visible = false;

  bakgrund = sprite(assets["images/bakgrund.png"]);

  G = sprite(assets["images/cirkelstreckad.png"])
  stage.putCenter(G, -160, 200);

  Gklar = sprite(assets["images/Gbild.png"])
  stage.putCenter(Gklar, -160, 200);
  Gklar.visible = false;

  R = sprite(assets["images/cirkelstreckad.png"])
  stage.putCenter(R, -60, 200)

  Rklar = sprite(assets["images/Rbild.png"])
  stage.putCenter(Rklar, -60, 200);
  Rklar.visible = false;

  I = sprite(assets["images/cirkelstreckad.png"])
  stage.putCenter(I, 40, 200)

  Iklar = sprite(assets["images/Ibild.png"])
  stage.putCenter(Iklar, 40, 200);
  Iklar.visible = false;


  S = sprite(assets["images/cirkelstreckad.png"])
  stage.putCenter(S, 140, 200)

  Sklar = sprite(assets["images/Sbild.png"])
  stage.putCenter(Sklar, 140, 200);
  Sklar.visible = false;

  Sbokstav = sprite(assets["images/Rityta_S.png"]);
  stage.putCenter(Sbokstav, -32, -32);
  Sbokstav.draggable = true;
  Sbokstav.interactive = true;

  Sbokstav.release = () => {
    if(hitTestRectangle(S, Sbokstav)) {
      Sbokstav.draggable = false;
      Sbokstav.interactive = false;
      S.visible = false;
      Sbokstav.visible = false;
      Sklar.visible = true;
      particleEffect(
        pointer.x, pointer.y,
        () => sprite(assets["images/star.png"]),
        20,
        0.1,
        true,
        0, 6.28,
        12, 24,
        1, 2,
        0.005, 0.01,
        0.005, 0.01,
        0.05, 0.1
      );
    }
  }

  Ibokstav = sprite(assets["images/Rityta_I.png"]); 
  Ibokstav.putTop(Ibokstav, 20, 100);
  Ibokstav.draggable = true;
  Ibokstav.interactive = true;

  Ibokstav.release = () => {
    if(hitTestRectangle(I, Ibokstav)) {
      Ibokstav.draggable = false;
      Ibokstav.interactive = false;
      I.visible = false;
      Ibokstav.visible = false;
      Iklar.visible = true;
      particleEffect(
        pointer.x, pointer.y,
        () => sprite(assets["images/star.png"]),
        20,
        0.1,
        true,
        0, 6.28,
        12, 24,
        1, 2,
        0.005, 0.01,
        0.005, 0.01,
        0.05, 0.1
      );
    }
  }

  Rbokstav = sprite(assets["images/Rityta_R.png"]); 
  stage.putRight(Rbokstav, -80);
  Rbokstav.draggable = true;
  Rbokstav.interactive = true;

  Rbokstav.release = () => {
    if(hitTestRectangle(R, Rbokstav)) {
        Rbokstav.draggable = false;
        Rbokstav.interactive = false;
        R.visible = false;
        Rbokstav.visible = false;
        Rklar.visible = true;
        particleEffect(
          pointer.x, pointer.y,
          () => sprite(assets["images/star.png"]),
          20,
          0.1,
          true,
          0, 6.28,
          12, 24,
          1, 2,
          0.005, 0.01,
          0.005, 0.01,
          0.05, 0.1
        );
    }
}

  Gbokstav = sprite(assets["images/Rityta_G.png"]);
  stage.putBottom(Gbokstav, 32, -400);
  Gbokstav.draggable = true;
  Gbokstav.interactive = true;

  Gbokstav.release = () => {
      if(hitTestRectangle(G, Gbokstav)) {
          Gbokstav.draggable = false;
          Gbokstav.interactive = false;
          G.visible = false;
          Gbokstav.visible = false;
          Gklar.visible = true;
          particleEffect(
            pointer.x, pointer.y,
            () => sprite(assets["images/star.png"]),
            20,
            0.1,
            true,
            0, 6.28,
            12, 24,
            1, 2,
            0.005, 0.01,
            0.005, 0.01,
            0.05, 0.1
          );
      }
  }

  pointer = makePointer(canvas);

  gameLoop();

}

function gameLoop() {

  requestAnimationFrame(gameLoop);

  if (buttons.length > 0) {
    canvas.style.cursor = "auto";
    buttons.forEach(button => {
      button.update(pointer, canvas);
      if (button.state === "over" || button.state === "down") {
        if(button.parent !== undefined) {
          canvas.style.cursor = "pointer";
        }
      }
    });
  }

  if (particles.length > 0) {
    for(let i = particles.length - 1; i >= 0; i--) {
      let particle = particles[i];
      particle.update();
    }
  }

  if(buttons.length <= 0) {
    G.visible = false;
    R.visible = false;
    I.visible = false;
    S.visible = false;
    canvas.style.cursor = "auto";
    bakgrund.visible = false;
    bakgrundKlar.visible = true;
  }

  pointer.updateDragAndDrop(draggableSprites);

  render(canvas);
}