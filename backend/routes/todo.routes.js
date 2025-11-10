import { check, validationResult } from "express-validator";
import express from "express";
import Lists from "../model/lists.model.js";

const router = express.Router();

router.post('/create', [
    check('title', 'Title is Required').not().isEmpty(),
    check('description', 'Description is Required').not().isEmpty(),
    check('date', 'Date is Required').not().isEmpty(),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ 
        return res.status(400).json({ errors: errors.array()})
    } 
    const { title, description, date } = req.body;
    
    try {
        const list = await Lists.create({ title, description, date});
        res.status(200).json(list);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: `Server Error`})
    }


});

router.get('/', async (req,res) => {
    try {
        const lists = await Lists.find({});
        res.json(lists);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req,res) => {
    const { id } = req.params;

    try {
        const list = await Lists.findById(id);
        if(!list) {
            return res.status(400).json({ message: `ID doesn't exist`});
        }
        res.json(list)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', async (req,res) => {
    const { id } = req.params;
    
    try {
        const list = await Lists.findByIdAndUpdate(id, req.body);
        if(!list) {
            return res.status(400).json({ message: `ID doesn't exist`});
        }

        const updatedList = await Lists.findById(id);
        res.status(200).json(updatedList);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: error.message})
    }

})

router.delete('/:id', async (req,res) => {
    const { id } = req.params;

    try {
        const list = await Lists.findByIdAndDelete(id);
        if(!list) {
            return res.status(400).json({ message: `ID doesn't exist`});
        }
        res.json('Deleted Successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: error.message})
    }
})


export default router;