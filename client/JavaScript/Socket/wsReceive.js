ws.addEventListener("open", () => {
  console.log("we have connected!");
});

ws.addEventListener("message", ({ data }) => {
  data = JSON.parse(data);

  //upon receiving a message, coming in more than 60fps, we need to
  //differentiate game state change from events. data will have a type,
  //and that type can allow us to pick out game state or event.

  switch (data.type) {
    case "name s2c":
      addNameToTitlescreen(data.playerList);
      break;
    case "check":
      console.log(data.payload);
      break;
    default:
      break;
  }
});

//Socket to move the enemy ships, bullets--------------------------------------

const moveEnemyBullets = (screenBullets, uid) => {
  let count = 0;
  for (let i = 0; i < animationObjectsArray.length; i++) {
    let object = animationObjectsArray[i];
    if (object instanceof EnemyBullet && object.uid === uid) {
      object.moveEnemyBullet(screenBullets[count]);
      count++;
    }
  }
};

const moveEnemyShip = (array, coords, uid) => {
  animationObjectsArray.forEach((object, i) => {
    if (object instanceof EnemyShip && object.uid === uid) {
      object.gamestateDataReflect(array, coords);
    }
  });
};

// socket.on("gamestate s2c", (playerList) => {
//   playerList.forEach((player, i) => {
//     if (player.uid != socket.id) {
//       moveEnemyShip(
//         playerList[i].gameStateData.keyspressedarray,
//         playerList[i].gameStateData.coords,
//         player.uid
//       );
//       moveEnemyBullets(playerList[i].gameStateData.screenBullets, player.uid);
//     }
//   });
// });
//----------------------------------------------------------------------

//Socket to shoot enemy bullets-----------------------------------------

const shootEnemyBullet = (uid) => {
  animationObjectsArray.forEach((object, i) => {
    // console.log("object uid", object.uid);
    // console.log("enemy uid", uid);

    if (object instanceof EnemyShip && object.uid === uid) {
      object.shootBullet();
    }
  });
};

// socket.on("EnemyBulletShot s2c", (enemyUID) => {
//   shootEnemyBullet(enemyUID);
// });
//----------------------------------------------------------------------

// socket.on("EnemyBulletDelete s2c", (enemyUID) => {
//   //TODO: assign each bullet it's own UID, and then find it that way. then delete only the bullet with specific UID.
//   animationObjectsArray
//     .find((object) => object instanceof EnemyBullet)
//     .deleteSelf();
// });
