import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { PublicAndSecretInputPair } from 'kalypso-sdk/dist/types'

import config from '../config'
import { checkRateLimitAndThrottle } from '../middleware'

import {
  latestBlock,
  kalypso,
  walletAddress,
  getTransactionReceipt,
} from '../kalypso'

type createAskAndGetProofParams = {
  pub: any
  sec: any
}

const createAskAndGetProof = async (
  createAskAndGetProofParams: createAskAndGetProofParams
) => {
  try {
    if (
      createAskAndGetProofParams.pub == null ||
      createAskAndGetProofParams.pub == undefined
    ) {
      throw new Error('Public input not found')
    }

    if (
      createAskAndGetProofParams.sec == null ||
      createAskAndGetProofParams.sec == undefined
    ) {
      throw new Error('Secret input not found')
    }

    let input = createAskAndGetProofParams.pub
    let secret = createAskAndGetProofParams.sec

    let abiCoder = new ethers.AbiCoder()

    let inputBytes = abiCoder.encode(['string[1]'], [[input]])

    const secretString = JSON.stringify(secret)

    const assignmentDeadline = new BigNumber(await latestBlock()).plus(
      config.ASSIGNMENT_DELAY
    )
    const proofGenerationTimeInBlocks = new BigNumber(await latestBlock()).plus(
      config.PROOF_GENERATION_DELAY
    )

    // Create ASK request
    const askRequest = await kalypso.MarketPlace().createAsk(
      config.MARKET_ID,
      inputBytes,
      config.PROOF_REWARD,
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

    if (askId) {
      return await new Promise((resolve) => {
        console.log('\nTrying to fetch proof...\n')
        let intervalId = setInterval(async () => {
          let data = await kalypso
            .MarketPlace()
            .getProofByAskId(askId.toString(), receipt?.blockNumber || 0)
          if (data?.proof_generated) {
            console.log(data.message)
            let abiCoder = new ethers.AbiCoder()
            const decoded = abiCoder.decode(
              ['bytes', 'bytes', 'bytes'],
              data.proof
            )

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
  } catch (err) {
    console.log(err)
  }
}

//Get version
export const getVersion = async (req: any, res: any) => {
  try {
    res.status(200).json({
      ref: 'test',
      commitHash: 'test',
    })
  } catch (error) {
    console.log(error)
  }
}

export const proverEncryptedRequestTx = async (req: any, res: any) => {
  await checkRateLimitAndThrottle('some identifier')

  const publicInputs = new Uint8Array(
    Object.values(req.body?.publicInputs || {}).map(Number)
  )
  const encryptedSecret = new Uint8Array(
    Object.values(req.body?.encryptedSecret || {}).map(Number)
  )
  const acl = new Uint8Array(Object.values(req.body?.acl || {}).map(Number))

  if (!publicInputs || !encryptedSecret || !acl) {
    return res.status(400).send('Invalid input.')
  }

  const proof = await createEncryptedAskAndGetProof({
    publicInputs: Buffer.from(publicInputs),
    encryptedSecret: Buffer.from(encryptedSecret),
    acl: Buffer.from(acl),
  })

  res.status(200).send(proof)
}

const createEncryptedAskAndGetProof = async (
  data: PublicAndSecretInputPair
) => {
  const provider = new ethers.JsonRpcProvider(config.RPC)
  const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider)

  const isValid = await kalypso
    .MarketPlace()
    .verifyEncryptedInputs(
      data,
      config.MATCHING_ENGINE_URL,
      config.MARKET_ID.toString()
    )

  const latestBlock = await provider.getBlockNumber()
  const assignmentDeadline = new BigNumber(latestBlock).plus(
    config.ASSIGNMENT_DELAY
  )
  const proofGenerationTimeInBlocks = new BigNumber(latestBlock).plus(
    config.PROOF_GENERATION_DELAY
  )

  if (isValid) {
    const askRequest = await kalypso
      .MarketPlace()
      .createAskWithEncryptedSecretAndAcl(
        config.MARKET_ID.toString(),
        data.publicInputs,
        config.PROOF_REWARD,
        assignmentDeadline.toFixed(0),
        proofGenerationTimeInBlocks.toFixed(0),
        await wallet.getAddress(),
        0, // TODO: keep this 0 for now
        data.encryptedSecret,
        data.acl
      )

    await askRequest.wait(20)
    console.log('Ask Request Hash: ', askRequest.hash)

    let receipt = await provider.getTransactionReceipt(askRequest.hash)

    let askId = await kalypso.MarketPlace().getAskId(receipt!)
    console.log('Ask ID :', askId)

    if (askId) {
      return await new Promise((resolve) => {
        console.log('\nTrying to fetch proof...\n')
        let intervalId = setInterval(async () => {
          let data = await kalypso
            .MarketPlace()
            .getProofByAskId(askId.toString(), receipt?.blockNumber || 0)
          if (data?.proof_generated) {
            console.log(data.message)
            let abiCoder = new ethers.AbiCoder()
            const decoded = abiCoder.decode(
              ['bytes', 'bytes', 'bytes'],
              data.proof
            )

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
  }
}

// Generate Proof for the public and secret input
export const proveTransaction = async (req: any, res: any) => {
  try {
    const signer = req.body?.secret?.auth?.requests?.[0]?.signer
    if (!signer) {
      return res.status(400).send('Signer is required.')
    }

    // Check rate limits and throttle requests
    await checkRateLimitAndThrottle(signer)

    const publicInput = req.body?.public
    const secretInput = req.body?.secret

    if (!publicInput || !secretInput) {
      return res.status(400).send('Invalid input.')
    }

    const proof = await createAskAndGetProof({
      pub: publicInput,
      sec: secretInput,
    })

    res.status(200).send(proof)
  } catch (error) {
    // Error handling
    if (error instanceof Error) {
      console.error('Error:', error.message)
      if (
        error.message ===
          'You are sending requests too quickly. Please wait for few seconds and try again.' ||
        error.message ===
          'You have exceeded the number of allowed requests per hour. Please try again later.'
      ) {
        res.status(429).send(error.message)
      } else {
        res.status(500).send('Internal Server Error')
      }
    } else {
      // Handle non-Error types
      console.error('Unexpected error:', error)
      res.status(500).send('Internal Server Error')
    }
  }
}