import Keyring from "@polkadot/keyring";
import { KeyringPair } from "@polkadot/keyring/types";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { WordCount } from "@polkadot/util-crypto/mnemonic/generate";
import { ITrackbackAccount } from "../types";

export function generateMnemonic(
  numWords?: WordCount,
  onlyJs?: boolean
): string {
  return mnemonicGenerate(numWords, onlyJs);
}

export function createAccount(metadata?: { [key: string]: string }): ITrackbackAccount {
  const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });

  const MNEMONIC = mnemonicGenerate();

  const keyPair: KeyringPair = keyring.addFromUri(MNEMONIC, metadata);

  return {
    keyPair,
    mnemonic: MNEMONIC,
  };
}


export function getAccount(mnemonic: string): ITrackbackAccount {
  const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });

  const keyPair: KeyringPair = keyring.addFromUri(mnemonic);
  return {
    keyPair,
    mnemonic: mnemonic,
  };

}
