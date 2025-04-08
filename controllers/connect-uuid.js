const getConnectUUID = async (req, res) => {
    const user = req.user;

    try {
        user.connect_uuid = crypto.randomUUID();
        await user.save();
        res.status(200).json({uuid: user.connect_uuid});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = getConnectUUID;