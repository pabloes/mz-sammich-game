  
import { getProvider } from "@decentraland/web3-provider";
import { getUserData } from '@decentraland/Identity'
import { getCurrentRealm } from '@decentraland/EnvironmentAPI';
import * as EthereumController from '@decentraland/EthereumController'
import * as EthConnect from '../node_modules/eth-connect/esm'
declare var dcl: DecentralandInterface

import { MetaZoneAPI } from './metazone-api';

import {Sammich} from '../metas/sammich/sammich';

const landOwnerData = {
  host_data: `{
    "sammich":{
      "position":{"x":8,"y":0.8,"z":12},
      "rotation":{"x":0,"y":0,"z":0},
      "scale":{"x":1, "y":1, "z":1},
      "hideFrame":false,
      "hideBoard":false,
      "hideAd":true,
      "gameID":"0,0"
    }
 }`
};
let meta;
try{
  meta = new Sammich(mzAPI, landOwnerData)
}catch(err){
  meta = new Sammich({getUserData}, landOwnerData)
}

engine.addSystem(meta);