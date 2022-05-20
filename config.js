const fs = require("fs");
const width = 100;
const height = 100;
const dir = __dirname;
const description = "This NFT is part of DAOS";
const startEditionFrom = 1; // Can start edition at whatever you want // start at 1
const endEditionAt = 8640; // endEditionAt and edtionSize MUST be the SAME // start at 10 for testing purposes
const editionSize = 8640; // this will print 100 copies : (use if you already have a 10k 1 1st edition) // erase the 100
const CDN_ROOT = 'https://cdn.cyberbox.art/'
const AMPLITUDE_API_KEY = '06a79e76e64715fc4c6577fa883553ea'

const raceWeights = [
  {
    value: "DAOS", // Change to whatever you want
    from: 1,
    to: editionSize,
  },
];

const races = {
  DAOS: { // Must bee the same as value on line 12 | ALL CAPITALIZATIONS MATTER
    name: "DAOS", 
    layers: [
      {
        name: "Background",
        elements: [
          { 
            id: 0,
            name: "Citizo",
            path: `${dir}/1-background/Citizo.png`, // 1-backround = folder name/png name
            weight: 10,
          },
          {
            id: 1,
            name: "Grey Graff",
            path: `${dir}/1-background/GreyGraff.png`,
            weight: 10,
          },
          {
            id: 2,
            name: "Matrix",
            path: `${dir}/1-background/Matrix.png`,
            weight: 5,
          },
          {
            id: 3,
            name: "Purple Graff",
            path: `${dir}/1-background/PurpleGraff.png`,
            weight: 10,
          },
          {
            id: 4,
            name: "Red Smoke",
            path: `${dir}/1-background/RedSmoke.png`,
            weight: 15,
          },
          {
            id: 5,
            name: "This",
            path: `${dir}/1-background/This.png`,
            weight: 10,
          },
          {
            id: 6,
            name: "None",
            path: `${dir}/1-background/none.png`,
            weight: 40,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Neck",
        elements: [
          {
            id: 0,
            name: "Neck",
            path: `${dir}/2-neck/2neck1.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Head",
        elements: [
          {
            id: 0,
            name: "Black Lips",
            path: `${dir}/3-head/BlackLips.png`,
            weight: 30,
          },
          {
            id: 1,
            name: "Blood Black",
            path: `${dir}/3-head/BloodBlack.png`,
            weight: 20,
          },
          {
            id: 2,
            name: "BloodEyes",
            path: `${dir}/3-head/BloodEyes.png`,
            weight: 2,
          },
          {
            id: 3,
            name: "Green",
            path: `${dir}/3-head/Green.png`,
            weight: 15,
          },
          {
            id: 4,
            name: "Green Black Lips",
            path: `${dir}/3-head/GreenBlackLips.png`,
            weight: 20,
          },
          {
            id: 5,
            name: "Grey Eyes",
            path: `${dir}/3-head/GreyEyes.png`,
            weight: 5,
          },
          {
            id: 6,
            name: "Red Eyes",
            path: `${dir}/3-head/RedEyes.png`,
            weight: 4,
          },
          {
            id: 7,
            name: "Stange",
            path: `${dir}/3-head/Strange.png`,
            weight: 4,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Hair",
        elements: [
          {
            id: 0,
            name: "Black Cool",
            path: `${dir}/4-hair/BlackCool.png`,
            weight: 20,
          },
          {
            id: 1,
            name: "Green Joker",
            path: `${dir}/4-hair/GreenJoker.png`,
            weight: 20,
          },
          {
            id: 2,
            name: "Grey Dust",
            path: `${dir}/4-hair/GreyDust.png`,
            weight: 25,
          },
          {
            id: 3,
            name: "Red Mars",
            path: `${dir}/4-hair/RedMars.png`,
            weight: 5,
          },
          {
            id: 4,
            name: "None",
            path: `${dir}/4-hair/none.png`,
            weight: 30,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Tshirt",
        elements: [
          {
            id: 0,
            name: "Blue Sea",
            path: `${dir}/5-tshirt/BlueSea.png`,
            weight: 30,
          },
          {
            id: 1,
            name: "Error Red",
            path: `${dir}/5-tshirt/ErrorRed.png`,
            weight: 3,
          },
          {
            id: 2,
            name: "Gold Purple",
            path: `${dir}/5-tshirt/GoldPurple.png`,
            weight: 7,
          },
          {
            id: 3,
            name: "Green Garden",
            path: `${dir}/5-tshirt/GreenGarden.png`,
            weight: 45,
          },
          {
            id: 4,
            name: "Pinky",
            path: `${dir}/5-tshirt/Pinky.png`,
            weight: 15,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Clothes",
        elements: [
          {
            id: 0,
            name: "JediPurple",
            path: `${dir}/6-clothes/JediPurple.png`,
            weight: 20,
          },
          {
            id: 1,
            name: "JediRed",
            path: `${dir}/6-clothes/JediRed.png`,
            weight: 30,
          },
          {
            id: 2,
            name: "SpaceFront",
            path: `${dir}/6-clothes/SpaceFront.png`,
            weight: 15,
          },
          {
            id: 3,
            name: "SquideRob",
            path: `${dir}/6-clothes/SquidRobe.png`,
            weight: 5,
          },
          {
            id: 4,
            name: "None",
            path: `${dir}/6-clothes/none.png`,
            weight: 30,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Mask",
        elements: [
          {
            id: 0,
            name: "Anomask",
            path: `${dir}/7-mask/Anomask.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "Astro",
            path: `${dir}/7-mask/Astro.png`,
            weight: 12,
          },
          {
            id: 2,
            name: "CrazyMask",
            path: `${dir}/7-mask/CrazyMask.png`,
            weight: 1,
          },
          {
            id: 3,
            name: "Hooly",
            path: `${dir}/7-mask/Hooly.png`,
            weight: 20,
          },
          {
            id: 4,
            name: "Hooly2",
            path: `${dir}/7-mask/Hooly2.png`,
            weight: 15,
          },
          {
            id: 5,
            name: "Hunter",
            path: `${dir}/7-mask/Hunter.png`,
            weight: 1,
          },
          {
            id: 6,
            name: "Mask",
            path: `${dir}/7-mask/Mask.png`,
            weight: 1,
          },
          {
            id: 7,
            name: "SquidMask",
            path: `${dir}/7-mask/SquidMask.png`,
            weight: 2,
          },
          {
            id: 8,
            name: "Starship",
            path: `${dir}/7-mask/Starship.png`,
            weight: 5,
          },
          {
            id: 9,
            name: "None",
            path: `${dir}/7-mask/none.png`,
            weight: 40,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Glass",
        elements: [
          {
            id: 0,
            name: "Elite",
            path: `${dir}/8-glass/Elite.png`,
            weight: 5,
          },
          {
            id: 1,
            name: "None",
            path: `${dir}/8-glass/none.png`,
            weight: 95,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
    ],
  },
};

module.exports = {
  width,
  height,
  description,
  editionSize,
  startEditionFrom,
  endEditionAt,
  races,
  raceWeights,
  CDN_ROOT,
  AMPLITUDE_API_KEY
};
