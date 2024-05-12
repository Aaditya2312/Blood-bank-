 const testController = (req,res) => {
    res.status(200).send( {
        message: "Welcome server",
        success: true
    })
}

module.exports = { testController }