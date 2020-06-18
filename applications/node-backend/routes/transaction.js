const express = require('express')
const router = express.Router()
const Transaction = require('../schemas/transaction')

//#region GetAllTransactions GET
router.get('/all', async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.json(transactions)
    }
    catch (err) {
        require.send('Error: ' + err)

    }
})
//#endregion

//#region CreateTransaction POST
router.post('/new', async (req, res) => {
    const transact = new Transaction({
        from: req.body.from,
        to: req.body.to,
        description: req.body.description,
        payment_method: req.body.payment_method,
        isCleared: req.body.isCleared
    })

    const store = await transact.save((err, success) => {
        res.send(store)
        if (err) {

            res.status(500).json({

                status: "fail",

                message: "Error establishing database connection"

            });

        } else if (success) {

            res.status(200).json({

                status:"Successfull",
                 message:transact.description + " Successfully created"
            });

        }
        else {

            res.status(503).json({

                status: "title or body cannot be empty"

            })
        }
    })

})
//#endregion

//#region GetTransactionById GET
router.get('/getById/:id', async (req, res) => {

    
    try{
        const transaction = await Transaction.findById(req.params.id)
        res.send(transaction)
    }
    catch(err){
    res.send("Error "+err)}
})
//#endregion

//#region UpdateTransaction PATCH
router.patch('/update/:transaction_id', async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)
    transaction.from=req.body.from
    transaction.to=req.body.to
    transaction.description=req.body.description
    transaction.payment_method=req.body.payment_method,
    transaction.isCleared=req.body.isCleared
    const store = await transaction.save((req.params.id, (err) => {
       
        if (err) {

            res.status(500).json({

                status: "fail",

                message: "Error establishing database connection"
            })

        } else if (!err) {

            res.status(200).json({

                status:"Successfully updated"
            })

        }
        else {

            res.status(503).json({

                status: "title or body cannot be empty"

            })
        }
    })
    )

})
//#endregion

//#region DeleteTransaction DELETE
router.delete('/delete/:transaction_id', async (req, res) => {

    const transaction = await Transaction.findByIdAndRemove(req.params.id, (err) => {

        if (!err) {

            res.status(200).json({

                status: "Transaction has been deleted successfully"

            });

        }

        else {

            res.status(503).json({
                status: "No database connection established"

            })

        }

    })



})
//#endregion
module.exports = router