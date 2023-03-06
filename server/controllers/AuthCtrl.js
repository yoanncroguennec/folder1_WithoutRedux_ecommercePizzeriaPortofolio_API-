const uid2 = require("uid2");
// MODELS
const User = require('../models/User')


// Arguments ("res" & "req") de la callback
exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, sex} = req.body;

        if (!firstName || ! lastName || !email || !password || typeof sex !== "boolean") return res.status(400).json({ message: "Missing parameter" });

        const emailAlreadyUsed = await User.findOne({ email });

        if (emailAlreadyUsed) return res.status(409).json({ message: "This email is already used" });
        
        // Génère un token
        const token = uid2(64);
        console.log(token);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            // account: {
            //     username,
            // },
            sex,
            token,
        });

        await newUser.save();

        const response = {
            _id: newUser._id,
            token: newUser.token,
        };

        res.json(response);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.login = async (req, res, next) => {
const { email, password } = req.body;
    try {
        
    const user = await User.findOne({email}).select('+password')

    if (!user) return res.status(401).json({ message: "Invalid Email or Password" });

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) return res.status(401).json({ message: "Invalid Email or Password" });

    res.json({
      _id: user._id,
      token: user.token,
    });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
