import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { PublicAndSecretInputPair } from 'kalypso-sdk/dist/types'

import config from '../config'

import { Request, Response } from 'express'

import { latestBlock, kalypso, walletAddress, getTransactionReceipt } from '../kalypso'

const createAskAndGetProof = async (input: string, secret: string): Promise<string> => {
  let abiCoder = new ethers.AbiCoder()

  let inputBytes = abiCoder.encode(['string[1]'], [[input]])

  const secretString = JSON.stringify(secret)

  const assignmentDeadline = new BigNumber(await latestBlock()).plus(config.ASSIGNMENT_DELAY)
  const proofGenerationTimeInBlocks = new BigNumber(await latestBlock()).plus(config.PROOF_GENERATION_DELAY)

  // Create ASK request
  const askRequest = await kalypso.MarketPlace().createAsk(
    config.MARKET_ID,
    inputBytes,
    config.PROOF_REWARD.toString(),
    assignmentDeadline.toFixed(0),
    proofGenerationTimeInBlocks.toFixed(0),
    await walletAddress(),
    0, // TODO: keep this 0 for now
    Buffer.from(secretString),
    false
  )
  await askRequest.wait()
  console.log('Ask Request Hash: ', askRequest.hash)

  let receipt = await getTransactionReceipt(askRequest.hash)
  let askId = await kalypso.MarketPlace().getAskId(receipt!)
  console.log('Ask ID :', askId)

  return await new Promise((resolve) => {
    console.log('\nTrying to fetch proof...\n')
    let intervalId = setInterval(async () => {
      let data = await kalypso.MarketPlace().getProofByAskId(askId.toString(), receipt?.blockNumber || 0)
      if (data?.proof_generated) {
        console.log(data.message)
        let abiCoder = new ethers.AbiCoder()
        const decoded = abiCoder.decode(['bytes', 'bytes', 'bytes'], data.proof)

        const inputs = decoded[0]
        const proof = decoded[1]
        const signature = decoded[2]

        console.log({ inputs, proof, signature })

        const proofBuffer = Buffer.from(proof.split('0x')[1], 'hex')
        const decoder = new TextDecoder('utf-8')
        const proofString = decoder.decode(proofBuffer)
        console.log({ proofString })
        resolve(proofString)
        clearInterval(intervalId)
      } else {
        console.log(`Proof not submitted yet for askId : ${askId}.`)
      }
    }, 10000)
  })
}

//Get version
export const getVersion = async (_: Request, res: Response) => {
  return res.status(200).json({
    ref: 'test',
    commitHash: 'test',
  })
}

export const proverEncryptedRequestTx = async (req: Request, res: Response) => {
  const publicInputs = new Uint8Array(Object.values(req.body?.publicInputs || {}).map(Number))
  const encryptedSecret = new Uint8Array(Object.values(req.body?.encryptedSecret || {}).map(Number))
  const acl = new Uint8Array(Object.values(req.body?.acl || {}).map(Number))

  const payload_for_verification = {
    publicInputs: Buffer.from(publicInputs),
    encryptedSecret: Buffer.from(encryptedSecret),
    acl: Buffer.from(acl),
  }

  // TODO: try to migrate this to middlewares
  const isValid = await kalypso
    .MarketPlace()
    .verifyEncryptedInputs(payload_for_verification, config.MATCHING_ENGINE_URL, config.MARKET_ID.toString())
  if (!isValid) {
    return res.status(400).send('Request is not valid as per secret enclaves')
  }

  const proof = await createEncryptedAskAndGetProof(payload_for_verification)

  return res.status(200).send(proof)
}

const createEncryptedAskAndGetProof = async (data: PublicAndSecretInputPair): Promise<string> => {
  const assignmentDeadline = new BigNumber(await latestBlock()).plus(config.ASSIGNMENT_DELAY)
  const proofGenerationTimeInBlocks = new BigNumber(await latestBlock()).plus(config.PROOF_GENERATION_DELAY)

  const askRequest = await kalypso.MarketPlace().createAskWithEncryptedSecretAndAcl(
    config.MARKET_ID.toString(),
    data.publicInputs,
    config.PROOF_REWARD.toString(),
    assignmentDeadline.toFixed(0),
    proofGenerationTimeInBlocks.toFixed(0),
    await walletAddress(),
    0, // TODO: keep this 0 for now
    data.encryptedSecret,
    data.acl
  )

  await askRequest.wait(20)
  console.log('Ask Request Hash: ', askRequest.hash)

  let receipt = await getTransactionReceipt(askRequest.hash)

  let askId = await kalypso.MarketPlace().getAskId(receipt!)
  console.log('Ask ID :', askId)

  return await new Promise((resolve) => {
    console.log('\nTrying to fetch proof...\n')
    let intervalId = setInterval(async () => {
      let data = await kalypso.MarketPlace().getProofByAskId(askId.toString(), receipt?.blockNumber || 0)
      if (data?.proof_generated) {
        console.log(data.message)
        let abiCoder = new ethers.AbiCoder()
        const decoded = abiCoder.decode(['bytes', 'bytes', 'bytes'], data.proof)

        const inputs = decoded[0]
        const proof = decoded[1]
        const signature = decoded[2]

        console.log({ inputs, proof, signature })

        const proofBuffer = Buffer.from(proof.split('0x')[1], 'hex')
        const decoder = new TextDecoder('utf-8')
        const proofString = decoder.decode(proofBuffer)
        console.log({ proofString })
        resolve(proofString)
        clearInterval(intervalId)
      } else {
        console.log(`Proof not submitted yet for askId : ${askId}.`)
      }
    }, 10000)
  })
}

export const proveTransaction = async (req: Request, res: Response) => {
  const publicInput = req.body?.public //middleware ensures it
  const secretInput = req.body?.secret // middleware ensure it

  const proof = await createAskAndGetProof(publicInput, secretInput)
  res.status(200).send(proof)
}
