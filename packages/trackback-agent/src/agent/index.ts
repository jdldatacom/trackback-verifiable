import { ApiPromise, WsProvider } from '@polkadot/api';

import { ITrackbackAgentOptions } from './../types/agent';
import { ITrackBackAgent, IConnect } from '../types';
import { DefaultOptions } from './helpers';
import { IProcedure, Procedure } from './procedure';


/**
 * TrackBackAgentClass
 * Connects and disconnects RPC to chain
 */
export class Connector implements IConnect {
  private options: ITrackbackAgentOptions;
  private api: Promise<ApiPromise> | null | undefined;

  constructor(options: ITrackbackAgentOptions = DefaultOptions) {
    this.options = options;
  }

  /**
   * Connects to the TrackBack chain
   * @returns Promise<ApiPromise>
   */
  async connect(): Promise<ApiPromise> {
    if (this.api) return this.api;

    const { url, options: other } = this.options;
    const { types, rpc } = other;

    const provider = new WsProvider(url);

    this.api = ApiPromise.create({ provider: provider, types, rpc });
    return this.api;
  }

  /**
   * Disconnects from chain
   */
  async disconnect(): Promise<void> {
    (await this.connect()).disconnect();
    this.api = null;
  }
}

export class TrackBackAgent implements ITrackBackAgent {

  private options: ITrackbackAgentOptions;
  // private api: Promise<ApiPromise> | null | undefined;
  private connector: IConnect | null | undefined;

  
  procedure: IProcedure;

  constructor(connection: IConnect, options: ITrackbackAgentOptions = DefaultOptions) {
    this.options = options;
    this.connector = new Connector();

    this.procedure = new Procedure(this.connector);
  }

  // private async connect(): Promise<ApiPromise> {
  //   if (this.api) return this.api;

  //   const { url, options: other } = this.options;
  //   const { types, rpc } = other;

  //   const provider = new WsProvider(url);

  //   this.api = ApiPromise.create({ provider: provider, types, rpc });
  //   return this.api;
  // }

  // async disconnect(){
  //    (await this.connect()).disconnect();
  //    this.api = null;
  // }  

  

  // IPFS 
  // async resolve(didUri: string): Promise<IDIDResolutionResult> {
  //   const didUriHex = uriToHex(didUri);
  //   console.log(didUriHex)
  //   return this.connect().then((api) => {
  //     return new Promise<IDIDResolutionResult>((resolve, reject) => {
  //       if (!api) return null;
  //       api.query.didModule.dIDDocument(didUriHex, (result: any) => {
  //         console.log(result);
  //         if (!result.isEmpty) {
  //           resolve(JSON.parse(result.toString()));
  //         } else {
  //           reject();
  //         }
  //       });
  //     }).catch((error) => {
  //       console.log(error);
  //       return null;
  //     }).finally(
  //       () => {
  //         this.disconnect();
  //       }
  //     );
  //   });
  // }

  // /**
  //  * Updates a DID Document
  //  * @param account | Polkadot Account
  //  * @param didDocument | DID Document represented in a JSON Structure
  //  * - DID Document gets update on IPFS or Decentralosed data store
  //  * @param didDocumentMetadata | DID Documen metadata JSON List 
  //  * @param didResolutionMetadata | DID Resolution metadata JSON list 
  //  * @param didRef | IPFS URI for the the DID
  //  * @param publicKeys | Aithorised public keys
  //  * @returns Promise<ExtrinsicResults>
  //  */
  // async updateDIDDocument(
  //   account: IKeyringPair, 
  //   didDocument: DIDDocument, 
  //   didDocumentMetadata: IDIDDocumentMetadata,
  //   didResolutionMetadata: IDIDResolutionMetadata,
  //   didRef: string,
  //   publicKeys: Array<String>
  // ) {
  //   const didDoc = toUint8Array(didDocument);
  //   const didDocMetadata = toUint8Array(didDocumentMetadata);
  //   const didDocRes = toUint8Array(didResolutionMetadata);
  //   const didURI = uriToHex(didDocument.id)

  //   const inputParams = [
  //     didURI,
  //     didDocRes,
  //     didDocMetadata,
  //     didRef,
  //     publicKeys
  //   ];

  //   const paramFields = [true, true, true, true, true];

  //   const transformed = transformParams(paramFields, inputParams);
  //   return this.dispatch(
  //     account, 
  //     TrackBackModules.DIDModule, 
  //     TrackBackCallables.DIDUpdate, 
  //     transformed
  //   );
  // }

  // /**
  //  * Saves a DID Document on chain
  //  * @param account | Polkadot Account
  //  * @param didDocument | DID Document represented in a JSON Structure
  //  * @param didDocumentMetadata | DID Documen metadata JSON List 
  //  * @param didResolutionMetadata | DID Resolution metadata JSON list 
  //  * @param didRef | IPFS URI for the the DID
  //  * @param publicKeys | Aithorised public keys
  //  * @returns Promise<ExtrinsicResults>
  //  */
  // async constructDIDDocument(
  //   account: IKeyringPair,
  //   didDocument: DIDDocument,
  //   didDocumentMetadata: IDIDDocumentMetadata,
  //   didResolutionMetadata: IDIDResolutionMetadata,
  //   didRef: string,
  //   publicKeys: Array<string>
  // ): Promise<ExtrinsicResults> {
  //   const didDoc = toUint8Array(didDocument);
  //   const didDocMetadata = toUint8Array(didDocumentMetadata);
  //   const didDocRes = toUint8Array(didResolutionMetadata);


  //   const didURI = uriToHex(didDocument.id)

  //   console.log(didURI)

  //   const inputParams = [
  //     didDoc,
  //     didDocMetadata,
  //     didDocRes,
  //     account.address,
  //     didURI,
  //     didRef,
  //     publicKeys
  //   ];

  //   const paramFields = [true, true, true, true, true, true, true];

  //   const transformed = transformParams(paramFields, inputParams);

  //   return this.dispatch(
  //     account, 
  //     TrackBackModules.DIDModule, 
  //     TrackBackCallables.DIDInsert, 
  //     transformed
  //   );
  // }

  // /**
  //  * Sends a transform to the TackBack Chain.
  //  * @param account | Polkadot Account which analogous to `IKeyringPair`
  //  * @param palletRpc | RPC module in DID Pallet
  //  * @param callable | RPC method in DID Pallet
  //  * @param transformed | A valid transform object
  //  * @returns 
  //  */
  // async dispatch(account: IKeyringPair, palletRpc: string, callable: string, transformed: any): Promise<ExtrinsicResults> {
  //   return this.connect()
  //     .then((api) => {
  //       if (!api) return {
  //         Error: true,
  //         Message: "dispatchError"
  //       };

  //       return api.rpc.system
  //         .accountNextIndex(account.address)
  //         .then((nonce) => {
  //           return new Promise<ExtrinsicResults>((resolve) => {
  //             const txExecute = api.tx[palletRpc][callable](...transformed);
 
  //             txExecute.signAndSend(account, { nonce }, (result: any) => {

  //               console.log(`Current status is ${JSON.stringify(result)}`);
  //               console.log(`Current nonce is ${nonce}`);

  //               if (result.status.isInBlock) {
  //                 console.log(`Block Hash ${result.status.asInBlock}`);
  //               } else if (result.status.isFinalized) {
  //                 if(result.dispatchError) {
 
  //                   resolve({
  //                     Error: true,
  //                     Message: "dispatchError"
  //                   });
  //                 } else {
  //                   console.log(`Finalised Block Hash ${JSON.stringify(result)}`);
  //                   resolve({
  //                     Error: false,
  //                     Message: "Data has been saved successfully"
  //                   });
  //                 }
  //               }
  //             });
  //           });
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return {
  //         "Error": true,
  //         "Message": "Error"
  //       };
  //     }).finally(
  //       () => {
  //         this.disconnect();
  //       }
  //     );
  //   }
}