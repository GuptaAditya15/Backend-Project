// const asyncHandler = () => {}
// const asyncHandler = (func) => {()=> {}}
// const asyncHandler = (func) => () => {}



const asyncHandler = (requestHandler) => {
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error) => next(error))
    }
}

// Both can be used in professional work one is try catch and other is promise


// const asyncHandler = (func) => async (req,res,next) =>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(error || 500).json({
//             success : false,
//             message : error.message
//         })
//     }
// }

export {asyncHandler}