<p>
  <a href="https://trackback.co.nz/">
    <img src="https://user-images.githubusercontent.com/2051324/127407635-236f8a7a-4ca6-410a-9fc4-add396743cfa.png" alt="TrackBack"></a>
</p>

<a href="https://github.com/trackback-blockchain/trackback-verifiable/tree/main/packages/trackback-agent" target="_blank">
    <img src="https://img.shields.io/badge/trackback--agent-0.0.1--alpha.0-yellow" alt="TrackBack Agent SDK 0.0.1-alpha.0">
</a>
<a href="" target="_blank">
    <img src="https://img.shields.io/badge/build-pass-blueviolet" alt="Codeshare 3.0.0">
</a>
<a href="https://nodejs.org/es/blog/release/v14.0.0/" target="_blank">
    <img src="https://img.shields.io/badge/nodejs-14.0.0+-8ca" alt="NodeJS 14.0.0">
</a>
<a href="https://lerna.js.org/" target="_blank">
    <img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="TrackBack Verifiable Credentials SDK 0.0.1-alpha.0">
</a>

## IMPORTANT! 
* This is a minimum viable product suite with limited functionality.
* Please do not use this for production

# TrackBack Agent SDK
* Create, Revoke, Resolve, Update DIDs
* Connects with TrackBack chain
* Store DID documents in a Decentralised file store ( IPFS for MVP stage) 

### Please refer`agent/tests/agent/index.test.ts` for more examples 
## DID Operations 
* Reference :- https://www.w3.org/TR/did-core/
 
#### Create a DID
* The DID Document must be saved on IPFS
```javascript
/*
* `saveToDistributedStorage returns the `cid`
* Please Include this value as the didRef when calling the constructDIDDocument and updateDIDDocument methods.
*/
agent = new TrackBackAgent(new Connection());
let result = await agent.procedure.saveToDistributedStorage(desDIDStructure, null);
```
```javascript
/*
* Returns Promise<ExtrinsicResults>
* ExtrinsicResults 
export type ExtrinsicResults = {
  [key: string]: any;
} | null;
*/
let agent = new TrackBackAgent(new Connector());
await agent.procedure.constructDIDDocument(
    account,
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata,
    didRef,
    publicKeys
);
```
#### Resolve a DID
```javascript
let did_uri = "did:0xfac17a:0x68b5d6033f8958558cc0bb48328bb9ba0651078b3f69eee533a2dfdba75965f2"
let agent = new TrackBackAgent(new Connector());
await agent.procedure.resolve(did_uri);
```

### Revoke a DID
```javascript
/*
* Returns Promise<ExtrinsicResults>
* ExtrinsicResults 
export type ExtrinsicResults = {
  [key: string]: any;
} | null;
*/
let did_uri = "did:0xfac17a:0x68b5d6033f8958558cc0bb48328bb9ba0651078b3f69eee533a2dfdba75965f2"
let agent = new TrackBackAgent(new Connector());
await agent.procedure.revoke(
    account,
    did_uri
);
```
### Update a DID
* To update a DID Document, you need to grab the DID information and meta data from resove method
 
```javascript
let did_uri = "did:0xfac17a:0x68b5d6033f8958558cc0bb48328bb9ba0651078b3f69eee533a2dfdba75965f2"
let agent = new TrackBackAgent(new Connector());
await agent.procedure.resolve(did_uri);
```

```javascript
/*
* Returns Promise<ExtrinsicResults>
* ExtrinsicResults 
export type ExtrinsicResults = {
  [key: string]: any;
} | null;
*/
let agent = new TrackBackAgent(new Connector());
await agent.procedure.updateDIDDocument(
    account,
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata,
    didRef,
    publicKeys
);
```