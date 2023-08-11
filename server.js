const express = require('express');
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3360;
app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`)
});