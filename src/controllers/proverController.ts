import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { PublicAndSecretInputPair } from 'kalypso-sdk/dist/types';
import { Request, Response } from 'express';
import { Semaphore } from 'async-mutex';

import config from '../config';
import { latestBlock, kalypso, walletAddress, getTransactionReceipt } from '../kalypso';

const semaphore = new Semaphore(1);

const createAskAndGetProof = async (input: string, secret: string): Promise<string> => {
  let abiCoder = new ethers.AbiCoder();

  let inputBytes = abiCoder.encode(['string[1]'], [[input]]);

  const secretString = JSON.stringify(secret);

  const assignmentDeadline = new BigNumber(await latestBlock()).plus(config.ASSIGNMENT_DELAY);
  const proofGenerationTimeInBlocks = new BigNumber(await latestBlock()).plus(config.PROOF_GENERATION_DELAY);

  semaphore.acquire();
  let askRequest: ethers.ContractTransactionResponse;
  try {
    // Create ASK request
    askRequest = await kalypso.MarketPlace().createAsk(
      config.MARKET_ID,
      inputBytes,
      config.PROOF_REWARD.toString(),
      assignmentDeadline.toFixed(0),
      proofGenerationTimeInBlocks.toFixed(0),
      await walletAddress(),
      0, // TODO: keep this 0 for now
      Buffer.from(secretString),
      false
    );
    await askRequest.wait(10);
    semaphore.release();
  } catch (ex) {
    console.log(ex);
    semaphore.release();
    throw ex;
  }

  console.log('Ask Request Hash: ', askRequest.hash);

  let receipt = await getTransactionReceipt(askRequest.hash);
  let askId = await kalypso.MarketPlace().getAskId(receipt!);
  console.log('Ask ID :', askId);

  return await new Promise((resolve) => {
    console.log('\nTrying to fetch proof...\n');
    let intervalId = setInterval(async () => {
      let data = await kalypso.MarketPlace().getProofByAskId(askId.toString(), receipt?.blockNumber || 0);
      if (data?.proof_generated) {
        console.log(data.message);
        let abiCoder = new ethers.AbiCoder();
        const decoded = abiCoder.decode(['bytes', 'bytes', 'bytes'], data.proof);

        const inputs = decoded[0];
        const proof = decoded[1];
        const signature = decoded[2];

        console.log({ inputs, proof, signature });

        const proofBuffer = Buffer.from(proof.split('0x')[1], 'hex');
        const decoder = new TextDecoder('utf-8');
        const proofString = decoder.decode(proofBuffer);
        console.log({ proofString });
        resolve(proofString);
        clearInterval(intervalId);
      } else {
        console.log(`Proof not submitted yet for askId : ${askId}.`);
      }
    }, 10000);
  });
};

//Get version
export const getVersion = async (_: Request, res: Response) => {
  return res.status(200).json({
    ref: 'test',
    commitHash: 'test',
  });
};

export const proverEncryptedRequestTx = async (req: Request, res: Response) => {
  const proof = await createEncryptedAskAndGetProof(req.payload_to_process!);

  return res.status(200).send(proof);
};

const createEncryptedAskAndGetProof = async (data: PublicAndSecretInputPair): Promise<string> => {
  const assignmentDeadline = new BigNumber(await latestBlock()).plus(config.ASSIGNMENT_DELAY);
  const proofGenerationTimeInBlocks = new BigNumber(await latestBlock()).plus(config.PROOF_GENERATION_DELAY);

  semaphore.acquire();
  let askRequest: ethers.ContractTransactionResponse;
  try {
    // Create ASK request
    askRequest = await kalypso.MarketPlace().createAskWithEncryptedSecretAndAcl(
      config.MARKET_ID.toString(),
      data.publicInputs,
      config.PROOF_REWARD.toString(),
      assignmentDeadline.toFixed(0),
      proofGenerationTimeInBlocks.toFixed(0),
      await walletAddress(),
      0, // TODO: keep this 0 for now
      data.encryptedSecret,
      data.acl
    );
    await askRequest.wait(10);
    semaphore.release();
  } catch (ex) {
    console.log(ex);
    semaphore.release();
    throw ex;
  }

  console.log('Ask Request Hash: ', askRequest.hash);

  let receipt = await getTransactionReceipt(askRequest.hash);

  let askId = await kalypso.MarketPlace().getAskId(receipt!);
  console.log('Ask ID :', askId);

  return await new Promise((resolve) => {
    console.log('\nTrying to fetch proof...\n');
    let intervalId = setInterval(async () => {
      let data = await kalypso.MarketPlace().getProofByAskId(askId.toString(), receipt?.blockNumber || 0);
      if (data?.proof_generated) {
        console.log(data.message);
        let abiCoder = new ethers.AbiCoder();
        const decoded = abiCoder.decode(['bytes', 'bytes', 'bytes'], data.proof);

        const inputs = decoded[0];
        const proof = decoded[1];
        const signature = decoded[2];

        console.log({ inputs, proof, signature });

        const proofBuffer = Buffer.from(proof.split('0x')[1], 'hex');
        const decoder = new TextDecoder('utf-8');
        const proofString = decoder.decode(proofBuffer);
        console.log({ proofString });
        resolve(proofString);
        clearInterval(intervalId);
      } else {
        console.log(`Proof not submitted yet for askId : ${askId}.`);
      }
    }, 10000);
  });
};

export const proveTransaction = async (req: Request, res: Response) => {
  const publicInput = req.body?.public; //middleware ensures it
  const secretInput = req.body?.secret; // middleware ensure it

  const proof = await createAskAndGetProof(publicInput, secretInput);
  res.status(200).send(proof);
};
