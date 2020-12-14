  
import { getProvider } from "@decentraland/web3-provider";
import { getUserData } from '@decentraland/Identity'
import { getCurrentRealm } from '@decentraland/EnvironmentAPI';
import * as EthereumController from '@decentraland/EthereumController'
import * as EthConnect from '../node_modules/eth-connect/esm'
declare var dcl: DecentralandInterface

import { MetaZoneAPI } from './metazone-api';

import {SammichGame} from '../metas/sammichgame/sammichgame';
const _getUserData = async () => {
  let userData;
  while(!userData){
    userData = await getUserData();
    if(!userData){
      console.log("NO USER DATA, retry", userData);
    }
  }
  return userData;
}
const landOwnerData = {
  host_data: `{
  "sammichgame": {
    "position": {
      "x": 8,
      "y": 0.8,
      "z": 14
    },
    "rotation": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "scale": {
      "x": 1.5,
      "y": 1.5,
      "z": 1
    },
    "hideFrame": true,
    "hideBoard": false,
    "hideAd": true,
    "gameID": "0,0",
    "showScenario": true,
    "showJoinVoice": true,
    "soundDistance": 100,
    "voiceChannel": "dcl-sammich-game",
    "serverWs": "wss://mana-fever.com",
    "serverHttp": "https://mana-fever.com"
  }
}`
};
let meta;
try{
  meta = new SammichGame(mzAPI, landOwnerData)
}catch(err){
  meta = new SammichGame({getUserData:_getUserData, getCurrentRealm}, landOwnerData)
}

engine.addSystem(meta);
