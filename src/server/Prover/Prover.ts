import express from 'express'
import {
  getVersion,
  proveTransaction,
  proverEncryptedRequestTx,
} from '../../controllers'
import { validateApiSecret } from '../../middleware'

export const prover_router = express.Router()

//Version check
prover_router.get('/version', validateApiSecret, getVersion)

//Prove Transaction public
prover_router.post('/proveTx', validateApiSecret, proveTransaction)

//Prove Encrypted Request Transaction public
prover_router.post(
  '/proverEncryptedRequestTx',
  validateApiSecret,
  proverEncryptedRequestTx
)
