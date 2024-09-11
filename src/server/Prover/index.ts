import express from 'express'
import { getVersion, proveTransaction, proverEncryptedRequestTx } from '../../controllers'
import { checkRateLimitAndThrottle, validateApiSecret, validateProveTxPayload } from '../../middleware'
import { validateProveEncryptedTxPayload } from '../../middleware/proveEncryptedTransactionPayloadCheck'

export const prover_router = express.Router()

//Version check
prover_router.get('/version', validateApiSecret, getVersion)

//Prove Transaction public
prover_router.post('/proveTx', validateApiSecret, validateProveTxPayload, checkRateLimitAndThrottle, proveTransaction)

//Prove Encrypted Request Transaction public
prover_router.post(
  '/proverEncryptedRequestTx',
  validateApiSecret,
  validateProveEncryptedTxPayload,
  checkRateLimitAndThrottle,
  proverEncryptedRequestTx
)
